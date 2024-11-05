import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface loginType {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<loginType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getUserInfo =
      localStorage.getItem(`userKey-${inputData.email}`) ?? "{}";

    if (!getUserInfo || getUserInfo == "{}") {
      alert("wrong data");
      return;
    }
    const ParseInfo = JSON.parse(getUserInfo);
    if (ParseInfo.password === inputData.password) {
      
      localStorage.setItem("isLoggedIn", "true");

      alert("Congratulation you become a pro dev...");
      setInputData({ email: "", password: "" });
      
      navigate("/");
    } else {
      alert("Try again!!");
    }
  };

  return (
    <div className="mt-10">
      <h1 className="mb-4 text-center text-4xl">LOG-IN PAGE</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-[50%] flex-col justify-center gap-5"
      >
        <input
          onChange={handleChange}
          value={inputData.email}
          type="email"
          name="email"
          placeholder="Your Email"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />
        <input
          onChange={handleChange}
          value={inputData.password}
          type="password"
          name="password"
          placeholder="Your Password"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />

        <button
          type="submit"
          className="rounded border-4 border-orange-500 py-2 hover:bg-orange-500 hover:text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
