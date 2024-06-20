import { useMemo } from 'react';
import markerIcon from 'assets/images/leaflet/marker-icon.svg';
import { CloseCircleFilled } from '@ant-design/icons';

type MiniPlanProps = {
  filePath: string;
  width?: number;
  imgWidth: number;
  imgHeight: number;
  markers: { posX: number; posY: number }[];
  onClick: () => void;
  onDelete?: () => void;
};

export default function MiniPlan(props: MiniPlanProps) {
  const { filePath, width = 246, imgWidth, markers, onClick, onDelete } = props;

  const markerWidth = 18;
  const rate = width / imgWidth;
  const renderMarkers = useMemo(() => {
    return markers?.map((marker, index) => {
      if (marker.posX === null || marker.posY === null) return null;
      const top = marker.posY * rate;
      const left = marker.posX * rate;
      return (
        <img
          className='marker'
          key={`${index}-${marker.posX}-${marker.posY}`}
          src={markerIcon}
          width={markerWidth}
          alt=''
          style={{ left: left - markerWidth / 2, bottom: top }}
        />
      );
    });
  }, [markers]);

  if (!filePath) return null;

  return (
    <div className='mini-plan' style={{ width: width }}>
      <CloseCircleFilled onClick={onDelete} className='delete-icon' />
      <div onClick={onClick}>
        <img src={filePath} alt='' width={width} />
        {renderMarkers}
      </div>
    </div>
  );
}
