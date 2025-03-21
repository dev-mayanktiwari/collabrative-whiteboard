import { Search } from "lucide-react";
import { Input } from "@repo/ui";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="text"
        placeholder="Search boards..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-12 border-2 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
      />
    </div>
  );
}