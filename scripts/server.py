#!/usr/bin/env python3
"""
Simple HTTP server with SPA routing support
Serves index.html for all non-file routes
"""
import http.server
import socketserver
import os
import urllib.parse

class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Parse the path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        # Normalize path: remove leading slash for file operations
        file_path = path.lstrip('/')

        # If path is empty or root, serve index.html
        if path == '' or path == '/' or path == '/index.html':
            self.path = '/index.html'
            return super().do_GET()

        # Check if it's a static file that exists
        # Static files: CSS, JS, images, fonts, data files, etc.
        if file_path and os.path.isfile(file_path):
            # File exists, serve it directly
            return super().do_GET()

        # Check for static file extensions
        static_extensions = ('.css', '.js', '.json', '.md', '.png', '.jpg', '.jpeg', '.gif', '.svg',
                           '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.txt')
        if file_path and any(file_path.endswith(ext) for ext in static_extensions):
            # Has static extension but file doesn't exist - try to serve (will 404)
            return super().do_GET()

        # Check if it's a directory that exists
        if file_path and os.path.isdir(file_path):
            # Try to serve index.html from that directory
            index_path = os.path.join(file_path, 'index.html')
            if os.path.isfile(index_path):
                self.path = '/' + index_path
                return super().do_GET()

        # For SPA routes (like /blog, /blog/post), serve index.html
        # This allows client-side routing to work
        self.path = '/index.html'
        return super().do_GET()

def run(port=8000):
    Handler = SPAHTTPRequestHandler
    # Only change to dist if we're not already there
    if os.path.basename(os.getcwd()) != 'dist' and os.path.exists('dist'):
        os.chdir('dist')

    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"🚀 Servidor iniciado en http://localhost:{port}")
        print(f"📝 Abre en tu navegador:")
        print(f"   - Home: http://localhost:{port}/")
        print(f"   - Blog: http://localhost:{port}/blog")
        print(f"\nPresiona Ctrl+C para detener")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Servidor detenido")

if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run(port)
