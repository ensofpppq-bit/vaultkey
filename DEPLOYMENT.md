# Guide de déploiement sur Vercel

## ✅ Pré-requis

- Compte GitHub (gratuit)
- Compte Vercel (gratuit)
- Node.js 18+ installé localement

## 📝 Étapes de déploiement

### 1️⃣ Préparer le projet

```bash
# Vérifier que tout fonctionne localement
npm install
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm run preview
```

### 2️⃣ Créer un repo GitHub

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit: Vault Key e-commerce"

# Créer un nouveau repo sur GitHub
# Puis ajouter le remote
git remote add origin https://github.com/votreusername/vault-key-ecommerce
git push -u origin main
```

### 3️⃣ Déployer sur Vercel

#### Méthode 1: Via l'interface Vercel (Recommandé)

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur **"New Project"**
3. Sélectionner **"Import Git Repository"**
4. Connecter votre compte GitHub
5. Sélectionner le repo **vault-key-ecommerce**
6. Configuration automatique:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. Cliquer sur **"Deploy"**
8. Attendre la fin du déploiement (2-3 minutes)

#### Méthode 2: Via Vercel CLI

```bash
# 1. Installer Vercel CLI globalement
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Répondre aux questions
# - Which scope? → Votre compte
# - Link to existing project? → No
# - Project name? → vault-key-ecommerce
```

### 4️⃣ Configuration post-déploiement

1. Aller dans les **Settings** du projet Vercel
2. Vérifier **Build & Development**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Les variables d'environnement ne sont pas nécessaires (client-side only)

## 🎯 Votre site est live!

Une fois déployé, vous aurez une URL comme:
```
https://vault-key-ecommerce.vercel.app
```

## 🔄 Mises à jour

Pour mettre à jour votre site:

```bash
# 1. Faire vos modifications
# 2. Committer
git add .
git commit -m "Description des changements"

# 3. Pousser sur GitHub
git push origin main

# 4. Vercel redéploie automatiquement!
```

## ⚙️ Domaine personnalisé

Pour utiliser votre propre domaine:

1. Dans Vercel → Settings → Domains
2. Cliquer sur **"Add"**
3. Entrer votre domaine (ex: vaultkey.com)
4. Configurer les DNS chez votre registraire
5. Attendre la vérification (quelques minutes)

### Exemple avec Namecheap:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔐 Variables d'environnement (optionnel)

Si vous voulez utiliser des variables d'environnement:

1. Dans Vercel → Settings → Environment Variables
2. Ajouter:
   ```
   VITE_PAYPAL_CLIENT_ID=AVrRGl90R2tO8...
   VITE_ADMIN_PASSWORD=vault_admin_2024
   ```

3. Dans le code React, accéder via:
   ```javascript
   const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
   ```

## 📊 Monitoring

Vercel vous donne accès à:
- **Analytics** → Trafic, performances
- **Logs** → Erreurs et informations
- **Deployments** → Historique des déploiements

## 🚀 Optimisations recommandées

### 1. Activer la compression
Vercel le fait automatiquement ✓

### 2. Images optimisées
Utiliser `next/image` ou des images WebP

### 3. Monitoring
```bash
# Ajouter Sentry pour les erreurs (optionnel)
npm install @sentry/react
```

## 🆘 Troubleshooting

### "Build failed"
```bash
# Vérifier localement d'abord
npm run build
npm run preview
```

### "White page / 404 on refresh"
- C'est normal avec les apps React
- Vercel route automatiquement vers index.html
- Vérifier que vite.config.js existe

### PayPal ne charge pas
- Vérifier que le Client ID est correct
- Assurez-vous que le script dans index.html charge correctement
- Ouvrir DevTools → Network pour voir si le script PayPal charge

### Admin inaccessible
- Vérifier que localStorage fonctionne
- Le mot de passe par défaut est: `vault_admin_2024`
- Effacer localStorage si problèmes: `F12 → Application → Clear all`

## ✅ Checklist avant la production

- [ ] Tester tous les produits
- [ ] Tester le panier et checkout
- [ ] Tester le panneau admin
- [ ] Vérifier les payments PayPal
- [ ] Changer le mot de passe admin
- [ ] Ajouter vos vrais produits
- [ ] Tester sur mobile
- [ ] Configurer un domaine personnalisé
- [ ] Mettre à jour les mentions légales

## 🎉 Succès!

Votre site e-commerce Vault Key est maintenant en ligne sur Vercel!

Pour plus d'infos: [docs.vercel.com](https://docs.vercel.com)

---

Questions? Consultez le README.md principal!
