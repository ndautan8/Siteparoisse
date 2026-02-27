# Déploiement sur Railway - Notre Dame d'Autan

## Architecture

L'application est composée de 3 services sur Railway :
- **Frontend** : Application React servie par `serve` (port dynamique via `$PORT`)
- **Backend** : API FastAPI avec Uvicorn (port dynamique via `$PORT`)
- **MongoDB** : Plugin Railway (base de données intégrée)

## Prérequis

1. Un compte [Railway](https://railway.app) (plan Hobby à 5$/mois)
2. Votre code sur un repository GitHub

## Déploiement pas à pas

### Étape 1 : Créer le projet Railway

1. Connectez-vous à [Railway](https://railway.app)
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Connectez et sélectionnez votre repository

### Étape 2 : Ajouter la base de données MongoDB

1. Dans votre projet, cliquez sur **"+ New"** → **"Database"** → **"MongoDB"**
2. Railway crée automatiquement une instance MongoDB
3. Cliquez sur le service MongoDB → **"Variables"** → copiez `MONGO_URL`

### Étape 3 : Configurer le Backend

1. Cliquez sur **"+ New"** → **"GitHub Repo"** → sélectionnez votre repo
2. Dans les **Settings** du service :
   - **Root Directory** : `/backend`
   - Railway détecte automatiquement Python et utilise `railway.toml`
3. Dans **Variables**, ajoutez :
   ```
   MONGO_URL=<collez l'URL MongoDB du plugin> (ou référencez la variable du service MongoDB)
   DB_NAME=notre_dame_autan
   JWT_SECRET=une-cle-secrete-unique-et-longue
   CORS_ORIGINS=https://votre-frontend.railway.app
   ```
4. **Astuce** : Pour `MONGO_URL`, vous pouvez utiliser une **Variable Reference** :
   - Cliquez sur "Add Variable" → tapez `MONGO_URL`
   - Pour la valeur, cliquez sur **"Add Reference"** → sélectionnez le service MongoDB → `MONGO_URL`

### Étape 4 : Configurer le Frontend

1. Cliquez sur **"+ New"** → **"GitHub Repo"** → même repo
2. Dans les **Settings** du service :
   - **Root Directory** : `/frontend`
   - Railway détecte automatiquement Node.js et utilise `railway.toml`
3. Dans **Variables**, ajoutez :
   ```
   REACT_APP_BACKEND_URL=https://votre-backend.railway.app
   ```

### Étape 5 : Générer les domaines publics

Pour chaque service (frontend et backend) :
1. Allez dans **Settings** → **Networking**
2. Cliquez sur **"Generate Domain"**
3. Notez les URLs générées (ex: `mon-backend.railway.app`)

### Étape 6 : Mettre à jour les variables avec les vrais domaines

Une fois les domaines générés :
1. **Backend** → mettez à jour `CORS_ORIGINS` avec l'URL du frontend
2. **Frontend** → mettez à jour `REACT_APP_BACKEND_URL` avec l'URL du backend

### Étape 7 : Redéployer

Railway redéploie automatiquement quand vous modifiez les variables.
Vérifiez que tout fonctionne en visitant l'URL du frontend.

## Structure des fichiers Railway

```
/
├── backend/
│   ├── railway.toml       ← Config Railway (build + deploy + healthcheck)
│   ├── .env.example       ← Variables requises (référence)
│   ├── Procfile            ← Alternative Heroku-compatible
│   ├── requirements.txt   ← Dépendances Python
│   └── server.py          ← API FastAPI
│
└── frontend/
    ├── railway.toml       ← Config Railway (build + deploy)
    ├── .env.example       ← Variables requises (référence)
    ├── Procfile            ← Alternative Heroku-compatible
    ├── package.json       ← Dépendances Node.js
    └── public/
        └── serve.json     ← Routage SPA (redirige tout vers index.html)
```

## Variables d'environnement

### Backend
| Variable | Obligatoire | Description | Exemple |
|----------|:-----------:|-------------|---------|
| `MONGO_URL` | ✅ | URI MongoDB (plugin Railway) | `mongodb://mongo:27017` |
| `DB_NAME` | ✅ | Nom de la base de données | `notre_dame_autan` |
| `JWT_SECRET` | ✅ | Clé secrète pour les tokens admin | `ma-cle-secrete-longue` |
| `CORS_ORIGINS` | ✅ | URL(s) du frontend autorisées | `https://frontend.railway.app` |
| `PORT` | ⚙️ | Injecté automatiquement par Railway | `8000` |

### Frontend
| Variable | Obligatoire | Description | Exemple |
|----------|:-----------:|-------------|---------|
| `REACT_APP_BACKEND_URL` | ✅ | URL publique du backend | `https://backend.railway.app` |
| `PORT` | ⚙️ | Injecté automatiquement par Railway | `3000` |

## Health Check

Le backend expose un endpoint de health check :
- **URL** : `/api/health`
- **Réponse** : `{ "status": "healthy", "database": "connected", "service": "notre-dame-autan-api" }`
- Railway l'utilise pour vérifier que le service fonctionne

## Domaine personnalisé (optionnel)

Pour utiliser votre propre nom de domaine (ex: `www.paroisse-nda.fr`) :
1. Allez dans les **Settings** du service frontend → **Networking**
2. Cliquez sur **"Custom Domain"**
3. Ajoutez votre domaine
4. Configurez un enregistrement **CNAME** chez votre registrar DNS qui pointe vers l'URL Railway

## Coût estimé

Avec le plan **Hobby** (5$/mois) :
- Frontend + Backend + MongoDB plugin → ~5$/mois total
- Largement suffisant pour un site paroissial

## Dépannage

### Le frontend affiche une page blanche
- Vérifiez que `REACT_APP_BACKEND_URL` est correcte
- Vérifiez les logs du frontend dans Railway

### Erreur CORS (le frontend ne peut pas appeler le backend)
- Vérifiez que `CORS_ORIGINS` contient l'URL exacte du frontend (avec `https://`)

### Le backend ne démarre pas
- Vérifiez que `MONGO_URL` est correcte
- Consultez les logs dans Railway → service backend → **Logs**

### Les pages renvoient une erreur 404
- Vérifiez que `serve.json` est bien dans `/frontend/public/`
- Ce fichier redirige toutes les routes vers `index.html` (nécessaire pour React Router)

## Commandes CLI (alternative)

```bash
# Installation du CLI Railway
npm install -g @railway/cli

# Connexion
railway login

# Lier au projet existant
railway link

# Déployer
railway up
```
