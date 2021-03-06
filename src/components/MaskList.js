import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag } from 'antd';
import styled from 'styled-components';
import { Spin } from 'antd';
import axios from 'axios';

const TableBlock = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
`;

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '주소',
    dataIndex: 'addr',
    key: 'addr',
  },
  {
    title: '재고현황',
    key: 'remain_stat',
    dataIndex: 'remain_stat',
    render: (remain_stat) => (
      <span>
        {remain_stat === 'empty' ? (
          <Tag color={'#868e96'} key={remain_stat}>
            품절
          </Tag>
        ) : remain_stat === 'few' ? (
          <Tag color={'#fa5252'} key={remain_stat}>
            부족
          </Tag>
        ) : remain_stat === 'some' ? (
          <Tag color={'#fab005'} key={remain_stat}>
            보통
          </Tag>
        ) : remain_stat === 'plenty' ? (
          <Tag color={'#40c057'} key={remain_stat}>
            충분
          </Tag>
        ) : (
          <Tag color={'#212529'} key={remain_stat}>
            판매중지
          </Tag>
        )}
      </span>
    ),
  },
  {
    title: '마지막 업데이트',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at) => (
      <span>
        {created_at
          ? created_at.slice(5, 7) +
            '월 ' +
            created_at.slice(8, 10) +
            '일 ' +
            created_at.slice(11, 13) +
            '시 ' +
            created_at.slice(14, 16) +
            '분 '
          : '-'}
      </span>
    ),
  },
  {
    title: '마스크 입고 시간',
    dataIndex: 'stock_at',
    key: 'stock_at',
    render: (stock_at) => (
      <span>
        {stock_at
          ? stock_at.slice(5, 7) +
            '월 ' +
            stock_at.slice(8, 10) +
            '일 ' +
            stock_at.slice(11, 13) +
            '시 ' +
            stock_at.slice(14, 16) +
            '분 '
          : '-'}
      </span>
    ),
  },
];

// const data = [
//   {
//     "addr": "경기도 용인시 기흥구 구성로 88 (언남동)",
//     "code": "31891179",
//     "created_at": "2020/03/12 17:30:00",
//     "lat": 37.2941687,
//     "lng": 127.1189735,
//     "name": "언남현대사약국",
//     "remain_stat": "empty",
//     "stock_at": "2020/03/12 09:03:00",
//     "type": "01"
//   },
// ]

function MaskList() {
  const [stores, setStores] = useState(null);
  const [loading, setLoading] = useState(false);

  const [myLat, setMyLat] = useState(null);
  const [myLng, setMyLng] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      (function findPosition() {
        navigator.geolocation.getCurrentPosition(function (position) {
          setMyLat(position.coords.latitude);
          setMyLng(position.coords.longitude);
        });
      })();
      try {
        const response = await axios.get(
          `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${myLat}&lng=${myLng}&m=1000`
        );
        setStores(response.data.stores);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [myLat, myLng]);

  if (loading === true) {
    return (
      <TableBlock
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin
          tip="데이터를 불러오는 중입니다..."
          size="large"
          style={{ fontSize: '1rem' }}
        ></Spin>
      </TableBlock>
    );
  }

  if (!stores) {
    return null;
  }

  return (
    <TableBlock>
      <Table
        columns={columns}
        dataSource={stores}
        pagination={{ position: ['bottomCenter'] }}
        rowKey="code"
      />
    </TableBlock>
  );
}

export default MaskList;
