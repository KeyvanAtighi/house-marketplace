import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-96 h-[500px] mx-auto my-20 border-2 rounded-md shadow-md">
      <div className="p-5">
        <header className="flex items-center">
          <Link to={"/signin"} className="font-medium text-xl text-gray-800/20">
            ورود
          </Link>
          <div className="w-[0.5px] h-6 bg-gray-800/10 mx-2"></div>
          <h1 className="font-medium text-xl">ثبت نام</h1>
        </header>
        <form className="form-control my-10 justify-center" onSubmit={onSubmit}>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="نام کاربری"
            className="input input-bordered w-full mb-5 focus:outline-none focus:border-2 focus:border-accent"
            onChange={handleChange}
          />
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
            ایجاد حساب کاربری جدید
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
