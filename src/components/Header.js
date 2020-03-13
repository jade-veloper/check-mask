import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  width: 100vw;
  height: 70px;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const HomeLink = styled(Link)`
  font-size: 2rem;
  color: white;

  &:hover {
    color: white;
  }
`;

function Header() {
  return (
    <HeaderBlock>
      <HomeLink to="/">Check Mask</HomeLink>
    </HeaderBlock>
  );
}

export default Header;
