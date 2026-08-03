import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  HeartHandshake,
  Clock,
  TimerOff,
  CircleDollarSign,
  Users,
  Coffee,
  Pill,
  Repeat,
  Syringe,
  Activity,
  Phone,
  MapPin,
  Menu,
  X,
  Star,
  Mail,
  Award,
  BookOpen,
  Stethoscope,
  Leaf,
  Globe,
  Quote,
  GraduationCap,
  Heart,
  CheckCircle,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

// Hero + about images
import heroBg from "@assets/generated_images/hero_2.jpg";
import aboutImg from "@assets/generated_images/about.jpg";

// Pharmacist photos
import swapnaPortrait from "@assets/Screenshot_from_2026-07-30_02-28-23_1785360537917.png";
import swapnaAction from "@assets/Screenshot_from_2026-07-30_02-28-39_1785360537918.png";

// Gallery images
import galleryInterior from "@assets/generated_images/gallery_interior.jpg";
import galleryClinic from "@assets/generated_images/gallery_clinic.jpg";

/* ─── Signature mark ───
   A two-tone capsule glyph — half solid, half outlined, split by a seam —
   echoes the pharmacy's core object (the pill) without leaning on a cliché
   caduceus or cross. Reused as an eyebrow bullet, a button accent, and a
   section-break glyph so one motif carries the whole identity. */
const Capsule = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 32 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-32 16 8)">
      <path d="M16 3h6a5 5 0 010 10h-6V3z" fill="currentColor" />
      <path d="M16 3h-6a5 5 0 000 10h6V3z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="16" y1="3.2" x2="16" y2="12.8" stroke="currentColor" strokeWidth="1.4" />
    </g>
  </svg>
);

/* ─── Eyebrow ───
   Small mono-set label used above every section heading. Standardizing it
   on one component (icon + tracked mono caps) turns a decorative flourish
   into a real structural signal: "a new section starts here." */
