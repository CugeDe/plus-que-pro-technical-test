# TMDB - Plus que pro

## Lancer le projet

Si vous souhaitez lancer le projet en local, vous devrez suivre les étapes
suivantes :
```bash
# Cloner le projet
$ git clone [url_du_projet] -o projet

# Se déplacer dans le projet    
$ cd projet

# Configurer le fichier .env
$ cp .env.dist .env
$ nano .env # Modifier les variables d'environnement si besoin

# Lancer le projet
$ docker-compose up --build
```

## Configuration de l'API

Une fois le projet lancé, vous devrez lancer les migrations pour créer la base
de données :
```bash
$ docker-compose exec api php artisan migrate
```

Ensuite, vous pouvez remplir la base de données avec les données de TMDB :
```bash
$ docker-compose exec api php artisan app:warmup
```

Finalement, il ne vous reste plus qu'a configurer le client OAuth2 pour pouvoir
utiliser l'API a partir de l'application NextJS :
```bash
$ docker-compose exec api php artisan passport:client --password
```

Pensez a copier les identifiants du client OAuth2 pour les utiliser dans le
fichier `.env` a la racine. 

## Configuration de l'application

Une fois l'API configurée et les identifiants OAuth2 renseignés, vous pouvez
relancer l'application NextJS (pour qu'il prenne en compte les nouvelles
variables d'environnement) :
```bash
$ docker-compose up -d
```

Lorsque le conteneur de l'application est lancé, vous pouvez installer les
dépendances du projet :
```bash
$ docker-compose exec app npm ci
```

Enfin, vous pouvez lancer l'application en mode développement :
```bash
$ docker-compose exec app npm run dev
```

Ou en mode production :
```bash
$ docker-compose exec app /bin/ash -c "npm run build && npm run start"
```
