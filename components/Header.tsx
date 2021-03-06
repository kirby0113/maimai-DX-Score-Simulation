import { ReactNode } from 'react';
import styled from 'styled-components';
import { fontSize } from '../constants/font';
import { mediaQuery } from '../constants/mediaQuery';

export type HeaderProps = {
  children?: ReactNode;
};

const StyledHeader = styled.header`
  font-size: ${fontSize['large']};
  background-color: #4850b9;
  color: #eeeeee;

  padding: 30px 0;
  padding-bottom: 40px;
  font-family: Noto Sans Noto Sans JP;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 15px;
  @media screen and (max-width: ${mediaQuery['sp'].max}) {
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
  }
`;

export const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};
