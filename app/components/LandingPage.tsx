
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

const LandingPage = () => {
  const tRef = useRef(null);
  const takeRef = useRef(null);
  const questionRef = useRef(null);
  const waitlistRef = useRef(null);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animation for "t."
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
        setTimeout(typeTake, 200);
      }
    };
    setTimeout(typeTake, 6000);

    #// Animation for "We can't wait to hear it"
    #gsap.fromTo(
    #  questionRef.current,
    #  { opacity: 0, y: 30 },
    #  { opacity: 1, y: 0, duration: 1.5, delay: 8.5, ease: 'power4.out' }
    # );

    // Animation for "Sign up for our waitlist"
    gsap.fromTo(
      waitlistRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 10, ease: 'power4.out' }
    );

    // Animation for the form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 11, ease: 'power4.out' }
    );
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
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
          `,
          mixBlendMode: 'multiply'
        }}
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
          <div
            ref={takeRef}
            className="font-primary text-7xl text-black"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          />
          <div
            ref={questionRef}
            className="font-secondary text-5xl mt-6 text-black"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            We can't wait to hear it
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
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white bg-opacity-25 border-2 border-black border-opacity-40 rounded-xl px-6 py-3 text-black placeholder-black placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 ease-in-out shadow-lg"
            />
            <button className="mt-6 w-full bg-white text-black rounded-xl px-8 py-3 font-bold text-lg hover:bg-opacity-90 transition-colors duration-300 ease-in-out shadow-xl transform hover:scale-105">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
