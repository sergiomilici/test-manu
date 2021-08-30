import { useState } from "react";
import { Form, DatePicker, Rate, Input, Button, notification } from "antd";
import moment from 'moment';
import { postReview, fetchRestaurantById } from "../../Api";

const { TextArea } = Input;

type Star = 1 | 2 | 3 | 4 | 5

const ReviewForm = ({ restaurantId, onReviewAdded }) => {
    const [stars, setStars] = useState<Star | undefined>()
    const [dateOfVisit, setDateOfVisit] = useState<moment.Moment | null>()
    const [comment, setComment] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

    const handlePostReview = async () => {
        try {
            setIsLoading(true)
            await postReview(restaurantId, stars!, moment(dateOfVisit).unix(), comment)
            form.resetFields();
            const restaurant = await fetchRestaurantById(restaurantId)
            onReviewAdded(restaurant)
            notification.success({
                message: 'Success',
                description:
                    'You review was sent!',
            });
        } catch (err) {
            notification.error({
                message: 'Error',
                description:
                    'There was an error while trying to submit your review. Please try again',
            });
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <Form
                form={form}
                style={{ width: 500, margin: 'auto', marginBottom: '30px', }}
                onFinish={handlePostReview}
            >         <h2>Leave your review</h2>
                <Form.Item
                    name="rate"
                    label="Rate"
                    initialValue={0}
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
                    initialValue={""}
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
                        disabledDate={d => !d || d.isAfter(moment())}
                    />
                </Form.Item>
                <Form.Item
                    initialValue={""}
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
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isLoading}
                >
                    {!isLoading ? 'Send review' : 'Loading'}
                </Button>
            </Form>
        </>
    );
};

export default ReviewForm;
