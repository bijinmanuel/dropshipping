'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Segment Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#FAFAFC]">
      <div className="max-w-md mx-auto space-y-4">
        <span className="text-5xl font-extrabold text-[#FF4D00] block font-heading">Oops</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-heading">
          Something went wrong
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          We encountered an unexpected issue while loading this page. Please try refreshing or return home.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-gray-200 bg-white text-gray-800 hover:border-black text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

