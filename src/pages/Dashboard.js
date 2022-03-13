import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { http } from "../constant";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${http}/api/v1/attendance/all`);
      console.log(res.data.data);
      if (res.data.code === 200) {
        let newData = res.data.data.filter((item) => item.attended === "true");
        setData(newData);
      }
      return res.data.data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div>
      <Header />
      <div>
        {data.length > 0 ? (
          <table id="customers">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Location</th>
            </tr>
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.user.first_name}</td>
                  <td>{item.user.last_name}</td>
                  <td>{item.user.position}</td>
                  <td>{item.location}</td>
                </tr>
              );
            })}
          </table>
        ) : null}
      </div>
    </div>
  );
}
