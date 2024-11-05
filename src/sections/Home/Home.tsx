import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if user info exists in localStorage
    const email = localStorage.getItem("currentUser"); // assuming you save current user's email as 'currentUser'
    if (email) {
      const userData = localStorage.getItem(`userKey-${email}`);
      if (userData) {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(parsedData.name); // assuming the saved user data has a 'name' field
      }
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <p className="text-center text-2xl text-green-600">Welcome - {userName}</p>
      ) : (
        <p className="text-center text-2xl text-red-600">You're not logged in</p>
      )}

      <div className="mx-auto flex h-screen w-[50%] flex-col justify-center gap-5">
        <NavLink
          to="/signup"
          className="mb-4 border py-5 text-center text-4xl underline hover:text-[#220080]"
        >
          SIGN-UP PAGE
        </NavLink>
        <NavLink
          to="/login"
          className="mb-4 border py-5 text-center text-4xl underline hover:text-[#220080]"
        >
          LOGIN PAGE
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
