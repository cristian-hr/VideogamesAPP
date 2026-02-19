# API – Videogames

Backend de la app. Deploy en **Google Cloud Run** (proyecto `videogames-app-back`).

## Requisitos

- APIs: Cloud Run, Artifact Registry, Cloud Build.
- Repo en Artifact Registry (una vez):  
  `gcloud artifacts repositories create cloud-run-source-deploy --repository-format=docker --location=us-central1 --project=videogames-app-back`

## Deploy

Ejecutar desde la **raíz del repositorio** (carpeta donde está `api/` y `client/`), **no** desde dentro de `api/`:

```bash
gcloud builds submit . --config=api/cloudbuild.yaml --project=videogames-app-back
```

## Variables de entorno en Cloud Run

Configurar en consola (Cloud Run → `videogames-api` → Variables & Secrets) o con:

```bash
gcloud run services update videogames-api --region=us-central1 --project=videogames-app-back \
  --set-env-vars="BUCKET_NAME=...,DB_USER=...,DB_PASSWORD=...,DB_HOST=...,DB_NAME=...,DB_PORT=...,API_KEY=...,FRONT_URL=..."
```

Sustituir los `...` por los valores reales (o usar la consola).

## Local con Docker

```bash
cd api && docker build -t videogames-api . && docker run -p 8080:8080 --env-file .env videogames-api
```
