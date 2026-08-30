# ── CONFIGURACIÓN BÁSICA ──────────────────────────────────────────────────────
NPM  := npm
BASH := bash
PORT := 8000

# ── ESTILOS & COLORES ANSI ───────────────────────────────────────────────────
BOLD    := \033[1m
DIM     := \033[2m
RESET   := \033[0m
EMERALD := \033[38;5;42m
AMBER   := \033[38;5;214m
CYAN    := \033[38;5;51m
RED     := \033[38;5;196m
GRAY    := \033[38;5;244m
BLUE    := \033[38;5;33m

.PHONY: all help install dev copy clean build build-dev serve check lint deploy \
        agent-deploy agent-maintain

all: help

# ── AYUDA & COMANDOS ─────────────────────────────────────────────────────────
help:
	@printf "\n"
	@printf "  $(BOLD)$(EMERALD)shell$(RESET)$(BOLD)aquiles$(RESET)$(RED).org$(RESET) $(DIM)• Open Source, Colaboración y Comunidad Tech en México$(RESET)\n"
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@printf "  Terminal landing page construida con Webpack + PostCSS.\n"
	@printf "  Gestiona el entorno de desarrollo, build de assets y despliegue a producción.\n"
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@printf "  $(BOLD)Uso:$(RESET) make $(CYAN)<comando>$(RESET)\n\n"
	@printf "  $(BOLD)Entorno & Desarrollo:$(RESET)\n"
	@printf "    $(CYAN)make install$(RESET)      $(GRAY)→$(RESET) Instala todas las dependencias del proyecto\n"
	@printf "    $(CYAN)make dev$(RESET)          $(GRAY)→$(RESET) Inicia watch mode: CSS + JS + servidor en http://localhost:$(PORT)\n"
	@printf "    $(CYAN)make copy$(RESET)         $(GRAY)→$(RESET) Copia archivos estáticos (HTML, data, txt) a $(BOLD)dist/$(RESET)\n"
	@printf "    $(CYAN)make clean$(RESET)        $(GRAY)→$(RESET) Elimina la carpeta $(BOLD)dist/$(RESET) y builds anteriores\n\n"
	@printf "  $(BOLD)Build:$(RESET)\n"
	@printf "    $(CYAN)make build$(RESET)        $(GRAY)→$(RESET) Compila y minifica CSS + JS para producción\n"
	@printf "    $(CYAN)make build-dev$(RESET)    $(GRAY)→$(RESET) Compila assets en modo desarrollo (sin minificar)\n"
	@printf "    $(CYAN)make serve$(RESET)        $(GRAY)→$(RESET) Levanta servidor de producción en http://localhost:8001\n\n"
	@printf "  $(BOLD)Calidad de Código:$(RESET)\n"
	@printf "    $(CYAN)make check$(RESET)        $(GRAY)→$(RESET) Pre-Flight Check: linting + validación de build\n"
	@printf "    $(CYAN)make lint$(RESET)         $(GRAY)→$(RESET) Analiza el código JavaScript con ESLint\n\n"
	@printf "  $(BOLD)Despliegue:$(RESET)\n"
	@printf "    $(CYAN)make deploy$(RESET)       $(GRAY)→$(RESET) Flujo seguro de despliegue a producción (check → prepare)\n\n"
	@printf "  $(BOLD)Agent Workflows:$(RESET)\n"
	@printf "    $(CYAN)make agent-deploy$(RESET) $(GRAY)→$(RESET) Protocolo de release completo: check → build → copy\n"
	@printf "    $(CYAN)make agent-maintain$(RESET) $(GRAY)→$(RESET) Checklist de mantenimiento del Agentic Workspace\n"
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n\n"

# ── ENTORNO & DESARROLLO ──────────────────────────────────────────────────────
install:
	@printf "  $(BLUE)📦 Instalando dependencias npm...$(RESET)\n"
	@$(NPM) install
	@printf "  $(EMERALD)✔ Dependencias instaladas correctamente.$(RESET)\n"

dev: clean copy
	@printf "  $(BLUE)🔍 Validando disponibilidad del puerto $(PORT)...$(RESET)\n"
	@lsof -ti:$(PORT) | xargs kill -9 2>/dev/null || true
	@printf "  $(EMERALD)🚀 Iniciando entorno de desarrollo en http://localhost:$(PORT)$(RESET)\n"
	@$(NPM) run dev

copy:
	@printf "  $(BLUE)📋 Copiando archivos estáticos a dist/...$(RESET)\n"
	@$(NPM) run copy
	@printf "  $(EMERALD)✔ Archivos estáticos copiados.$(RESET)\n"

clean:
	@printf "  $(AMBER)🗑️  Limpiando directorio dist/...$(RESET)\n"
	@$(NPM) run clean
	@printf "  $(EMERALD)✔ Directorio limpiado.$(RESET)\n"

# ── BUILD ─────────────────────────────────────────────────────────────────────
build:
	@printf "  $(BLUE)🏗️  Construyendo assets de producción...$(RESET)\n"
	@$(NPM) run build:prod
	@printf "  $(EMERALD)✔ Build completado — archivos listos en dist/$(RESET)\n"

build-dev:
	@printf "  $(BLUE)🏗️  Construyendo assets en modo desarrollo...$(RESET)\n"
	@$(NPM) run build:dev
	@printf "  $(EMERALD)✔ Build dev completado.$(RESET)\n"

serve:
	@printf "\n  $(BOLD)$(EMERALD)🌐 Servidor de producción activo:$(RESET) $(CYAN)http://localhost:8001$(RESET)\n"
	@printf "  $(DIM)   Presiona Ctrl+C para detener el servidor.$(RESET)\n\n"
	@$(NPM) run serve:prod

# ── CALIDAD DE CÓDIGO ─────────────────────────────────────────────────────────
check:
	@printf "  $(BLUE)🕵️  Ejecutando Pre-Flight Check...$(RESET)\n"
	@$(BASH) .agents/hooks/pre-flight-check.sh

lint:
	@printf "  $(BLUE)🧹 Analizando código JavaScript con ESLint...$(RESET)\n"
	@$(NPM) run lint

# ── DESPLIEGUE ────────────────────────────────────────────────────────────────
deploy: check
	@printf "  $(BLUE)🚢 Iniciando despliegue seguro a producción...$(RESET)\n"
	@$(NPM) run prepare-production
	@printf "  $(EMERALD)✔ Despliegue completado exitosamente.$(RESET)\n"

# ── AGENT WORKFLOWS ───────────────────────────────────────────────────────────
agent-deploy:
	@printf "\n  $(BOLD)$(CYAN)🤖 Workflow: Deployment Protocol$(RESET)\n"
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@$(MAKE) --no-print-directory check
	@$(MAKE) --no-print-directory build
	@$(MAKE) --no-print-directory copy
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@printf "  $(EMERALD)✔ Assets listos en dist/. Revisa antes de hacer commit.$(RESET)\n"
	@printf "  $(DIM)   Tip: ejecuta 'make serve' para previsualizar en :8001$(RESET)\n\n"

agent-maintain:
	@printf "\n  $(BOLD)$(CYAN)🤖 Workflow: Workspace Maintenance$(RESET)\n"
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@printf "  $(BLUE)  [1/3] Analizando código JavaScript...$(RESET)\n"
	@$(MAKE) --no-print-directory lint
	@printf "  $(BLUE)  [2/3] Ejecutando pre-flight check...$(RESET)\n"
	@$(MAKE) --no-print-directory check
	@printf "  $(BLUE)  [3/3] Validando build de producción...$(RESET)\n"
	@$(MAKE) --no-print-directory build
	@printf "  $(GRAY)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)\n"
	@printf "  $(EMERALD)✔ Mantenimiento completado. Workspace en buen estado.$(RESET)\n\n"
