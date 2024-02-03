import { message, Form, Input } from "antd";
import Lottie from "lottie-react";
import deleteUser from "../../../assets/delete.json";

const DeleteUser = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 19,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = async (values) => {
    const { ID } = values.user;

    try {
      const response = await fetch(`http://localhost:5000/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: parseInt(ID),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
      } else {
        const errorData = await response.json();
        message.error(`Failed to delete user: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete user");
    }
  };
  return (
    <div className="mt-10">
        <h1 className="text-center font-semibold text-black text-3xl mb-5 italic">DELETE USER HERE</h1>
      <div className="flex items-center justify-evenly">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 1000,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "ID"]}
            label="ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "name"]} label="Name">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <button className="btn btn-primary  text-white" type="submit">
              Delete
            </button>
          </Form.Item>
        </Form>
        <Lottie
          animationData={deleteUser}
          loop={true}
          style={{ width: "auto", height: "300px" }}
        />
      </div>
    </div>
  );
};

export default DeleteUser;
