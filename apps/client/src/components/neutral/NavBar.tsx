import { authState } from "@repo/store";
import { Button } from "@repo/ui";
import { PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAuth } from "~/hooks/useAuth";

const NavBar = () => {
  const { user } = useRecoilValue(authState);
  const { logOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header
      className="bg-bg border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 relative top-0 w-full
"
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* LOGO WITH ICON START */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div>
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-2xl logo-text">SMARTDRAW</h1>
        </div>
        {/* LOGO WITH ICON END */}
        {/* BUTTON START */}

        <div className="flex items-center gap-4">
          {user ? (
            <Button className="bg-blueCustom" onClick={logOut}>
              Logout
            </Button>
          ) : (
            <Button
              className="bg-blueCustom"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {user ? (
            <Button
              className="bg-pinkCustom"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          ) : null}
        </div>
      </div>
      {/* BUTTON END */}
    </header>
  );
};

export default NavBar;
