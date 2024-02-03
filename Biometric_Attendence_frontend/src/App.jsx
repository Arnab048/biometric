import { useState } from "react";
import {
  DatabaseOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {  Layout, Menu, theme } from "antd";
import AllUser from "./component/AllUser/AllUser";
import UserLogs from "./component/AllUser/UserLogs/UserLogs";
import AddUser from "./component/ManageUser/AddUser/AddUser";
import UpdateUser from "./component/ManageUser/UpdateUser/UpdateUser";
import DeleteUser from "./component/ManageUser/DeleteUser/DeleteUser";
const {  Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("All User", "1", <UsergroupAddOutlined />),
  getItem("User Logs", "2", <DatabaseOutlined />),
  getItem('Manage User', 'sub1', <UserAddOutlined />, [
    getItem('Add User', '3'),
    getItem('Update User', '4'),
    getItem('Delete User', '5'),
  ]),
];

const AllUserContent = () => <AllUser />;
const AllUserLogsContent = () => <UserLogs />;
const AddUserContent = () => <AddUser />;
const UpdateUserContent = () => <UpdateUser />;
const DeleteUserContent = () => <DeleteUser />;

const getContentComponent = (selectedKey) => {
  switch (selectedKey) {
    case "1":
      return <AllUserContent />;
    case "2":
      return <AllUserLogsContent />;
    case "3":
      return <AddUserContent />;
    case "4":
      return <UpdateUserContent />
    case "5":
      return <DeleteUserContent />
    default:
      return null;
  }
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={items}
        />
      </Sider>
      <Layout>

        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {getContentComponent(selectedKey)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
