import React from "react";
import { FaUndo, FaLock, FaShieldAlt } from "react-icons/fa";

export default function InforSeller() {
  return (
    <div className="w-full space-y-6">
      {/* Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold">
          Buy
        </button>
        <button className="w-full border border-gray-400 py-2 rounded font-semibold">
          Add to Cart
        </button>
      </div>

      {/* Returns and Refunds */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <FaUndo className="text-gray-600" />
          Returns and refunds
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Get a 100% refund if the item is not like what you saw on the listing.
        </p>
      </div>

      {/* Risk-Free Payment */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <FaLock className="text-gray-600" />
          Risk-free payment
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            className="h-5"
            alt="Visa"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            className="h-5"
            alt="MasterCard"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Amex_logo.svg"
            className="h-5"
            alt="Amex"
          />
          <img
            src="https://seeklogo.com/images/D/dbs-logo-009B1688C2-seeklogo.com.png"
            className="h-5"
            alt="DBS"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/10/PayNow_Logo.png"
            className="h-5"
            alt="PayNow"
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          We only release your payment to the seller after you receive the item.{" "}
          <a href="#" className="text-green-600 underline">
            Learn more
          </a>
        </p>
      </div>

      {/* Safety Policy */}
      <div>
        <div className="flex items-center gap-2 font-semibold">
          <FaShieldAlt className="text-gray-600" />
          Safety policy
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Do not pay the seller directly before receiving the item. If you're
          dealing via delivery, always pay with the 'Buy' button.
        </p>
      </div>
    </div>
  );
}
