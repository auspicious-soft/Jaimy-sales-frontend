'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LocationOption {
  id: string;
  label: string;
}

const locations: LocationOption[] = [
  { id: 'uk', label: 'UK' },
  { id: 'nl', label: 'Netherlands' },
  { id: 'be', label: 'Belgium' },
];

export default function LocationSelectorPage() {
  const [location, setLocation] = useState('uk');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <Image
            src="/assets/reset.png" // replace with your asset
            alt="Location"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Title */}
        <p className="text-white text-3xl font-extrabold font-['Minork_Sans_'] leading-10">
          Where am I working today?
        </p>

        {/* Select */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-pink-500"
        >
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          className="w-full bg-pink-600 hover:bg-pink-500 transition text-white py-2 rounded-md text-sm font-medium"
          onClick={() => console.log('Selected location:', location)}
        >
          Select
        </button>
      </div>
    </div>
  );
}
