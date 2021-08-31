import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loader = () => {
  return (
    <Wrapper>
      <Spin style={{width: '100%'}} />
    </Wrapper>
  );
}
