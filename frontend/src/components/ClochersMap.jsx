import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom cross icon using SVG for church markers
const crossIcon = new L.DivIcon({
  html: `
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="38" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
      <path d="M16 2L16 30" stroke="#b8860b" stroke-width="4" stroke-linecap="round"/>
      <path d="M8 10L24 10" stroke="#b8860b" stroke-width="4" stroke-linecap="round"/>
      <path d="M16 2L16 30" stroke="#DAA520" stroke-width="3" stroke-linecap="round"/>
      <path d="M8 10L24 10" stroke="#DAA520" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,
  className: 'cross-marker-icon',
  iconSize: [32, 40],
  iconAnchor: [16, 38],
  popupAnchor: [0, -35]
});

const ClochersMap = ({ clochers, height = "500px" }) => {
  // Calculate center of all churches
  const coordinates = Object.values(clochers).map(c => c.coordinates);
  const centerLat = coordinates.reduce((sum, c) => sum + c.lat, 0) / coordinates.length;
  const centerLng = coordinates.reduce((sum, c) => sum + c.lng, 0) / coordinates.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={11}
      style={{ height, width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(clochers).map((clocher, index) => (
        <Marker
          key={clocher.id}
          position={[clocher.coordinates.lat, clocher.coordinates.lng]}
          icon={crossIcon}
        >
          <Popup>
            <div className="text-center min-w-[180px]">
              <img 
                src={clocher.image} 
                alt={clocher.churchName}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <h3 className="font-serif font-medium text-slate-800 text-sm mb-1">
                {clocher.churchName}
              </h3>
              <p className="text-slate-500 text-xs mb-2">{clocher.name}</p>
              <Link
                to={`/nos-clochers/${clocher.id}`}
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                Voir la fiche
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ClochersMap;
