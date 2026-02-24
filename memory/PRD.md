# Notre Dame d'Autan - Site Web Paroissial

## Description du Projet
Refonte complète du site web de la paroisse "Notre Dame d'Autan" avec une approche spirituelle, accueillante et moderne.

## Stack Technique
- **Frontend**: React, Tailwind CSS, Lucide-React, Embla Carousel
- **Backend**: FastAPI, Motor (MongoDB async)
- **Base de données**: MongoDB

## Style Visuel
- **Palette**: Couleur accent rose poudré `#d0ada6`, fond blanc cassé `#fdfbf8`, bleu ardoise `#475569`
- **Typographie**: Serif pour les titres
- **Design**: Épuré, lumineux, beaucoup d'espaces blancs, responsive

## Structure de Navigation (5 piliers)
1. Notre Dame d'Autan
2. Familles & Jeunesse
3. Vie Spirituelle & Sacrements
4. Grandir dans la Foi
5. Solidarité & Écoute

---

## Fonctionnalités Implémentées

### Décembre 2025
- [x] Page d'accueil avec section Hero et carrousel d'actualités
- [x] Navigation avec 5 piliers principaux
- [x] Bouton "Horaires des Messes" très visible
- [x] Footer avec liens et réseaux sociaux
- [x] Pages piliers avec vignettes cliquables et icônes
- [x] Page "Demander un Sacrement" avec 6 sacrements
- [x] Pages de détail pour chaque sacrement
- [x] Carrousel d'actualités automatique (3 vignettes visibles)
- [x] 9 actualités avec images
- [x] Page "Équipe Pastorale" avec vignettes
- [x] Page "Nos Clochers" avec vignettes
- [x] **Images personnalisées pour les 6 sacrements** (Baptême, Communion, Confirmation, Réconciliation, Mariage, Sacrement des Malades)
- [x] Agenda des funérailles avec interface admin CRUD
- [x] Icônes réseaux sociaux (Facebook, Instagram) sur toutes les sections Hero
- [x] Modales de ressources sur la page "Ressources"
- [x] **Fix z-index**: La modale s'affiche correctement au-dessus du bouton de recherche global
- [x] **Configuration Railway** : Fichiers de déploiement créés (railway.toml, Procfile, .env.example)
- [x] **Page Éveil à la Foi** : Contenu détaillé avec horaires des 3 lieux (Castanet, Saint-Orens, Escalquens) et dates 2025-2026
- [x] **Page MEJ** : Modale avec description du mouvement, tranches d'âge (JT, TA, ES) et lien vers mej.fr

---

## Tâches Prochaines (Backlog Priorisé)

### P0 - Critique
- [ ] **CMS Admin** : Implémenter le tableau de bord `/admin` pour gérer :
  - Actualités (CRUD)
  - Horaires des messes
  
### P1 - Important
- [ ] **Migration du contenu** : Migrer le contenu codé en dur dans `server.py` vers MongoDB
- [ ] **Formulaires de sacrements** : Créer les formulaires de demande avec notifications email

### P2 - Améliorations futures
- [ ] Inscription à la newsletter (footer)
- [ ] Chatbot IA (Gemini Flash suggéré)
- [ ] Galeries photos
- [ ] Témoignages

---

## Déploiement Railway (Décembre 2025)

L'application est prête pour le déploiement sur Railway avec :

### Fichiers de configuration créés
- `/app/railway.json` - Configuration globale
- `/app/backend/railway.toml` - Configuration backend FastAPI
- `/app/backend/Procfile` - Procfile alternatif
- `/app/backend/.env.example` - Variables d'environnement requises
- `/app/frontend/railway.toml` - Configuration frontend React
- `/app/frontend/Procfile` - Procfile alternatif
- `/app/frontend/.env.example` - Variables d'environnement requises
- `/app/README_RAILWAY.md` - Guide de déploiement complet

### Variables d'environnement requises

**Backend:**
| Variable | Description |
|----------|-------------|
| `MONGO_URL` | URI MongoDB (Atlas ou local) |
| `DB_NAME` | Nom de la base de données |
| `JWT_SECRET` | Clé secrète pour JWT |
| `CORS_ORIGINS` | URL du frontend |

**Frontend:**
| Variable | Description |
|----------|-------------|
| `REACT_APP_BACKEND_URL` | URL de l'API backend |

---

## URLs des Images des Sacrements
- Baptême: `https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/gj75c74d_Bapteme.png`
- Première Communion: `https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/jrek2lhj_Premiere-communion.png`
- Confirmation: `https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png`
- Réconciliation: `https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/qhnerpwc_Reconciliation-confession.png`
- Mariage: `https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/5tik9jhg_Mariage.png`
- Sacrement des Malades: `https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/3dt57dtp_Sacreement-des-malades.png`

---

## Credentials
- **Admin**: username: `admin`, password: `password`
- **URL**: `/admin`
