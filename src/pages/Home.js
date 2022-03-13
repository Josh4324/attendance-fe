import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";

export default function Home() {
  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem("attendanceId");
    history("/");
  };
  return (
    <div>
      <Header />

      <button onClick={logout} className="sign-out">
        Sign Out
      </button>
    </div>
  );
}
