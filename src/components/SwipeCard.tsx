"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface SwipeCardProps {
  type: "brand" | "investor";
  profile: {
    id: string;
    name: string;
    company: string;
    location: string;
    industry: string;
    description: string;
    image?: string;
    budget?: number;
    franchiseFee?: number;
    minInvestment?: number;
    storeCount?: number;
    experience?: string;
    tags: string[];
  };
  onSwipe: (direction: "left" | "right", profileId: string) => void;
}

export default function SwipeCard({ type, profile, onSwipe }: SwipeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleSwipe = async (direction: "left" | "right") => {
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // Animation delay
    setTimeout(() => {
      onSwipe(direction, profile.id);
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
const getFallbackImage = () => {
  if (type === "brand") {
    return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop";
     } else {
      return "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop";
       }
       };
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Card 
         className={`overflow-hidden shadow-lg border-0 p-0 gap-0 transform transition-all duration-300 ${
          isAnimating
            ? swipeDirection === "left" 
              ? "-translate-x-full rotate-12 opacity-0"
              : "translate-x-full -rotate-12 opacity-0"
            : "translate-x-0 rotate-0 opacity-100"
        }`}
      >
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
  <img
  src={profile.image || getFallbackImage()}
   alt={`${profile.company} - ${type === "brand" ? "Franchise brand headquarters" : "Business investor profile"}`}
    className="w-full h-full object-cover"
     onError={(e) => {
       const target = e.target as HTMLImageElement;
        target.src = `https://placehold.co/800x600/3b82f6/ffffff?text=${encodeURIComponent(profile.company)}`;
        }}
/>
    alt={`${profile.company} - ${type === "brand" ? "Franchise brand" : "Investor"}`}

          <div className="absolute top-4 left-4">
            <Badge variant={type === "brand" ? "default" : "secondary"} className="bg-white/90 text-gray-900">
              {type === "brand" ? "Franchise Brand" : "Investor"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-blue-600 font-medium">{profile.company}</p>
            <p className="text-sm text-gray-500">{profile.location} • {profile.industry}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {type === "brand" ? (
              <>
                {profile.franchiseFee && (
                  <div>
                    <span className="text-gray-500 block">Phí chuyển nhượng</span>
                    <span className="font-semibold">{formatCurrency(profile.franchiseFee)}</span>
                  </div>
                )}
                {profile.minInvestment && (
                  <div>
                    <span className="text-gray-500 block">Chi phí đầu tư tối thiểu</span>
                    <span className="font-semibold">{formatCurrency(profile.minInvestment)}</span>
                  </div>
                )}
                {profile.storeCount && (
                  <div>
                    <span className="text-gray-500 block">Các cửa hàng</span>
                    <span className="font-semibold">{profile.storeCount}+</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {profile.budget && (
                  <div>
                    <span className="text-gray-500 block">Danh sách đầu tư</span>
                    <span className="font-semibold">{formatCurrency(profile.budget)}</span>
                  </div>
                )}
                {profile.experience && (
                  <div>
                    <span className="text-gray-500 block">Kinh nghiệm</span>
                    <span className="font-semibold">{profile.experience}</span>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{profile.description}</p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-center space-x-4 pt-2">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={() => handleSwipe("left")}
              disabled={isAnimating}
            >
              <span className="text-2xl">✕</span>
            </Button>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleSwipe("right")}
              disabled={isAnimating}
            >
              <span className="text-2xl">❤</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}