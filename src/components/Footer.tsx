import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-construction-dark border-t border-construction-steel/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span className="font-display text-2xl text-primary-foreground">PC</span>
              </div>
              <div>
                <h3 className="font-display text-xl text-secondary-foreground">
                  Pawar Constructions
                </h3>
                <p className="text-sm text-construction-concrete">
                  Engineers & Contractors
                </p>
              </div>
            </div>
            <p className="text-construction-concrete max-w-md mb-6">
              Building dreams into reality with innovation, engineering excellence, and
              unmatched workmanship. Your trusted partner in construction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-secondary-foreground mb-4">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {["Home", "About", "Services", "Projects", "Team", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-construction-concrete hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-secondary-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-construction-concrete">
                  <p>+91 9137222320</p>
                  <p>+91 9702429638</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-construction-concrete break-all">
                  Pawarconstructions351@gmail.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-construction-concrete">
                  66, Shubh Vastu, Shirgaon,
                  <br />
                  Badlapur - 421503
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-construction-steel/30 mt-12 pt-8 text-center">
          <p className="text-construction-concrete text-sm">
            © {new Date().getFullYear()} Pawar Constructions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
