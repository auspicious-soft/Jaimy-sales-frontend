
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { updateAdminDetails } from '@/services/admin-services';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface LocationOption {
  id: string;
  label: string;
  countryCode: string;
}

const locations: LocationOption[] = [
  { id: 'uk', label: 'UK', countryCode: 'UK' },
  { id: 'nl', label: 'Netherlands', countryCode: 'NL' },
  { id: 'be', label: 'Belgium', countryCode: 'BE' },
];

export default function LocationSelectorPage() {
  const [location, setLocation] = useState('uk');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const USER_ID = session?.data?.user?.id; // coming from auth ideally

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const selectedCountry = locations.find(l => l.id === location);

      if (!selectedCountry) return;

      const res = await updateAdminDetails('/api/app/details', {
        country: selectedCountry?.countryCode,
        _id: USER_ID,
      });

      if (res.status !== 200) {
        throw new Error('Failed to update location');
      }

      toast.success('Location updated successfully');
      router.push('/authority/home');

    } catch (err) {
      console.error(err);
      alert('Something went wrong while updating location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <div className="w-full max-w-md text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <Image
            src="/assets/reset.png"
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
          onClick={handleSubmit}
          disabled={loading}
          className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500 disabled:opacity-60 transition text-white py-2 rounded-md text-sm font-medium"
        >
          {loading ? 'Saving...' : 'Select'}
        </button>
      </div>
    </div>
  );
}
