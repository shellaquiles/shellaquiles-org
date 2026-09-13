---
title: "Cron-Quiles: Motor Abierto y Agregador de Eventos Tech en México"
subtitle: "Arquitectura serverless desacoplada para la sincronización continua de eventos tecnológicos (Meetup, Luma e ICS) mediante feeds declarativos."
author: "pixelead0 & Shellaquiles.org"
date: "2026-08-29"
category: "PROYECTOS"
tags: ["cron-quiles", "python", "asyncio", "github-actions", "eventos-tech", "open-source", "calendario-tech", "etl"]
version: "v2.1.0"
lang: "es"
---

# $ cat proyectos/cron_quiles.txt

> [!NOTE]
> **Definición de Sistema:** **Cron-Quiles** es un agregador ETL de código abierto y calendario unificado que centraliza el pulso de la comunidad tecnológica en México. Monitorea comunidades en CDMX, Guadalajara, Puebla, Monterrey y remoto, normalizando fuentes heterogéneas en calendarios estáticos (`.ics`), suscripciones `WebCal` y endpoints `JSON` consumibles por cualquier cliente o bot.

<div class="post-preview-image">
  <img src="/assets/previews/cronquiles.png" alt="Cron-Quiles — Calendario Unificado de la Comunidad Tech en México" class="post-preview-img">
</div>

> [!TIP]
> **Acciones del Proyecto:**  
> <a href="https://shellaquiles.github.io/cron-quiles/" target="_blank" rel="noopener" class="btn btn-main"><i data-lucide="play"></i> Abrir Calendario (Web) ↗</a> &nbsp;
> <a href="https://github.com/shellaquiles/cron-quiles" target="_blank" rel="noopener" class="btn btn-outline"><i data-lucide="github"></i> Repositorio GitHub ↗</a> &nbsp;
> <a href="/proyectos.html" class="btn btn-outline">Ver en Proyectos ↗</a>

---

## 01. El Problema: Fragmentación del Ecosistema Tech

En los ecosistemas de desarrollo de software en México y Latinoamérica, los meetups, talleres y conferencias suelen dispersarse en múltiples plataformas: Luma, Meetup.com, Eventbrite y sitios independientes con calendarios iCal/ICS. Mantener una base de datos centralizada con servidores dedicados o APIs de pago resulta costoso, frágil y poco colaborativo.

**`cron-quiles`** resuelve este problema mediante un modelo de arquitectura desacoplada y 100% *serverless*:

* `// DECLARATIVO` — **Configuración por Pull Request:** Las comunidades registran sus fuentes agregando una entrada en el archivo declarativo `config/feeds.yaml`.
* `// ASINCRONÍA` — **Ingesta Concurrente:** Procesamiento de múltiples fuentes HTTP e ICS en paralelo mediante `asyncio` y `httpx`.
* `// ZERO_INFRA` — **Ejecución Programada:** Un flujo automatizado en GitHub Actions corre periódicamente como un *cron job*, construye el dataset estático y lo publica vía GitHub Pages / CDN sin costo operativo.
* `// INTEROPERABILIDAD` — **Salidas Estandarizadas:** Generación de archivos `events.json` y feeds `.ics` compatibles con Google Calendar, Apple Calendar, Outlook y bots de Telegram.

---

## 02. Pipeline de Datos y Arquitectura

```
[ Fuentes Comunitarias: Luma / Meetup / iCal / YAML ]
                  │
                  ▼
   [ Ingesta Asíncrona: asyncio + httpx ]
                  │
                  ▼
   [ Normalización & Validación: Pydantic ]
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
[ feeds/*.ics / WebCal ] [ dist/events.json ]
        │                   │
        └─────────┬─────────┘
                  ▼
[ Publicación Estática CDN / GitHub Pages ]
```

---

## 03. Matriz del Pipeline de Datos

| Etapa | Responsabilidad Operativa | Entrada | Salida / Artefacto |
| :--- | :--- | :--- | :--- |
| **01. Discovery** | Lectura y validación de fuentes comunitarias | `config/feeds.yaml` | Lista tipada de `FeedSource` |
| **02. Fetching** | Peticiones HTTP concurrentes con rate-limiting | URLs (Luma, Meetup, iCal) | Payloads brutos (JSON / ICS) |
| **03. Normalization** | Mapeo de fechas, zonas horarias y coordenadas | Raw data | Modelos `Event` en Pydantic |
| **04. Build & Deploy** | Generación de estáticos y despliegue a CDN | Lista de eventos normalizados | `dist/events.json` y `dist/feed.ics` |

---

## 04. Configuración Declarativa: `feeds.yaml`

Para que una nueva comunidad tecnológica sea indexada automáticamente por el agregador, solo requiere abrir un Pull Request agregando su configuración:

```yaml
# config/feeds.yaml
communities:
  - name: "Python CDMX"
    platform: "luma"
    url: "https://api.lu.ma/public/v1/calendar/get-events?calendar_api_id=cal-xxxx"
    city: "CDMX"
    tags: ["python", "backend", "ai"]

  - name: "Kubernetes Community Days GDL"
    platform: "ical"
    url: "https://kcdgdl.mx/events.ics"
    city: "Guadalajara"
    tags: ["devops", "cloud", "kubernetes"]
```

---

## 05. Especificaciones Técnicas y Salidas Abiertas

* `// MOTOR` — **Pipeline Asíncrono en Python:** Extracción concurrente de eventos y normalización estricta con Pydantic.
* `// GEOLOCALIZACIÓN` — **Segmentación por Estados:** Generación automática de calendarios específicos para CDMX, Jalisco (JAL), Puebla (PUE) y Nuevo León (NLE).
* `// DATOS ABIERTOS` — **Multi-formato de Salida:** Publicación de feeds en `.ics`, `webcal://` y endpoints `.json` optimizados para consumo por terceros.
* `// UI/UX` — **Diseño Suizo & Terminal:** Interfaz estática de alto rendimiento, bajo consumo de ancho de banda y navegación por filtros.
* `// SCHEMA & METADATOS` — **Datos Estructurados:** Inyección automática de `JSON-LD (Event)` para indexación directa en motores de búsqueda.

---

## 06. Conexión con el Ecosistema Shellaquiles

El desarrollo de Cron-Quiles no es un caso aislado; se nutre e impulsa a los demás proyectos de la comunidad:

* **[Pyquiles al Pastor](/blog/pyquiles-al-pastor-el-curso-de-python-con-sabor-mexicano):** El pipeline asíncrono de Cron-Quiles es el proyecto de estudio real en el módulo de Concurrencia y Datos (`asyncio` + `httpx`).
* **[Bits de Conocimiento](/blog/bits-de-conocimiento):** Las charlas técnicas relámpago de la comunidad se agendan y sincronizan a través de este calendario.
* **[Stats GitHub](/blog/stats-dashboard-de-telemetria-web-y-huella-digital-de-repositorios):** Cron-Quiles monitorea su propia telemetría y adopción comunitaria a través del dashboard de analíticas abiertas.

---

## 07. Cómo Participar

Sumar tu comunidad es tan simple como editar un archivo YAML:

```bash
# 1. Clonar el repositorio
git clone https://github.com/shellaquiles/cron-quiles.git
cd cron-quiles

# 2. Agregar tu comunidad en config/feeds.yaml y validar
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest tests/
```

¡Únete a la agenda unificada y mantente al día con los eventos tech más importantes de México!
