---
title: "Hit-Tazos Tech: Trivia Cronológica Técnica y Preservación de la Historia Computacional"
subtitle: "Un mazo enciclopédico de 576 cartas rigurosamente auditadas, pliegos Print & Play y motor web 3D para ordenar en el tiempo los cimientos de la computación."
author: "pixelead0 & Shellaquiles.org"
date: "2026-09-13"
category: "PROYECTOS"
tags: ["hit-tazos-tech", "board-game", "juego-de-mesa", "trivia-cronologica", "linux", "python", "cypherpunks", "print-and-play", "open-source"]
version: "v1.1.1"
lang: "es"
---

# $ cat proyectos/hit_tazos_tech.txt

> [!NOTE]
> **Definición de Sistema:** **Hit-Tazos Tech** es una obra libre de cartas y trivia cronológica técnica del ecosistema `{{ shellaquiles.org }}`. Desafía a desarrolladores, administradores de sistemas y hackers a reconstruir en el tiempo los hitos estructurales de la computación mediante una baraja maestra de **576 cartas auditadas en 4 niveles**, pliegos vectoriales *Print & Play* para imprenta profesional y una aplicación web interactiva 3D libre de empaquetadores pesados (*Zero-Bundler*).

<div class="post-preview-image">
  <img src="/assets/previews/hit-tazos-tech.png" alt="Hit-Tazos Tech — Portada y Baraja Canónica" class="post-preview-img">
</div>

> [!TIP]
> **Acciones del Proyecto:**  
> <a href="https://shellaquiles.github.io/hit-tazos-tech/" target="_blank" rel="noopener" class="btn btn-main"><i data-lucide="play"></i> Jugar en Línea (Web 3D) ↗</a> &nbsp;
> <a href="https://github.com/shellaquiles/hit-tazos-tech/releases/latest" target="_blank" rel="noopener" class="btn btn-outline"><i data-lucide="download"></i> Descargar PDFs de Imprenta ↗</a> &nbsp;
> <a href="https://github.com/shellaquiles/hit-tazos-tech" target="_blank" rel="noopener" class="btn btn-outline"><i data-lucide="github"></i> Repositorio GitHub ↗</a>

---

## 01. La Génesis: Por qué la computación requería rigor de hierro en sobremesa

Los juegos convencionales de ordenamiento temporal demostraron que deducir si un evento ocurrió antes o después de otro genera una dinámica social intensa y estimulante. Sin embargo, en el mercado comercial la tecnología se reduce con frecuencia a anécdotas corporativas superficiales que omiten la ingeniería real: los protocolos RFC, la arquitectura de silicio, los compiladores y las batallas criptográficas por la privacidad digital.

Para combatir ese fallo sistémico en la divulgación técnica, bajo la visión estratégica de `@pixelead0` y la comunidad `{{ shellaquiles.org }}`, concebimos **Hit-Tazos Tech**: una herramienta de pedagogía y memoria histórica que combina la nostalgia física de los **tazos coleccionables** con el estándar editorial más riguroso de la ingeniería de software.

¿En qué orden cronológico exacto sucedieron estos hitos fundacionales?
* `// KERNEL` — El mensaje de Linus Torvalds en `comp.os.minix` anunciando Linux (1991).
* `// PYTHON` — La introducción del cerrojo global del intérprete (GIL) por Guido van Rossum (1992).
* `// NETWORKS` — La publicación de la especificación original de DNS por Paul Mockapetris en el RFC 882 (1983).
* `// CYPHERPUNKS` — La liberación del código fuente de PGP por Phil Zimmermann (1991).
* `// HARDWARE` — El lanzamiento del microprocesador Intel 4004 de 4 bits (1971).

---

## 02. La Baraja Maestra: 576 Cartas en 8 Volúmenes Canónicos

La excelencia técnica no admite atajos ni improvisaciones. El mazo completo abarca **576 tarjetas rigurosamente investigadas**, estructuradas en una taxonomía cerrada de 8 volúmenes:

| Vol | Slug Canónico | Cartas | Cobertura Temática Clave |
| :---: | :--- | :---: | :--- |
| **0** | `kernel-foundations` | 128 | Von Neumann, lógica booleana, lenguaje C, Unix, núcleo Linux, transistores y papers pioneros de IA. |
| **1** | `cypherpunks-hacker-lore` | 64 | Criptografía asimétrica, Manifiesto Cypherpunk, PGP, FOSS, Tor, WikiLeaks y Bitcoin. |
| **2** | `embedded-silicon-hardware` | 64 | Intel 4004, arquitecturas CISC/RISC, ARM, microcontroladores PIC, Arduino, ESP32 y Raspberry Pi. |
| **3** | `unix-sysadmin-networks` | 64 | Filosofía Unix, TCP/IP, DNS, SSH, HTTP, BGP, cortafuegos y administración de servidores. |
| **4** | `backend-distributed-systems` | 64 | Bases de datos relacionales, NoSQL, Redis, Apache Kafka, GraphQL y patrones de concurrencia. |
| **5** | `cloud-containers-sre` | 64 | Cgroups, KVM, Docker, Kubernetes, Terraform, observabilidad y cultura SRE. |
| **6** | `python-track` | 64 | Creación por Guido van Rossum, evolución de PEPs históricos, GIL, decoradores, asyncio y tipado estático. |
| **7** | `scifi-pop-culture-cinema` | 64 | Literatura ciberpunk (*Neuromante*), películas de culto (*WarGames*, *Tron*, *The Matrix*) y hacktivismo pop. |

