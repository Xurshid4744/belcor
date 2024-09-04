import config from "@/config";
import { useSelector } from "@/store/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogin) {
      navigate(config.home_url, { replace: true });
    }
  }, [isLogin]);

  return children;
};

export default GuestGuard;
