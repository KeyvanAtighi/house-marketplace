import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

function OAuth() {
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if user exists in db
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // if !user, then create user in db
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("وارد حساب گوگل شدید");
      Navigate("/");
    } catch (error) {
      toast.error("مشکلی در ورود با گوگل وجود داشت");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-ghost bg-gray-100"
      onClick={onGoogleClick}
    >
      <FcGoogle className="text-3xl" />
    </button>
  );
}

export default OAuth;
