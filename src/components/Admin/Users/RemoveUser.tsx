import { User } from './User';
import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { deleteUser } from '../../../Api';

interface IRemoveUserProps {
  user: User;
  onRemoveUser: (user: User) => void;
}


export const RemoveUser = ({user, onRemoveUser}: IRemoveUserProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const removeUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await deleteUser(user.uid);
      onRemoveUser(user);
      setIsShowing(false);
    } catch (e) {
      setErrorMessage('Something went wrong');
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  }, [user])

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    notification.error({
      message: 'Error',
      description:
        'There was an error while trying to delete the user. Please try again',
    });
  }, [errorMessage])

  return (
    <Popconfirm
      visible={isLoading || isShowing}
      placement="topRight"
      title={`Confirm remove user "${user.displayName}"?`}
      onConfirm={removeUser}
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
