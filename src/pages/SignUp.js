import React, { useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { http } from "../constant";

export default function SignUp() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const staffRef = useRef();
  const roleRef = useRef();
  const positionRef = useRef();
  const dateRef = useRef();
  const formRef = useRef();

  const register = async (evt) => {
    evt.preventDefault();
    try {
      const cred = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        staff_id: staffRef.current.value,
        role: roleRef.current.value,
        position: positionRef.current.value,
        start_date: dateRef.current.value,
      };
      console.log(cred);
      const res = await axios.post(`${http}/api/v1/user/signup`, cred);
      console.log(res.data.code);
      if (res.data.code === 201) {
        NotificationManager.success("User registered succesfully", "Success");
        formRef.reset();
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={register} className="signup-form">
        <input
          className="signup-input"
          type="text"
          placeholder="First Name"
          ref={firstNameRef}
          required
        />

        <div>
          <input
            className="signup-input"
            type="text"
            placeholder="Last Name"
            required
            ref={lastNameRef}
          />
        </div>

        <div>
          <input
            className="signup-input"
            type="text"
            placeholder="Staff ID"
            required
            ref={staffRef}
          />
        </div>

        <div>
          <input
            className="signup-input"
            type="text"
            placeholder="Role"
            required
            ref={roleRef}
          />
        </div>

        <div>
          <input
            className="signup-input"
            type="text"
            placeholder="Postion"
            required
            ref={positionRef}
          />
        </div>

        <div>
          <input
            className="signup-input"
            type="date"
            placeholder="Start Date"
            required
            ref={dateRef}
          />
        </div>

        <button className="submit">Submit</button>
      </form>
    </div>
  );
}
