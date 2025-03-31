export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gray-50 dark:bg-neutral-900 py-6 text-center text-sm text-gray-600 dark:text-neutral-400">
      <div className="container mx-auto px-4">
        <div className="copyright">
          © Copyright {currentYear} <strong><span>Rishav Nath Pati</span></strong>. All Rights Reserved.
        </div>
        <div className="credits mt-1">
          {/* Optional: Add credits or links here if desired */}
        </div>
      </div>
    </footer>
  );
} 