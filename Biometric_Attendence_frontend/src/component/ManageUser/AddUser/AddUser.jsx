import dayjs from "dayjs";
import { useState } from "react";
import { message, Steps, theme } from "antd";
import UserDetail from "./UserDetail";
import FingerPrintData from "./FingerPrintData";

const AddUser = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [userData, setUserData] = useState({});
  const [fingerStatus, setFingerStatus] = useState(0);

  // Function to update userData state in AddUser component
  const updateUserData = (data) => {
    setUserData(data);
  };

  const updateFingerData = (data) => {
    setFingerStatus(data);
  };

  const steps = [
    {
      title: "User Data",
      content: <UserDetail updateUserData={updateUserData} />,
    },
    {
      title: "Fingerprint Data",
      content: <FingerPrintData updateFingerData={updateFingerData} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleSubmit = async () => {
    try {
      const formattedTime = userData.timePicker
        ? dayjs(userData.timePicker).format("hh:mm:ss A")
        : "";
        const formattedDate = userData.timePicker
        ? dayjs(userData.timePicker).format("YYYY-MM-DD")
        : "";      

      const requestData = {
        username: userData.user.name,
        serialnumber: userData.user.serial,
        gender: userData.gender,
        fingerprint_id: parseInt(userData.user.ID),
        fingerprint_select: parseInt(fingerStatus),
        email: userData.user.email,
        timein: formattedTime,
        regDate: formattedDate
      };
      console.log(requestData);
      const response = await fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message);
      } else {
        message.error("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
      message.error("Internal Server Error");
    }
  };

  return (
    <>
      <Steps
        current={current}
        items={steps.map((item) => ({ key: item.title, title: item.title }))}
      />
      <div
        style={{
          lineHeight: "260px",
          textAlign: "center",
          color: token.colorTextTertiary,
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px dashed ${token.colorBorder}`,
          marginTop: 16,
        }}
      >
        {steps[current].content}
      </div>
      <div className="flex justify-end" style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <button className="btn btn-primary text-white" onClick={() => next()}>
            Next
          </button>
        )}
        {current === steps.length - 1 && (
          <button className="btn btn-primary text-white" onClick={handleSubmit}>
            Done
          </button>
        )}
        {current > 0 && (
          <button
            style={{ margin: "0 8px" }}
            className="btn btn-primary text-white"
            onClick={() => prev()}
          >
            Previous
          </button>
        )}
      </div>
    </>
  );
};

export default AddUser;
