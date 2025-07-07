"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedValueProps {
  value: number | undefined | null;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export function AnimatedValue({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  decimals = 2,
}: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Gérer les valeurs undefined/null
  const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = safeValue * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [safeValue, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="tabular-nums"
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
