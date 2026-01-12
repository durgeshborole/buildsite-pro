import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
<<<<<<< HEAD
=======
import { supabase } from "@/integrations/supabase/client";
>>>>>>> d4bf14995beb35cd183d7d6234f08a83330b7bc4

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    values: ["+91 9137222320", "+91 9702429638", "+91 8108554882"],
  },
  {
    icon: Mail,
    label: "Email",
    values: ["Pawarconstructions351@gmail.com"],
  },
  {
    icon: MapPin,
    label: "Address",
    values: ["66, Shubh Vastu, Shirgaon, Badlapur - 421503"],
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
<<<<<<< HEAD
=======
  const [isSubmitting, setIsSubmitting] = useState(false);
>>>>>>> d4bf14995beb35cd183d7d6234f08a83330b7bc4
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

<<<<<<< HEAD
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
=======
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('contact_inquiries')
      .insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
    
    setIsSubmitting(false);
>>>>>>> d4bf14995beb35cd183d7d6234f08a83330b7bc4
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4">
            Connect With Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border p-8">
              <h3 className="font-display text-2xl text-foreground mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>
<<<<<<< HEAD
                <Button type="submit" variant="construction" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
=======
                <Button 
                  type="submit" 
                  variant="construction" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
>>>>>>> d4bf14995beb35cd183d7d6234f08a83330b7bc4
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-secondary p-6 flex items-start gap-4 group hover:bg-secondary/80 transition-colors"
              >
                <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-secondary-foreground mb-2">
                    {info.label}
                  </h4>
                  {info.values.map((value, i) => (
                    <p key={i} className="text-secondary-foreground/80">
                      {value}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA Box */}
            <div className="bg-primary p-8 text-center">
              <h3 className="font-display text-2xl text-primary-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Let's discuss your construction needs and bring your vision to life.
              </p>
              <Button variant="constructionOutlineDark" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
