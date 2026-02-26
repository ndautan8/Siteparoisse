# PRD - Paroisse Notre Dame d'Autan

## Problème Original
Site web paroissial pour Notre Dame d'Autan (Castanet-Tolosan / Saint-Orens). Application full-stack React + FastAPI + MongoDB.

## Architecture
- **Frontend:** React, TailwindCSS, Shadcn/UI, Lucide icons
- **Backend:** FastAPI, MongoDB
- **Intégrations:** Resend (formulaire contact), Google Maps

## Ce qui est implémenté

### Fonctionnalités Core
- Site paroissial complet avec navigation multi-pages
- Formulaire de contact fonctionnel (Resend)
- Recherche site complète
- Responsive mobile

### Gestion Admin (CRUD)
- Actualités (news)
- Horaires des messes
- Funérailles
- Événements / Agenda (Feb 2026)

### Page Agenda (Feb 2026)
- Page publique `/agenda` avec hero, filtres par catégorie, événements groupés par mois
- Section "Prochains événements" sur la page d'accueil (4 max)
- Catégories : Liturgie, Communauté, Jeunesse, Solidarité, Formation
- Les événements passés sont automatiquement masqués
- Liens dans footer, menu mobile, et recherche
- Onglet admin pour CRUD des événements

### Améliorations Visuelles (Feb 2026)
- Hero 40vh sur mobile (sous-pages), 80vh accueil
- Animations fade-in au scroll (IntersectionObserver)
- Icônes sociales repositionnées en haut à droite sur mobile

### SEO (Feb 2026)
- Langue FR (`lang="fr"`)
- Titres et meta descriptions dynamiques (hook custom)
- Alt images descriptifs en français
- `sitemap.xml` et `robots.txt`

## Backlog Priorisé

### P2
- Refactoring de `ContentPage.js` (composant trop volumineux)
- Amélioration du système d'indexation de recherche

## Notes Techniques
- Ne PAS utiliser `react-helmet-async` (cause écran blanc)
- Hook custom `useDocumentTitle.js` / `SEO.js` utilisé pour SEO
- `SocialIcons.js` : positionnement responsive (top-right mobile, bottom-right desktop)
- Admin credentials: admin / admin123

## API Endpoints
- GET/POST /api/events, PUT/DELETE /api/events/{id}
- GET/POST /api/news, PUT/DELETE /api/news/{id}
- GET/POST /api/mass-times, PUT/DELETE /api/mass-times/{id}
- GET/POST /api/funerals, PUT/DELETE /api/funerals/{id}
- POST /api/auth/login
- GET/POST /api/contact
