# Pyquiles al Pastor: Arquitectura y Ruta de Aprendizaje

Aprende desarrollo en Python moderno mediante proyectos prácticos de producción, patrones de diseño y metodologías de ingeniería de software. 100% abierto y comunitario.

> [!NOTE]
> **Versión del Curso:** v2.4.0  
> **Requisitos Previos:** Conocimientos básicos de terminal y Git.  
> **Comunidad:** Mantenido por el ecosistema de [shellaquiles.org](https://shellaquiles.org) y liderado por `@pixelead0`.

---

## 01. Metodología de Ejecución

El programa no se basa en ejercicios sintéticos aislados, sino en la construcción iterativa de herramientas reales:

- [x] **Entornos Aislados:** Configuración con `uv`, `poetry` y contenedores Docker.
- [x] **Tipado Estricto:** Validación en tiempo de compilación con `mypy` y `pydantic`.
- [x] **Pipelines ETL & Concurrencia:** Procesamiento asíncrono con `asyncio` y `multiprocessing`.
- [ ] **Despliegue Continuo:** GitHub Actions hacia entornos serverless.

---

## 02. Mapa Curricular y Módulos

| Nivel | Enfoque Principal | Tecnologías / Herramientas | Salida Esperada |
| :--- | :--- | :--- | :--- |
| **01. Fundamentos** | Tipos de datos, OOP y control de flujo | Python 3.12+, Terminal | CLI de automatización |
| **02. Arquitectura** | Inyección de dependencias, Clean Code | Pydantic, Pytest | API REST modular |
| **03. Datos & ETL** | Extracción paralela y persistencia | Asyncio, DuckDB, SQLite | Agregador de feeds |
| **04. Despliegue** | Containerización y pipelines | Docker, GitHub Actions | Contenedor en prod |

---

## 03. Ejemplo Práctico: Extracción Asíncrona

A continuación se muestra el patrón estándar utilizado en el módulo de sincronización:

```python
import asyncio
import httpx

async def fetch_feed(endpoint: str) -> dict:
    """Consume endpoints comunitarios de forma no bloqueante."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(endpoint)
        response.raise_for_status()
        return response.json()

async def main():
    endpoints = [
        "https://cron-quiles.org/data/mexico.json",
        "https://api.shellaquiles.org/v1/status"
    ]
    results = await asyncio.gather(*(fetch_feed(url) for url in endpoints))
    print(f"Feeds procesados: {len(results)}")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 04. Reglas de Contribución

> [!TIP]
> Antes de abrir un Pull Request, ejecuta los linters locales para verificar formato y tipado:
> `ruff check . && mypy .`

- **Rigor Técnico:** Código documentado siguiendo especificaciones PEP 8 y PEP 257.
- **Pruebas Automatizadas:** Cobertura mínima del 85% en módulos de lógica de negocio.
- **Colaboración Abierta:** Discusión de features en los canales de Telegram y GitHub Issues.

---

## 05. Conclusión y Recursos

- **Repositorio Central:** [github.com/shellaquiles/pyquiles-al-pastor](https://github.com/shellaquiles)
- **Canal Comunitario:** [t.me/shellaquiles](https://t.me/shellaquiles)
