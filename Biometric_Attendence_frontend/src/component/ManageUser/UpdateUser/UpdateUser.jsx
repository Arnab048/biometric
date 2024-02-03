import { message, Form, Input, Select } from "antd";
import Lottie from "lottie-react";
import updateUser from "../../../assets/updateUser.json";
const { Option } = Select;
const UpdateUser = () => {
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
    const { ID, name, email, gender } = values.user;
    try {
      const response = await fetch(`http://localhost:5000/updateUser/${ID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          gender,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
      } else {
        const errorData = await response.json();
        message.error(`Failed to update user details: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update user details");
    }
  };
  return (
    <div className="mt-10">
    <h1 className="text-center font-semibold text-black text-3xl mb-5 italic">UPDATE USER HERE</h1>
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
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <button className="btn btn-primary text-white" type="submit">
              Update
            </button>
          </Form.Item>
        </Form>
        <Lottie
          animationData={updateUser}
          loop={true}
          style={{ width: "auto", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default UpdateUser;
