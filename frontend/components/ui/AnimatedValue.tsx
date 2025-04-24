"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedValueProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedValue({
  value,
  duration = 1000,
  decimals = 2,
  prefix = "",
  suffix = "",
  className,
}: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = displayValue;
    const valueChange = value - startValue;
    
    setIsAnimating(true);

    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      const currentValue = startValue + valueChange * easeOutQuart;
      setDisplayValue(currentValue);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    animationFrame = requestAnimationFrame(animateValue);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <span className={cn("relative inline-block", isAnimating && "text-primary", className)}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}