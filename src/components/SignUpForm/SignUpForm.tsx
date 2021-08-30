import { Button, Form, Input, notification } from "antd";
import { registerUser } from "../../Api";
import { useState } from 'react';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      setIsLoading(true)
      await registerUser(values.email, values.password, values.displayName)
      form.resetFields();
      notification.success({
        message: 'Congratulations!',
        description:
          'Account successfully created. Please sign in.'
      });
    } catch (err) {
      notification.error({
        message: 'Error',
        description:
        err.message
      });
    } finally {
      setIsLoading(false)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Display Name"
          name="displayName"
          initialValue={""}
          rules={[
            {
              required: true,
              type: "string",
              message: "Please provide a name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          initialValue={""}
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
          initialValue={""}
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
            {!isLoading ? 'Sign Up' : 'Loading'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
