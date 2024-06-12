import { User } from "@/types/User";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  FaBell,
  FaCalendar,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import { FaCog, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data: User = await response.json();
        setUser(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const updateLoadingProgress = () => {
      const interval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + 10);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    };

    fetchUser();
    updateLoadingProgress();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Loading progress={loadingProgress} />;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user ? (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row items-center w-full justify-between mb-4">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0 md:mr-4">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.firstName ?? ""
                )}+${encodeURIComponent(user?.lastName ?? "")}`}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full md:mr-4 md:mb-0 mb-4 md:order-first"
                priority
              />
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaUser className="mr-2" />
                  <p className="font-medium">
                    Name: {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaEnvelope className="mr-2" />
                  <p className="font-medium">Email: {user?.email}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendar className="mr-2" />
                  <p className="font-medium">
                    Joined: {new Date(user?.createdAt).toLocaleDateString()}
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
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {!isEditing && (
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
          )}
          {isEditing && (
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  />
                </label>
              </div>
              {error && <div className="mb-4 text-red-500">{error}</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
