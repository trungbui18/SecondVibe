import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
