import React from "react";

export default function () {
  return (
    <div className="flex items-center justify-end mt-2 space-x-1">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-200 w-3/5 h-[40px]  text-black  p-2 rounded-md focus:outline-none"
      />
      <input
        type="text"
        placeholder="Address..."
        className="bg-gray-200 text-black w-2/5 h-[40px] p-2 rounded-md focus:outline-none"
      />
      <button className="w-24 h-[40px] bg-green-700 text-white rounded-md hover:bg-blue-600">
        Search
      </button>
    </div>
  );
}
