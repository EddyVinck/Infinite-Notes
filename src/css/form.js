import { css } from 'react-emotion';

const formStyle = css`
  input,
  textarea,
  select {
    box-sizing: border-box;
    border: 1px solid #ccc;
    transition: 0.1s;

    &:hover {
      border: 1px solid #4b79a1;
    }
  }

  input {
    padding: 10px 14px;
  }

  select {
    background-color: #fff;
    padding: 10px;

    &:hover {
      cursor: pointer;
    }
  }
  textarea {
    height: 150px;
    resize: vertical;
  }
`;

export default formStyle;
