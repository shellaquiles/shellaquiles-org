# ==============================================================================
# Shellaquiles.org - Agentic Makefile
# ==============================================================================

# -- Configuración Básica --
.DEFAULT_GOAL := help
.PHONY: help install dev build clean check lint deploy

# -- Variables --
NPM = npm
BASH = bash

# -- Colores para Output --
CYAN   = \033[36m
GREEN  = \033[32m
YELLOW = \033[33m
RED    = \033[31m
RESET  = \033[0m
BOLD   = \033[1m

# ==============================================================================
# Comandos Principales
# ==============================================================================

help: ## Muestra este mensaje de ayuda y la lista de comandos disponibles
	@echo ""
	@echo "$(BOLD)$(GREEN)╭────────────────────────────────────────────────────────╮$(RESET)"
	@echo "$(BOLD)$(GREEN)│                Shellaquiles.org Workspace              │$(RESET)"
	@echo "$(BOLD)$(GREEN)╰────────────────────────────────────────────────────────╯$(RESET)"
	@echo ""
	@echo "$(BOLD)Uso:$(RESET) make $(CYAN)<comando>$(RESET)"
	@echo ""
	@echo "$(BOLD)Comandos disponibles:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-15s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ==============================================================================
# Entorno y Desarrollo
# ==============================================================================

install: ## 📦 Instala todas las dependencias del proyecto (npm install)
	@echo "$(CYAN)Instalando dependencias...$(RESET)"
	@$(NPM) install

dev: clean ## 🚀 Inicia el servidor de desarrollo con watch mode (localhost:8000)
	@echo "$(CYAN)Validando disponibilidad del puerto 8000...$(RESET)"
	@lsof -ti:8000 | xargs kill -9 2>/dev/null || true
	@echo "$(CYAN)Iniciando entorno de desarrollo...$(RESET)"
	@$(NPM) run dev

build: ## 🏗️  Compila y minifica todos los assets para producción
	@echo "$(CYAN)Construyendo assets de producción...$(RESET)"
	@$(NPM) run build:prod
	@echo "$(GREEN)¡Build completado! Los archivos están en dist/$(RESET)"

clean: ## 🗑️  Limpia la carpeta dist/ eliminando builds anteriores
	@echo "$(CYAN)Limpiando directorio dist/...$(RESET)"
	@$(NPM) run clean
	@echo "$(GREEN)Directorio limpiado.$(RESET)"

# ==============================================================================
# Calidad y Workflows Agentic
# ==============================================================================

check: ## 🕵️  Ejecuta el Pre-Flight Check de la IA (Linting + Build validation)
	@echo "$(CYAN)Ejecutando verificaciones de pre-vuelo...$(RESET)"
	@$(BASH) .agents/hooks/pre-flight-check.sh

lint: ## 🧹 Ejecuta el linter (ESLint) sobre los archivos JavaScript
	@echo "$(CYAN)Analizando código JavaScript...$(RESET)"
	@$(NPM) run lint

# ==============================================================================
# Despliegue
# ==============================================================================

deploy: check build ## 🚢 Ejecuta el flujo seguro de despliegue a producción
	@echo "$(CYAN)Iniciando despliegue seguro...$(RESET)"
	@$(NPM) run deploy
	@echo "$(GREEN)¡Despliegue completado exitosamente!$(RESET)"
