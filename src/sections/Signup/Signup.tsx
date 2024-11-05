import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface formDataType {
  name: string;
  email: string;
  password: string;
  dob: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  // useEffect(() => {
  //   const local = localStorage.getItem(`userKey-${formData.email}`) ?? "{}"; // ashu-xyz
  //   console.log(local);
  // }, [formData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sameEmail = localStorage.getItem(`userKey-${formData.email}`);
    if (sameEmail) {
      alert("Email already exists. Please use a different email.");
      return;
    }
    try {
      const parsed = JSON.stringify(formData);
      localStorage.setItem(`userKey-${formData.email}`, parsed); // Store data
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.name);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", password: "", dob: "" }); // Clear fields
      navigate("/login");
    } catch (error) {
      console.error("Error saving to localStorage", error);
      alert("An error occurred while saving your data. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-10">
      <h1 className="mb-4 text-center text-4xl">SIGN-UP PAGE</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-[50%] flex-col justify-center gap-5"
      >
        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Your Name"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />
        <input
          onChange={handleChange}
          value={formData.email}
          type="email"
          name="email"
          placeholder="Your Email"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          placeholder="Your Password"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />
        <input
          onChange={handleChange}
          value={formData.dob}
          type="date"
          name="dob"
          placeholder="DOB"
          className="rounded bg-transparent px-4 py-2 outline-none ring-2 ring-teal-600"
          required
        />
        <button
          type="submit"
          className="rounded border-4 border-orange-500 py-2 hover:bg-orange-500 hover:text-black"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
