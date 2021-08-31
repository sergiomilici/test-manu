import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import fb from "../../firebaseConfig";
import { Menu, Dropdown, Button, Skeleton } from 'antd';
import { AuthContext } from "../Auth/Auth";
import { setToken } from '../Auth/Session';
import { PoweroffOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";


const NavBar = () => {

    const history = useHistory();
    const handleLogOut = () => {
        fb.auth().signOut();
        setToken("")
        history.push('/signin')
    }

    const { currentUser } = useContext(AuthContext)

    const menu = (
        <Menu onClick={handleLogOut}>
            <Menu.Item key="1" icon={<PoweroffOutlined />}>
                Log out
            </Menu.Item>
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
            {!currentUser && <Skeleton.Button style={{ width: '200px', }} active={true} size="default" shape="round" />}

            {currentUser && <Dropdown overlay={menu}>
                <Button style={{ display: 'flex', alignItems: 'center', fontSize: '19px', }}>
                    <UserOutlined />
                    {`Welcome, ${currentUser?.displayName}`}
                    <DownOutlined />
                </Button>
            </Dropdown>}

        </div>

    )
}

export default NavBar