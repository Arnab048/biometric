import { Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const UserLogs = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [userData, setUserData] = useState([]);

  const dateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };
  console.log(selectedDate)
  const handleSearchClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/userLogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user logs:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    handleSearchClick();
  }, [selectedDate]);

  return (
    <div>
      <h1 className="text-center font-semibold text-black text-3xl mb-5 italic  ">
        HERE ARE THE USERS DAILY LOGS
      </h1>
      <div className="mb-5">
        <DatePicker
          onChange={dateChange}
          size={"large"}
          placeholder="Search by Date"
        />
        <Button
          icon={<SearchOutlined />}
          size="large"
          onClick={handleSearchClick}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr className="font-bold text-lg">
              <th>SL</th>
              <th>Name</th>
              <th>Serial</th>
              <th>Finger ID</th>
              <th>Date</th>
              <th>TimeIn</th>
              {/* <th>TimeOut</th> */}
            </tr>
          </thead>
          <tbody className="font-semibold text-black text-center">
            {/* Display fetched data */}
            {userData.map((user,index) => (
              <tr key={index+1}>
                <th>{index+1}</th>
                <th>{user.username}</th>
                <td>{user.serialnumber}</td>
                <td>{user.fingerprint_id}</td>
                <td>{user.checkindate}</td>
                <td>{user.timein}</td>
                {/* <td>{user.timeout}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLogs;
