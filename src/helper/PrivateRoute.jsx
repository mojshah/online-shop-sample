import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../atom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useRecoilValue(auth);
  const message = () => {
    if (!isLogin) {
      toast.warning("ابتدا وارد حساب کاربری خود شوید");
    }
  };

  useEffect(() => {
    message();
  }, []);

  return isLogin ? children : <Navigate to="/home" />;
};
export default PrivateRoute;
