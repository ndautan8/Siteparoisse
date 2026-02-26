# PRD - Site Paroisse Notre Dame d'Autan

## Enonce du probleme original
Creation et amelioration iterative d'un site web pour la paroisse Notre Dame d'Autan, comprenant la gestion de l'equipe pastorale, les pages des 16 eglises (clochers), et les informations de contact.

## Architecture technique
- **Frontend**: React (Vite), TailwindCSS, Shadcn/UI
- **Backend**: FastAPI
- **Base de donnees**: MongoDB (contact_messages, news, mass_times, funerals, admins)
- **Cartographie**: Leaflet/OpenStreetMap (carte multi-marqueurs), Google Maps iframe (pages details)

## Fonctionnalites implementees

### Equipe pastorale
- Carousel avec photos
- Modales de details
- Styling standardise

### Mot du cure (Welcome Message)
- Composant ajoute sur plusieurs pages

### Section "Nos Clochers" (16 eglises)
- Fichier de donnees : `frontend/src/data/clochersData.js`
- Pages de detail dynamiques : `/nos-clochers/:slug`
- Carte Leaflet avec marqueurs personnalises (croix dorees)
- Google Maps iframe sur chaque page de detail

### Page Secretariat
- Presentation de Corinne (secretaire)
- Deux centres paroissiaux avec coordonnees completes
- Adresses cliquables (liens Google Maps)
- Horaires de permanence detailles
- Formulaire de contact fonctionnel (POST /api/contact)
- Validation frontend + message de confirmation

### Pages de contenu (ContentPage.js)
- Configuration centralisee dans des fichiers *Config.js
- Modales detaillees pour chaque activite/groupe
- Espacement standardise (flexbox + gap inline style au lieu de space-y Tailwind)

### Corrections mobile (Fev 2026)
- Vignettes ContentPage: layout responsive (vertical sur mobile, horizontal sur desktop)
- Icone centree en haut + texte en dessous sur mobile
- Padding reduit sur mobile (p-4 vs p-6)
- Tailles de texte adaptees (base/xs mobile, lg/sm desktop)
- break-words pour eviter debordement texte
- Vie Economique: 1 carte par ligne sur mobile
- Derniere vignette impaire centree: flex-wrap justify-center sur mobile

### Taches haute priorite (Fev 2026)
- Formulaire de contact fonctionnel: Backend endpoint POST /api/contact + formulaire interactif avec validation, loader, message de succes
- Modales mobile: Slide-up depuis le bas sur mobile, padding adapte, boutons fermeture visibles
- Navigation mobile: Menu hamburger avec accordeons, cibles tactiles agrandies (py-2.5), lien contact rapide, overscroll-contain, pb-24

## Fichiers cles
- `frontend/src/pages/ContentPage.js` - Page de contenu principale (vignettes, modales)
- `frontend/src/data/clochersData.js` - Donnees des 16 eglises
- `frontend/src/pages/ClocherDetailPage.js` - Page detail eglise
- `frontend/src/components/ClochersMap.jsx` - Carte Leaflet avec croix
- `frontend/src/pages/Secretariat.js` - Page secretariat + formulaire contact
- `frontend/src/components/ResourceModal.js` - Modal responsive des ressources
- `frontend/src/components/Header.js` - Header + navigation mobile
- `backend/server.py` - API FastAPI (contact, news, mass-times, funerals)

## Patterns techniques importants
- **Espacement**: NE PAS utiliser `space-y-*` de Tailwind (bug avec React conditionnel). Utiliser: `<div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>...</div>`
- **Vignettes mobile**: Layout responsive avec `flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-4`
- **Modales mobile**: `items-end sm:items-center` pour slide-up depuis le bas

## API Endpoints
- POST /api/contact - Envoyer un message de contact (public)
- GET /api/contact - Lister les messages (admin auth requise)
- POST /api/auth/login - Connexion admin
- GET/POST/PUT/DELETE /api/news - CRUD actualites
- GET/POST/PUT/DELETE /api/mass-times - CRUD horaires messes
- GET/POST/PUT/DELETE /api/funerals - CRUD funerailles

## Backlog priorise

### P0 - Termine
- [x] Formulaire de contact fonctionnel (POST /api/contact)
- [x] Modales mobile verificaton et correction
- [x] Menu navigation mobile verification et amelioration

### P1 - Priorite moyenne
- [ ] Fonctionnalite "Lire la suite" pour les actualites longues
- [ ] Recherche fonctionnelle sur le site
- [ ] Numeros de telephone cliquables (click-to-call) sur mobile

### P2 - Priorite basse
- [ ] Reduire hauteur images hero sur mobile (55vh -> 35vh)
- [ ] Animations fade-in au scroll
- [ ] Balises title et meta par page pour le SEO
- [ ] Page Agenda centralisee pour les evenements
- [ ] Composant ContentWrapper reutilisable pour espacement
- [ ] Refactoring ContentPage.js en sous-composants

## Etat actuel
- **Fonctionnel**: Navigation, pages clochers, equipe pastorale, secretariat, toutes les pages de contenu, version mobile, formulaire contact, modales mobile, menu mobile
- **Non fonctionnel**: Newsletter, "Lire la suite"
- **Placeholder**: Horaires de messe

## Langue preferee de l'utilisateur
Francais
