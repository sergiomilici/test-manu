import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import fb from "../../firebaseConfig";
import { Button, Dropdown, Menu, Skeleton } from 'antd';
import { AuthContext } from "../Auth/Auth";
import { removeToken } from '../Auth/Session';
import { ControlOutlined, DownOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";


const NavBar = () => {

  const history = useHistory();
  const handleLogOut = async () => {
    removeToken();
    await fb.auth().signOut();
    history.push('/signin')
  }

  const handleAdminRedirect = () => {
    history.push('/admin')
  }

  const {isAdmin, currentUser} = useContext(AuthContext)

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogOut} key="1" icon={<PoweroffOutlined />}>
        Log out
      </Menu.Item>
      {isAdmin &&
      <Menu.Item onClick={handleAdminRedirect} key="2" icon={<ControlOutlined />}>
        Admin dashboard
      </Menu.Item>
      }
    </Menu>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #eee',
        marginBottom: '30px',
      }}
    >
      {!currentUser &&
      <Skeleton.Button style={{width: '200px',}} active={true} size="default" shape="round" />}

      {currentUser && <Dropdown overlay={menu}>
        <Button style={{display: 'flex', alignItems: 'center', fontSize: '19px',}}>
          <UserOutlined />
          {`Welcome, ${currentUser?.displayName}`}
          <DownOutlined />
        </Button>
      </Dropdown>}

    </div>

  )
}

export default NavBar
