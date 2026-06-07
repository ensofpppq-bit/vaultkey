# Vault Key - E-commerce de Clés USB

Un site e-commerce moderne et minimaliste pour la vente de clés USB avec intégration PayPal et panneau d'administration.

## 🚀 Démarrage rapide

### Installation locale

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Accéder à http://localhost:5173
```

### Accès Admin

1. Aller sur `/admin`
2. **Mot de passe par défaut**: `vault_admin_2024`
3. Gérer les produits: ajouter, modifier, supprimer

## 📋 Fonctionnalités

✅ **Site e-commerce** - Affichage des produits, ajout au panier
✅ **Panier** - Gestion complète du panier avec calcul des totaux
✅ **Paiement PayPal** - Intégration sécurisée avec PayPal
✅ **Panneau Admin** - Authentification et gestion des produits
✅ **Stockage Local** - Sauvegarde des données dans localStorage
✅ **Design Moderne** - Interface responsive avec Tailwind CSS

## 🔐 Sécurité Admin

Le mot de passe admin par défaut est : **`vault_admin_2024`**

⚠️ **À faire avant la production:**
- Changer le mot de passe dans `src/pages/Admin.jsx` (ligne 18)
- Implémenter une vraie authentification backend
- Ajouter une base de données (MongoDB, PostgreSQL, etc.)

## 💳 Configuration PayPal

L'ID client PayPal est déjà configuré dans `index.html`:
```
Client ID: AVrRGl90R2tO8lXsmKVT__U1SWUtWb_wUxJ-h53bJfkYC-ai_2y4tLxG5SJ6zANozEhE9FjqnNYLpVKN
Devise: EUR
```

## 📦 Structure du projet

```
vault-key-ecommerce/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

## 🌐 Déploiement sur Vercel

### Option 1: Déployer via Git (recommandé)

1. Créer un repo GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votreusername/vault-key-ecommerce
git push -u origin main
```

2. Aller sur [vercel.com](https://vercel.com)
3. Cliquer sur "New Project"
4. Sélectionner le repo GitHub
5. Cliquer sur "Deploy"

### Option 2: Déployer via CLI Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer
vercel
```

### Option 3: Déployer le ZIP directement

1. Créer le ZIP du projet
2. Aller sur [vercel.com/import](https://vercel.com/import)
3. Uploader le ZIP
4. Configurer et déployer

## 🔧 Personnalisation

### Changer le mot de passe admin

Modifier `src/pages/Admin.jsx`:
```javascript
const ADMIN_PASSWORD = 'votre_nouveau_mot_de_passe'
```

### Ajouter des produits par défaut

Modifier `src/App.jsx` (ligne ~20):
```javascript
const defaultProducts = [
  { id: 1, name: 'Mon produit', price: 29.99, image: '💾', stock: 10 }
]
```

### Changer la devise PayPal

Modifier `index.html`:
```html
<script src="https://www.paypal.com/sdk/js?client-id=VotreID&currency=USD"></script>
```

## 📊 Gestion des données

Les données sont stockées dans **localStorage**:
- `vault_products` - Liste des produits
- `vault_cart` - Panier actuel
- `vault_orders` - Historique des commandes
- `admin_token` - Token d'authentification admin

## 🎨 Couleurs et styles

Le design utilise Tailwind CSS avec une palette bleue:
- Couleur primaire: `#0284c7` (blue-600)
- Couleur secondaire: `#0369a1` (blue-700)
- Arrière-plan: `#f9fafb` (gray-50)

## 📱 Responsive Design

Le site est entièrement responsive:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🐛 Dépannage

**PayPal ne s'affiche pas?**
- Vérifier que le script PayPal charge correctement
- Vérifier l'ID client dans index.html
- Ouvrir la console pour voir les erreurs

**Le panier ne persiste pas?**
- localStorage doit être activé
- Vérifier que l'espace de stockage n'est pas plein

**Admin protégé?**
- Mot de passe incorrect?
- Vérifier le mot de passe en base de code
- Effacer les données locales: `localStorage.clear()`

## 📞 Support

Pour toute question ou problème:
1. Vérifier la console du navigateur (F12)
2. Consulter les logs de Vercel
3. Vérifier les paramètres PayPal

## 📄 Licence

Libre d'utilisation. Adaptez le projet selon vos besoins!

---

**Vault Key** - E-commerce moderne et fiable 🔐
