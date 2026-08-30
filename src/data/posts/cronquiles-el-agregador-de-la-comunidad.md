---
title: "Cron-Quiles: Motor Abierto de Eventos y Calendarios Tech en México"
subtitle: "Pipeline automatizado de agregación, normalización de feeds y exportación de datos abiertos."
author: "pixelead0 & Shellaquiles.org"
date: "2026-08-29"
category: "PROYECTOS"
tags: ["cron-quiles", "python", "etl", "open-data", "calendario"]
version: "v2.0.0"
lang: "es"
---

> [!NOTE]
> **Definición de Sistema:** **Cron-Quiles** es un agregador ETL de código abierto que consolida eventos tecnológicos en México, normalizando fuentes heterogéneas en calendarios estáticos (`.ics`), feeds `WebCal` y endpoints `JSON`.

---

## 01. Arquitectura y Funcionamiento

El ecosistema tech suele sufrir de fragmentación de datos: los eventos se dispersan en Luma, Meetup, Eventbrite y sitios independientes. **Cron-Quiles** resuelve esto mediante un pipeline automatizado en Python que procesa, valida y exporta la información sin requerir bases de datos pesadas ni servidores en ejecución continua.

El ciclo de sincronización se ejecuta periódicamente vía GitHub Actions, garantizando datos actualizados y archivos estáticos de alta disponibilidad.


```

[ Fuentes: Luma / Meetup / iCal / YAML ]
│
▼
[ Pipeline ETL en Python ]
│
┌────────────────┼────────────────┐
▼                ▼                ▼
[ WebCal / ICS ] [ JSON API ] [ Dashboard UI ]

```

---

## 02. Especificaciones Técnicas (v2.0.0)

* `// MOTOR` — **Pipeline Asíncrono en Python:** Extracción concurrente de eventos y normalización estricta con Pydantic.
* `// GEOLOCALIZACIÓN` — **Segmentación por Estados:** Generación automática de calendarios específicos para CDMX, Jalisco (JAL), Puebla (PUE) y Nuevo León (NLE).
* `// DATOS ABIERTOS` — **Multi-formato de Salida:** Publicación de feeds en `.ics`, `webcal://` y endpoints `.json` optimizados para consumo por terceros.
* `// UI/UX` — **Diseño Suizo & Terminal:** Interfaz estática de alto rendimiento, bajo consumo de ancho de banda y navegación por filtros.
* `// SEO & SCHEMA` — **Datos Estructurados:** Inyección automática de `JSON-LD (Event)` para indexación directa en motores de búsqueda.

---

## 03. Matriz de Componentes

| Módulo | Función Principal | Formato / Salida |
| :--- | :--- | :--- |
| **Pipeline ETL** | Extracción, limpieza y parsing de fuentes | Objetos normalizados en memoria |
| **Generador iCal** | Compilación de eventos en estándares RFC 5545 | Archivos `.ics` y `webcal://` |
| **API Estática** | Endpoints ligeros para integración con apps y bots | `events.json`, `cdmx.json`, etc. |
| **Web Dashboard** | Interfaz de consulta rápida y filtrado | Sitio estático HTML5 / CSS Suizo |
| **Registry YAML** | Configuración declarativa de comunidades | `communities/*.yaml` |

---

## 04. Endpoints y Consumo de Datos

Puedes integrar los calendarios directamente en Google Calendar, Apple Calendar o herramientas locales:

```bash
# Suscribirse al feed general de México (WebCal)
webcal://cron-quiles.org/feeds/mexico.ics

# Consumir el endpoint JSON para CDMX en tus scripts
curl -s [https://cron-quiles.org/data/cdmx.json](https://cron-quiles.org/data/cdmx.json) | jq '.[0]'

```

---

## 05. Registro de Nuevas Comunidades

> [!TIP]
> Cualquier comunidad técnica sin fines de lucro en México puede integrarse al feed mediante un Pull Request.
>
>

1. **Fork:** Clona el repositorio oficial desde [GitHub](https://github.com/shellaquiles/cron-quiles).


2. **Registro:** Agrega un archivo YAML con los datos de tu comunidad en la carpeta `data/communities/`:


```yaml
name: "Python CDMX"
region: "CDMX"
source_type: "luma"
feed_url: "https://api.lu.ma/ics/get?entity=calendar&id=cal-xxx"
tags: ["python", "backend", "data"]
```


3. **Pull Request:** Abre el PR; una vez aprobado, el pipeline incluirá tus eventos en la siguiente corrida del cron.



```bash
# Probar el linter de configuración localmente
python scripts/validate_feeds.py

```

```text
STATUS: 200 OK // REVISION: v2.0.0 // PIPELINE: CI_AUTOMATED // SYS: CRON-QUILES.ORG

```
