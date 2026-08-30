---
title: "PEP 8: Estándar de Estilo y Convenciones en Python"
subtitle: "Especificaciones de formateo, nomenclatura y buenas prácticas de ingeniería para bases de código legibles y mantenibles."
author: "pixelead0 & Shellaquiles.org"
date: "2026-08-29"
category: "TUTORIAL"
tags: ["python", "pep8", "clean-code", "linters", "buenas-practicas"]
version: "v2.0.0"
lang: "es"
---

> [!NOTE]
> **Especificación Oficial:** **PEP 8** (Python Enhancement Proposal 8) es la guía de estilo canónica del lenguaje. Su objetivo es garantizar la consistencia, legibilidad y mantenibilidad del código a lo largo de proyectos y equipos de desarrollo.

---

## 01. Por Qué Importa el Estándar

El código se lee considerablemente más veces de las que se escribe. Seguir un estándar estricto reduce la sobrecarga cognitiva durante las revisiones de código (PRs), previene inconsistencias de formato entre desarrolladores y facilita la integración en proyectos abiertos donde colaboran múltiples personas.

---

## 02. Convenciones Fundamentales de Formateo

* `// INDENTACIÓN` — **4 Espacios:** Uso estricto de 4 espacios por nivel; los tabuladores quedan excluidos.
* `// LÍNEAS` — **Límite de Longitud:** Máximo de 79 caracteres por línea para texto/código base (88 caracteres si se utiliza Black).
* `// ESPACIADO` — **Operadores y Comas:** Un espacio alrededor de operadores de asignación y comparación (`x = 1 + 2`), y un espacio posterior tras cada coma (`[1, 2, 3]`).
* `// COMPARACIONES` — **Singletons y Booleanos:** Usar `is` / `is not` para comparar con `None` (`if x is None:`). Evitar comparaciones explícitas con `True` o `False`.

---

## 03. Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
| :--- | :--- | :--- |
| **Funciones y Métodos** | `snake_case` | `def calcular_promedio(numeros):` |
| **Variables** | `snake_case` | `total_items = 42` |
| **Clases** | `PascalCase` | `class UsuarioManager:` |
| **Constantes** | `UPPER_SNAKE_CASE` | `MAX_RETRIES = 5` |
| **Módulos y Paquetes** | `snake_case` corto | `import etl_service` |

---

## 04. Estructura de Imports

Los módulos deben organizarse en tres bloques separados por una línea en blanco, ordenados alfabéticamente dentro de cada sección:

```python
# 1. Biblioteca estándar
import os
import sys

# 2. Dependencias de terceros
import httpx
import pydantic

# 3. Módulos locales del proyecto
from mi_proyecto.core import config
from mi_proyecto.models import Usuario

```

---

## 05. Refactorización: Caso Práctico

### Código No Estándar (Violación de Reglas)

```python
def CalcularPromedio(Numeros):
    if len(Numeros)==0:
        return 0
    return sum(Numeros)/len(Numeros)

class usuario:
    def __init__(self,nombre,edad):
        self.nombre=nombre
        self.edad=edad

```

### Código Normalizado (PEP 8 Compliant)

```python
from typing import Sequence


def calcular_promedio(numeros: Sequence[float]) -> float:
    """Calcula el promedio aritmético de una secuencia numérica."""
    if not numeros:
        return 0.0
    return sum(numeros) / len(numeros)


class Usuario:
    """Entidad de usuario del sistema."""

    def __init__(self, nombre: str, edad: int) -> None:
        self.nombre = nombre
        self.edad = edad

```

---

## 06. Tooling y Automatización en CI

> [!TIP]
> No formatees manualmente. Integra herramientas de análisis estático y formateadores automáticos en tu pipeline de pre-commit y CI.
>
>

| Herramienta | Función Técnica | Comando |
| --- | --- | --- |
| **Ruff** | Linter y formateador ultrarrápido (Rust) | `ruff check . && ruff format .` |
| **Flake8** | Verificador de estilo y sintaxis PEP 8 | `flake8 src/`<br> |
| **Black** | Formateador de código determinista y estricto | `black src/`<br> |
| **Mypy** | Verificador estático de tipado (Type Hints) | `mypy src/` |

```bash
# Ejemplo de verificación rápida en entorno local
pip install ruff mypy
ruff check .
mypy .

```

---

## 07. Referencias

* **PEP 8 Specification:** [peps.python.org/pep-0008](https://peps.python.org/pep-0008/)

* **PEP 257 (Docstring Conventions):** [peps.python.org/pep-0257](https://peps.python.org/pep-0257/)

```text
STATUS: 200 OK // COMPLIANCE: PEP8 // LINTER: RUFF // SYS: SHELLAQUILES.ORG

```
