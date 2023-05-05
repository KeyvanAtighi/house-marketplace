import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

// firebase
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profile() {
  const auth = getAuth();

  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [savedFormData, setSavedFormData] = useState(formData);
  const navigate = useNavigate();

  const { name, email } = formData;

  // event handlers
  const onLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (auth.currentUser.displayName !== name) {
        // update name in auth
        await updateProfile(auth.currentUser, { displayName: name });

        // update name in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success("تغییرات ثبت شد");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.code);
    }
  };

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="p-5">
        <header className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">پروفایل من</h1>
          <button
            className="btn btn-outline text-accent hover:bg-accent hover:border-accent btn-xs"
            onClick={onLogout}
          >
            خروج از حساب
          </button>
        </header>
        <main>
          <div className="card border-2 rounded-md shadow-md p-5">
            <div className="flex justify-end h-6 transition-all duration-500">
              {isLoading ? (
                <PulseLoader
                  color="#36d7b7"
                  loading
                  size={12}
                  speedMultiplier={0.5}
                />
              ) : (
                <button
                  className="btn btn-outline btn-xs w-max transition-all duration-500"
                  onClick={() => {
                    update && onSubmit();
                    setUpdate(!update);
                  }}
                >
                  {update ? "ذخیره تغییرات" : "تغییر"}
                </button>
              )}
            </div>
            <form>
              <label className="label text-accent text-xs">نام کاربری</label>
              <input
                type="text"
                id="name"
                disabled={!update}
                value={name}
                className="input input-bordered input-accent w-full focus:outline-none disabled:bg-white"
                onChange={onInputChange}
              />
              <div className="divider"></div>
              <label className="label text-accent text-xs">ایمیل</label>
              <div
                className="tooltip tooltip-error w-full"
                data-tip="ایمیل قابل تغییر نیست"
              >
                <input
                  type="text"
                  id="email"
                  disabled
                  value={email}
                  className="input input-bordered input-accent w-full focus:outline-none disabled:bg-white "
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
