
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';
import Particles from 'react-tsparticles';
import supabase from "../lib/supabaseClient";

const LandingPage = () => {
  const tRef = useRef(null);
  const takeRef = useRef(null);
  const questionRef = useRef(null);
  const waitlistRef = useRef(null);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Mouse-following animation for "t."
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(tRef.current, {
        x: (e.clientX - window.innerWidth / 2) / 20, // Reduced sensitivity
        y: (e.clientY - window.innerHeight / 2) / 20, // Reduced sensitivity
        rotation: -5 + (e.clientX - window.innerWidth / 2) / 50, // Subtle rotation
        ease: 'power2.out',
        duration: 0.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial animation for "t."
    tl.fromTo(
      tRef.current,
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 2.5, ease: 'power4.inOut' }
    )
      .to(containerRef.current, { backgroundColor: '#ffffff', duration: 0.1, ease: 'power2.inOut' })
      .to(containerRef.current, { backgroundColor: 'transparent', duration: 0.5, ease: 'power2.inOut' })
      .to(tRef.current, {
        color: '#4a4a4a',
        duration: 1.5,
        ease: 'power3.inOut',
        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4)',
      })
      .to(tRef.current, {
        top: '4rem',
        duration: 2,
        ease: 'elastic.out(1, 0.75)',
      });

    // Typing animation for "Interested in sharing your taKe?"
    const takeText = "Interested in sharing your taKe?";
    let takeIndex = 0;
    const typeTake = () => {
      if (takeIndex < takeText.length) {
        if (takeRef.current) {
          (takeRef.current as HTMLElement).textContent += takeText.charAt(takeIndex);
        }
        takeIndex++;
        setTimeout(typeTake, 150); // Faster typing
      }
    };
    setTimeout(typeTake, 5000); // Start typing a bit earlier

    // Animation for " "
    gsap.fromTo(
      questionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 10, ease: 'power4.out' }
    );

    // Animation for "Sign up for our waitlist"
    gsap.fromTo(
      waitlistRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 11, ease: 'power4.out' }
    );

    // Animation for the form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 12, ease: 'power4.out' }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden p-8"
    >
      {/* Main gradient background */}
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
        transition={{
          duration: 40, // Slower background animation
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
      
      {/* Realistic grain texture */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
          `,
          mixBlendMode: 'multiply'
        }}
        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
      />

      {/* Additional fine grain */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='1' result='noise' seed='2'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' opacity='0.4'/%3E%3C/svg%3E")
          `,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Subtle paper texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0,0,0,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          backgroundSize: '100px 100px, 150px 150px, 80px 80px'
        }}
      />
      
      {/* Particle system */}
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div
          ref={tRef}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-9xl font-bold"
          style={{ color: 'transparent' }}
        >
          t.
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <motion.div
            ref={takeRef}
            className="font-primary text-7xl text-black text-center"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <motion.span
              initial={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, opacity: 0.8, transition: { duration: 0.3 } }}
            >
            </motion.span>
          </motion.div>
          <div
            ref={questionRef}
            className="font-secondary text-5xl mt-6 text-black"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            {" ".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 10 + index * 0.05, duration: 0.5, ease: 'easeInOut' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-8">
          <div
            ref={waitlistRef}
            className="font-pixel text-4xl mb-6 text-black"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            Sign up for our waitlist
          </div>
          <div ref={formRef} className="flex flex-col items-center w-full max-w-md">
            <motion.button 
              className="w-full bg-white text-black rounded-xl px-8 py-3 font-bold text-lg hover:bg-opacity-90 transition-colors duration-300 ease-in-out shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 12, duration: 1, ease: 'easeInOut' }}
              onClick={async () => {
                const baseUrl =
                  process.env.NEXT_PUBLIC_SITE_URL ??
                  (typeof window !== 'undefined' ? window.location.origin : '');
                const currentPath =
                  typeof window !== 'undefined'
                    ? window.location.pathname + window.location.search + window.location.hash
                    : '/';
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    // Redirect back to the site root; our global handler will exchange the code
                    // and, if `next` matches the current location, it will stay on the same page.
                    redirectTo: `${baseUrl}/?next=${encodeURIComponent(currentPath || '/')}`,
                    queryParams: { access_type: "offline", prompt: "consent" },
                  },
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.083 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.083 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.973 35.091 27.149 36 24 36c-5.202 0-9.619-3.317-11.276-7.953l-6.542 5.036C9.483 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.096 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"/></svg>
              Continue with Google
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
