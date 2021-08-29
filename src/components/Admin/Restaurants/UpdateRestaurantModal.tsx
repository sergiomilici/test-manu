import { Alert, Form, FormInstance, Input, Modal } from 'antd';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { patchRestaurant } from '../../../Api';

interface UpdateRestaurantModalProps {
  isModalOpen: boolean;
  restaurant: Restaurant;
  onClose: () => void;
  onRestaurantEdited: (restaurant: Restaurant) => void;
}

interface FormValues {
  name: string;
  city: string;
  country: string;
}

export const hasErrors = (formErrors: any[]): boolean => {
  return formErrors.some(formE => formE.errors.length > 0)
}

export const UpdateRestaurantModal = ({
                                        restaurant,
                                        isModalOpen,
                                        onClose,
                                        onRestaurantEdited
                                      }: UpdateRestaurantModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<FormInstance<FormValues> | null>(null);

  useEffect(() => {
    formRef.current?.resetFields()
  }, [restaurant])

  const initialValues: FormValues | undefined = useMemo(() => {
    if (!restaurant) {
      return undefined;
    }
    return {
      name: restaurant.name,
      city: restaurant.city,
      country: restaurant.country
    }
  }, [restaurant]);

  const onFinish = useCallback(async () => {
    try {
      if (!formRef || !formRef.current) {
        return;
      }
      setIsLoading(true);
      const errors = formRef.current.getFieldsError();
      if (hasErrors(errors)) {
        setErrorMessage('Please complete all fields');
        return;
      }
      setErrorMessage('');
      const fieldsValue = formRef.current.getFieldsValue();

      const updatedRestaurant = {
        ...restaurant,
        ...fieldsValue
      };
      await patchRestaurant(updatedRestaurant);
      onRestaurantEdited(updatedRestaurant);
    } catch (e) {
      console.error(e)
      setErrorMessage('Something went wrong. Please try again')
    } finally {
      setIsLoading(false)
    }
  }, [onClose, restaurant, onRestaurantEdited])

  return (
    <Modal title="Edit Restaurant" visible={isModalOpen} onOk={onFinish} onCancel={onClose}
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
        ref={formRef}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{required: true, whitespace: true, message: 'Please input restaurant\'s name'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{required: true, whitespace: true, message: 'Please input restaurant\'s city'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{
            required: true,
            whitespace: true,
            message: 'Please input restaurant\'s country'
          }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
