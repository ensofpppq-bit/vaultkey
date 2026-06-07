# Guide Admin - Vault Key

Guide complet pour gérer votre boutique Vault Key.

## 🔐 Connexion Admin

1. Aller sur `/admin` (ou cliquer sur Admin en haut)
2. Entrer le mot de passe: **`vault_admin_2024`** (à changer!)
3. Accéder au panneau d'administration

## 📝 Gestion des produits

### ➕ Ajouter un produit

1. Remplir le formulaire à gauche:
   - **Nom**: ex "Clé USB 32GB"
   - **Prix**: ex "19.99"
   - **Stock**: ex "10"
   - **Emoji**: Choisir une icône (💾, 🔑, 📀, etc.)

2. Cliquer sur **"Ajouter le produit"**
3. Le produit apparaît immédiatement sur le site

### ✏️ Modifier un produit

1. Trouver le produit dans la liste
2. Cliquer sur le bouton **stylo** (Edit)
3. Modifier les champs
4. Cliquer sur **"Mettre à jour"**

### 🗑️ Supprimer un produit

1. Trouver le produit dans la liste
2. Cliquer sur le bouton **poubelle** (Delete)
3. Confirmer la suppression

## 📊 Statistiques

Le panneau affiche:
- **Total des produits**: nombre de références
- **Valeur du stock**: prix × quantité de tous les produits

Exemple:
- 3 produits × stock moyen = 20 articles = 1500€ de stock

## 💾 Données stockées

Les produits sont sauvegardés dans **localStorage** du navigateur:
- Persistent entre les actualisations
- Sauvegarde automatique
- À exporter manuellement pour backup

### Exporter les données

```javascript
// Ouvrir console (F12) et lancer:
const products = localStorage.getItem('vault_products');
console.log(JSON.parse(products));
// Copier/coller ailleurs pour backup
```

## 📦 Gestion des commandes

### Voir les commandes

Les commandes sont sauvegardées dans localStorage:

```javascript
// Dans la console (F12):
const orders = JSON.parse(localStorage.getItem('vault_orders') || '[]');
console.log(orders);
```

Structure d'une commande:
```json
{
  "id": "PAYPAL_TRANSACTION_ID",
  "date": "07/06/2024",
  "total": "65.98",
  "items": [
    {
      "id": 1,
      "name": "Clé USB 32GB",
      "quantity": 2,
      "price": 19.99
    }
  ],
  "payerEmail": "client@example.com"
}
```

### Exporter les commandes

Pour récupérer toutes les commandes:

```javascript
// Console browser (F12)
const orders = JSON.parse(localStorage.getItem('vault_orders') || '[]');
copy(JSON.stringify(orders, null, 2));
// Puis coller dans un fichier .json
```

## 🔑 Gestion du mot de passe

### Changer le mot de passe

⚠️ **Très important pour la sécurité!**

1. Ouvrir `src/pages/Admin.jsx`
2. Trouver la ligne:
```javascript
const ADMIN_PASSWORD = 'vault_admin_2024'
```
3. Remplacer par votre nouveau mot de passe
4. Redéployer sur Vercel

### Réinitialiser si oublié

1. Effacer le localStorage:
```javascript
localStorage.removeItem('admin_token');
localStorage.clear();
```
2. Récharger la page
3. Se reconnecter

## 💡 Bonnes pratiques

### 1️⃣ Gestion du stock
- Vérifier régulièrement les stocks
- Mettre à jour après chaque vente
- Définir des alertes quand stock bas

### 2️⃣ Pricing
- Vérifier les coûts de production
- Ajouter une marge bénéficiaire
- Compétitif mais rentable

### 3️⃣ Backup
- Exporter produits régulièrement
- Exporter commandes tous les jours
- Garder un fichier de secours

### 4️⃣ Sécurité
- Changer le mot de passe admin
- Utiliser un mot de passe fort
- Ne jamais le partager

## ⚠️ Avant la production

### Checklist sécurité

- [ ] Changer le mot de passe par défaut
- [ ] Implémenter une vraie base de données
- [ ] Ajouter une authentification sécurisée
- [ ] Logger les changements
- [ ] Ajouter la validation d'email
- [ ] Implémenter des rôles utilisateurs

### Checklist données

- [ ] Passer de localStorage à une BDD
- [ ] Ajouter une sauvegarde automatique
- [ ] Implémenter la récupération après sinistre
- [ ] Logger toutes les transactions

### Checklist paiements

- [ ] Tester les paiements PayPal réels
- [ ] Vérifier les conversions de devises
- [ ] Ajouter les frais de transaction
- [ ] Implémenter un reçu par email

## 🚀 Intégrations avancées

### Base de données (MongoDB)

```javascript
// À faire: implémenter une API Node.js
// POST /api/products → sauvegarder en BD
// GET /api/products → récupérer de la BD
// DELETE /api/products/:id → supprimer
```

### Email de confirmation

```javascript
// À faire: intégrer SendGrid ou Mailgun
// Envoyer email après chaque commande
// Inclure le numéro de suivi
```

### Analytics

```javascript
// À faire: intégrer Google Analytics
// Suivre les produits populaires
// Analyser le comportement utilisateur
```

## 🆘 Troubleshooting

**Les changements ne s'affichent pas?**
- F5 pour recharger
- Ctrl+Shift+Delete pour vider le cache

**Les produits disparaissent?**
- Les données sont dans localStorage
- F12 → Application → Local Storage
- Vérifier la clé `vault_products`

**Les commandes manquent?**
- Vérifier localStorage → `vault_orders`
- Peut avoir été vidé accidentellement
- Récupérer le backup si disponible

**Admin ne se connecte pas?**
- Vérifier le mot de passe (sensible à la casse)
- Effacer localStorage: `localStorage.clear()`
- Recharger la page

## 📞 Support

Pour des questions avancées:
1. Consulter la documentation React
2. Vérifier Vercel logs pour erreurs
3. Demander l'aide sur les forums

---

**Vault Key Administration** - Gérez votre boutique facilement! 🎯
