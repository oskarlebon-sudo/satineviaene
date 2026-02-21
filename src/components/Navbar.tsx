import { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Over mij", href: "#over-mij" },
    { name: "Diensten", href: "#diensten" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ${
        scrolled ? "bg-brand-dark/95 backdrop-blur-sm py-4 shadow-sm" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-lg font-serif tracking-[0.4em] uppercase text-white hover:text-brand-warm transition-colors">
          Satine Viaene
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[9px] uppercase tracking-[0.4em] font-medium text-white/70 hover:text-white transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-brand-dark/98 backdrop-blur-xl border-t border-white/5 py-16 md:hidden"
          >
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] uppercase tracking-[0.5em] text-white/60 hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
