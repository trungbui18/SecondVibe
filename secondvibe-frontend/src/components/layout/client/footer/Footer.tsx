import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold">SecondVibe</h2>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SecondVibe. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Instagram
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
