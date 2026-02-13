$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

docker compose -f .\compose\docker-compose.yml --env-file .\.env up -d --build
docker ps
Write-Host "`nOK: http://localhost:$env:LAB_HTTP_PORT/health"