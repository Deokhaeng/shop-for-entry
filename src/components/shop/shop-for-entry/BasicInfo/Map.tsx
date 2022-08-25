import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import { MapPropsType } from '@lib/shop/interface';

declare global {
  interface Window {
    kakao: any;
  }
}
function Map({ address }:MapPropsType) {
  const pageNum = useRecoilValue(PageNumState);

  useEffect(() => {
    if (pageNum === 1) {
      const mapScript = document.createElement('script');

      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
      document.head.appendChild(mapScript);
      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 반환 객체를 생성
          // 주소로 좌표를 검색
          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              // 지도를 생성
              const container = document.getElementById('map');
              const options = {
                center: coords,
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);
              // 결과값으로 받은 위치를 마커로 표시
              // eslint-disable-next-line no-new
              new window.kakao.maps.Marker({
                map,
                position: coords,
              });
            } else { // 정상적으로 좌표가 검색이 안 될 경우 디폴트 좌표로 검색
              const coords = new window.kakao.maps.LatLng(37.4658841978011, 127.02834681855);
              const container = document.getElementById('map');
              const options = {
                center: new window.kakao.maps.LatLng(37.4658841978011, 127.02834681855),
                level: 3,
              };
              // 지도를 생성
              const map = new window.kakao.maps.Map(container, options);
              // eslint-disable-next-line no-new
              new window.kakao.maps.Marker({
                map,
                position: coords,
              });
            }
          });
        });
      };
      mapScript.addEventListener('load', onLoadKakaoMap);
      // return () => mapScript.removeEventListener('load', onLoadKakaoMap);
    }
  }, [address, pageNum]);

  return (
    <KakaoMap id="map" />
  );
}

const KakaoMap = styled.div`
  width: 100%;
  height: 145px;
  margin-top: 8px;
`;

export default Map;
