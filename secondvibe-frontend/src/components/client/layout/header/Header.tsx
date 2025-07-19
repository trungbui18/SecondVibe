"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import AccountDropdown from "./AccountDropdown ";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { getCart } from "@/services/cart";
import { setCartCount } from "@/lib/redux/slice/cartSelectedSlice";
import { getAllCartDetail } from "@/services/cartDetail";

const Header: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const cartCount = useSelector((state: RootState) => state.cartCount);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const itemNav = [
    { name: "Home", href: "/" },
    { name: "Man", href: "/categories/man" },
    { name: "Woman", href: "/categories/woman" },
    { name: "About", href: "/categories/woman" },
    { name: "Policy", href: "/about" },
    { name: "Contact", href: "/about" },
  ];

  useEffect(() => {
    async function fetchCartDetail() {
      if (!user?.id) {
        dispatch(setCartCount(0));
        return;
      }
      try {
        const res = await getAllCartDetail(user.id);
      } catch (error) {
        dispatch(setCartCount(0));
      }
    }
    fetchCartDetail();
  }, [dispatch, user]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & not at top
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toSell = () => {
    router.push("/sell");
  };

  const toCart = () => {
    router.push("/cart");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white text-black flex flex-col space-y-2 shadow-md transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-16">
          <Link
            href="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <img src="/logoLVTN.png" alt="Carousell Logo" className="h-12" />
          </Link>
          <nav className="flex space-x-8">
            {itemNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl hover:text-gray-500 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sell button ở bên phải */}
        <div className="flex items-center space-x-8">
          <div className="relative">
            <LuShoppingCart
              className="text-xl cursor-pointer hover:text-red-500 transition-colors duration-200"
              onClick={toCart}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </div>
          <MdOutlineMessage className="text-xl cursor-pointer hover:text-red-500 transition-colors duration-200" />
          <div className="flex items-center space-x-6">
            <AccountDropdown />
          </div>
          <button
            onClick={toSell}
            className="w-24 h-[40px] bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Sell
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
