import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FAFAFC] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-5">
        <span className="text-7xl font-extrabold text-[#FF4D00] block font-heading">404</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-heading">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          The product or category you are looking for may have been moved or is temporarily unavailable.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-full bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/shop"
            className="px-7 py-3.5 rounded-full border border-gray-200 bg-white text-gray-800 hover:border-black text-xs font-bold transition-all shadow-xs"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
