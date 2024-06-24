import { FaBell, FaLock } from "react-icons/fa";

const ProfileDetails: React.FC = () => (
  <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
    <h2 className="text-xl font-bold text-gray-800 mb-4">
      User Settings (not ready yet)
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center text-gray-600">
        <FaBell className="mr-2" />
        <p className="font-medium">Notifications: {"Disabled"}</p>
      </div>
      <div className="flex items-center text-gray-600">
        <FaLock className="mr-2" />
        <p className="font-medium">2FA: {"Disabled"}</p>
      </div>
    </div>
  </div>
);

export default ProfileDetails;
