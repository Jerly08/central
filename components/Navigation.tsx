import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterNavigation = () => {
    router.push("/auth/register");
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="bg-gray-500 text-white p-2 rounded transition duration-500 ease-in-out transform hover:scale-110"
        >
          ☰
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <button
              onClick={handleRegisterNavigation}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-500 ease-in-out transform hover:scale-110"
            >
              Create New Account
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-500 ease-in-out transform hover:scale-110"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;