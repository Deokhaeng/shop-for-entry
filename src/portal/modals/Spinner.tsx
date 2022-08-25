import React from 'react';
import styled from '@emotion/styled';
import BeatLoader from 'react-spinners/BeatLoader';
import Portal from '../Portal';

function Spinner() {
  return (
    <Portal>
      <Background>
        <BeatLoader
          color="#ffffff"
          size={10}
        />
      </Background>
    </Portal>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
`;

export default Spinner;
