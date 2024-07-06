import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const [isLogin, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post("/api/v1/user/login", {
          email,
          password,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          message.success(res.data.msg);
          navigate("/");
        } else {
          message.error(res.data.msg);
        }
      } catch (error) {
        message.error(error.response.data.msg);
      }
    } else {
      try {
        const res = await axios.post("/api/v1/user/register", {
          name,
          username,
          email,
          password,
        });

        if (res.data.success) {
          setLogin(true);
          message.success(res.data.msg);
        } else {
          message.success(res.data.msg);
        }
      } catch (error) {
        message.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex justify-evenly w-[80%]">
        <div className="w-[60%]">
          <img color="white" width={"80%"} src="logo.webp" alt="twitter-logo" />
        </div>

        <div>
          <div>
            <h1 className="text-6xl font-bold ml-5 p-2 text-white">
              Happening Now
            </h1>
          </div>
          <h1 className="text-3xl font-bold mt-4  ml-5 text-white">
            {isLogin ? "Login" : "Singin"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col m-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="font-semibold my-1 py-2 px-4 border outline-blue-100 border-gray-200 text-lg rounded-full"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="font-semibold my-1 py-2 px-4 border outline-blue-100 border-gray-200 text-lg rounded-full"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="font-semibold my-1 py-2 px-4 border outline-blue-100 border-gray-200 text-lg rounded-full"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="font-semibold my-1 py-2 px-4 border outline-blue-100 border-gray-200 text-lg rounded-full"
            />
            <button className="bg-[#1D9BF0] mt-4 py-3 rounded-full font-semibold text-2xl text-white hover:bg-[#2b4f69]  ">
              {isLogin ? "Login" : "Create Account"}
            </button>

            <h1 className="mt-4 ml-5 text-lg text-gray-200">
              {isLogin ? " Don't have an account?" : "Already have an account?"}

              <span
                onClick={() => {
                  setLogin(!isLogin);
                }}
                className="font-bold m-1 cursor-pointer text-blue-700  "
              >
                {isLogin ? "Singin" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
