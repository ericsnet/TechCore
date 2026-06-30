"use client";
import { Star } from "lucide-react";

export default function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star <= Math.ceil(rating) && rating % 1 >= 0.3;
        return (
          <Star
            key={star}
            className={`${sizeClass} ${
              filled
                ? "text-amber-400 fill-amber-400"
                : half
                ? "text-amber-400 fill-amber-200"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        );
      })}
    </div>
  );
}
