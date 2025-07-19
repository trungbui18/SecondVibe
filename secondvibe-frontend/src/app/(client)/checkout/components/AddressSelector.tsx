"use client";

import React, { useEffect, useState } from "react";

interface AddressSelectorProps {
  onChange: (address: {
    city: string;
    district: string;
    ward: string;
    fullAddress: string;
  }) => void;
}

export default function AddressSelector({ onChange }: AddressSelectorProps) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [unit, setUnit] = useState("");

  // Error states
  const [hasError, setHasError] = useState(false);
  const [manualAddress, setManualAddress] = useState({
    city: "",
    district: "",
    ward: "",
  });

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((err) => {
        console.error("City fetch error:", err);
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedCity?.code) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch districts");
          }
          return res.json();
        })
        .then((data) => setDistricts(data.districts))
        .catch((err) => {
          console.error("District fetch error:", err);
          setHasError(true);
        });
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict?.code) {
      fetch(
        `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch wards");
          }
          return res.json();
        })
        .then((data) => setWards(data.wards))
        .catch((err) => {
          console.error("Ward fetch error:", err);
          setHasError(true);
        });
    } else {
      setWards([]);
    }
    setSelectedWard(null);
  }, [selectedDistrict]);

  useEffect(() => {
    if (hasError) {
      // Use manual address when there's an error
      if (manualAddress.city && manualAddress.district && manualAddress.ward) {
        const full = `${unit}, ${manualAddress.ward}, ${manualAddress.district}, ${manualAddress.city}`;
        onChange({
          city: manualAddress.city,
          district: manualAddress.district,
          ward: manualAddress.ward,
          fullAddress: full,
        });
      }
    } else if (selectedCity && selectedDistrict && selectedWard) {
      // Use API data when no error
      const full = `${unit}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedCity.name}`;
      onChange({
        city: selectedCity.name,
        district: selectedDistrict.name,
        ward: selectedWard.name,
        fullAddress: full,
      });
    }
  }, [
    selectedCity,
    selectedDistrict,
    selectedWard,
    unit,
    onChange,
    hasError,
    manualAddress,
  ]);

  return (
    <div>
      {hasError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm font-medium">
              Không thể tải dữ liệu địa chỉ. Vui lòng nhập thủ công.
            </span>
          </div>
        </div>
      )}

      {hasError ? (
        // Manual input when API fails
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Tỉnh / Thành phố</label>
              <input
                type="text"
                placeholder="Ví dụ: Hà Nội, TP.HCM"
                value={manualAddress.city}
                onChange={(e) =>
                  setManualAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Quận / Huyện</label>
              <input
                type="text"
                placeholder="Ví dụ: Ba Đình, Quận 1"
                value={manualAddress.district}
                onChange={(e) =>
                  setManualAddress((prev) => ({
                    ...prev,
                    district: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Phường / Xã</label>
              <input
                type="text"
                placeholder="Ví dụ: Phúc Xá, Bến Nghé"
                value={manualAddress.ward}
                onChange={(e) =>
                  setManualAddress((prev) => ({
                    ...prev,
                    ward: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>
        </div>
      ) : (
        // Normal select dropdowns when API works
        <div className="flex gap-4 mt-4">
          {/* Tỉnh / Thành phố */}
          <div className="flex-1">
            <label className="text-sm font-medium">Tỉnh / Thành</label>
            <select
              value={selectedCity?.code || ""}
              required
              onChange={(e) => {
                const cityCode = parseInt(e.target.value, 10);
                const city = cities.find((c: any) => c.code === cityCode);
                setSelectedCity(city);
              }}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Chọn tỉnh/thành</option>
              {cities.map((city: any) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quận / Huyện */}
          <div className="flex-1">
            <label className="text-sm font-medium">Quận / Huyện</label>
            <select
              value={selectedDistrict?.code || ""}
              required
              onChange={(e) => {
                const districtCode = parseInt(e.target.value, 10);
                const district = districts.find(
                  (d: any) => d.code === districtCode
                );
                setSelectedDistrict(district);
              }}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district: any) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phường / Xã */}
          <div className="flex-1">
            <label className="text-sm font-medium">Phường / Xã</label>
            <select
              value={selectedWard?.code || ""}
              required
              onChange={(e) => {
                const wardCode = parseInt(e.target.value, 10);
                const ward = wards.find((w: any) => w.code === wardCode);
                setSelectedWard(ward);
              }}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward: any) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium">Unit / Building</label>
        <input
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="Tầng 3, tòa A1"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
