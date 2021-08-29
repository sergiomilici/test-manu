import { notification, Popconfirm } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

export type DeleteType = 'review' | 'reply'

interface IRemoveUserProps {
  typeText: DeleteType;
  removeFn: () => Promise<void>
}

const Action = styled.a`
  margin-right: 5px;
`

export const Delete = ({typeText, removeFn}: IRemoveUserProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const removeCallback = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await removeFn()
      setIsShowing(false);
      notification.success({
        message: 'Success!!',
        description:
          `There ${typeText} was removed.`,
      });
    } catch (e) {
      setErrorMessage('Something went wrong');
      console.error(e)
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    notification.error({
      message: 'Error',
      description:
        `There was an error while trying to delete the ${typeText}. Please try again`,
    });
  }, [errorMessage])

  return (
    <Popconfirm
      visible={isLoading || isShowing}
      placement="topRight"
      title={`Confirm remove this ${typeText}?`}
      onConfirm={removeCallback}
      onCancel={() => setIsShowing(false)}
      okText={`${isLoading ? 'Deleting' : 'Yes'}`} cancelText="No"
      okButtonProps={{disabled: isLoading}}
      cancelButtonProps={{disabled: isLoading}}
    >
      <Action style={{marginRight: '5px'}}
              onClick={() => setIsShowing(true)}
      >
        Delete
      </Action>
    </Popconfirm>
  )
}
