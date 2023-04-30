import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-96 h-[500px] mx-auto my-20 border-2 rounded-md shadow-md">
      <div className="p-5">
        <header className="flex">
          <h1 className="font-medium text-xl">ورود</h1>
          <div className="w-[0.5px] h-6 bg-gray-800/10 mx-2"></div>
          <Link to={"/signup"} className="font-medium text-xl text-gray-800/20">
            ثبت نام
          </Link>
        </header>
        <form className="form-control my-10 justify-center" onSubmit={onSubmit}>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="ایمیل"
            className="input input-bordered w-full mb-5 focus:outline-none focus:border-2 focus:border-accent"
            onChange={handleChange}
          />

          <div className="flex justify-end items-center">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={password}
              placeholder="رمز عبور"
              className="input input-bordered w-full  focus:outline-none focus:border-2 focus:border-accent"
              onChange={handleChange}
            />
            <span
              className="absolute px-5 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              <MdRemoveRedEye className="text-xl" />
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-accent text-white mt-10 mb-2"
          >
            ورود به حساب کاربری
          </button>
          <Link
            to="/forgotpassword"
            className="link link-hover text-accent text-xs mx-auto"
          >
            رمز خود را فراموش کرده اید؟
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
