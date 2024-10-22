import { IoMdMail } from 'react-icons/io';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import img from '../../assets/icons/pointer.png';
// import styles from './styles.module.scss';
// import styles from './styles.module.scss';

const Map = () => {
  const customIcon = new Icon({
    iconUrl: img,
    iconSize: [28, 28],
  });

  return (
    <MapContainer
      center={[25.19739111576196, 55.27433348825527]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[25.19739111576196, 55.27433348825527]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
