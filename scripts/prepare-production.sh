#!/bin/bash
# Script para preparar el proyecto para producción

echo "🔨 Limpiando builds anteriores..."
npm run clean

echo "📦 Compilando para producción..."
npm run build:prod

echo "📋 Copiando archivos..."
npm run copy

echo "📝 Actualizando index.html para producción..."
cd dist
sed -i 's/styles\.css/styles.min.css/g' index.html
sed -i 's/script\.js/script.min.js/g' index.html
cd ..

echo "📄 Creando .htaccess si no existe..."
if [ ! -f dist/.htaccess ]; then
    cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Si el archivo existe, sírvelo directamente
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    # Si es un archivo estático, sírvelo
    RewriteCond %{REQUEST_URI} !\.(css|js|json|md|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|pdf|zip|txt)$ [NC]

    # Para todas las demás rutas, servir index.html
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# Configurar tipos MIME para archivos estáticos
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
    AddType application/json .json
    AddType text/markdown .md
    AddType image/svg+xml .svg
</IfModule>

# Cache para archivos estáticos (opcional)
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF
    echo "   ✅ .htaccess creado"
else
    echo "   ✅ .htaccess ya existe"
fi

echo ""
echo "✅ Proyecto listo para producción!"
echo ""
echo "📁 Archivos en dist/ listos para desplegar"
echo ""
echo "📤 Para desplegar:"
echo "   1. Sube todo el contenido de dist/ a tu servidor"
echo "   2. Asegúrate de incluir el archivo .htaccess (para servidores Apache)"
echo "   3. Verifica que la estructura de carpetas se mantenga"
echo "   4. Configura SPA routing según tu servidor"
