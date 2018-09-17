import { css } from 'react-emotion';

const buttonStyle = css`
  background-color: #fff;
  border: 1px solid #979797;
  padding: 8px 14px;
  transition: 0.2s ease-in;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: purple;
    border-color: purple;
    color: #fff;
  }
`;

export default buttonStyle;
