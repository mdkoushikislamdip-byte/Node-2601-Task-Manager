import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useLoginMutation } from "../services/api";



const Login = ( {onSubmit} ) => {
  const navigate = useNavigate()
      const [ loginUser ] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Validate form
  const validate = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }

    if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    return newErrors;
  };

  // Handle submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = {};

  if (!formData.email) {
    validationErrors.email = "Email is required";
  }

  if (!formData.password) {
    validationErrors.password = "Password is required";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  try {
    const res = await loginUser(formData);

    if (res.error) {
      const field = res?.error?.data?.field;
      const message = res?.error?.data?.message;

      if (field === "email") {
        return setErrors({ email: message });
      }

      if (field === "password") {
        return setErrors({ password: message });
      }

      return setErrors({
        general: message || "Login failed",
      });
    }

    setTimeout(() => {
      navigate("/");
    }, 500);

  } catch (error) {
    console.log(error);
    setErrors({
      general: "Something went wrong",
    });
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white flex flex-col p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log In
        </h2>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange ("email")}
          placeholder="Enter your email"
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange ("password")}
          placeholder="Enter your password"
          error={errors.password}
        />

        <Button type="submit" fullWidth>
          Login
        </Button>
        <p className="mt-5 m-auto">Don't have an account? <Link className="text-blue-600" to="/registration">Registration</Link></p>
      </form>
    </div>
  );
};

export default Login;