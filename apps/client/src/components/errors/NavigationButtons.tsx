import { Button } from "@repo/ui";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  const buttonStyles = {
    home: "bg-blue-200 hover:bg-blue-300",
    dashboard: "bg-pink-300 hover:bg-pink-400",
  };

  const navigationButtons = [
    {
      icon: Home,
      text: "Back to Home",
      onClick: () => navigate("/"),
      style: buttonStyles.home,
    },
    {
      icon: ArrowLeft,
      text: "Go to Dashboard",
      onClick: () => navigate("/dashboard"),
      style: buttonStyles.dashboard,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      {navigationButtons.map((btn, index) => (
        <Button
          key={index}
          onClick={btn.onClick}
          className={`
              font-bold border-3 border-black 
              ${btn.style} 
              shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
              hover:translate-y-1 
              hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              transition-all
            `}
        >
          <btn.icon className="h-5 w-5 mr-2" />
          {btn.text}
        </Button>
      ))}
    </div>
  );
};

export default NavigationButtons;
