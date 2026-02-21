import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { 
  Camera, 
  Heart, 
  Users, 
  Briefcase, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  Loader2,
  Instagram
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Form Schema
const contactSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().optional(),
  shoot_type: z.string().min(1, "Selecteer een type shoot"),
  preferred_date: z.string().optional(),
  message: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setSubmitStatus({ success: result.success, message: result.message });
      if (result.success) reset();
    } catch (error) {
      setSubmitStatus({ success: false, message: "Er is een fout opgetreden. Probeer het later opnieuw." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "Huwelijksfotografie",
      icon: <Heart className="text-brand-gold" />,
      desc: "Tijdloze herinneringen aan jullie mooiste dag. Emotioneel, authentiek en ongedwongen.",
      price: "Vanaf €1.450"
    },
    {
      title: "Koppels & Verloving",
      icon: <Users className="text-brand-gold" />,
      desc: "Vier jullie liefde met een romantische shoot op een unieke locatie.",
      price: "Vanaf €195"
    },
    {
      title: "Paarden & Ruiters",
      icon: <Camera className="text-brand-gold" />,
      desc: "Gespecialiseerde paardenfotografie die de band tussen mens en dier prachtig vastlegt.",
      price: "Vanaf €225"
    },
    {
      title: "Dierenfotografie",
      icon: <Star className="text-brand-gold" />,
      desc: "Een blijvende herinnering aan je trouwe viervoeter in hun natuurlijke omgeving.",
      price: "Vanaf €175"
    },
    {
      title: "Modellen & Branding",
      icon: <Briefcase className="text-brand-gold" />,
      desc: "Professionele beelden voor je portfolio of personal brand die spreken.",
      price: "Vanaf €250"
    },
    {
      title: "Content Creatie",
      icon: <ArrowRight className="text-brand-gold" />,
      desc: "Hoogwaardige beelden voor ondernemers die hun visuele identiteit willen versterken.",
      price: "Op aanvraag"
    }
  ];

  const portfolioImages = [
    { id: 1, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_491440932_17859416910407382_3365592006642769882_n.jpg", category: "Geboorte & Huwelijk" },
    { id: 2, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_574035632_17883406062407382_3412813286264571648_n.jpg", category: "Dieren" },
    { id: 3, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_527315441_17871633384407382_1258131725459804250_n.jpg", category: "Koppels" },
    { id: 4, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_501284567_17863084434407382_5396924388597924786_n.jpg", category: "Modellen" },
    { id: 5, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_504417338_17865035217407382_5027564109383779609_n.jpg", category: "Branding" },
    { id: 6, src: "https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/SaveClip.App_491451052_17858602221407382_2485430219807315805_n.jpg", category: "Sport" },
  ];

  const testimonials = [
    {
      name: "Emma & Thomas",
      quote: "Satine heeft onze trouwdag op een magische manier vastgelegd. De foto's zijn precies zoals we ze wilden: puur en vol emotie.",
      rating: 5
    },
    {
      name: "Sophie de Vries",
      quote: "De paardenshoot was een geweldige ervaring. Satine heeft zoveel geduld en weet precies hoe ze de band met mijn paard moet vangen.",
      rating: 5
    },
    {
      name: "Marc Janssens",
      quote: "Voor mijn nieuwe business had ik professionele foto's nodig. Satine dacht mee over de stijl en het resultaat is boven verwachting.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/satine-hero/1920/1080" 
            alt="Satine Viaene Photography Hero" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-beige"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-warm mb-8 block font-bold">
              Fotografie & Content Creatie
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-16 leading-[1.1] tracking-tight text-white">
              Pure momenten.<br />
              <span className="italic font-light text-brand-warm">Tijdloze beelden.</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-14 py-5 bg-brand-gold text-brand-dark text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 shadow-2xl"
              >
                Boek jouw shoot
              </a>
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto px-14 py-5 bg-white text-brand-dark text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-2xl"
              >
                Bekijk portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="over-mij" className="py-16 px-6 bg-brand-beige">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white shadow-lg relative">
              <img 
                src="https://ddqhrvesrqlfjjtciwsr.supabase.co/storage/v1/object/public/satine/profilepicture.jpg" 
                alt="Satine Viaene" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-3 block font-bold">Mijn Verhaal</span>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 leading-tight italic">Passie voor authenticiteit.</h2>
            <div className="space-y-4 text-[13px] text-brand-dark/70 leading-relaxed tracking-wide font-light">
              <p>
                Hoi! Ik ben Satine Viaene, een gepassioneerde fotograaf gevestigd in België. Met een scherp oog voor detail en een liefde voor natuurlijk licht, help ik mensen en bedrijven om hun mooiste momenten visueel te vertalen.
              </p>
              <p>
                Mijn stijl is elegant, warm en authentiek. Ik werk voornamelijk op locatie, waar we samen de perfecte setting creëren voor een ongedwongen en professionele fotoshoot.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-brand-dark/5 pt-6">
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-2xl text-brand-gold">500+</h4>
                <p className="text-[8px] uppercase tracking-widest font-bold text-brand-dark/40">Klanten</p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-2xl text-brand-gold">5+ Jaar</h4>
                <p className="text-[8px] uppercase tracking-widest font-bold text-brand-dark/40">Ervaring</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-2 block font-bold">Aanbod</span>
            <h2 className="text-3xl md:text-4xl font-serif">Onze Diensten</h2>
          </div>

          <div className="relative group">
            {/* Scroll Buttons - Positioned on the scroll area */}
            <button 
              onClick={() => document.getElementById('services-scroll')?.scrollBy({ left: -350, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-brand-dark/5 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <ArrowRight size={18} className="rotate-180" />
            </button>
            <button 
              onClick={() => document.getElementById('services-scroll')?.scrollBy({ left: 350, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-brand-dark/5 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <ArrowRight size={18} />
            </button>

            <div id="services-scroll" className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
              {services.map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[160px] md:min-w-[350px] bg-brand-soft p-5 md:p-10 border border-brand-dark/5 snap-start group/card"
                >
                  <div className="mb-4 md:mb-8 text-brand-gold transform group-hover/card:scale-110 transition-transform duration-500">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-lg md:text-2xl font-serif mb-2 md:mb-4">{service.title}</h3>
                  <p className="text-brand-dark/60 text-[11px] md:text-[14px] mb-4 md:mb-8 leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                    {service.desc}
                  </p>
                  <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-brand-dark/5">
                    <span className="text-[9px] md:text-[11px] font-bold tracking-widest uppercase text-brand-gold">{service.price}</span>
                    <a href="#contact" className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 md:gap-2 hover:text-brand-gold transition-colors">
                      Info <ArrowRight size={10} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6 bg-brand-beige">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-2 block font-bold">Portfolio</span>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Recente Werken</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {portfolioImages.slice(0, 6).map((img) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="aspect-square relative group overflow-hidden bg-brand-soft shadow-sm"
              >
                <img 
                  src={img.src} 
                  alt={`${img.category} photography`} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[1px]">
                  <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold border border-white/20 px-4 py-2">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-dark text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl"
            >
              <Instagram size={18} />
              Instagram | @satineviaene
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 block font-bold">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-serif">Wat Klanten Zeggen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-base font-serif italic mb-6 text-brand-dark/70 leading-relaxed">
                  "{t.quote}"
                </p>
                <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/40">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-brand-beige">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 block font-bold">Contact</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Boek Jouw Sessie</h2>
            <p className="text-[11px] text-brand-dark/40 uppercase tracking-widest">
              Beperkte plaatsen beschikbaar.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 border border-brand-dark/5 shadow-sm">
            {submitStatus?.success ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Bedankt!</h3>
                <p className="text-[12px] text-brand-dark/60 mb-6">{submitStatus.message}</p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-brand-dark pb-1"
                >
                  Nieuw bericht
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/40">Naam *</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-white border border-brand-dark/5 px-4 py-3 text-[12px] focus:outline-none focus:border-brand-gold/50 transition-colors"
                    />
                    {errors.name && <p className="text-[9px] text-red-400 uppercase tracking-widest">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/40">E-mail *</label>
                    <input 
                      {...register("email")}
                      className="w-full bg-white border border-brand-dark/5 px-4 py-3 text-[12px] focus:outline-none focus:border-brand-gold/50 transition-colors"
                    />
                    {errors.email && <p className="text-[9px] text-red-400 uppercase tracking-widest">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/40">Type Shoot *</label>
                    <select 
                      {...register("shoot_type")}
                      className="w-full bg-white border border-brand-dark/5 px-4 py-3 text-[12px] focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none"
                    >
                      <option value="">Selecteer...</option>
                      <option value="huwelijk">Huwelijk</option>
                      <option value="koppels">Koppels</option>
                      <option value="paarden">Paarden</option>
                      <option value="dieren">Dieren</option>
                      <option value="branding">Branding</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/40">Datum</label>
                    <input 
                      type="date"
                      {...register("preferred_date")}
                      className="w-full bg-white border border-brand-dark/5 px-4 py-3 text-[12px] focus:outline-none focus:border-brand-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/40">Bericht *</label>
                  <textarea 
                    {...register("message")}
                    rows={3}
                    className="w-full bg-white border border-brand-dark/5 px-4 py-3 text-[12px] focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
                    placeholder="Vertel me meer..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-dark text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Verzenden..." : "Verstuur Aanvraag"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
