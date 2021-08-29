import { Button, Form, FormInstance, notification } from 'antd';
import { useMemo, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import styled from 'styled-components';
import { hasErrors } from '../Restaurants/UpdateRestaurantModal';

interface EditCommentProps {
  comment: string;
  onCancel: () => void;
  saveFn: (comment: string) => Promise<void>;
}

interface FormValues {
  comment: string;
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FormButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: normal;
  flex-direction: column;
`

export const EditComment = ({comment, onCancel, saveFn}: EditCommentProps) => {
  const formRef = useRef<FormInstance<FormValues> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues = useMemo(() => {
    return {
      comment,
    }
  }, [comment]);

  const onFinish = async () => {
    try {
      if (!formRef || !formRef.current) {
        return;
      }
      setIsLoading(true);
      const errors = formRef.current.getFieldsError();
      if (hasErrors(errors)) {
        return;
      }
      setIsLoading(true);
      const fieldsValue = formRef.current.getFieldsValue();
      await saveFn(fieldsValue.comment);
    } catch (e) {
      console.error(e);
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{span: 20}}
      initialValues={initialValues}
      onFinish={onFinish}
      ref={formRef}
    >
      <FormWrapper>
        <Form.Item
          label={null}
          name="comment"
          rules={[{required: true, whitespace: true, message: 'Please input a comment'}]}
          wrapperCol={{offset: 0, span: 24}}
          style={{
            paddingRight: '5px',
            margin: '5px 0',
            width: '100%'
          }}
        >
          <TextArea />
        </Form.Item>
        <FormButtonsWrapper>
          <Button type="primary" htmlType="submit" size="small" style={{marginBottom: '5px'}}
                  disabled={isLoading}>
            {isLoading ? 'Saving' : 'Save'}
          </Button>
          <Button type="primary" htmlType="button" size="small" onClick={onCancel}
                  disabled={isLoading}>
            Cancel
          </Button>
        </FormButtonsWrapper>
      </FormWrapper>
    </Form>
  )
}
