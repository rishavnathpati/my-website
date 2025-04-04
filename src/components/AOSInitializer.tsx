'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInitializer = () => {
  useEffect(() => {
    // Initialize AOS with all animations disabled
    AOS.init({
      // Core settings - simplified
      duration: 0, // No animation duration
      easing: 'linear',
      once: true,
      offset: 0,
      
      // Disable all animations
      disable: true, // Always disabled
      
      // No throttling needed since animations are disabled
      throttleDelay: 0,
      
      // Simplified configuration
      startEvent: 'DOMContentLoaded',
      mirror: false,
      
      // Disable observer for better performance
      disableMutationObserver: true,
    });
    
    // No need for scroll handlers since animations are disabled
  }, []);

  return null;
};