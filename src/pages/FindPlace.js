/*global kakao*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MapContent = styled.div`
  width: 100vw;
  height: 100vh;
`;

function FindPlace() {
  const [myLat, setMyLat] = useState(null);
  const [myLng, setMyLng] = useState(null);

  (function findPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      setMyLat(position.coords.latitude);
      setMyLng(position.coords.longitude);
    });
  })();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb14b8a5b876e7dcc8520ae77c164925&autoload=false&libraries=services';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(myLat, myLng), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
          };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(map);

        // 카테고리로 약국을 검색합니다
        ps.categorySearch('PM9', placesSearchCB, { useMapBounds: true });

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
              displayMarker(data[i]);
            }
          }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                '</div>'
            );
            infowindow.open(map, marker);
          });
        }
      });
    };
  }, [myLat, myLng]);

  return <MapContent id="map" />;
}

export default FindPlace;

// 33.450701,126.570667
