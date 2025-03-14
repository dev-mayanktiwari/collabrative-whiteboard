import FeatureCard from "./FeatureCard";
import { Maximize2, Sparkles, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="relative z-10 px-6 py-16 bg-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center">
          <span className="bg-[#B8E0D2] px-3 py-1 inline-block transform -rotate-1">
            Powerful Features
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="AI Drawing Assistant"
            description="Transform rough sketches into polished artwork with our AI assistant. Generate images from text prompts directly on your canvas."
            color="#FFE156"
          />

          <FeatureCard
            icon={<Maximize2 className="h-8 w-8" />}
            title="Infinite Canvas"
            description="Never run out of space. Zoom, pan, and organize your ideas on our limitless digital whiteboard."
            color="#A0D2EB"
          />

          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Live Collaboration"
            description="Work together in real-time with your team. See changes instantly as they happen."
            color="#FF90B3"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
