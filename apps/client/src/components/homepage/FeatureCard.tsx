import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <div
      className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
      style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
    >
      <div
        className="w-16 h-16 mb-4 flex items-center justify-center border-3 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
