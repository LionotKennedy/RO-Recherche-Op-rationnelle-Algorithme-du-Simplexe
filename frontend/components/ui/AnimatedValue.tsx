// "use client";

// import React, { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";

// interface AnimatedValueProps {
//   value: number;
//   duration?: number;
//   decimals?: number;
//   prefix?: string;
//   suffix?: string;
//   className?: string;
// }

// export function AnimatedValue({
//   value,
//   duration = 1000,
//   decimals = 2,
//   prefix = "",
//   suffix = "",
//   className,
// }: AnimatedValueProps) {
//   const [displayValue, setDisplayValue] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     let startTime: number;
//     let animationFrame: number;
//     const startValue = displayValue;
//     const valueChange = value - startValue;
    
//     setIsAnimating(true);

//     const animateValue = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / duration, 1);
      
//       // Easing function for smoother animation
//       const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
//       const currentValue = startValue + valueChange * easeOutQuart;
//       setDisplayValue(currentValue);

//       if (percentage < 1) {
//         animationFrame = requestAnimationFrame(animateValue);
//       } else {
//         setDisplayValue(value);
//         setIsAnimating(false);
//       }
//     };

//     animationFrame = requestAnimationFrame(animateValue);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [value, duration]);

//   return (
//     <span className={cn("relative inline-block", isAnimating && "text-primary", className)}>
//       {prefix}
//       {displayValue.toFixed(decimals)}
//       {suffix}
//     </span>
//   );
// }
























"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedValueProps {
  value: number | undefined | null
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

export function AnimatedValue({ value, prefix = "", suffix = "", duration = 1.5, decimals = 2 }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0)

  // Gérer les valeurs undefined/null
  const safeValue = typeof value === "number" && !isNaN(value) ? value : 0

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = safeValue * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [safeValue, duration])

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
  )
}
