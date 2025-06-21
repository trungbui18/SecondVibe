"use client";

interface userProps {
  id: number;
  fullName: string;
  address: string;
  avatar: string;
  joined: string;
}
export default function ProfileHeader({ user }: { user: userProps }) {
  return (
    <div className="relative -mt-12 mx-4 md:mx-20 bg-white border-gray-400 shadow-md rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-20 w-20 rounded-full border border-black object-contain"
        />
        <div className="ml-4">
          <p className="text-xl font-bold">{user.fullName}</p>
          <p className="text-sm text-black">Profile details &gt;</p>
        </div>
      </div>

      <div className="flex items-center gap-8 text-sm text-black">
        <div>
          <p className="font-semibold">N/A</p>
          <p>No review yet</p>
        </div>
        <div>
          <p className="font-semibold">{user.joined}</p>
          <p>Joined</p>
        </div>
        <button className="px-4 py-1 border border-black rounded hover:bg-white hover:text-red-600 transition">
          Follow
        </button>
        <button className="p-2 rounded hover:bg-neutral-800">⋮</button>
      </div>
    </div>
  );
}
