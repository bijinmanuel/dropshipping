'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root Global Error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFC] p-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <span className="text-5xl font-extrabold text-[#FF4D00] block">500</span>
          <h2 className="text-2xl font-bold text-gray-950">Application Error</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            A critical application error occurred. Click below to reload the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-[#FF4D00] transition-colors shadow-md"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

