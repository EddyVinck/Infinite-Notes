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
  position: relative;

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

const buttonGradient = css`
  background: #4b79a1;
  background: -webkit-linear-gradient(to right, #283e51, #4b79a1);
  background: linear-gradient(to right, #283e51, #4b79a1);
  color: #fff;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #21d4fd;
    background-image: linear-gradient(270deg, #21d4fd 0%, #b721ff 100%);
    background-size: 200% auto;
    transition: 0.5s;
  }

  span {
    position: relative;
  }

  &:hover,
  &:focus {
    &:before {
      background-position: right center;
    }
  }
`;

export { basicButton, buttonStyle, buttonGradient };
