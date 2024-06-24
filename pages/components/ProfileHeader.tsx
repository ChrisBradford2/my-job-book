import React from 'react';
import { User } from '@/types/User';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaCalendar, FaEdit } from 'react-icons/fa';

interface ProfileHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
  };
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isEditing, setIsEditing }) => {
  if (!user) {
    return null; // Or render a loading state
  }

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-between mb-4">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0 md:mr-4">
        <Image
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName)}+${encodeURIComponent(user.lastName)}`}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full md:mr-4 md:mb-0 mb-4 md:order-first"
        />
        <div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaUser className="mr-2" />
            <p className="font-medium">
              Name: {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaEnvelope className="mr-2" />
            <p className="font-medium">Email: {user.email}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendar className="mr-2" />
            <p className="font-medium">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      ) : (
        <div>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
