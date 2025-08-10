"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { theme } from "../theme/theme";

export default function WelcomePage() {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    let redirected = false;
    async function guard() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) return;

      // Wait briefly for session hydration, then decide
      const timer = setTimeout(async () => {
        if (!mounted || redirected) return;
        const { data: retry } = await supabase.auth.getSession();
        if (!retry.session && !redirected) {
          redirected = true;
          router.replace("/");
        }
      }, 400);

      // Also listen for auth events during this window
      const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
        if (!mounted || redirected) return;
        if (session) {
          clearTimeout(timer);
        }
      });

      return () => {
        clearTimeout(timer);
        sub.subscription.unsubscribe();
      };
    }
    const cleanupPromise = guard();
    return () => {
      mounted = false;
      // best-effort cleanup if guard returned a cleanup function
      if (typeof cleanupPromise === 'function') {
        try { (cleanupPromise as unknown as () => void)(); } catch {}
      }
    };
  }, [router]);

  // Load whether the user already created a profile
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!mounted) return;
      const uid = sessionData.session?.user?.id;
      if (!uid) {
        setHasProfile(null);
        return;
      }
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("user_id", uid)
        .maybeSingle();
      if (!mounted) return;
      setHasProfile(!!profile);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-dvh w-full relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Main gradient background (same style as LandingPage) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(135deg, ${theme.colors.red.light} 0%, ${theme.colors.orange.light} 25%, ${theme.colors.yellow.light} 50%, ${theme.colors.green.light} 75%, ${theme.colors.blue.light} 100%)`,
            `linear-gradient(135deg, ${theme.colors.pink.light} 0%, ${theme.colors.red.light} 25%, ${theme.colors.orange.light} 50%, ${theme.colors.yellow.light} 75%, ${theme.colors.green.light} 100%)`,
            `linear-gradient(135deg, ${theme.colors.blue.light} 0%, ${theme.colors.pink.light} 25%, ${theme.colors.red.light} 50%, ${theme.colors.orange.light} 75%, ${theme.colors.yellow.light} 100%)`,
            `linear-gradient(135deg, ${theme.colors.green.light} 0%, ${theme.colors.blue.light} 25%, ${theme.colors.pink.light} 50%, ${theme.colors.red.light} 75%, ${theme.colors.orange.light} 100%)`,
            `linear-gradient(135deg, ${theme.colors.yellow.light} 0%, ${theme.colors.green.light} 25%, ${theme.colors.blue.light} 50%, ${theme.colors.pink.light} 75%, ${theme.colors.red.light} 100%)`,
          ],
        }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Realistic grain texture */}
      <motion.div
        className="absolute inset-0 opacity-30 hidden sm:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
        whileHover={{ scale: 1.03, transition: { duration: 0.5 } }}
      />

      {/* Additional fine grain */}
      <div
        className="absolute inset-0 opacity-20 hidden sm:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='1' result='noise' seed='2'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-10 hidden sm:block"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0,0,0,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
          backgroundSize: "100px 100px, 150px 150px, 80px 80px",
        }}
      />

      {/* Particle system */}
      <div className="hidden sm:block">
        <Particles
          id="tsparticles-welcome"
          options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            collisions: { enable: true },
            move: { direction: "none", enable: true, outMode: "bounce", random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { random: true, value: 3 },
          },
          detectRetina: true,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-dvh flex items-center justify-center">
        <div className="mx-4 sm:mx-6 max-w-xl sm:max-w-2xl w-full bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-center border-2 border-black/30">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image src="/logo.svg" alt="tAke logo" width={64} height={64} className="sm:w-[80px] sm:h-[80px]" />
          </div>
          <h1 className="font-primary text-3xl sm:text-5xl md:text-6xl text-black mb-3 sm:mb-4">Welcome to tAke</h1>
          <p className="font-primary text-lg sm:text-xl md:text-2xl text-black/80 mb-6 sm:mb-2">You’re signed in.</p>

          <div className="mt-8">
            {hasProfile === null && (
              <button
                disabled
                className="w-full sm:w-auto bg-black/60 text-white rounded-xl px-6 py-3 font-bold text-base sm:text-lg shadow-lg cursor-wait"
              >
                Loading…
              </button>
            )}
            {hasProfile === false && (
              <button
                onClick={() => router.push('/profile-setup')}
                className="w-full sm:w-auto bg-black text-white rounded-xl px-6 py-3 font-bold text-base sm:text-lg hover:bg-opacity-90 transition-colors duration-300 ease-in-out shadow-lg"
              >
                Pre‑make your profile
              </button>
            )}
            {hasProfile === true && (
              <div className="w-full sm:w-auto rounded-xl px-6 py-3 font-bold text-base sm:text-lg bg-white/80 text-black border-2 border-black/20 inline-block shadow-lg">
                Thank you for creating your profile — keep an eye out for updates!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


