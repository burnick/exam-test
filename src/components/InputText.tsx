import styled from 'styled-components';
import { InputTextProps } from 'types';

const InputText = ({
  placeHolder,
  name,
  type = 'text',
  onChange,
  value,
}: InputTextProps) => {
  return (
    <Container>
      <InputStyled
        id={name}
        onChange={onChange}
        placeholder={placeHolder}
        type={type}
        name={name}
        value={value}
        autoComplete={type === 'password' ? 'on' : 'off'}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const InputStyled = styled.input`
  width: 100%;
  height: 15px;
  padding: 3px;
  border: 2px solid black;

  @media only screen and (hover: none) and (pointer: coarse) {
    height: 10px;
    font-size: 10px;
    border: 0.5px solid black;
  }
`;

export default InputText;
