"use client";

import SwipeCard from "@/components/SwipeCard";
import { useState } from "react";

export default function TestCardPage() {
  const [swipeCount, setSwipeCount] = useState(0);

  const mockProfile = {
    id: "1",
    name: "Sarah Johnson",
    company: "QuickBite Burgers",
    location: "San Francisco, CA",
    industry: "Fast Food",
    description: "Proven fast-casual burger concept with 15+ years of success. Looking for expansion partners in key metropolitan areas.",
    franchiseFee: 45000,
    minInvestment: 250000,
    storeCount: 127,
    tags: ["Fast Casual", "Proven Model", "High ROI", "Training Included"]
  };

  const handleSwipe = (direction: "left" | "right", profileId: string) => {
    console.log(`Swiped ${direction} on profile ${profileId}`);
    setSwipeCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Test Swipe Card</h1>
        <p className="text-center text-gray-600 mb-8">Swipe count: {swipeCount}</p>
        
        <SwipeCard
          type="brand"
          profile={mockProfile}
          onSwipe={handleSwipe}
        />
      </div>
    </div>
  );
}
