import { Instagram, Mail, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-10 px-6 text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        {/* Left: Brand Identity */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-serif uppercase tracking-[0.4em] text-brand-warm mb-1">
            Satine Viaene
          </h3>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
            Fotografie & Content Creatie
          </p>
        </div>

        {/* Middle: Minimal Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[9px] uppercase tracking-[0.2em] text-white/50 font-medium">
          <a href="#home" className="hover:text-brand-gold transition-colors">Home</a>
          <a href="#over-mij" className="hover:text-brand-gold transition-colors">Over mij</a>
          <a href="#diensten" className="hover:text-brand-gold transition-colors">Diensten</a>
          <a href="#portfolio" className="hover:text-brand-gold transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a>
        </nav>

        {/* Right: Compact Contact & Socials */}
        <div className="flex flex-col items-center md:items-end gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
          <p className="text-white/60">info@satineviaene.be</p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">Instagram</a>
            <span className="text-white/10">/</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] uppercase tracking-[0.4em] text-white/10">
        <p>&copy; {new Date().getFullYear()} Satine Viaene. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
