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

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("City fetch error:", err));
  }, []);

  useEffect(() => {
    if (selectedCity?.code) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts))
        .catch((err) => console.error("District fetch error:", err));
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
        .then((res) => res.json())
        .then((data) => setWards(data.wards))
        .catch((err) => console.error("Ward fetch error:", err));
    } else {
      setWards([]);
    }
    setSelectedWard(null);
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const full = `${unit}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedCity.name}`;
      onChange({
        city: selectedCity.name,
        district: selectedDistrict.name,
        ward: selectedWard.name,
        fullAddress: full,
      });
    }
  }, [selectedCity, selectedDistrict, selectedWard, unit, onChange]);

  return (
    <div>
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
