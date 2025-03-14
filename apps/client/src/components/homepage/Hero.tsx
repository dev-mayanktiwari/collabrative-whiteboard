import { Button } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import CanvasPreview from "./CanvasPreview";

const Hero = () => {
  return (
    <div className="bg-bg mx-auto pt-16 pb-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black logo-text leading-tight mb-5">
            <span className="bg-blueCustom px-2 py-2 inline-block rotate-[-1deg] transform -skew-x-1">
              Draw Smarter
            </span>
            <br />
            <span className="bg-pinkCustom mt-2 px-2 py-2 inline-block rotate-[1deg] transform -skew-x-1">
              Create Together
            </span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-lg">
            The AI-powered collaborative whiteboard platform for teams that want
            to sketch, brainstorm, and create together with the help of
            artificial intelligence.
          </p>
          <Button className="group text-xl p-5">
            <div className="flex items-center gap-2">
              Start Drawing
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </div>
        <div className="flex-1 w-full md:w-auto mt-8 md:mt-0">
          <CanvasPreview />
        </div>
      </div>
    </div>
  );
};

export default Hero;
