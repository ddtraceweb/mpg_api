# MPG API

## Description

Ce projet est une API développée avec Node.js, Express, et TypeScript, utilisant Couchbase comme base de données. L'application est configurée avec une architecture en couches (routes/services/dal) et utilise Swagger pour documenter les endpoints de l'API.

## Prérequis

- **Node.js** : Version 18 ou supérieure
- **npm** : Version 7 ou supérieure
- **Docker** : Pour exécuter Couchbase via un conteneur Docker

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone <URL_DU_DÉPÔT>
   cd mpg-api
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example`. Modifiez les valeurs en fonction de votre configuration.

   ```plaintext
   # .env
   DB_HOST=localhost
   DB_USERNAME=admin
   DB_PASSWORD=monpetitgazon
   DB_BUCKET=mpg
   ```

## Lancer Couchbase via Docker

Le projet utilise Couchbase comme base de données. Pour le lancer avec Docker, suivez ces étapes :


1. **Démarrer Couchbase avec Docker**

   ```bash
   npm run docker:up
   ```

   Pour arrêter Couchbase, utilisez :

   ```bash
   npm run docker:down
   ```

2. **Accéder à l'interface Couchbase**

   L'interface de Couchbase est accessible sur [http://localhost:8091](http://localhost:8091). Utilisez les identifiants définis dans le fichier `.env` pour vous connecter.

## Lancer l'API

1. **Compiler le projet**

   Compilez le code TypeScript vers JavaScript.

   ```bash
   npm run build
   ```

2. **Démarrer le serveur**

   Pour lancer l'application en mode production :

   ```bash
   npm start
   ```

3. **Accéder à l'API**

   Le serveur sera accessible à [http://localhost:3000](http://localhost:3000).

## Documentation API avec Swagger

La documentation de l'API est générée automatiquement avec Swagger et est accessible via l'URL suivante :

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger fournit une interface interactive pour explorer et tester les endpoints de l'API.

## Commandes Utiles

- **Lint et Formatage :** Pour vérifier et corriger le style de code avec ESLint et Prettier.

  ```bash
  npm run lint
  npm run lint:fix
  npm run format
  npm run format:check
  ```

- **Logs et Redémarrage Docker :**

    - Voir les logs de Couchbase :

      ```bash
      npm run docker:logs
      ```

    - Redémarrer Couchbase :

      ```bash
      npm run docker:restart
      ```

## Structure du Projet

Voici un aperçu de la structure du projet :

```
src/
├── config/           # Configuration (DB, Swagger, etc.)
├── controllers/      # Logique des endpoints API
├── daos/             # Data Access Objects pour accéder aux données
├── dtos/             # Data Transfer Objects pour la validation des entrées
├── models/           # Modèles de données TypeScript
├── services/         # Logique métier
├── utils/            # Utilitaires comme le logger
```

## Contribution

Les contributions sont les bienvenues. Pour contribuer, veuillez créer une branche à partir de `main`, apporter vos modifications et soumettre une pull request.

## License

Ce projet est sous licence MIT.