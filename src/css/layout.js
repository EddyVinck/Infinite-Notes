import { css } from 'react-emotion';

const contentWrapper = css`
  margin: 0 auto;
  max-width: 1170px;

  @media (max-width: 1220px) {
    max-width: 90%;
  }
  @media (max-width: 600px) {
    margin: 0 5%;
  }
`;

const sectionPadding = {
  standard: css`
    padding-top: 60px;
    padding-bottom: 40px;
  `,
};

export { contentWrapper, sectionPadding };
