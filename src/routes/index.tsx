import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import {
  Camera,
  Car,
  Users,
  Moon,
  Image as ImageIcon,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/carsnight-logo.png";
import heroBg from "@/assets/hero-tokyo.jpg";
import ctaBg from "@/assets/cta-car.jpg";
import appMockup from "@/assets/app-mockup.jpg";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CarsNight — Where the streets never sleep." },
      {
        name: "description",
        content:
          "Join the social network for car enthusiasts. Share your ride, build your garage, and connect with night drive culture. Reserve early access.",
      },
      { property: "og:title", content: "CarsNight — Where the streets never sleep." },
      {
        property: "og:description",
        content:
          "The social network for car enthusiasts. Join the early-access waitlist.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Rajdhani:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Car, title: "Share Your Ride", desc: "Post your build, your spec, your story. Show the world what you drive." },
  { icon: ImageIcon, title: "Build Your Garage", desc: "Curate a digital garage profile that grows with every mod and every mile." },
  { icon: Users, title: "Connect With Enthusiasts", desc: "Find drivers who speak your language — JDM, exotics, stance, drift, all of it." },
  { icon: Moon, title: "Night Drive Culture", desc: "Discover late-night meets, touges, and underground spots in your city." },
  { icon: Camera, title: "Photography Community", desc: "Automotive photographers and creators sharing the craft, frame by frame." },
  { icon: CalendarDays, title: "Meetups & Events", desc: "Plan, RSVP, and remember every meet — coming soon to CarsNight." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster theme="dark" position="top-center" richColors />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src={logo} alt="CarsNight" className="h-9 w-auto" />
          </a>
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-display tracking-widest uppercase text-foreground/90 hover:text-accent transition-colors"
          >
            Join Waitlist <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex items-center justify-center pt-20 pb-12">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, oklch(0.08 0.01 270 / 0.55), oklch(0.08 0.01 270 / 0.95)), url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 grid-bg -z-10 opacity-60" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center animate-fade-up">
          <img
            src={logo}
            alt="CarsNight logo"
            className="mx-auto h-32 sm:h-44 w-auto animate-float drop-shadow-[0_0_40px_rgba(157,78,221,0.5)]"
          />
          <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            The Social Network
            <br />
            <span className="text-gradient-neon">For Car Enthusiasts</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Share your ride, connect with enthusiasts, and experience car culture like never before.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#waitlist"
              className="group relative overflow-hidden rounded-lg px-8 py-4 font-display font-bold tracking-widest uppercase text-primary-foreground animate-pulse-glow"
              style={{ background: "var(--gradient-neon)" }}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-scan" />
              <span className="relative">Join The Waitlist</span>
            </a>
            <a
              href="#features"
              className="font-display tracking-widest uppercase text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Explore the platform ↓
            </a>
          </div>
          <p className="mt-12 font-display tracking-[0.4em] uppercase text-xs text-muted-foreground/80">
            — Where the streets never sleep —
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="relative py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="font-display tracking-[0.3em] uppercase text-xs text-accent mb-3">Early Access</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            Reserve your spot on <span className="text-gradient-neon">CarsNight</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Be first in line when the engines start. No spam. Just the drop.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <WaitlistForm />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display tracking-[0.3em] uppercase text-xs text-accent mb-3">The Platform</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Built for <span className="text-gradient-neon">car culture</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card neon-border p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-neon)" }}
                >
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="font-display tracking-[0.3em] uppercase text-xs text-accent mb-3">Inside the App</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6">
              A feed that <span className="text-gradient-neon">moves like the night.</span>
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              {[
                "Cinematic enthusiast feed — photos, reels, and builds.",
                "Garage profiles with mod history & spec sheets.",
                "Drop reels of your runs straight to the community.",
                "Likes, comments, and follows — built for car people.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: "var(--gradient-neon)", boxShadow: "var(--shadow-neon-mixed)" }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full blur-3xl opacity-50" style={{ background: "var(--gradient-neon)" }} />
              <img
                src={appMockup}
                alt="CarsNight mobile app preview"
                width={1024}
                height={1280}
                loading="lazy"
                className="relative max-w-[320px] sm:max-w-sm w-full rounded-3xl border border-border/50 glow-mixed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto glass-card neon-border px-6 py-10 text-center">
          <p className="font-display text-2xl sm:text-3xl">
            Join <span className="text-gradient-neon font-bold">1,200+</span> car enthusiasts
            <br className="hidden sm:block" /> already following CarsNight.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, oklch(0.08 0.01 270 / 0.7), oklch(0.08 0.01 270 / 0.92)), url(${ctaBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]">
            The streets never sleep.
            <br />
            <span className="text-gradient-neon">Neither do car enthusiasts.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Reserve your spot. Be part of CarsNight from day one.
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <WaitlistForm buttonLabel="Reserve Your Spot" />
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-10 px-4 text-center">
        <img src={logo} alt="CarsNight" className="h-8 w-auto mx-auto mb-4 opacity-80" />
        <p className="font-display tracking-[0.3em] uppercase text-xs text-muted-foreground">
          © {new Date().getFullYear()} CarsNight — Where the streets never sleep.
        </p>
      </footer>
    </div>
  );
}
