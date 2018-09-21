import { css } from 'react-emotion';

const basicButton = css`
  background-color: #f2f2f2;
  border: 1px solid #979797;
  margin-bottom: 20px;
  padding: 8px 14px;
  transition: 0.2s ease-in;
  font-weight: bold;
  font-size: 17px;
  transition: 0.3s ease-out;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #4c87ff;
    border-color: #4c87ff;
    color: #fff;
  }
`;

const buttonStyle = css`
  ${basicButton};
  color: #fff;
  background-color: #4c87ff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  transform: translateY(0px);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.4);
  }
`;

export { basicButton, buttonStyle };
