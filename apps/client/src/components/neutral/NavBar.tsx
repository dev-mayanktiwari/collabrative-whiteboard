import { Button } from "@repo/ui";
import { PenTool } from "lucide-react";

const NavBar = () => {
  return (
    <header
      className="bg-bg border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
"
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* LOGO WITH ICON START */}
        <div className="flex items-center gap-2">
          <div>
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-2xl logo-text">SMARTDRAW</h1>
        </div>
        {/* LOGO WITH ICON END */}
        {/* BUTTON START */}
        <div className="flex items-center gap-4">
          <Button className="bg-blueCustom">Login</Button>
          <Button className="bg-pinkCustom">Register</Button>
        </div>
      </div>
      {/* BUTTON END */}
    </header>
  );
};

export default NavBar;
