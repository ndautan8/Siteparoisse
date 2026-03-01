import { MapPin, ExternalLink } from 'lucide-react';
import { getGoogleMapsUrl } from '@/data/locationUtils';

/**
 * Composant réutilisable pour afficher un lieu cliquable vers Google Maps.
 * @param {string} location - Le nom du lieu
 * @param {string} className - Classes CSS supplémentaires (optionnel)
 * @param {boolean} showIcon - Afficher l'icône MapPin (défaut: true)
 * @param {string} iconClassName - Classes CSS pour l'icône (optionnel)
 */
const LocationLink = ({ location, className = '', showIcon = true, iconClassName = 'w-4 h-4' }) => {
  if (!location) return null;

  const mapsUrl = getGoogleMapsUrl(location);

  // Formatage du texte (churchName — ville)
  const renderLocationText = () => {
    if (location.includes('—')) {
      const parts = location.split('—');
      return <>{parts[0].trim()} — <strong>{parts[1].trim()}</strong></>;
    }
    return location;
  };

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 group hover:text-gold transition-colors ${className}`}
      title={`Voir ${location} sur Google Maps`}
    >
      {showIcon && <MapPin className={`${iconClassName} flex-shrink-0`} />}
      <span className="group-hover:underline underline-offset-2">
        {renderLocationText()}
      </span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
    </a>
  );
};

export default LocationLink;
