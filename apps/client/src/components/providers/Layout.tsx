import { ReactNode } from "react";
import NavBar from "../neutral/NavBar"; // Adjust the path as needed
import Footer from "../neutral/Footer"; // Adjust the path as needed

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <NavBar areButtonNeeded={true} />

      {/* Main content (grows to fill space) */}
      <main className="flex-grow">{children}</main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