const Eyebrow = ({ children, align = "center" }: { children: React.ReactNode; align?: "center" | "left" }) => (
  <motion.p
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex items-center gap-2 text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-3 font-mono ${
      align === "center" ? "justify-center" : "justify-start"
    }`}
  >
    <Capsule className="w-4 h-4 text-accent shrink-0" />
    {children}
  </motion.p>
);

/* ─── Header ───
   TopBar and Navbar used to be two independently-fixed elements both
   pinned to top-0, which made them stack on top of each other instead
   of one sitting below the other. They're now a single fixed header:
   the info bar collapses (height + opacity) into the nav on scroll, so
   there's only ever one element claiming top-0. */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Pharmacist", href: "#team" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#reviews" },
    { name: "Hours", href: "#hours" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Info bar — collapses away as soon as the page scrolls */}
      <div
        className={`hidden md:block overflow-hidden bg-primary text-primary-foreground transition-[max-height,opacity] duration-300 ease-out ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-2.5 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-80" />
              1870 W Lacey Blvd, Hanford, CA 93230
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 opacity-80" />
              Mon–Fri 9am–6pm · Closed Weekends
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:5593802220" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone className="w-3.5 h-3.5 opacity-80" />
              559-380-2220
            </a>
            <a href="mailto:hanfordpharmacy@gmail.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail className="w-3.5 h-3.5 opacity-80" />
              hanfordpharmacy@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => handleScrollTo(e, "#top")} className={`text-xl font-serif font-semibold flex items-center gap-2.5 z-50 ${isScrolled ? "text-primary" : "text-white"}`}>
            <Capsule className="h-6 w-6" />
            <span>Hanford Pharmacy</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-white/90 hover:text-white"}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+15593802220"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-md"
              data-testid="button-nav-call"
            >
              <Capsule className="w-4 h-4" />
              Call Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen
              ? <X className={`h-6 w-6 ${isScrolled || mobileMenuOpen ? "text-gray-900" : "text-white"}`} />
              : <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />}
          </button>

          {/* Mobile Menu */}
          <div className={`absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-7 transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
                {link.name}
              </a>
            ))}
            <a href="tel:+15593802220" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-full font-semibold text-lg mt-2" data-testid="button-mobile-call">
              <Capsule className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <section id="top" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={heroBg} alt="Hanford Pharmacy Interior" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-purple-950/70"></div>
    </div>

    <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center text-white pt-28 md:pt-40 pb-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          A Holistic Neighborhood Pharmacy
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
          Healing that holds<br className="hidden md:block" />
          <span className="text-secondary/90"> the whole of you.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/85 mb-4 max-w-2xl mx-auto leading-relaxed">
          Hanford Pharmacy is the practice of Swapna Reddy — PharmD, BPharm, BCACP, BCGP, CBDCE, BCMTM. Trusted local pharmacy care built on compassion, service, and community.
        </p>

        <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-10 font-medium">
          Compassion · Service · Community
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="tel:+15593802220" className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg" data-testid="button-hero-call">
            Call Now
          </a>
          <a href="https://maps.google.com/?q=1870+W+Lacey+Blvd+Hanford+CA+93230" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white hover:text-primary shadow-lg" data-testid="button-hero-directions">
            Get Directions
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { value: "5.0 ★", label: "Google Rating" },
            { value: "93+", label: "Reviews" },
            { value: "20+ yrs", label: "Practicing" },
            { value: "120+", label: "Clinics Held" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-center"
            >
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
      <div className="w-px h-10 bg-white/30 animate-pulse"></div>
    </div>
  </section>
);

/* ─── About ─── */
const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
          <Eyebrow align="left">About Us</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">About Hanford Pharmacy</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-5">
            Welcome to Hanford Pharmacy, where exceptional customer service meets personalized healthcare. We are committed to making every visit quick, convenient, and stress-free.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Our experienced staff provides fast prescription services without long wait times while ensuring every customer receives personal attention. Prescriptions are paired with patient education and unhurried conversation — because you are not just a number here.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Community First" },
              { icon: Clock, label: "No Long Waits" },
              { icon: Globe, label: "EN · PA · HI Spoken" },
              { icon: Award, label: "Board Certified" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-semibold text-gray-800">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform translate-x-4 translate-y-4"></div>
          <img src={aboutImg} alt="Pharmacist helping patient" className="relative z-10 w-full h-auto rounded-[2rem] shadow-xl object-cover aspect-[4/3]" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Meet Pharmacist ─── */
const MeetPharmacist = () => (
  <section id="team" className="py-24 bg-secondary overflow-hidden">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Eyebrow>The Pharmacist</Eyebrow>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          A practice rooted in presence.
        </motion.h2>
      </div>

      {/* Main two-col layout */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto mb-16">
        {/* Left: Portrait + credential badges */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-sm"></div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem]"></div>
            <img
              src={swapnaPortrait}
              alt="Swapna Reddy, PharmD – Pharmacy Manager"
              className="relative z-10 w-72 h-80 md:w-80 md:h-96 object-cover object-top rounded-[2rem] shadow-2xl"
              data-testid="img-pharmacist-portrait"
            />
          </div>

          {/* Name + credentials */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Swapna Reddy</h3>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2.5 mb-1">
              {["PharmD", "BPharm", "BCACP", "BCGP", "CBDCE", "BCMTM"].map((cred) => (
                <span key={cred} className="font-mono text-[0.7rem] font-semibold text-primary bg-white border border-primary/25 rounded-full px-2.5 py-1">
                  {cred}
                </span>
              ))}
            </div>
            <p className="text-gray-500 font-medium mt-2">Pharmacy Manager · Diabetic Lifestyle Coach Trainer</p>
          </div>

          {/* Stats chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { value: "20+ yrs", label: "Practicing" },
              { value: "120+", label: "Clinics Held" },
              { value: "EN · PA · HI", label: "Languages" },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-primary/20 rounded-2xl px-5 py-3 text-center shadow-sm min-w-[100px]">
                <div className="text-lg font-bold text-primary font-serif">{s.value}</div>
                <div className="text-[0.65rem] text-gray-500 uppercase tracking-wider font-mono mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Bio + education + specialties */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="flex flex-col gap-8">
          {/* Action photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
            <img src={swapnaAction} alt="Swapna Reddy presenting at a healthcare event" className="w-full h-full object-cover object-top" data-testid="img-pharmacist-action" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Community Educator</p>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Swapna trained as a clinical pharmacist (BPharm, PharmD) and holds board certifications as a <strong className="text-primary">BCACP</strong> (Ambulatory Care), <strong className="text-primary">BCGP</strong> (Geriatric Pharmacist), and <strong className="text-primary">BCMTM</strong> (Medication Therapy Management), along with her <strong className="text-primary">CBDCE</strong> certification as a Diabetic Lifestyle Coach Trainer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Her care draws on a deep commitment to community, mindfulness, and a belief that healing lives in the everyday — in how we eat, move, breathe, and listen to one another. Patients describe consultations with her as unhurried, candid, and quietly transformative.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-gray-900">Education & Training</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Doctor of Pharmacy (PharmD)",
                  "Certified Diabetes Care & Education Specialist",
                  "Certified Diabetic Lifestyle Coach Trainer (CBDCE)",
                  "Board Certified Medication Therapy Manager (BCMTM)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-gray-900">Specialties</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Diabetes & metabolic health",
                  "Medication review & deprescribing",
                  "Mindfulness for chronic illness",
                  "South Asian community health",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="bg-white rounded-[2rem] p-10 md:p-12 shadow-[0_30px_60px_-25px_hsl(var(--primary)/0.35)] border border-primary/10 relative overflow-hidden">
          <Quote className="w-9 h-9 text-accent mx-auto mb-5" />
          <blockquote className="text-2xl md:text-[1.75rem] font-serif italic text-gray-800 leading-snug mb-7">
            A pharmacy should be a quiet room in a loud world — a place where you are met as a person first, and a patient second.
          </blockquote>
          <div className="w-10 h-px bg-primary/30 mx-auto mb-4"></div>
          <p className="text-primary font-bold">Swapna Reddy, PharmD</p>
          <p className="text-gray-500 text-sm font-mono uppercase tracking-wider mt-1">Pharmacy Manager, Hanford Pharmacy</p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Why Choose Us ─── */
const WhyChooseUs = () => {
  const features = [
    { icon: Users, title: "Friendly & Professional Staff", desc: "Expert care with a warm, personal touch on every visit." },
    { icon: TimerOff, title: "Fast Prescription Service", desc: "Get your medications filled quickly — no long waits." },
    { icon: Clock, title: "No Long Wait Times", desc: "We respect your time, every single visit." },
    { icon: CircleDollarSign, title: "Affordable Medication Prices", desc: "Competitive pricing to keep healthcare accessible for all." },
    { icon: HeartHandshake, title: "Personalized Customer Care", desc: "Healthcare tailored to you, not a one-size-fits-all approach." },
    { icon: Coffee, title: "Snacks, Water & Coffee", desc: "Complimentary refreshments while you wait — you're family here." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow>Why Us</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-gray-600">
            We redefined the pharmacy experience to focus entirely on you.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-secondary/60 hover:bg-white p-8 rounded-3xl rounded-tr-lg shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-1 border border-transparent hover:border-primary/10"
            >
              <div className="h-14 w-14 bg-white group-hover:bg-primary rounded-full flex items-center justify-center mb-6 transition-colors duration-300 text-primary group-hover:text-white shadow-sm">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Services ─── */
const Services = () => {
  const services = [
    { title: "Prescription Filling", icon: Pill, desc: "Accurate, quick fills with a personal review of every interaction." },
    { title: "Prescription Transfers", icon: Repeat, desc: "Move existing prescriptions to us in a single conversation." },
    { title: "Medication Counseling", icon: BookOpen, desc: "Unhurried one-on-ones — bring your questions, leave with clarity." },
    { title: "Immunizations", icon: Syringe, desc: "Seasonal flu, travel, and routine immunizations in a calm setting." },
    { title: "Over-the-Counter Medicines", icon: Pill, desc: "Wide selection of OTC products to support everyday wellness." },
    { title: "Health Consultations", icon: Stethoscope, desc: "Personalized guidance on medications, interactions, and health goals." },
    { title: "Refill Assistance", icon: Clock, desc: "Easy refill coordination so you never run out of your medications." },
    { title: "Medication Synchronization", icon: Repeat, desc: "Sync all your prescriptions to one convenient pickup date." },
    { title: "Diabetes Clinics", icon: Activity, desc: "Group and 1:1 sessions blending clinical care with lifestyle coaching." },
    { title: "Diabetic Lifestyle Coaching", icon: Leaf, desc: "One-on-one coaching to build sustainable, healthy routines for diabetes management." },
    { title: "Wellness Outreach", icon: Globe, desc: "Workshops at temples, schools, and community centers." },
    { title: "Pain Management", icon: Activity, desc: "Personalized strategies and medication support for chronic and acute pain." },
    { title: "Women's Empowerment Sessions", icon: Heart, desc: "Weekend sessions for women on health, wellness, and community support." },
  ];

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow>What We Offer</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Considered Services for Everyday Wellbeing
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-gray-600">
            Walk-in, by appointment, or over the phone — care meets you where you are.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white p-7 rounded-3xl rounded-bl-lg shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 border border-transparent transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"></div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA Banner ─── */
const CTABanner = () => (
  <section className="py-20 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}></div>
    <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
        Need Your Prescription Filled Quickly?
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
        Experience fast service, friendly care, and personalized attention at Hanford Pharmacy. Walk in today — no appointment needed.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="tel:+15593802220" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg" data-testid="button-banner-call">
          <Capsule className="w-5 h-5" />
          Call Now
        </a>
        <a href="https://maps.google.com/?q=1870+W+Lacey+Blvd+Hanford+CA+93230" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white hover:text-primary" data-testid="button-banner-visit">
          Visit Our Pharmacy
        </a>
      </motion.div>
    </div>
  </section>
);

/* ─── Gallery ─── */
const Gallery = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Eyebrow>The Space</Eyebrow>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Inside Hanford Pharmacy
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { src: galleryInterior, alt: "Sunlit pharmacy interior", caption: "The Dispensary" },
          { src: swapnaAction, alt: "Swapna presenting at community event", caption: "Community Education" },
          { src: galleryClinic, alt: "Community wellness clinic", caption: "Diabetes & Wellness Clinics" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] cursor-pointer"
          >
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-semibold text-lg">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-6 text-sm">Storefront tours by appointment. <a href="tel:+15593802220" className="text-primary font-semibold hover:underline">Call to arrange.</a></p>
    </div>
  </section>
);

/* ─── Affiliations ─── */
const Affiliations = () => (
  <section className="py-14 bg-secondary border-y border-primary/10">
    <div className="container mx-auto px-4 md:px-6">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Network & Affiliations</p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {[
          { icon: Award, label: "Mindfulness Health Collective", sub: "Founding member" },
          { icon: Heart, label: "Blue Cross · Aetna · Medicare", sub: "Accepted insurance" },
          { icon: CheckCircle, label: "PCCA Compounding Network", sub: "Certified pharmacy" },
          { icon: Users, label: "Community Diabetes Outreach", sub: "Lead clinician" },
          { icon: GraduationCap, label: "BCACP · BCGP · BCMTM", sub: "Board certifications" },
        ].map(({ icon: Icon, label, sub }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-primary/10 min-w-[200px]"
          >
            <Icon className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Reviews ─── */
const Reviews = () => {
  const reviews = [
    { text: "A small-town pharmacy that's quick and efficient. The owner is so sweet and helpful — she goes out of her way for great customer care.", author: "Kristen B.", detail: "Yelp Review · Dec 2025" },
    { text: "I already left one five-star review, but I'll say it again: highly recommend everything about this place!", author: "Cianne M.", detail: "Yelp Review · Apr 2025" },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>Patient Voices</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Care that people return to.
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex items-center justify-center gap-2 text-gray-700 font-medium">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-gray-600">5.0 Stars · 93+ Google Reviews</span>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-secondary/60 hover:bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/10 flex flex-col"
            >
              <div className="text-5xl text-primary/20 font-serif leading-none mb-2">"</div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 leading-relaxed italic flex-1 mb-5">"{review.text}"</p>
              <div>
                <p className="font-bold text-gray-900 text-sm">— {review.author}</p>
                <p className="text-xs text-gray-400 mt-0.5">{review.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Location ─── */
const Location = () => (
  <section id="hours" className="py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <Eyebrow align="left">Find Us</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Location & Hours</h2>

          <div className="space-y-5 mb-10">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">Address</p>
                <p className="text-gray-600">1870 W Lacey Blvd, Hanford, CA 93230</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <Phone className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">Phone</p>
                <a href="tel:+15593802220" className="text-primary font-semibold hover:underline">+1 (559) 380-2220</a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <Mail className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">Email</p>
                <a href="mailto:hanfordpharmacy@gmail.com" className="text-primary font-semibold hover:underline">hanfordpharmacy@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="tel:+15593802220" className="bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-md inline-flex items-center gap-2" data-testid="button-location-call">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="https://maps.google.com/?q=1870+W+Lacey+Blvd+Hanford+CA+93230" target="_blank" rel="noopener noreferrer" className="bg-white text-primary border border-primary/30 px-6 py-3 rounded-full font-semibold transition-all hover:bg-primary hover:text-white inline-flex items-center gap-2" data-testid="button-location-maps">
              <MapPin className="w-4 h-4" /> Open Google Maps
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Business Hours
            </h3>
            <table className="w-full text-left">
              <tbody>
                {[
                  { day: "Monday", hours: "9:00 AM – 6:00 PM", open: true },
                  { day: "Tuesday", hours: "9:00 AM – 6:00 PM", open: true },
                  { day: "Wednesday", hours: "9:00 AM – 6:00 PM", open: true },
                  { day: "Thursday", hours: "9:00 AM – 6:00 PM", open: true },
                  { day: "Friday", hours: "9:00 AM – 6:00 PM", open: true },
                  { day: "Saturday", hours: "Closed", open: false },
                  { day: "Sunday", hours: "Closed", open: false },
                ].map(({ day, hours, open }, i, arr) => (
                  <tr key={day} className={i < arr.length - 1 ? "border-b border-gray-100" : ""}>
                    <td className="py-3 font-medium text-gray-700">{day}</td>
                    <td className={`py-3 text-right font-mono text-sm font-semibold ${open ? "text-green-600" : "text-red-400"}`}>{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 sticky top-24">
          <iframe
            src="https://maps.google.com/maps?q=1870+W+Lacey+Blvd+Hanford+CA+93230&output=embed"
            width="100%"
            height="560"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hanford Pharmacy Location"
          ></iframe>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Contact Form ───
   Submits straight to Web3Forms, a free form-relay service: it forwards
   the fields below as an email to the address tied to WEB3FORMS_ACCESS_KEY,
   with no backend of our own to host or maintain. Get a key at
   https://web3forms.com (enter hanfordpharmacy@gmail.com, the key arrives
   by email in seconds) and paste it into the constant below. */
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New message from the Hanford Pharmacy website");
    formData.append("from_name", "Hanford Pharmacy Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        form.reset();
        toast({ title: "Message Sent!", description: "Thank you — we'll be in touch shortly.", duration: 5000 });
      } else {
        toast({ title: "Something went wrong", description: "Please call us instead at (559) 380-2220.", duration: 6000 });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please call us instead at (559) 380-2220.", duration: 6000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Reach Out</Eyebrow>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-gray-600">
              Whether you're transferring a prescription, asking about a medication, or just need a moment — you are welcome here.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-secondary/50 p-8 md:p-10 rounded-3xl border border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Jane Doe" data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="(559) 123-4567" data-testid="input-phone" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="jane@example.com" data-testid="input-email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you today?" data-testid="input-message"></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2" data-testid="button-submit-contact">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending…
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─── */
const Footer = () => (
  <footer className="bg-primary text-white pt-20 pb-8">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 text-xl font-bold font-serif">
            <Capsule className="h-6 w-6" />
            <span>Hanford Pharmacy</span>
          </div>
          <p className="text-white/70 leading-relaxed text-sm">
            A holistic neighborhood pharmacy in Hanford, CA — built on compassion, service, and community.
          </p>
          <p className="text-white/60 text-xs font-mono uppercase tracking-wider">Compassion · Service · Community</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all" aria-label="Facebook"><SiFacebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all" aria-label="Instagram"><SiInstagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all" aria-label="X"><SiX className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            {[["#about","About Us"],["#team","Meet the Pharmacist"],["#services","Our Services"],["#reviews","Patient Voices"],["#hours","Hours & Location"],["#contact","Contact Us"]].map(([href, label]) => (
              <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-5">Contact Info</h4>
          <ul className="space-y-4 text-white/70 text-sm">
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /><span>1870 W Lacey Blvd<br />Hanford, CA 93230</span></li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" /><a href="tel:+15593802220" className="hover:text-white transition-colors">+1 (559) 380-2220</a></li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" /><a href="mailto:hanfordpharmacy@gmail.com" className="hover:text-white transition-colors">hanfordpharmacy@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-5">Business Hours</h4>
          <ul className="space-y-2.5 text-sm text-white/70 font-mono">
            {[["Mon – Fri","9:00 AM – 6:00 PM"],["Saturday","Closed"],["Sunday","Closed"]].map(([day, time]) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{day}</span>
                <span className={time === "Closed" ? "text-white/40" : "text-white/90 font-medium"}>{time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-white/20">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Languages Spoken</p>
            <p className="text-white/80 font-semibold">English · Punjabi · Hindi</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Hanford Pharmacy. All rights reserved.</p>
        <p>Swapna Reddy, PharmD, BPharm, BCACP, BCGP, CBDCE, BCMTM — Pharmacy Manager</p>
      </div>
    </div>
  </footer>
);

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="font-sans text-gray-900 selection:bg-primary/20">
      <Header />
      <main>
        <Hero />
        <About />
        <MeetPharmacist />
        <WhyChooseUs />
        <Services />
        <CTABanner />
        <Gallery />
        <Affiliations />
        <Reviews />
        <Location />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
