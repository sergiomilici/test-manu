import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import fb from "../../firebaseConfig";
import { Button } from 'antd';
import { AuthContext } from "../Auth/Auth";
import { PoweroffOutlined } from "@ant-design/icons";


const NavBar = () => {

    const history = useHistory();
    const logOut = () => {
        fb.auth().signOut();
        history.push('/signin')
    }

    const { currentUser } = useContext(AuthContext)

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
            <span style={{ fontSize: '18px' }}>{`Welcome, ${currentUser?.displayName}`}</span>
            <Button
                type="primary"
                danger
                icon={<PoweroffOutlined />}
                onClick={logOut}
            >
                Log Out
            </Button>
        </div>

    )
}

export default NavBar