"use client";

import React from "react";
import { InlineWidget } from "react-calendly";
import { LandingNav } from "@/components/landingnav";

export default function BookDemo() {
  return (
    <main className="flex flex-col min-h-screen ">
      <LandingNav />
      <div className="container mx-auto pt-24 px-4 flex-1">
        <div className="calendly-container w-full max-w-4xl mx-auto" style={{ height: "900px" }}>
          <InlineWidget 
            url="https://calendly.com/admin-autovuln/30min" 
            styles={{ height: '900px' }}
            pageSettings={{
              backgroundColor: '121212',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '#00a2ff',
              textColor: '#ffffff'
            }}
          />
        </div>
      </div>
    </main>
  );
} 
