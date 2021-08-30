import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Tabs } from "antd";
import styled from 'styled-components';

const WelcomeBar = styled.div`
  padding: 12px;
  text-align: center;
  border-bottom:1px solid #eee;
  font-size:18px;
`

const { TabPane } = Tabs;

function UserAccess() {

    return (
        <>
            <WelcomeBar
            >Welcome!</WelcomeBar>
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
            >
                <TabPane tab="Sign In" key="1">
                    <SignInForm />
                </TabPane>
                <TabPane tab="Create an account" key="2">
                    <SignUpForm />
                </TabPane>
            </Tabs>
        </>
    );
}

export default UserAccess;
