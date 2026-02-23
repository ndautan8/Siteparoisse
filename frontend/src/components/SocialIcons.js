import { Facebook, Instagram } from 'lucide-react';

export const SocialIcons = () => (
  <div className="absolute bottom-6 right-6 z-10 flex gap-3">
    <a
      href="https://www.facebook.com/paroisse.saint.orens.castanet/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Facebook"
    >
      <Facebook className="w-5 h-5 text-white" />
    </a>
    <a
      href="https://www.instagram.com/paroisses.saint.orens.castanet?igsh=OTYycjhmZ2UzbWVt"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Instagram"
    >
      <Instagram className="w-5 h-5 text-white" />
    </a>
  </div>
);
