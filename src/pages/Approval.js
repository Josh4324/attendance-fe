import React, { useState, useEffect } from "react";
import { http } from "../constant";
import axios from "axios";
import Header from "../components/Header";
import { NotificationManager } from "react-notifications";

export default function Approval() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${http}/api/v1/attendance/all`);
      console.log(res.data.data);
      if (res.data.code === 200) {
        let newData = res.data.data.filter((item) => item.attended !== "true");
        setData(newData);
      }
      return res.data.data;
    } catch (err) {
      return err;
    }
  };

  const app = async (id) => {
    const cred = { staff_id: id };
    const res = await axios.patch(`${http}/api/v1/attendance`, cred);
    if (res.data.code === 200) {
      getData();
      localStorage.setItem("attendanceId", res.data.data.staff_id);
      NotificationManager.success("Approved", "Success");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <table id="customers">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Location</th>
            <th>Approval</th>
          </tr>
          {data.map((item) => {
            if (item.attended !== "true") {
              return (
                <tr>
                  <td>{item.user.first_name}</td>
                  <td>{item.user.last_name}</td>
                  <td>{item.user.position}</td>
                  <td>{item.location}</td>
                  <td>
                    <button
                      onClick={() => {
                        app(item.staff_id);
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
}
