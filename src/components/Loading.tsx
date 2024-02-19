import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200">
      <ClipLoader color={"white"} loading={isLoading} cssOverride={override} size={50} />
      <p className="mt-4 text-xl font-semibold text-gray-800 text-white text-center">{isLoading ? 'Loading...' : 'Loaded'}</p>
    </div>
  );
};

export default Loading;
