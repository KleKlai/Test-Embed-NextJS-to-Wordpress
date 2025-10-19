"use client";

import { useState } from "react";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    try {
      const res = await fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();

      if (!data.available) {
        setError("Could not load availability");
      } else {
        alert(`✅ Available for ${guests} guest(s) from ${checkIn} to ${checkOut}`);
      }
    } catch {
      setError("Could not load availability");
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">CHECK IN</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">CHECK OUT</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">GUESTS</label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full border rounded-md p-2"
          >
            {[1, 2, 3, 4, 5].map((g) => (
              <option key={g} value={g}>
                {g} {g === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
      >
        Search Stays
      </button>
    </div>
  );
}
