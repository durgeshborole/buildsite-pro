import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import gallery1 from "@/assets/gallery/construction-1.jpg";
import gallery2 from "@/assets/gallery/construction-2.jpg";
import gallery3 from "@/assets/gallery/construction-3.jpg";
import gallery4 from "@/assets/gallery/construction-4.jpg";
import gallery5 from "@/assets/gallery/construction-5.jpg";
import gallery6 from "@/assets/gallery/construction-6.jpg";
import industrialImg from "@/assets/industrial-construction.jpg";
import commercialImg from "@/assets/commercial-construction.jpg";

type GalleryImage = {
  src: string;
  title: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  { src: gallery1, title: "Foundation Work", category: "Construction" },
  { src: gallery2, title: "Steel Reinforcement", category: "Structural" },
  { src: gallery3, title: "Factory Building", category: "Industrial" },
  { src: gallery4, title: "Crane Operations", category: "Construction" },
  { src: gallery5, title: "Hotel Project", category: "Commercial" },
  { src: gallery6, title: "Concrete Pouring", category: "Construction" },
  { src: industrialImg, title: "Warehouse Facility", category: "Industrial" },
  { src: commercialImg, title: "Office Complex", category: "Commercial" },
];

const categories = ["All", "Construction", "Industrial", "Commercial", "Structural"];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const filteredImages = galleryImages.filter(
    (img) => filter === "All" || img.category === filter
  );

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = useCallback((direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    if (direction === "prev") {
      setSelectedImage((prev) => 
        prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1
      );
    } else {
      setSelectedImage((prev) => 
        prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  }, [selectedImage, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  return (
    <section id="gallery" className="py-24 bg-construction-dark" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-secondary-foreground mt-4">
            Project Gallery
          </h2>
          <p className="text-construction-concrete mt-4 max-w-2xl mx-auto">
            Explore our portfolio of completed and ongoing construction projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category);
                setSelectedImage(null);
              }}
              className={`px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-construction-charcoal text-construction-concrete hover:text-primary border border-construction-steel/30"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 ? "h-full min-h-[400px]" : "aspect-square"}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-construction-dark/0 group-hover:bg-construction-dark/70 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <ZoomIn className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="font-display text-xl text-secondary-foreground">
                      {image.title}
                    </p>
                    <span className="text-sm text-construction-concrete">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-construction-dark/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-construction-charcoal hover:bg-primary text-secondary-foreground hover:text-primary-foreground flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-construction-charcoal hover:bg-primary text-secondary-foreground hover:text-primary-foreground flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-construction-charcoal hover:bg-primary text-secondary-foreground hover:text-primary-foreground flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImage]?.src}
                alt={filteredImages[selectedImage]?.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-construction-dark to-transparent">
                <h3 className="font-display text-2xl text-secondary-foreground">
                  {filteredImages[selectedImage]?.title}
                </h3>
                <p className="text-primary">
                  {filteredImages[selectedImage]?.category}
                </p>
                <p className="text-construction-concrete text-sm mt-2">
                  {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
