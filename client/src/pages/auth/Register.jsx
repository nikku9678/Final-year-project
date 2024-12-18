import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../config/config";
import {toast} from 'react-hot-toast'
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/u/register`, formData);
      setMessage(data.message);
      // dispatch(login(data.user)); 
      toast.success("Register Successfully");
      // Dispatch login action after successful registration
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 bg-gray-50">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Register
        </Typography>
        {/* <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
          Create your account by filling in the details below.
        </Typography> */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          {/* Full Name */}
          <div className="mb-6">
            <label htmlFor="fullname">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Full Name
              </Typography>
            </label>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              color="gray"
              size="lg"
              placeholder="John Doe"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Username
              </Typography>
            </label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              color="gray"
              size="lg"
              placeholder="john123"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Email
              </Typography>
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              color="gray"
              size="lg"
              type="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility} className="cursor-pointer">
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size="lg"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              type={passwordShown ? "text" : "password"}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              required
            />
          </div>

          {/* Submit Button */}
          <Button color="gray" size="lg" className="mt-6" type="submit" fullWidth>
            Register
          </Button>

          {message && (
            <Typography
              variant="small"
              color="red"
              className="mt-4 text-center font-medium"
            >
              {message}
            </Typography>
          )}

          {/* Already have an account */}
          <Typography
            variant="small"
            color="gray"
            className="!mt-6 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900 hover:underline">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default Register;
