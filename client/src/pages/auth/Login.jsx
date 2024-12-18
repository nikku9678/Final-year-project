import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import { BASE_URL } from "../../config/config.js";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/u/login`, formData, {
        withCredentials: true,
      });
      setMessage(data.message);
      dispatch(login(data.user));
      console.log(data)
      localStorage.setItem("token",JSON.stringify(data.token));
      toast.success('Login Success');
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div className="border-2">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Placement
        </Typography>
        {/* <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography> */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email or Username
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="text"
              name="login"
              placeholder="name@mail.com"
              value={formData.login}
              onChange={handleChange}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              required
            />
          </div>
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
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              required
            />
          </div>
          <Button
            color="gray"
            size="lg"
            className="mt-6"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
          {message && (
            <Typography color="red" className="text-center mt-4">
              {message}
            </Typography>
          )}
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Sign in with Google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link to="/register" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;
