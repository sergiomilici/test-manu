import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { deleteRestaurant } from '../../../Api';

interface IRemoveRestaurantProps {
  restaurant: Restaurant;
  onRemoveRestaurant: (restaurant: Restaurant) => void;
}

export const RemoveRestaurant = ({restaurant, onRemoveRestaurant}: IRemoveRestaurantProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const removeRestaurant = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await deleteRestaurant(restaurant.id);
      onRemoveRestaurant(restaurant);
      setIsShowing(false);
      notification.success({
        message: 'Success!!',
        description:
          `There restaurant "${restaurant.name}" was removed.`,
      });
    } catch (e) {
      setErrorMessage('Something went wrong');
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  }, [restaurant, onRemoveRestaurant])

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    notification.error({
      message: 'Error',
      description:
        'There was an error while trying to delete the restaurant. Please try again',
    });
  }, [errorMessage])

  return (
    <Popconfirm
      visible={isLoading || isShowing}
      placement="topRight"
      title={`Confirm remove restaurant "${restaurant.name}"?`}
      onConfirm={removeRestaurant}
      onCancel={() => setIsShowing(false)}
      okText={`${isLoading ? 'Deleting' : 'Yes'}`} cancelText="No"
      okButtonProps={{disabled: isLoading}}
      cancelButtonProps={{disabled: isLoading}}
    >
      <Button style={{marginRight: '5px'}} shape="circle" icon={<DeleteOutlined />}
              onClick={() => setIsShowing(true)}
      />
    </Popconfirm>
  )
}
