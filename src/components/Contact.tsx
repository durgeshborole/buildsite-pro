import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
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
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-card border border-border"
              >
                <div className="p-3 bg-primary/10 text-primary">
                  <info.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-foreground mb-2">
                    {info.label}
                  </h4>
                  {info.values.map((value, idx) => (
                    <p key={idx} className="text-muted-foreground">
                      {value}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Google Map Placeholder */}
            <div className="h-64 bg-muted border border-border flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d73.2445!3d19.1654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzU1LjQiTiA3M8KwMTQnNDAuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pawar Constructions Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
