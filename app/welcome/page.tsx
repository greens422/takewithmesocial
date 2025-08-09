"use client";

import Image from "next/image";
import { useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { theme } from "../theme/theme";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function guard() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) router.replace("/");
    }
    guard();
    return () => {
      mounted = false;
    };
  }, [router]);

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
          <h1 className="font-primary text-3xl sm:text-5xl md:text-6xl text-black mb-3 sm:mb-4">We can’t wait to meet you</h1>
          <p className="font-primary text-lg sm:text-xl md:text-2xl text-black/80 mb-6 sm:mb-8">Thanks for signing in. Your journey with tAke starts soon.</p>
          <p className="font-primary text-base sm:text-lg md:text-xl text-black">— The tAke Team</p>
        </div>
      </div>
    </div>
  );
}


