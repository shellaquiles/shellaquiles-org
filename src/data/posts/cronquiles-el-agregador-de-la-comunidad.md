# Cron-Quiles: El Latido de la Comunidad

### *Sincronizando el pulso tecnológico de México*

---

## ¿Qué es?

**Cron-Quiles** es el agregador oficial de eventos de la comunidad Shellaquiles, desarrollado en colaboración con **pixelead0**. Su nombre es un juego de palabras que rinde homenaje a nuestras raíces técnicas: **Cron** por el comando de programación de tareas en Linux y **Quiles** por Shellaquiles.

Es un motor de datos de código abierto diseñado para centralizar y difundir todas las actividades, meetups, talleres y conferencias de tecnología en México.

En un ecosistema donde la información suele estar fragmentada en múltiples plataformas, **Cron-Quiles** actúa como el punto de encuentro único, actualizándose automáticamente cada 6 horas para asegurar que nadie se quede fuera de la conversación técnica.

---

## ¿Por qué es importante?

### Visibilidad para todos
Ayudamos a que las comunidades pequeñas y grandes tengan el mismo nivel de exposición, asegurando que sus eventos lleguen a las personas indicadas en todo el país.

### Automatización y Datos Abiertos
No es solo un calendario manual. El sistema utiliza un pipeline automatizado que consume feeds de diversas fuentes (Meetup, Luma, etc.) y los normaliza en formatos abiertos (WebCal, ICS y JSON) para que cualquiera pueda integrarlos en sus propias herramientas o automatizaciones.

---

## Novedades en la v1.5.0

La evolución del proyecto nos ha llevado a convertir lo que era un simple agregador en un motor robusto de datos tech. Estas son las últimas actualizaciones:

✅ **Lógica Multi-estado**: Generación dinámica de calendarios específicos para CDMX, Jalisco (JAL), Puebla (PUE) y Nuevo León (NLE).
✅ **Smart Scraper**: Capacidad de extraer ubicaciones reales de Meetup que los archivos ICS estándar suelen omitir.
✅ **Automated CI**: Persistencia de caché geográfico y geocodificación mediante la API de Google Maps para mayor precisión.
✅ **Terminal UI**: Una interfaz web interactiva con pestañas reactivas y modo oscuro por defecto, fiel a nuestra estética.

---

## Cómo funciona el ecosistema

| Componente       | Descripción                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **Repositorio**  | El código base donde vive la lógica de agregación y los feeds de datos.  |
| **Dashboard**    | La interfaz visual donde puedes consultar la agenda en tiempo real.      |
| **Feeds YAML**   | Archivos de configuración simples donde se dan de alta las comunidades.  |
| **Exportación**  | Salidas en formato .ics, WebCal y JSON para máxima compatibilidad.       |

---

## Principios de Cron-Quiles

1. **Abrir, no cerrar** — los datos pertenecen a la comunidad y son libres de ser consumidos.
2. **Conectar, no absorber** — no buscamos reemplazar a las plataformas existentes, sino conectarlas.
3. **Construir, no solo hablar** — preferimos un Pull Request que solucione un problema a una larga discusión.

---

## ¿Quieres que tu comunidad aparezca aquí?

¡Es muy sencillo participar! Solo tienes que seguir estos pasos:

1. **Haz un Fork** del repositorio oficial: [github.com/shellaquiles/cron-quiles](https://github.com/shellaquiles/cron-quiles).
2. **Añade tu feed** en la carpeta de configuraciones.
3. **Envía un Pull Request**.

Una vez aprobado, tus eventos se sincronizarán automáticamente con el dashboard y los calendarios de toda la comunidad.

---

## Conclusión

**Cron-Quiles** es más que una herramienta técnica; es el esfuerzo colectivo por mantener viva y conectada la red de talento en nuestro país. Si quieres estar al tanto de cada meetup o workshop en México, esto te va a simplificar la vida.

**¡Sincroniza tus relojes y nos vemos en el próximo meetup!**

**¡Cada bit cuenta!**
