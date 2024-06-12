import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const ProfileDropdown = () => {
  const { user, setUserIsLogged } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('auth');
    setUserIsLogged(false);
    router.push('/');
  };

  return (
    <div className="profile-dropdown">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName ?? '')}+${encodeURIComponent(user?.lastName ?? '')}`}
        alt="Profile Picture"
        className="rounded-full w-10 h-10 cursor-pointer"
      />
      <div className="profile-dropdown-content">
        <Link href="/profile">
          Profile
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;