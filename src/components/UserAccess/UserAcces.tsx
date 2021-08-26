import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function UserAccess() {
    const callback = (key) => {
        console.log(key);
    };

    return (
        <Tabs
            style={{
                borderRadius: "5px",
                border: "1px solid #eee",
                width: "500px",
                margin: "auto",
                marginTop: "15px",
                padding: "5px",
            }}
            defaultActiveKey="1"
            onChange={callback}
        >
            <TabPane tab="Sign In" key="1">
                <SignInForm />
            </TabPane>
            <TabPane tab="Create an account" key="2">
                <SignUpForm />
            </TabPane>
        </Tabs>
    );
}

export default UserAccess;
