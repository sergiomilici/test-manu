import { useState } from 'react'
import { Collapse, Form, Input, Button, notification } from 'antd';
import { postRestaurant } from '../../Api';

const { Panel } = Collapse;

const RestaurantForm = ({ onRestaurantCreated }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

    const handleNewRestaurant = async (values) => {
        try {
            setIsLoading(true)
            await postRestaurant(values.name, values.city, values.country)
            onRestaurantCreated("ok")
            notification.success({
                message: 'Success',
                description:
                    'Restaurant sucessfully created'
            });
            form.resetFields();
        } catch (err) {
            notification.error({
                message: 'Error',
                description:
                    'There was an error while trying to create your restaurant. Please try again',
            });
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <Collapse
                destroyInactivePanel={true}
                style={{ marginBottom: '10px', textAlign: 'left', }}>
                <Panel header="Create a new restaurant" key="1">
                    <Form
                        form={form}
                        onFinish={handleNewRestaurant}
                    >
                        <Form.Item
                            initialValue={""}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please provide a name for your restaurant",
                                },
                            ]}
                        >
                            <Input placeholder="Your restaurant name"
                            />
                        </Form.Item>
                        <Form.Item
                            initialValue={""}
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please provide a city for your restaurant",
                                },
                            ]}
                        >
                            <Input placeholder="Restaurant city"
                            />
                        </Form.Item>
                        <Form.Item
                            initialValue={""}

                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please provide a country for your restaurant",
                                },
                            ]}
                        >
                            <Input placeholder="Restaurant country"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 2,
                            }}
                        >
                            <Button type="primary" htmlType="submit" disabled={isLoading}>
                                {!isLoading ? 'Create restaurant' : 'Loading'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </>)
}

export default RestaurantForm