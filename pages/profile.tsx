import { User } from "@/types/User";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import EditProfileForm from "./components/EditProfileForm";
import UserStatistics from "./components/UserStatistics";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data: User = await response.json();
        console.log("ProfilePage - fetched user:", data); // Log des données utilisateur
        setUser(data);
      } catch (error: any) {
        console.error("ProfilePage - error fetching user:", error); // Log de l'erreur
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => Math.min(prevProgress + 10, 100));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <Loading progress={loadingProgress} />;
  }

  if (!user) {
    return (
      <main className="container mx-auto p-4">
        <div className="mt-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </main>
    );
  }

  console.log("ProfilePage - job offers:", user.JobOffer); // Log des offres d'emploi de l'utilisateur

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <ProfileHeader
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt.toString(), // Convertir en chaîne de caractères
          }}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        {!isEditing ? (
          <>
            <ProfileDetails />
            <UserStatistics jobOffers={user.JobOffer || []} /> {/* Passer un tableau vide par défaut */}
          </>
        ) : (
          <EditProfileForm user={user} setUser={setUser} setIsEditing={setIsEditing} />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
