'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <>
      {/* Replace with your analytics script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR-GA-ID');
        `}
      </Script>
    </>
  );
} 