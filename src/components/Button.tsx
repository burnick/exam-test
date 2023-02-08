import styled from 'styled-components';
import { VariantButton, ButtonProps } from 'types';
import hexToRgb from 'utils/hexToRgb';

const ButtonStyled = ({
  label,
  onClick,
  disabled,
  variant,
  type = 'submit',
}: ButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} type={type} variant={variant}>
      {label}
    </Button>
  );
};

const Button = styled.button<ButtonProps>`
  margin-top: 10px;
  min-height: 35px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  ${(props) => {
    switch (props.variant) {
      case VariantButton.SECONDARY:
        return `
        color: ${props.theme.palette.common.black};
        background-color: ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border: 1px solid ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border-radius: 8px;
        width: auto;
      `;
      case VariantButton.RESET:
        return `
        color: ${props.theme.palette.common.black};
        background-color: #FFFFFF; 
        border: 1px solid ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border-radius: 24px;
        min-width: 100px ;
      `;
      case VariantButton.CUSTOM:
        return `
        color: ${props.theme.palette.common.black};
        background-color: ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border: 1px solid ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border-radius: 24px;
        min-width: 100px ;
      `;
      case VariantButton.SIMPLE:
        return `
      `;
      case VariantButton.PRIMARY:
      default:
        return `
        color: ${props.theme.palette.common.black};
        background-color: ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        border: 1px solid ${hexToRgb(props.theme.palette.primary.main, 0.8)}; 
        width: 100%;
      `;
    }
  }};

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    pointer-events: all !important;
  }

  @media only screen and (hover: none) and (pointer: coarse) {
    font-size: 10px;
    min-height: 25px;
  }
`;
export default ButtonStyled;
