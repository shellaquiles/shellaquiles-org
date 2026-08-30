---
title: "Kitchen Sink: Demostración Integral de Sintaxis Markdown"
subtitle: "Documento de prueba para validar el pipeline de compilación y las reglas CSS del diseño suizo/editorial."
author: "pixelead0 & shellaquiles.org"
date: "2026-08-29"
category: "SISTEMA"
tags: ["markdown", "gfm", "kitchen-sink", "css-test"]
version: "v2.0.0"
lang: "es"
---

Este documento contiene todos los elementos sintácticos soportados por **GitHub Flavored Markdown (GFM)** para validar la jerarquía tipográfica, el contraste de color (#00ff66 sobre azabache) y la respuesta adaptativa de los componentes.

---

## 01. Jerarquía de Encabezados

# Encabezado Nivel 1 (H1)
## Encabezado Nivel 2 (H2)
### Encabezado Nivel 3 (H3)
#### Encabezado Nivel 4 (H4)
##### Encabezado Nivel 5 (H5)
###### Encabezado Nivel 6 (H6)

---

## 02. Formato de Texto y Énfasis

Puedes aplicar estilos de texto básicos:
* Texto en **negrita** o __negrita alternativa__.
* Texto en *cursiva* o _cursiva alternativa_.
* Texto con ***negrita y cursiva combinadas***.
* Texto ~~tachado con doble tilde~~.
* Texto en `código inline monospaced` para variables o comandos.
* Enlaces externos: [Sitio oficial de Shellaquiles](https://shellaquiles.org) y [Repositorio en GitHub](https://github.com/shellaquiles).

---

## 03. Bloques de Alerta y Callouts (GFM Alerts)

> [!NOTE]
> Información relevante que los usuarios deben conocer mientras leen el documento técnico.

> [!TIP]
> Consejos prácticos y atajos de teclado para optimizar el flujo de trabajo en la terminal.

> [!IMPORTANT]
> Información crucial requerida para el éxito de la compilación del proyecto.

> [!WARNING]
> Acción crítica que puede demandar atención inmediata del usuario para evitar inconsistencias.

> [!CAUTION]
> Consecuencias negativas o riesgos directos al ejecutar un comando destructivo.

---

## 04. Listas y Checklists

### Lista Desordenada Simple
* Primer elemento del nivel raíz
  * Elemento anidado de segundo nivel
    * Elemento anidado de tercer nivel
* Segundo elemento de la raíz
* Tercer elemento con enlace a [Cron-Quiles](https://cron-quiles.org)

### Lista Numerada Secuencial
1. Clonar el repositorio localmente con Git.
2. Instalar las dependencias con el gestor de paquetes.
3. Compilar los archivos Markdown hacia HTML estático.
4. Ejecutar las pruebas unitarias y de integración.

### Listas de Tareas (Task Lists / Checklists)
- [x] Configurar tipografía base Geist y Geist Mono.
- [x] Definir tokens de diseño para modo claro y modo Matrix oscuro.
- [x] Ajustar la cuadrícula de tarjetas a bordes de 1px.
- [ ] Optimizar la inyección automática de JSON-LD para eventos.
- [ ] Automatizar la generación de feeds RSS/iCal.

---

## 05. Tablas Estructuradas (Pipe Tables)

| Identificador | Módulo del Sistema | Estado | Cobertura | Tipo de Salida |
| :--- | :--- | :---: | ---: | :--- |
| `MOD-01` | **Pipeline ETL (Python)** | 🟢 Activo | 94.5% | JSON / ICS |
| `MOD-02` | **Motor de Plantillas** | 🟢 Activo | 88.0% | HTML5 Estático |
| `MOD-03` | **Inyector Schema.org** | 🟡 En pausa | 62.1% | JSON-LD Inline |
| `MOD-04` | **Daemon de Sincronización** | 🔴 Inactivo | 0.0% | Background Process |

---

## 06. Bloques de Código con Sintaxis Resaltada

### Python (Async ETL Pipeline)
```python
import asyncio
from typing import List, Dict

async def sync_community_events(feed_urls: List[str]) -> Dict[str, int]:
    """Descarga y normaliza feeds de eventos en paralelo."""
    print(f"[+] Iniciando procesamiento de {len(feed_urls)} comunidades...")
    await asyncio.sleep(0.5)
    return {"status": 200, "processed": len(feed_urls)}

if __name__ == "__main__":
    feeds = ["https://luma.com/feed.ics", "https://meetup.com/feed.ics"]
    result = asyncio.run(sync_community_events(feeds))
    print(f"[OK] Sincronización completa: {result}")
```

### Bash / Shell Scripting

```bash
#!/usr/bin/env bash
set -euo pipefail

# Compilar artículos con Pandoc hacia la carpeta pública
echo "[BUILD] Generando HTML desde archivos Markdown..."
pandoc example.md \
  --from markdown+gfm \
  --to html5 \
  --template templates/post.html \
  --output public/example.html

echo "[DONE] Compilación completada con éxito."
```

### JSON Estructurado

```json
{
  "platform": "CRON-QUILES",
  "version": "2.0.0",
  "maintainer": {
    "name": "pixelead0",
    "organization": "Shellaquiles"
  },
  "status": "ready"
}
```

---

## 07. Citas en Bloque y Citas Anidadas

> "El diseño suizo no es la ausencia de elementos, sino la presencia estricta de la estructura, la retícula y la claridad tipográfica."
> — *Directriz de Arquitectura Visual*

---

## 08. Notas al Pie (Footnotes)

Shellaquiles impulsa el talento técnico en todo México mediante proyectos de código abierto y meetups comunitarios regulares.
