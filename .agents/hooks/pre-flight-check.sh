#!/bin/bash

# Pre-Flight Check Hook para Agentes
# Este script DEBE ser ejecutado por la IA antes de declarar una tarea como finalizada.

echo "🚀 Iniciando validación de pre-vuelo (Pre-Flight Check)..."

# 1. Validación de Sintaxis JavaScript (Linting)
echo "🔍 Ejecutando ESLint..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Error: Linting falló. Por favor, corrige los errores de estilo/sintaxis en JS antes de continuar."
  exit 1
fi

# 2. Prueba de Build
echo "🏗️ Comprobando Build (Producción)..."
npm run build:prod
if [ $? -ne 0 ]; then
  echo "❌ Error: El build falló. Revisa la salida de Webpack y PostCSS."
  exit 1
fi

# 3. Validación de JSONs vitales (Ej. posts.json)
echo "📝 Validando posts.json..."
if ! jq -e . >/dev/null 2>&1 <<<"$(cat src/data/posts.json)"; then
  echo "❌ Error: Syntax error detectado en src/data/posts.json"
  exit 1
fi

echo "✅ Pre-flight check exitoso. El código es seguro para confirmación o paso a producción."
exit 0
