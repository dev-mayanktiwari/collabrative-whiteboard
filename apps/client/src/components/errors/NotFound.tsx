import BackgroundBlobs from "../neutral/BackgroundBlobs";
import NavBar from "../neutral/NavBar";
import NotFoundTitle from "./Content404";
import NavigationButtons from "./NavigationButtons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg relative">
      <BackgroundBlobs />
      <NavBar />
      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <NotFoundTitle />
          <NavigationButtons />
        </div>
      </main>
    </div>
  );
}
