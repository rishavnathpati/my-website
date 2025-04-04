'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInitializer = () => {
  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      // Core settings
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,          // Only animate once
      offset: 100,         // Trigger animations a bit later
      
      // Disable animations on mobile for better performance
      disable: 'mobile',
      
      // Throttle scroll events
      throttleDelay: 99,   // Delay between scroll events
      
      // Only animate if the scroll delta is significant
      startEvent: 'DOMContentLoaded',
      mirror: false,       // Don't mirror animations when scrolling up
      
      // Disable animation if user prefers reduced motion
      disableMutationObserver: false,
      
      // Custom animation settings
      anchorPlacement: 'top-bottom', // Trigger when element's top hits bottom of viewport
    });

    // Add a scroll velocity check
    let lastScrollTop = 0;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const now = Date.now();
      const timeDiff = now - lastScrollTime;
      const scrollDiff = Math.abs(scrollTop - lastScrollTop);
      
      // Only refresh animations if scroll is significant (fast scroll)
      if (scrollDiff > 100 && timeDiff > 50) {
        AOS.refresh();
        lastScrollTop = scrollTop;
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};