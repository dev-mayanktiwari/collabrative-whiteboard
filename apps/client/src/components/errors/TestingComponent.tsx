function TestErrorComponent() {
  // This function will throw an error when the button is clicked
  const throwError = () => {
    throw new Error("This is a test error!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Test Error Boundary</h2>
      <button
        onClick={throwError}
        className="mt-4 p-2 bg-red-500 text-white font-bold"
      >
        Trigger Error
      </button>
    </div>
  );
}

export default TestErrorComponent;
