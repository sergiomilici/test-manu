import { useCallback, useContext, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'
import { withRouter } from "react-router"
import { Button, Form, Input, notification } from 'antd';
import { getTokenFromFirebase, signIn } from "../../Api";
import { setToken } from "../Auth/Session";
import { AuthContext } from '../Auth/Auth';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {currentUser} = useContext(AuthContext)

  const history = useHistory()

  const handleSignIn = useCallback(
    async ({email, password}) => {
      try {
        setIsLoading(true)
        await signIn(email, password)
        const sessionToken = await getTokenFromFirebase()
        if (!sessionToken) {
          debugger;
        }
        setToken(sessionToken)
        history.push("/restaurants")
      } catch (err) {
        notification.error({
          message: 'Error',
          description:
          err.message
        });
      } finally {
        setIsLoading(false)
      }
    },
    [history]
  );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (currentUser) {
    return <Redirect to="/restaurants" />
  }

  return (
    <div>
      <Form
        style={{
          padding: "8px",
        }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSignIn}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please provide a valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please provide a password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {!isLoading ? 'Log in' : 'Logging in'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(SignIn)
