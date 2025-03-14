export default function ShapesDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left square */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFE156] border-4 border-black rounded-md transform rotate-12"></div>

      {/* Bottom right circle */}
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#A0D2EB] border-4 border-black rounded-full"></div>

      {/* Middle right triangle */}
      <div className="absolute top-1/3 -right-16 w-32 h-32 bg-[#FF90B3] border-4 border-black transform rotate-45"></div>

      {/* Top right small circle */}
      <div className="absolute top-24 right-24 w-16 h-16 bg-[#B8E0D2] border-3 border-black rounded-full"></div>

      {/* Bottom left small square */}
      <div className="absolute bottom-32 left-10 w-20 h-20 bg-[#FFE156] border-3 border-black transform -rotate-12"></div>

      {/* Middle left small circle */}
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#FF90B3] border-2 border-black rounded-full"></div>
    </div>
  );
}
