const NotFoundTitle = () => (
  <div className="mb-8 text-center">
    <h2 className="text-[150px] font-black leading-none tracking-tighter">
      {["4", "0", "4"].map((digit, index) => (
        <span
          key={index}
          className={`inline-block transform ${
            index === 0
              ? "-rotate-6 text-pink-300"
              : index === 1
                ? "rotate-6 text-blue-200"
                : "-rotate-3 text-yellow-300"
          } drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
        >
          {digit}
        </span>
      ))}
    </h2>

    <h3 className="text-4xl font-black mt-4 mb-2">
      <span className="bg-white px-4 py-2 border-4 border-black inline-block transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        Page Not Found
      </span>
    </h3>

    <p className="text-xl mt-6 mb-8 max-w-lg mx-auto">
      Oops! Looks like this canvas doesn't exist. Try drawing something new or
      head back to your dashboard.
    </p>
  </div>
);

export default NotFoundTitle;