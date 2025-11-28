"use client";

import SwipeInterface from "@/components/SwipeInterface";

export default function TestSwipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Test Swipe Interface</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Investor View (seeing brands)</h2>
          <SwipeInterface userType="investor" />
        </div>
      </div>
    </div>
  );
}
