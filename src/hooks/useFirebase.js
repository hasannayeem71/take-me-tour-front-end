import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuth from "../Firebase/firebase.init";

initializeAuth();
const useFirebase = () => {
  const [user, SetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();
  //google pop up login
  const signInUsingGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  //user logout
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  ///observer
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUser(user);
      } else {
        SetUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  return {
    signInUsingGoogle,
    logOut,
    user,
    isLoading,
    setIsLoading,
  };
};
export default useFirebase;
