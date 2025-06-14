import React from "react";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import AccountDropdown from "./AccountDropdown ";
const Header: React.FC = () => {
  const itemNav = [
    { name: "Home", href: "/" },
    { name: "Man", href: "/category/man" },
    { name: "Woman", href: "/category/woman" },
    { name: "About", href: "/category/woman" },
    { name: "Policy", href: "/about" },
    { name: "Contact", href: "/about" },
  ];

  return (
    <header className="bg-white text-black flex flex-col  space-y-2">
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-16">
          <Link href="/">
            <img src="/logoLVTN.png" alt="Carousell Logo" className="h-12" />
          </Link>
          <nav className="flex space-x-8 ">
            {itemNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl hover:text-gray-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sell button ở bên phải */}
        <div className="flex items-center  space-x-8">
          <LuShoppingCart className="text-xl" />
          <MdOutlineMessage className="text-xl" />
          <div className="flex items-center space-x-6">
            <AccountDropdown />
          </div>
          <Link href="/sell">
            <button className="w-24 h-[40px] bg-red-500 text-white rounded-md hover:bg-red-600">
              Sell
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
