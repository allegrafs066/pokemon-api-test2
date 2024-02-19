import React, { useState, useEffect } from "react";

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true); // Default to true to show loading initially

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Simulate loading completion after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Clear timeout to avoid memory leaks
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200">
      {isLoading && (
        <div className="w-32 h-32 animate-spin rounded-full border-8 border-black border-t-0" aria-label="Loading"></div>
      )}
      <p className="mt-4 text-xl font-semibold text-gray-800">{isLoading ? 'Loading...' : 'Loaded'}</p>
    </div>
  );
};

