import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // Get the user's name from LocalStorage
      const storedUserName = localStorage.getItem("userName"); // Retrieve user's name
      if (storedUserName) {
        setUserName(storedUserName); // Set the user's name to state
      }
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <p className="text-center text-2xl text-green-600">
          Welcome, {userName}!
        </p>
      ) : (
        <p className="text-center text-2xl text-red-600">
          You're not logged in.
        </p>
      )}

      <div className="mx-auto flex h-lvh w-[50%] flex-col justify-center gap-5">
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
