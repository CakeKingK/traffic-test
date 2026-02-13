$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

docker compose -f .\compose\docker-compose.yml --env-file .\.env down
docker ps
