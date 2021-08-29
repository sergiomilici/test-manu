import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

const Comment = styled.div`
  padding: 8px;
  background-color:#eee;
  display:block;
  border-radius:4px;
  margin-bottom:8px;
`

const ReplyForm = ({ restaurantId, comment }) => {

    const [isFormVisible, setIsFormVisible] = useState(false)

    return (
        <div style={{ padding: '5px', }}>
            <Comment>{comment}</Comment>
            <Button
                style={{
                    marginBottom: '8px',
                }}
                onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide form' : 'Reply'}
            </Button>
            {isFormVisible && <Form.Item
                initialValue={""}
                name="comment"
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
            </Form.Item>}
        </div>
    )
}

export default ReplyForm