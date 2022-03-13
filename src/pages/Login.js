import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { http } from "../constant";
import { useNavigate } from "react-router";

export default function Login() {
  const staffRef = useRef();
  const history = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("attendanceId");
    if (check) {
      history("/home");
    }
  }, []);

  const clockIn = async (evt) => {
    evt.preventDefault();
    setLoader(true);
    try {
      const cred = {
        staff_id: staffRef.current.value,
      };
      const cred1 = {
        date: new Date(),
        attended: "pending",
        time: "12:00",
        location: "office",
        staff_id: "1",
      };
      const res = await axios.post(`${http}/api/v1/user/login`, cred);
      console.log(res.data.data);
      if (res.data.code === 200) {
        const res = await axios.post(`${http}/api/v1/attendance`, cred1);
        if (res.data.code === 201) {
          setLoader(false);
          localStorage.setItem("attendanceId", res.data.data.staff_id);
          NotificationManager.success(
            "User clocked In Successfullly",
            "Success"
          );
          history("/home");
        }
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <Header />
      <div>
        <form className="signup-form">
          <div>
            <input
              className="signup-input"
              type="text"
              placeholder="Staff ID"
              required
              ref={staffRef}
            />
            <div className={loader === true ? "loader" : "none"}></div>
          </div>

          <button onClick={clockIn} className="submit">
            Clock In
          </button>
        </form>
      </div>
    </div>
  );
}
