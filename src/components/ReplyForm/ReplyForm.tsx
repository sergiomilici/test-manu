import { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import styled from 'styled-components';
import { postReplyToReview } from '../../Api';

const { TextArea } = Input;

const Comment = styled.div`
  padding: 8px;
  background-color:#eee;
  display:block;
  border-radius:4px;
  margin-bottom:8px;
`

const ReplyForm = ({ restaurantId, reviewId, comment, onReplyAdded }) => {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

    const handleReplyToReview = async (values) => {
        try {
            setIsLoading(true)
            await postReplyToReview(restaurantId, reviewId, values)
            onReplyAdded(restaurantId)
            form.resetFields();
            notification.success({
                message: 'Success',
                description:
                    'Your reply was successfuly sent.',
            });
        } catch (err) {
            notification.error({
                message: 'Error',
                description:
                    'There was an error while trying to submit your reply. Please try again',
            });
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ padding: '6px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #eee', }}>
            <Comment><span style={{ marginRight: '3px', fontWeight: 'bold', }}>Comment by user:</span>{comment}</Comment>
            <Button
                onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide form' : 'Reply'}
            </Button>
            {isFormVisible &&
                <Form
                    style={{ marginTop: '8px', }}
                    form={form}
                    onFinish={handleReplyToReview}
                >
                    <Form.Item
                        initialValue={""}
                        name="reply"
                        rules={[
                            {
                                required: true,
                                message: "Please write your reply",
                            },
                        ]}
                    >
                        <TextArea
                            showCount
                            maxLength={250}
                            autoSize={{ minRows: 4, maxRows: 4 }}
                            placeholder="Write your reply"
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isLoading}
                    >
                        {!isLoading ? 'Send reply' : 'Loading'}
                    </Button>
                </Form>}
        </div>
    )
}

export default ReplyForm