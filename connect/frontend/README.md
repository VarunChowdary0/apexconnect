# SaaS-Cold-Email-App

## Docker

Development (live reload):

```powershell
docker compose -f docker-compose.dev.yml up --build
```

Production (build image and run):

```powershell
docker build -t saas-cold-email-app .
docker run -p 3000:3000 saas-cold-email-app
```

Notes:
- Dev compose mounts the project and runs `npm run dev` inside a container bound to port 3000.
- The Dockerfile uses a multi-stage build for a smaller production image.
SaaS-Cold-Email-App
