import { message, Form, Input, Select, TimePicker } from "antd";
import Lottie from "lottie-react";
import addUser from "../../../assets/addUser.json";

const { Option } = Select;
const UserDetail = ({ updateUserData }) => {
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

  const onFinish = (values) => {
    if (updateUserData) {
      updateUserData(values);
    }
  };
  //   console.log(userData)
  return (
    <div className="mt-20">
      <div className="flex mb-20 items-center justify-evenly">
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
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "serial"]}
          label="Serial Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="timePicker" label="TimeIn">
          <TimePicker />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <button onClick={() => message.success("Form submit complete!")} className="btn btn-primary text-white" type="submit" >
            Submit
          </button>
        </Form.Item>
      </Form>
      <Lottie
        animationData={addUser}
        loop={true}
        style={{ width: "400px", height: "auto" }}
      />
      </div>
    </div>
  );
};

export default UserDetail;
