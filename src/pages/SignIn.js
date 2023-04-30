import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  // hooks
  const [showPass, setShowPass] = useState(false);
  const [showError, setShowError] = useState({ status: false, message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // destructuring for further use
  const { email, password } = formData;

  // event handling
  const onChange = (e) => {
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
        setShowError({ ...showError, status: false });
        toast.success("با موفقیت وارد حساب کاربری خود شدید!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setShowError({
        status: true,
        message: error.code.split("/")[1].replace("-", " "),
      });
    }
  };

  return (
    // container
    <div className="w-96 h-[500px] mx-auto my-20 border-2 rounded-md shadow-md p-5">
      {/* sign in/sign out header */}
      <header className="flex">
        <h1 className="font-medium text-xl">ورود</h1>
        <div className="w-[0.5px] h-6 bg-gray-800/10 mx-2"></div>
        <Link to={"/signup"} className="font-medium text-xl text-gray-800/20">
          ثبت نام
        </Link>
      </header>
      {/* sign in form */}
      <form className="form-control my-10 justify-center" onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="ایمیل"
          className="input input-bordered w-full mb-5 focus:outline-none focus:border-2 focus:border-accent"
          onChange={onChange}
        />

        <div className="flex justify-end items-center">
          <input
            id="password"
            type={showPass ? "text" : "password"}
            value={password}
            placeholder="رمز عبور"
            className="input input-bordered w-full  focus:outline-none focus:border-2 focus:border-accent"
            onChange={onChange}
          />
          <span
            className="absolute px-5 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <MdRemoveRedEye className="text-xl" />
          </span>
        </div>
        {/* error message if there is any.. */}
        {showError.status ? (
          <div className="pt-2">
            <p className="text-xs text-error">{showError.message}</p>
          </div>
        ) : null}
        {/* submit button */}
        <button type="submit" className="btn btn-accent text-white mt-10 mb-2">
          ورود به حساب کاربری
        </button>
        {/* forgot password link */}
        <Link
          to="/forgotpassword"
          className="link link-hover text-accent text-xs mx-auto"
        >
          رمز خود را فراموش کرده اید؟
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
