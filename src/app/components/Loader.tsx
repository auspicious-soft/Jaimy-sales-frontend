'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-zinc-700 border-t-pink-500 animate-spin" />

        {/* Text */}
        <p className="text-sm text-zinc-300">Loading...</p>
      </div>
    </div>
  );
}