Cada volumen opera bajo un archivo fuente JSON independiente (`data/volumes/vol*.json`), compilándose hacia la baraja unificada mediante un pipeline reproducible en Node.js (`npm run build`).

---

## 03. Protocolo de Auditoría Editorial en 4 Niveles (Cero Spoilers)

Para garantizar que el juego transfiera sabiduría verificable sin distorsiones novelescas, cada tarjeta aprueba un protocolo de auditoría registrado en `data/audit.json`:

* `// NIVEL_1: FACTUAL` — Comprobación matemática de fechas, personas, causales y versiones de software o hardware sin anacronismos.
* `// NIVEL_2: FUENTE` — Todo hecho está respaldado por fuentes primarias: RFCs, PEPs, repositorios oficiales, artículos arbitrados o comunicados de vendor.
* `// NIVEL_3: PEDAGÓGICO` — **Una carta = una sola idea principal.** Sin sobrecarga cognitiva ni atajos conceptuales engañosos.
* `// NIVEL_4: EDITORIAL` — Tono sobrio y profesional. Prohibido el lenguaje sensacionalista (*"revolucionó para siempre"*, *"estándar indiscutible"*). Presupuestos de caracteres estrictos para imprenta física:
  - **Autor:** $\le 45$ caracteres.
  - **Hito (Anverso):** $\le 145$ caracteres con la entidad clave en negritas y **cero menciones del año**.
  - **Trivia (Reverso):** $\le 150$ caracteres de contexto técnico.

---

## 04. Arquitectura Web: "Don't Reinvent the Wheel" y Doble Experiencia

Fieles al principio de sobriedad de `{{ shellaquiles.org }}`, el motor web fue programado en **Vanilla JavaScript moderno (ES Modules nativos)** sin empaquetadores obligatorios (*Zero-Bundler*).

La aplicación ofrece dos modalidades de juego intercambiables:

* `// FORMATO_HIT_TAZO` — **Disco Físico Circular 3D:** Interfaz retro con bisel dorado CNC, muescas perimetrales de ensamble, dial arqueado continuo (1950–2026) y tipografía circular sobre radio seguro ($r=112$).
* `// FORMATO_HIT_CARDS` — **Tarjeta de Sobremesa 65x65 mm:** Diseño plano contemporáneo con navegación en abanico (*card fanning*) y motor de búsqueda difusa con *Fuse.js*.

El sistema de puntuación arcade premia la precisión (+3 puntos por acierto exacto, +1 con margen de $\pm 2$ años) y penaliza con -5 puntos el desbloqueo forzado del año, entregando retroalimentación térmica cualitativa (`CALIENTE`, `TIBIO`, `FRÍO`) sin revelar la solución.

---

## 05. Print & Play Libre: Ingeniería de Imposición Profesional

Como aporte a la soberanía técnica comunitaria bajo **licencia MIT**, los pliegos de imprenta están calculados milimétricamente para reproducción en casa o imprenta comercial:

* **Geometría de Carta:** $65 \times 65\text{ mm}$ ($184.25\text{ pt}$) con esquinas redondeadas ($r=3\text{ mm}$).
* **Sangrado Técnico (Bleed):** $+3\text{ mm}$ por lado para guillotina.
* **Calles de Separación (Gutter):** $6\text{ mm}$ con marcas de corte perimetrales exteriores exclusivamente en los bordes del pliego, eliminando filetes negros internos.
* **Formatos Disponibles:**
  - **Carta (8.5 × 11 pulg):** Rejilla $2 \times 3$ (6 cartas/pliego, 192 páginas dúplex).
  - **Tabloide (11 × 17 pulg):** Rejilla $3 \times 5$ (15 cartas/pliego, 78 páginas dúplex).
  - **Super Tabloide (12 × 18 pulg):** Rejilla $3 \times 6$ (18 cartas/pliego, 64 páginas dúplex).
* **Reversos Espejados:** Cada fila $[A, B, C]$ del anverso se voltea automáticamente como $[C, B, A]$ en el reverso para coincidencia perfecta al corte dúplex.

Los 8 volúmenes en PDF de alta fidelidad se descargan directamente desde los **[Releases Oficiales de Hit-Tazos Tech en GitHub](https://github.com/shellaquiles/hit-tazos-tech/releases/latest)**.

---

## 06. Ejecución de Hierro y Bien Común

**Hit-Tazos Tech** no es un prototipo; es una obra terminada y en producción que demuestra la capacidad técnica y de diseño de nuestra comunidad.

Invitamos a toda la comunidad a jugarlo en línea, descargar los pliegos para sus dojos técnicos o clonar el repositorio para auditar y proponer nuevos volúmenes.

```bash
# Despliegue local inmediato:
git clone https://github.com/shellaquiles/hit-tazos-tech.git
cd hit-tazos-tech
npm run serve
```

¡Hacia la perfección técnica y el bien común del ecosistema digital!
