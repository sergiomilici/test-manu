import { useState } from "react";
import { Form, DatePicker, Rate, Input, Button } from "antd";
import moment from 'moment';

const { TextArea } = Input;

type Star = 1 | 2 | 3 | 4 | 5

const ReviewForm = () => {
    const [stars, setStars] = useState<Star | undefined>()
    const [dateOfVisit, setDateOfVisit] = useState<moment.Moment | null>()
    const [comment, setComment] = useState<string>("")

    const printSubmit = () => {
        let userReview = {
            stars: stars,
            date_of_visit: moment(dateOfVisit).unix(),
            comment: comment,
        }

        console.log(userReview)
    };

    return (
        <>
            <Form
                style={{ width: 500, margin: 'auto', marginBottom: '30px', }}
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
                    <Rate onChange={(value) => setStars(value as Star)} />
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
                        onChange={(date) => setDateOfVisit(date)}
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
                        onChange={(e) => setComment(e.target.value)}
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
