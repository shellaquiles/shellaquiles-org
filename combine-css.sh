#!/bin/bash

# Script para combinar todos los módulos CSS en un solo archivo
# Esto resuelve el problema de @import con archivos locales

echo "Combinando módulos CSS..."

# Crear el archivo combinado
cat > src/css/styles-combined.css << 'EOF'
/**
 * Shellaquiles Terminal Theme - CSS Combinado
 * Generado automáticamente desde módulos CSS
 */

EOF

# Agregar variables CSS
echo "/* ===== VARIABLES CSS ===== */" >> src/css/styles-combined.css
cat src/css/utils/_variables.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar estilos base
echo "/* ===== ESTILOS BASE ===== */" >> src/css/styles-combined.css
cat src/css/utils/_base.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar estilos del terminal
echo "/* ===== ESTILOS DEL TERMINAL ===== */" >> src/css/styles-combined.css
cat src/css/modules/_terminal.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar estilos del logo
echo "/* ===== ESTILOS DEL LOGO ===== */" >> src/css/styles-combined.css
cat src/css/modules/_logo.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar estilos de componentes
echo "/* ===== ESTILOS DE COMPONENTES ===== */" >> src/css/styles-combined.css
cat src/css/modules/_components.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar animaciones
echo "/* ===== ANIMACIONES ===== */" >> src/css/styles-combined.css
cat src/css/modules/_animations.css >> src/css/styles-combined.css
echo "" >> src/css/styles-combined.css

# Agregar responsive
echo "/* ===== RESPONSIVE DESIGN ===== */" >> src/css/styles-combined.css
cat src/css/modules/_responsive.css >> src/css/styles-combined.css

echo "CSS combinado creado en: src/css/styles-combined.css"
echo "Archivo generado exitosamente!"
