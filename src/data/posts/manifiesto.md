---
title: "El Manifiesto de Shellaquiles: Principios de Ingeniería y Comunidad Abierta"
subtitle: "Directrices de arquitectura, desarrollo de software libre y colaboración técnica en México."
author: "pixelead0 & Comunidad Shellaquiles"
date: "2025-08-28"
category: "MANIFIESTO"
tags: ["manifiesto", "open-source", "ingenieria", "cultura-dev", "infraestructura"]
version: "v2.0.0"
lang: "es"
---

> [!NOTE]
> **Identidad del Ecosistema:** **Shellaquiles** es una iniciativa de desarrollo de software e infraestructura comunitaria. Combinamos la precisión y el control de la terminal (*Shell*) con la colaboración distribuida y el contexto técnico de México (*Chilaquiles*).

---

## 01. Contexto y Propósito

La industria tecnológica suele oscilar entre dos extremos poco productivos: la retórica corporativa vacía y las iniciativas comunitarias que mueren por falta de estructura y rigor técnico.

**Shellaquiles** existe para cerrar esa brecha. No somos una academia tradicional ni un foro de discusión pasivo; somos un **laboratorio de ejecución técnica y desarrollo abierto**. Nuestro objetivo es construir herramientas funcionales, mantener servicios públicos para desarrolladores y elevar el estándar de la ingeniería de software local mediante código en producción.

Creemos que la mejor manera de aprender, transferir conocimiento y crear oportunidades profesionales de alto nivel es participando en proyectos con usuarios reales, pruebas automatizadas, pipelines de integración continua y estándares arquitectónicos estrictos.

---

## 02. Filosofía de Ingeniería

Nuestras decisiones de diseño, infraestructura y comunidad se rigen por cuatro principios fundamentales:

* `// EJECUCIÓN` — **Menos Burocracia, Más Código en Producción:** Las ideas tienen valor cuando se implementan. Priorizamos prototipos funcionales, Pull Requests bien documentados y métricas verificables por encima de discusiones teóricas interminables.
* `// RIGOR` — **Calidad desde el Primer Commit:** El software abierto debe cumplir con los mismos o mayores estándares que un entorno crítico de producción. Tipado estricto, linters automáticos, suites de pruebas y documentación clara son obligatorios, no opcionales.
* `// ACCESO` — **Transferencia Horizontal de Conocimiento:** Eliminamos el credencialismo formal. La experiencia técnica se comparte de manera abierta entre desarrolladores novatos y experimentados a través de revisiones de código transparentes y sesiones prácticas.
* `// AUTONOMÍA` — **Herramientas Locales con Estándar Global:** Desarrollamos soluciones e infraestructura diseñadas para las necesidades de nuestro entorno (como agregadores de eventos, APIs y datos abiertos), utilizando arquitecturas modernas y escalables.

---

## 03. Valores Operativos

| Principio | Criterio de Aplicación en Proyectos |
| :--- | :--- |
| **Preferencia Open Source** | Todo proyecto core se publica bajo licencias permisivas (MIT, Apache 2.0) en repositorios públicos. |
| **Pragmatismo Tecnológico** | Elegimos lenguajes y herramientas según el problema real (rendimiento, simplicidad y mantenibilidad), no por modas del mercado. |
| **Arquitectura Mantenible** | Diseñamos sistemas modulares con bajo acoplamiento, alta cohesión y documentación reproducible. |
| **Colaboración por Pares** | Ningún cambio crítico llega a la rama principal sin revisión técnica constructiva y validación en CI. |
| **Transparencia Total** | Hojas de ruta, registros de decisiones arquitectónicas (ADRs) y métricas de infraestructura son de consulta pública. |

---

## 04. Ejes del Ecosistema

El trabajo de la comunidad se organiza en tres pilares interconectados:

### A. Infraestructura y Proyectos Públicos
Diseño y mantenimiento de herramientas de uso libre para la comunidad tecnológica en México, tales como el calendario unificado [Cron-Quiles](https://cron-quiles.org), scrapers de datos públicos y servicios de automatización.

### B. Talleres y Transferencia Técnica
Espacios prácticos de formación continua enfocados en backend, Python moderno, entornos Linux, sistemas distribuidos, optimización de pipelines y modelos locales de inteligencia artificial.

### C. Espacios de Difusión (Bits de Conocimiento)
Protocolo de charlas relámpago de 10 minutos diseñadas para documentar flujos de trabajo, resolución de incidencias en producción y buenas prácticas de ingeniería sin intermediarios ni jerarquías.

---

## 05. Modelo de Gobernanza y Liderazgo

Shellaquiles opera bajo un modelo de coordinación técnica liderado por **@pixelead0** y un grupo de mantenedores de repositorios:

1. **Meritocracia por Contribución:** Las decisiones técnicas sobre arquitectura y dependencias se respaldan con pruebas de concepto, benchmarks y consenso en Pull Requests.
2. **Revisión Abierta:** Cualquier miembro puede proponer cambios al ecosistema abriendo un *RFC (Request for Comments)* o un *Issue* en GitHub.
3. **Mantenimiento Sostenible:** La infraestructura se gestiona con costos controlados, priorizando sitios estáticos, scripts eficientes y despliegues ligeros que garanticen la continuidad de los proyectos a largo plazo.

---

## 06. Protocolo de Participación

> [!TIP]
> No necesitas pedir permiso para comenzar a construir. La plataforma es abierta y está lista para recibir mejoras.

```bash
# 1. Clona los proyectos base del ecosistema
git clone https://github.com/shellaquiles/shellaquiles-org.git
git clone https://github.com/shellaquiles/cron-quiles.git

# 2. Revisa la lista de tareas y requerimientos
# Busca etiquetas: 'help wanted', 'enhancement' o 'good first issue'

# 3. Sincroniza con el equipo en tiempo real
# Telegram: https://t.me/shellaquiles
```
