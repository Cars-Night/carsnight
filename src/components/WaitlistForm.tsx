import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { waitlistSupabase, waitlistConfigured } from "@/integrations/external-supabase";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  favorite_car: z.string().trim().min(1, "Tell us your favorite car").max(100),
});

interface Props {
  buttonLabel?: string;
  compact?: boolean;
}

export function WaitlistForm({ buttonLabel = "Get Early Access", compact = false }: Props) {
  const [form, setForm] = useState({ name: "", email: "", favorite_car: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      if (!waitlistConfigured || !waitlistSupabase) {
        toast.error("Waitlist is not configured yet. Please try again later.");
        setLoading(false);
        return;
      }
      const email = parsed.data.email.toLowerCase();

      // Check for duplicate email first
      const { data: existing, error: checkError } = await waitlistSupabase
        .from("waitlist")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }
      if (existing) {
        toast.error("This email is already on the waitlist.");
        setLoading(false);
        return;
      }

      const { error } = await waitlistSupabase.from("waitlist").insert({
        name: parsed.data.name,
        email,
        favorite_car: parsed.data.favorite_car,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already on the waitlist.");
        } else {
          toast.error("Something went wrong. Try again.");
        }
        setLoading(false);
        return;
      }

      setForm({ name: "", email: "", favorite_car: "" });
      setDone(true);
      toast.success("Welcome to CarsNight 🌃");
    } catch (err: any) {
      console.error("[waitlist] submit failed", err);
      toast.error(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="glass-card glow-mixed p-8 text-center animate-fade-up">
        <div className="text-4xl mb-3">🌃</div>
        <h3 className="font-display text-2xl text-gradient-neon mb-2">Welcome to CarsNight</h3>
        <p className="text-muted-foreground">
          You're on the list. Watch your inbox — the streets are calling.
        </p>
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-base text-foreground mb-4 font-medium">
            Roll with the crew while you wait.
          </p>
          <a
            href="https://www.facebook.com/share/g/1E4Qp1dasz/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg px-6 py-3 font-display font-semibold tracking-widest uppercase text-primary-foreground"
            style={{ background: "var(--gradient-neon)" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-scan" />
            <span className="relative inline-flex items-center gap-2">
              Enter the Inner Circle →
            </span>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Where the night crew lives — exclusive builds, meets & drops.
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full bg-input/40 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-card p-6 sm:p-8 space-y-4 ${compact ? "" : "glow-mixed"}`}
    >
      <input
        className={inputCls}
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        maxLength={80}
        required
      />
      <input
        className={inputCls}
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        maxLength={255}
        required
      />
      <input
        className={inputCls}
        placeholder="Favorite car (e.g. R34 GT-R)"
        value={form.favorite_car}
        onChange={(e) => setForm({ ...form, favorite_car: e.target.value })}
        maxLength={100}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-lg px-6 py-3.5 font-display font-semibold tracking-widest uppercase text-primary-foreground disabled:opacity-60"
        style={{ background: "var(--gradient-neon)" }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-scan" />
        <span className="relative inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Joining…" : buttonLabel}
        </span>
      </button>
    </form>
  );
}
