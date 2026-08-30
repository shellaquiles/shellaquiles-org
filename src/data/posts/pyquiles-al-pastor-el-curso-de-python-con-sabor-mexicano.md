---
title: "Pyquiles al Pastor: Arquitectura y Ruta de Aprendizaje"
subtitle: "Programa abierto de desarrollo en Python moderno enfocado en entornos de producción, tipado estricto y concurrencia."
author: "pixelead0 & Shellaquiles.org"
date: "2026-04-21"
category: "TUTORIAL"
tags: ["python", "educacion", "open-source", "asyncio", "arquitectura"]
version: "v2.4.0"
lang: "es"
---

> [!NOTE]
> **Parámetros del Programa:**
> * **Versión:** v2.4.0
> * **Requisitos:** Manejo básico de terminal y Git.
> * **Infraestructura:** Mantenido por el ecosistema [shellaquiles.org](https://shellaquiles.org) y coordinado por `@pixelead0`.

<div class="post-preview-image">
  <img src="/assets/previews/pyquiles.png" alt="Pyquiles al Pastor - Curso de Python" class="post-preview-img">
</div>

> [!TIP]
> **Acciones del Proyecto:**  
> <a href="https://pixelead0.github.io/pyquiles-al-pastor/" target="_blank" rel="noopener" class="btn btn-main"><i data-lucide="globe"></i> Explorar Curso ↗</a> &nbsp;
> <a href="https://github.com/shellaquiles/pyquiles-al-pastor" target="_blank" rel="noopener" class="btn btn-outline"><i data-lucide="github"></i> Repositorio GitHub ↗</a>

---

## 01. Metodología de Ejecución

El programa descarta ejercicios sintéticos aislados y se centra en la construcción iterativa de herramientas reales de producción:

* `// ENTORNO` — **Aislamiento y Dependencias:** Gestión moderna con `uv`, entornos virtuales y contenedores Docker.
* `// TIPADO` — **Rigor Estático:** Validación estricta en tiempo de análisis con `mypy` y esquemas declarativos en `pydantic`.
* `// PIPELINES` — **Concurrencia y Datos:** Procesamiento no bloqueante con `asyncio` y tareas paralelas con `multiprocessing`.
* `// CI/CD` — **Despliegue Continuo:** Automatización mediante GitHub Actions hacia entornos serverless y contenedores.

---

## 02. Mapa Curricular y Módulos

| Nivel | Enfoque Principal | Tecnologías y Herramientas | Salida / Artefacto |
| :--- | :--- | :--- | :--- |
| **01. Fundamentos** | Tipos de datos, OOP y control de flujo | Python 3.12+, Terminal | CLI de automatización |
| **02. Arquitectura** | Inyección de dependencias y Clean Code | Pydantic, Pytest | API REST modular |
| **03. Datos & ETL** | Extracción concurrente y persistencia | Asyncio, DuckDB, SQLite | Agregador de feeds |
| **04. Despliegue** | Containerización y pipelines | Docker, GitHub Actions | Contenedor en prod |

---

## 03. Patrón de Referencia: Extracción Asíncrona

A continuación se muestra el patrón estándar implementado en el módulo de sincronización de fuentes:

```python
import asyncio
from typing import Any, Dict, List
import httpx


async def fetch_feed(client: httpx.AsyncClient, endpoint: str) -> Dict[str, Any]:
    """Consume endpoints comunitarios de forma no bloqueante."""
    response = await client.get(endpoint, timeout=10.0)
    response.raise_for_status()
    return response.json()


async def main() -> None:
    endpoints = [
        "https://cron-quiles.org/data/mexico.json",
        "https://api.shellaquiles.org/v1/status",
    ]
    async with httpx.AsyncClient() as client:
        tasks = [fetch_feed(client, url) for url in endpoints]
        results = await asyncio.gather(*tasks)

    print(f"Feeds procesados: {len(results)}")


if __name__ == "__main__":
    asyncio.run(main())

```

---

## 04. Criterios de Calidad y Contribución

> [!TIP]
> Antes de abrir un Pull Request, ejecuta la verificación estática local:
>
> ```bash
> ruff check . && mypy .
>
> ```
>
>

* `// ESTILO` — **Estándar PEP 8:** Formateo y documentación obligatoria bajo PEP 8 y PEP 257.

* `// TESTING` — **Cobertura de Pruebas:** Mínimo del 85% de cobertura con `pytest` en módulos de lógica de negocio.

* `// REVISIÓN` — **Discusión Abierta:** Propuestas y seguimiento de features en GitHub Issues y el canal técnico de Telegram.



---

## 05. Repositorios y Acceso

* **Repositorio Central:** [github.com/shellaquiles/pyquiles-al-pastor](https://github.com/shellaquiles)

* **Canal Comunitario:** [t.me/shellaquiles](https://t.me/shellaquiles)


```text
STATUS: 200 OK // CURRICULUM: PYTHON_MODERN // SYS: SHELLAQUILES.ORG

```
