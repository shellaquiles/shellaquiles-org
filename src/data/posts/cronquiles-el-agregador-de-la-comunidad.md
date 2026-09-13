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

Para resolver esa dispersión creamos **Cron-Quiles**.

---

## 02. La Solución: Pipeline ETL de Agregación Automática

Cron-Quiles es un agregador automatizado en Python que extrae, valida, limpia y normaliza los calendarios de múltiples comunidades técnicas en un único feed centralizado.

```mermaid
graph TD;
    A["Fuentes: Luma / Meetup / iCal / YAML"] -->|GitHub Actions Cron| B(Pipeline ETL en Python);
    B -->|Normaliza con Pydantic| C{Validación & Deduplicación};
    C -->|Exporta iCal / WebCal| D[Archivos .ics & webcal://];
    C -->|Endpoints JSON| E[API Estática events.json];
    C -->|Compila UI Suizo| F[Dashboard Web Filtros];
```

### Directrices y Capacidades del Sistema

* `// MOTOR ETL` — **Pipeline Asíncrono en Python:** Extracción concurrente de eventos y validación estricta de esquemas con Pydantic (`asyncio` + `httpx`).
* `// GEOLOCALIZACIÓN` — **Segmentación Regional:** Generación automática de calendarios específicos para CDMX, Jalisco (JAL), Puebla (PUE) y Nuevo León (NLE).
* `// DATOS ABIERTOS` — **Feeds Estáticos:** Exportación en estándar RFC 5545 (`.ics`), suscripciones `webcal://` y endpoints `.json` optimizados.
* `// UI/UX TIPO TERMINAL` — **Dashboard Ligero:** Interfaz estática de alto rendimiento y bajo consumo de datos para consulta rápida.
* `// SIN SERVIDORES` — **Sincronización CI/CD:** Ejecución periódica mediante GitHub Actions, publicando archivos estáticos de alta disponibilidad en GitHub Pages.

---

## 03. Matriz de Componentes

| Módulo | Función Principal | Formato / Salida |
| :--- | :--- | :--- |
| **Pipeline ETL** | Extracción, limpieza y parsing de fuentes heterogéneas | Objetos normalizados en memoria |
| **Generador iCal** | Compilación de eventos bajo estándar RFC 5545 | Archivos `.ics` y `webcal://` |
| **API Estática** | Endpoints ligeros para integración con apps y bots | `events.json`, `cdmx.json`, etc. |
| **Web Dashboard** | Interfaz de consulta con filtros por ciudad y tecnología | Sitio estático HTML5 / CSS Suizo |
| **Registry YAML** | Registro declarativo de comunidades integradas | `data/communities/*.yaml` |

---

## 04. Cómo Suscribirte o Consumir los Datos

Puedes integrar los calendarios directamente en Google Calendar, Apple Calendar o usarlos en tus propios scripts:

```bash
# Suscribirse al feed general de México en tu aplicación de calendario (WebCal)
webcal://cron-quiles.org/feeds/mexico.ics

# Consumir el endpoint JSON para eventos en CDMX con cURL y jq
curl -s https://cron-quiles.org/data/cdmx.json | jq '.[0]'
```

---

## 05. Registrar tu Comunidad (Paso a Paso)

> [!TIP]
> Cualquier comunidad técnica o meetup sin fines de lucro en México puede integrarse al feed general enviando un Pull Request.

1. **Fork del Repositorio:** Clona [github.com/shellaquiles/cron-quiles](https://github.com/shellaquiles/cron-quiles).
2. **Crear archivo de comunidad:** Agrega un archivo YAML en `data/communities/`:

```yaml
name: "Python CDMX"
region: "CDMX"
source_type: "luma"
feed_url: "https://api.lu.ma/ics/get?entity=calendar&id=cal-xxx"
tags: ["python", "backend", "data"]
```

3. **Enviar Pull Request:** Una vez aprobado el PR, el pipeline automático incluirá tus eventos en la siguiente ejecución del cron.

---

## 06. Conexión con el Ecosistema Shellaquiles

El desarrollo de Cron-Quiles no es un caso aislado; se nutre e impulsa a los demás proyectos de la comunidad:

* **[Pyquiles al Pastor](/blog/pyquiles-al-pastor-el-curso-de-python-con-sabor-mexicano):** El pipeline asíncrono de Cron-Quiles es el proyecto de estudio real en el módulo de Concurrencia y Datos (`asyncio` + `httpx`).
* **[Bits de Conocimiento](/blog/bits-de-conocimiento):** Las charlas técnicas relámpago de la comunidad se agendan y sincronizan a través de este calendario.
* **[Stats GitHub](/blog/stats-dashboard-de-telemetria-web-y-huella-digital-de-repositorios):** Cron-Quiles monitorea su propia telemetría y adopción comunitaria a través del dashboard de analíticas abiertas.

---

## 07. Preguntas Frecuentes

> [!IMPORTANT]
> **¿Tiene algún costo registrar mi comunidad en Cron-Quiles?**  
> Ninguno. Cron-Quiles es un proyecto 100% de código abierto mantenido por la comunidad Shellaquiles para apoyar la difusión tecnológica en México.

---

```text
STATUS: 200 OK // REVISION: v2.1.0 // PIPELINE: CI_AUTOMATED // SYS: CRON-QUILES.ORG
```
