import styled from 'styled-components';
import { Delete, DeleteType } from '../../Shared/Delete';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;;
`

const Action = styled.a`
  margin-right: 5px;
`

interface ActionsProps {
  onEdit?: () => void;
  onRemove: () => Promise<void>;
  deleteType: DeleteType
}

export const Actions = ({onEdit, onRemove, deleteType}: ActionsProps) => {
  return (
    <Wrapper>
      <Action onClick={onEdit}>Edit</Action>
      <Delete typeText={deleteType} removeFn={onRemove} />
    </Wrapper>
  )
}
