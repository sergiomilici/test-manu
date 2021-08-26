import { useCallback } from "react";
import { withRouter } from "react-router"
import { useHistory } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import { signIn } from "../../Api";

const SignIn = () => {

  const history = useHistory()

  const handleSignIn = useCallback(
    async ({ email, password }) => {
      try {
        await signIn(email, password)
        history.push("/helloworld")
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


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
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(SignIn)
