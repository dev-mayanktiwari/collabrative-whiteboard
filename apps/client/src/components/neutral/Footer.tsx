import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 px-6 py-8 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <PenTool className="h-6 w-6" />
          <span className="font-bold">SMART DRAW</span>
        </div>
        <div className="flex gap-6">
          <Link to="#" className="font-medium hover:underline">
            Features
          </Link>
          <Link to="#" className="font-medium hover:underline">
            Pricing
          </Link>
          <Link to="#" className="font-medium hover:underline">
            Blog
          </Link>
          <Link to="#" className="font-medium hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
