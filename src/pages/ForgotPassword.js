import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

// firebase
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  // hooks
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // event handling
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      if (email) {
        // TO-DO: need to check if the email in exist
        sendPasswordResetEmail(auth, email);

        toast.success("ایمیل ارسال شد");
        navigate("/signin");
      } else {
        toast.error("لطفا ایمیل را بدرستی وارد کنید!");
        setEmail("");
      }
    } catch (error) {
      toast.error("مشکلی پیش آمد، لطفا دوباره امتحان کنید");
      setEmail("");
    }
  };

  return (
    // container
    <div className="w-96 h-[500px] mx-auto my-20 border-2 rounded-md shadow-md p-5">
      {/* sign in/sign out header */}
      <header>
        <h1 className="font-medium text-xl">بازیابی رمز عبور</h1>
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

        {/* submit button */}
        <button
          type="submit"
          className="btn btn-error text-white w-max mx-auto mt-10 mb-2"
        >
          ارسال ایمیل بازیابی
        </button>
        {/* back to log-in */}
        <Link
          to="/signin"
          className="link link-hover text-error text-xs mx-auto"
        >
          رمزت یادت اومد؟
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
