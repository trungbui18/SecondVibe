"use client";

import React, { useState } from "react";
import AddressSelector from "./AddressSelector";
import Swal from "sweetalert2";
interface AddressFormProps {
  onChange: (value: {
    fullAddress: string;
    fullName: string;
    phone: string;
  }) => void;
}

export default function AddressForm({ onChange }: AddressFormProps) {
  const [addressInfo, setAddressInfo] = useState({
    fullAddress: "",
    fullName: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const AddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullAddress, fullName, phone } = addressInfo;
    if (!fullName.trim() || !phone.trim() || !fullAddress.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin!",
        text: "Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ.",
      });
      return;
    }
    onChange(addressInfo);
    closeModal();
  };

  return (
    <>
      <div className="border border-gray-300 p-4 pb-8 rounded w-full bg-white">
        <h3 className="font-semibold text-lg mb-2">Address</h3>
        {addressInfo.fullAddress === "" ? (
          <button
            className="text-green-600 hover:underline"
            onClick={() => setShowModal(true)}
          >
            + Add address
          </button>
        ) : (
          <div>
            <p>
              {addressInfo.fullName} - {addressInfo.phone}
            </p>
            <p>{addressInfo.fullAddress}</p>
            <button
              className="text-green-500 underline hover:text-green-700"
              onClick={() => setShowModal(true)}
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded p-6 w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-lg text-center font-bold mb-4">
              Add new address
            </h2>

            <form className="space-y-4" onSubmit={AddNewAddress}>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm font-medium">Full name</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Nguyen Van A"
                    value={addressInfo.fullName}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-medium">Phone number</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="0123456789"
                    value={addressInfo.phone}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <AddressSelector
                onChange={(data) => {
                  if (data.fullAddress !== addressInfo.fullAddress) {
                    setAddressInfo((prev) => ({
                      ...prev,
                      fullAddress: data.fullAddress,
                    }));
                  }
                }}
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add this address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
