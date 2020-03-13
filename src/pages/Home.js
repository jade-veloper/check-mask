import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BackgroundBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: dodgerblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainBlock = styled.div`
  width: 1000px;
  height: 500px;
`;

const MainTitle = styled.div`
  width: 100%;
  height: 60%;
  color: white;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  width: 100%;
  height: 40%;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
`;

const ButtonBlock = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PolicyInfoButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 1.25rem;
  margin: 20px;
  border-style: none;
  border-radius: 25px;
  background-color: white;
  box-shadow: 1px 3px 4px 1px rgba(0, 0, 0, 0.3);

  a {
    color: dodgerblue;
    text-decoration: none;
  }
`;

const CurrentPositionButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 1.25rem;
  margin: 20px;
  border-style: none;
  border-radius: 25px;
  background-color: royalblue;
  box-shadow: 1px 3px 4px 1px rgba(0, 0, 0, 0.3);

  a {
    color: white;
    text-decoration: none;
  }
`;

function Home() {
  return (
    <>
      <BackgroundBlock>
        <MainBlock>
          <MainTitle>CHECK MASK</MainTitle>
          <MainText>
            <p>
              체크마스크는 현재 접속위치를 기준으로 반경 1km 이내에 있는 공적
              마스크 판매점 정보를 제공합니다.
            </p>
            <p>
              공적 마스크 구매를 위한 자세한 정보는 하단의 마스크 정책 안내에서
              확인하세요.
            </p>
            <p>
              공공데이터포털의 공적 마스크 판매 정보 Open API에서 데이터를
              제공받았습니다.
            </p>
          </MainText>
        </MainBlock>
        <ButtonBlock>
          <PolicyInfoButton>
            <a
              href="http://blog.naver.com/kfdazzang/221839489769"
              target="_blank"
              rel="noopener noreferrer"
            >
              마스크정책 안내
            </a>
          </PolicyInfoButton>
          <CurrentPositionButton>
            <Link to="/about">마스크 찾기</Link>
          </CurrentPositionButton>
        </ButtonBlock>
      </BackgroundBlock>
    </>
  );
}

export default Home;
