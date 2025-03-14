import { Button } from "@repo/ui";

const CTA = () => {
  return (
    <section className="relative z-10 px-6 py-16 bg-[#FFFAE0]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-6">
          Ready to transform your creative process?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of teams already using Smart Draw to bring their ideas
          to life.
        </p>
        <Button className="text-lg font-bold border-3 border-black bg-[#FF7DA6] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          Get Started for Free
        </Button>
      </div>
    </section>
  );
};

export default CTA;
