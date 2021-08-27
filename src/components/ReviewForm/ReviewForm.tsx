import { useState } from "react";
import { Form, DatePicker, Rate, Input, Button } from "antd";

const { TextArea } = Input;

const printSubmit = (values) => {
    console.log(values);
};

const ReviewForm = () => {
    const [userReview, setUserReview] = useState({
        rating: 0,
        date: null,
        message: "",
    });

    //   const userReview = {
    //       rating: number,
    //       date: date,
    //       message: string,
    //   }

    //dates timestamp seconds

    return (
        <>

            <Form
                style={{ width: 500, margin: 'auto', }}
                onFinish={printSubmit}
            >         <h2>Leave you review</h2>
                <Form.Item
                    name="rate"
                    label="Rate"
                    rules={[
                        {
                            required: true,
                            message: "Please include a rating in your review",
                        },
                    ]}
                >
                    <Rate onChange={(value) => console.log(value)} />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date of visit"
                    rules={[
                        {
                            required: true,
                            message: "Please provide the date of your visit",
                        },
                    ]}
                >
                    <DatePicker
                        placeholder="Select date"
                        format={"MM-DD-YYYY"}
                        onChange={(date, dateString) => console.log(date, dateString)}
                    />
                </Form.Item>
                <Form.Item
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: "Please write your review",
                        },
                    ]}
                >
                    <TextArea
                        showCount
                        maxLength={250}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        placeholder="Write your review"
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Send review
                </Button>
            </Form>
        </>
    );
};

export default ReviewForm;
