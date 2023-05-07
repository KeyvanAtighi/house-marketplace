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
  // TO-DO: save prev data and set back to input values when update fails
  const [savedFormData, setSavedFormData] = useState(formData);
  const navigate = useNavigate();

  const { name, email } = formData;

  // event handlers
  const onLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  const onSubmit = async (e) => {
    setSavedFormData(formData);
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
          <h1 className="text-2xl font-semibold text-gray-500">پروفایل من</h1>
          <button
            className="btn btn-outline text-accent hover:bg-accent hover:border-accent btn-xs"
            onClick={onLogout}
          >
            خروج از حساب
          </button>
        </header>
        <main>
          <div className="card rounded-md p-5 bg-base-200">
            <form>
              <label className="label text-accent text-xs">نام کاربری</label>
              <input
                type="text"
                id="name"
                disabled={!update}
                value={name}
                className="input input-bordered input-accent w-full focus:outline-none disabled:bg-white shadow-md"
                onChange={onInputChange}
              />
              <label className="label text-accent text-xs mt-2">ایمیل</label>
              <div className="tooltip w-full" data-tip="ایمیل قابل تغییر نیست">
                <input
                  type="text"
                  id="email"
                  disabled
                  value={email}
                  className="input input-bordered input-accent w-full focus:outline-none disabled:bg-white shadow-md"
                />
              </div>
            </form>
            <div className="flex justify-end h-6  mt-6">
              {isLoading ? (
                <PulseLoader
                  color="#36d7b7"
                  loading
                  size={12}
                  speedMultiplier={0.5}
                />
              ) : (
                <button
                  className="btn btn-sm shadow-md w-max"
                  onClick={() => {
                    update && onSubmit();
                    setUpdate(!update);
                  }}
                >
                  {update ? "ذخیره تغییرات" : "تغییر"}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
