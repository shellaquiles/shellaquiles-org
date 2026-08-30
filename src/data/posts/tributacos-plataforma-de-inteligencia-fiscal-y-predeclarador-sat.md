---
title: "tribuTACOS: Toma el Control de tus Impuestos y Pre-Declara ante el SAT sin Sorpresas"
subtitle: "Una plataforma Open Source para procesar tus facturas XML (CFDI 3.3/4.0), simular pagos de ISR e IVA y calcular tu saldo a favor en la Declaración Anual."
author: "pixelead0 & Shellaquiles.org"
date: "2026-08-26"
category: "PROYECTOS"
tags: ["tributacos", "sat-mexico", "predeclarador-sat", "cfdi-4-0", "isr-e-iva", "deducciones-personales", "fastapi", "nextjs"]
version: "v1.0.1"
lang: "es"
---

> [!NOTE]
> **Definición de Sistema:** **tribuTACOS** es una plataforma Open Source de análisis, proyección y simulación fiscal que procesa comprobantes XML (**CFDI 3.3 y 4.0**) y declaraciones en PDF del SAT, calculando por anticipado y bajo el principio de **flujo de efectivo** los Pagos Provisionales Mensuales (ISR/IVA) y la Declaración Anual.

> [!TIP]
> <i data-lucide="github"></i> **Repositorio GitHub:** [github.com/shellaquiles/tribuTACOS](https://github.com/shellaquiles/tribuTACOS)  
> <i data-lucide="globe"></i> **Sitio Web:** [shellaquiles.org](https://shellaquiles.org)

---

## 01. El Problema: La incertidumbre de los impuestos y las sorpresas del SAT

Para cualquier profesionista independiente, consultor por honorarios o empleado en México (Régimen de Servicios Profesionales, Actividad Empresarial o Sueldos y Salarios), la relación con el SAT suele estar llena de incertidumbre:

1. **Incertidumbre mensual:** ¿Cuánto me toca pagar de ISR e IVA este mes?
2. **Retenciones desalineadas:** ¿Mis clientes me hicieron bien las retenciones del 10% de ISR?
3. **Saldo a favor incierto:** ¿Llegaré a abril con un saldo a favor en la Declaración Anual o con una deuda inesperada?
4. **Suboptimización de deducciones:** ¿Estoy aprovechando correctamente mis gastos médicos y facturas deducibles o se me están pasando los límites en UMAs (Art. 151 LISR)?

Para resolver estas dudas con transparencia y matemáticas claras creamos **tribuTACOS**.

---

## 02. La Solución: Simulación Fiscal Determinista

tribuTACOS es una plataforma web de código abierto que analiza tus facturas electrónicas (**CFDI 3.3 y 4.0 en XML**) y las declaraciones oficiales del SAT en PDF. El sistema simula tu contabilidad en tiempo real bajo el principio de **flujo de efectivo** (lo efectivamente cobrado y pagado), calculando tus Pagos Provisionales Mensuales y tu Declaración Anual de forma determinista.

![Tablero de Control Global](manual_usuario/img/01_dashboard_global.png)
*Figura 1: Tablero principal con la visión consolidada de ingresos, gastos y proyección de impuestos.*

### Directrices y Módulos Clave

* `// FLUJO DE EFECTIVO` — **Pre-Declaración Mensual:** Simula pagos provisionales de ISR e IVA basándose en facturas cobradas (PUE) y complementos de pago (PPD), con control automático del **arrastre de saldos a favor de IVA** (Art. 5 y 6 LIVA).
* `// CASCADA FISCAL` — **Declaración Anual (Art. 152 LISR):** Proyecta el impuesto anual en 5 pasos: `Ingresos Acumulables` ➔ `Deducciones Personales` ➔ `Base Gravable` ➔ `ISR Determinado` ➔ `Saldo a Favor / A Cargo`.
* `// CLASIFICACIÓN SAT` — **c_ClaveProdServ Mapping:** Mapea automáticamente más de 52,000 claves oficiales del catálogo SAT para clasificar gastos en 8 rubros operativos.
* `// OPTIMIZADOR LEGAL` — **Deducciones Personales (Art. 151 LISR):** Audita medios de pago bancarizados obligatorios y aplica el tope legal (menor entre 15% de ingresos o 5 UMAs anuales).
* `// AUDITORÍA PUNTO A PUNTO` — **XML vs PDF Oficial:** Concilia los comprobantes XML cargados contra las declaraciones en PDF presentadas ante el SAT.

---

## 03. Matriz de Módulos del Sistema

| Módulo | Enfoque Operativo | Regla / Estándar SAT |
| :--- | :--- | :--- |
| **Tablero Global** | KPIs ejecutivos, saldo a favor proyectado e impuesto a cargo | Visión holística multirregimen |
| **Pre-Declaración Mensual** | Flujo de efectivo, pagos provisionales ISR e IVA | Art. 106 LISR / Art. 5-6 LIVA |
| **Declaración Anual** | Cascada fiscal de 5 pasos, tasa efectiva y marginal | Tarifa Art. 152 LISR |
| **Gastos y Egresos** | Clasificación taxonómica en 8 rubros y auditoría de pago | Catálogo `c_ClaveProdServ` |
| **Deducciones Personales** | Optimización de gastos médicos, colegiaturas y PPR | Art. 151 LISR / Topes UMA |
| **Auditoría y Conciliación** | Matriz comparativa XML vs PDF oficial | Control de acuses y líneas de captura |

---

## 04. Vistas de la Interfaz

### Pre-Declaración Mensual e IVA
![Pre-Declaración Mensual e IVA](manual_usuario/img/03_predeclaracion_mensual.png)
*Figura 2: Simulación de pagos provisionales mensuales con desglose de IVA a favor y retenciones.*

### Cascadas para la Declaración Anual
![Pre-Declaración Anual](manual_usuario/img/05_predeclaracion_anual.png)
*Figura 3: Desglose de la cascada fiscal para conocer tu tasa efectiva y proyección anual.*

### Optimizador de Deducciones Personales
![Deducciones Personales](manual_usuario/img/07_deducciones_personales.png)
*Figura 4: Control de gastos deducibles personales y topes en UMA.*

---

## 05. Stack Tecnológico de Grado Industrial

* **Backend:** Python 3.11+, FastAPI 0.141, SQLAlchemy 2.0, Pydantic v2, `lxml`, `pdfplumber`.
* **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS.
* **Base de datos:** SQLite local (`tributacos.db`) o PostgreSQL.

---

## 06. Guía de Inicio Rápido

> [!TIP]
> El proyecto cuenta con un `Makefile` integral para levantar la plataforma en pocos segundos.

```bash
# 1. Clonar el repositorio
git clone https://github.com/shellaquiles/tributacos.git
cd tributacos

# 2. Instalar dependencias y crear la base de datos de prueba
make setup

# 3. Iniciar el servidor (Backend en puerto 8000, Frontend en 3000)
make dev
```

Entra a `http://localhost:3000` en tu navegador para cargar tus facturas XML y comenzar a auditar tu información fiscal.

---

## 07. Preguntas Frecuentes

> [!IMPORTANT]
> **¿Mis facturas XML se envían a algún servidor externo?**  
> No. tribuTACOS está pensado para correr localmente en tu propia máquina. Toda la información de tus CFDIs se procesa en tu base de datos local de manera privada.

---

```text
STATUS: 200 OK // ENGINE: FASTAPI+NEXTJS15 // TAX_YEAR: 2026 // SYS: SHELLAQUILES.ORG
```
