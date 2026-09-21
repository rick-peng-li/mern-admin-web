import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/auth/actions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return <></>;
};
export default Logout;
