import { Alert, Form, FormInstance, Input, Modal, Select } from 'antd';
import { User } from '../User';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Role } from '../../../../functions/src/auth/role';
import { pathUser } from '../../../Api';

interface ISetUserModalProps {
  isModalOpen: boolean;
  user: User;
  onClose: () => void;
  onUserEdited: (user: User) => void;
}

interface FormValues {
  displayName: string;
  role: Role;
}

export const SetUserModal = ({user, isModalOpen, onClose, onUserEdited}: ISetUserModalProps) => {
  const formRef = useRef<FormInstance<FormValues> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinishFailed = () => {
    console.log('onFinishFailed: ')
  }

  const onFinish = async () => {
    if (!formRef.current) {
      return;
    }
    try {
      setIsLoading(true);
      const errors = formRef.current.getFieldError('displayName');
      if (errors?.length) {
        setErrorMessage('Please complete all fields');
        return;
      }
      setErrorMessage('');
      const fieldsValue = formRef.current.getFieldsValue();
      console.log(formRef.current.getFieldsValue())

      const updatedUser = {
        ...user,
        ...fieldsValue
      }
      await pathUser(updatedUser)
      onUserEdited(updatedUser);
    } catch (e) {
      console.error(e)
      setErrorMessage('Something went wrong. Please try again')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    formRef.current?.resetFields()
  }, [user])

  const initialValues: FormValues | undefined = useMemo(() => {
    if (!user) {
      return undefined;
    }
    return {
      displayName: user.displayName,
      role: user.role as Role,
    }
  }, [user])

  return (
    <Modal title="Basic Modal" visible={isModalOpen} onOk={onFinish} onCancel={onClose}
           okText={isLoading ? 'Updating' : 'Save'}
           cancelButtonProps={{
             disabled: isLoading
           }}
           okButtonProps={{
             disabled: isLoading
           }}
    >

      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{marginBottom: '20px'}}
        />)}
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
      >
        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{required: true, message: 'Please input your display name'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[{required: true}]}>
          <Select
            placeholder="Select a option and change input text above"
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="owner">Owner</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
