# 📚 Gestionnaire de Bibliothèque en Ligne

Bienvenue dans le **Gestionnaire de Bibliothèque en Ligne** ! Cette application vous permet de gérer une collection de livres et leurs catégories de manière simple et efficace. Développée avec **Node.js**, **Express**, **MongoDB**, et **EJS**, cette application offre une interface intuitive pour gérer vos livres et catégories.

---

## 🌟 Fonctionnalités Principales

### 📖 Gestion des Livres (CRUD)
- **Ajouter un livre** : Ajoutez un nouveau livre avec un titre, un auteur, une catégorie, et un statut de disponibilité.
- **Lister les livres** : Affichez tous les livres sur la page d'accueil avec la possibilité de filtrer par catégorie.
- **Modifier un livre** : Mettez à jour les informations d'un livre existant.
- **Supprimer un livre** : Supprimez un livre de la bibliothèque.

### 📂 Gestion des Catégories (CRUD)
- **Ajouter une catégorie** : Créez une nouvelle catégorie avec un nom et une description.
- **Lister les catégories** : Affichez toutes les catégories avec le nombre de livres associés.
- **Modifier une catégorie** : Mettez à jour les informations d'une catégorie existante.
- **Supprimer une catégorie** : Supprimez une catégorie. Les livres associés ne seront pas supprimés, mais perdront leur association.

---

## 🛠️ Technologies Utilisées

- **Backend** : Node.js avec Express
- **Base de données** : MongoDB
- **Templates** : EJS pour la génération dynamique des vues
- **Architecture** : Respect de l'architecture MVC (Modèle-Vue-Contrôleur)

---

## 🗂️ Modèles de Données

### 📘 Livre (Book)
- `title` (String) : Titre du livre
- `author` (String) : Auteur du livre
- `category` (Référence à l'objet Category) : Catégorie du livre
- `status` (Boolean) : Statut de disponibilité (disponible ou non)
- `createdAt` (Date) : Date de création
- `updatedAt` (Date) : Date de mise à jour

### 📂 Catégorie (Category)
- `name` (String) : Nom de la catégorie
- `description` (String) : Description de la catégorie
- `createdAt` (Date) : Date de création
- `updatedAt` (Date) : Date de mise à jour

---

## 🖥️ Pages de l'Application

### Pour les Livres
1. **Page d'Accueil** : Liste tous les livres avec un bouton pour basculer leur statut de disponibilité et un filtre par catégorie.
2. **Page d'Ajout d'un Livre** : Permet d'ajouter un nouveau livre en renseignant les champs nécessaires.
3. **Page d'Édition d'un Livre** : Permet de modifier les informations d'un livre existant.
4. **Page de Détails d'un Livre** : Affiche toutes les informations du livre ainsi que sa catégorie associée.

### Pour les Catégories
1. **Page de Gestion des Catégories** : Liste toutes les catégories avec leur nom, description, et le nombre de livres associés.
2. **Page d'Ajout d'une Catégorie** : Permet d'ajouter une nouvelle catégorie.
3. **Page d'Édition d'une Catégorie** : Permet de modifier les informations d'une catégorie existante.
4. **Page de Détails d'une Catégorie** : Affiche le nom, la description de la catégorie ainsi que la liste des livres associés.

---

## 🚀 Comment Démarrer

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/gestionnaire-bibliotheque.git
   cd gestionnaire-bibliotheque
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer la base de données** :
   - Assurez-vous que MongoDB est installé et en cours d'exécution.
   - Modifiez le fichier `.env` pour inclure votre URI de connexion MongoDB.

4. **Démarrer le serveur** :
   ```bash
   npm start
   ```

5. **Accéder à l'application** :
   - Ouvrez votre navigateur et accédez à `http://localhost:8080`.

---

**Profitez de votre gestion de bibliothèque en ligne !** 📚✨
