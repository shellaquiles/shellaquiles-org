# PEP 8: Guía de Estilo para Python

### *Escribe código Python que otros puedan leer y mantener*

---

## ¿Qué es PEP 8?

**PEP 8** (Python Enhancement Proposal 8) es la **guía de estilo oficial** para escribir código Python. Fue creada por Guido van Rossum, Barry Warsaw y Nick Coghlan en 2001, y se ha convertido en el estándar de facto para la comunidad Python.

PEP 8 no es solo una lista de reglas arbitrarias; es un conjunto de **convenciones** que ayudan a hacer el código más legible, consistente y mantenible.

---

## ¿Por qué es importante?

### Legibilidad

El código se lee **muchas más veces** de las que se escribe. PEP 8 ayuda a que tu código sea fácil de entender para ti y para otros desarrolladores.

### Consistencia

Cuando todo el equipo sigue las mismas convenciones, el código se ve **uniforme** y es más fácil de navegar.

### Colaboración

Facilita el trabajo en equipo y la **colaboración en proyectos open source**, donde múltiples personas contribuyen código.

### Profesionalismo

Seguir PEP 8 demuestra que te importa la **calidad del código** y que eres parte de la comunidad Python.

---

## Reglas Principales

### 1. Indentación

Usa **4 espacios** por nivel de indentación. No uses tabs.

```python
# ✅ Correcto
def calcular_promedio(numeros):
    if len(numeros) == 0:
        return 0
    return sum(numeros) / len(numeros)

# ❌ Incorrecto (tabs o 2 espacios)
def calcular_promedio(numeros):
    if len(numeros) == 0:  # Usando tabs (incorrecto)
        return 0
    return sum(numeros) / len(numeros)
```

### 2. Longitud de Líneas

Mantén las líneas a un **máximo de 79 caracteres** (algunos equipos usan 88 o 99, pero 79 es el estándar PEP 8).

```python
# ✅ Correcto (línea corta)
def saludar(nombre):
    mensaje = f"Hola, {nombre}!"
    return mensaje

# ✅ Correcto (usando paréntesis para continuar)
resultado = (variable_uno + variable_dos +
             variable_tres + variable_cuatro)

# ❌ Incorrecto (línea muy larga)
resultado = variable_uno + variable_dos + variable_tres + variable_cuatro + variable_cinco + variable_seis
```

### 3. Espacios en Blanco

Usa espacios en blanco de forma consistente:

```python
# ✅ Correcto
x = 5
y = 10
resultado = x + y

# ❌ Incorrecto
x=5
y=10
resultado=x+y
```

**Después de comas:**

```python
# ✅ Correcto
lista = [1, 2, 3, 4]

# ❌ Incorrecto
lista = [1,2,3,4]
```

**Alrededor de operadores:**

```python
# ✅ Correcto
x = 5 + 3
y = 10 * 2

# ❌ Incorrecto
x = 5+3
y = 10*2
```

### 4. Nombres de Variables y Funciones

- **Funciones y variables**: `snake_case` (minúsculas con guiones bajos)
- **Constantes**: `UPPER_SNAKE_CASE` (mayúsculas con guiones bajos)
- **Clases**: `PascalCase` (primera letra de cada palabra en mayúscula)

```python
# ✅ Correcto
def calcular_promedio(numeros):
    """Calcula el promedio de una lista de números."""
    pass

PI = 3.14159
MAX_INTENTOS = 3

class UsuarioManager:
    pass

# ❌ Incorrecto
def CalcularPromedio(numeros):  # ❌ PascalCase para función
def calcularPromedio(numeros):  # ❌ camelCase
CALCULAR_PROMEDIO(numeros)      # ❌ Todo mayúsculas
```

### 5. Imports

Organiza los imports en este orden:

1. Imports de la biblioteca estándar
2. Imports de terceros
3. Imports locales/aplicación

Separa cada grupo con una línea en blanco.

```python
# ✅ Correcto
import os
import sys

import requests
import numpy

from mi_proyecto import utilidades
from mi_proyecto.models import Usuario
```

### 6. Comentarios y Docstrings

Usa docstrings para documentar funciones, clases y módulos:

```python
# ✅ Correcto
def calcular_promedio(numeros):
    """
    Calcula el promedio de una lista de números.

    Args:
        numeros: Lista de números enteros o flotantes.

    Returns:
        float: El promedio de los números, o 0 si la lista está vacía.
    """
    if len(numeros) == 0:
        return 0
    return sum(numeros) / len(numeros)
```

### 7. Espacios en Llamadas a Funciones

```python
# ✅ Correcto
funcion(arg1, arg2, arg3)

# ❌ Incorrecto
funcion( arg1, arg2, arg3 )
```

### 8. Comparaciones

```python
# ✅ Correcto
if x is None:
    pass

if x == True:  # Mejor: if x:
    pass

# ❌ Incorrecto
if x == None:  # ❌ Usa 'is None' en lugar de '== None'
    pass
```

---

## Ejemplos Prácticos

### Antes y Después

**Antes (no PEP 8):**

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

**Después (PEP 8):**

```python
def calcular_promedio(numeros):
    """
    Calcula el promedio de una lista de números.

    Args:
        numeros: Lista de números.

    Returns:
        float: El promedio o 0 si la lista está vacía.
    """
    if len(numeros) == 0:
        return 0
    return sum(numeros) / len(numeros)


class Usuario:
    """Representa un usuario en el sistema."""

    def __init__(self, nombre, edad):
        """
        Inicializa un nuevo usuario.

        Args:
            nombre: Nombre del usuario.
            edad: Edad del usuario.
        """
        self.nombre = nombre
        self.edad = edad
```

---

## Herramientas para Verificar PEP 8

### 1. `flake8`

Herramienta popular que verifica el código contra PEP 8:

```bash
pip install flake8
flake8 mi_archivo.py
```

### 2. `pylint`

Analizador más completo que incluye verificación de estilo:

```bash
pip install pylint
pylint mi_archivo.py
```

### 3. `black`

Formateador automático que sigue PEP 8 (y algunas convenciones adicionales):

```bash
pip install black
black mi_archivo.py
```

### 4. `autopep8`

Formatea automáticamente el código para cumplir con PEP 8:

```bash
pip install autopep8
autopep8 --in-place mi_archivo.py
```

---

## Excepciones a la Regla

PEP 8 es una **guía, no una ley**. A veces, romper las reglas está bien:

- **Legibilidad primero**: Si seguir PEP 8 hace el código menos legible, rompe la regla
- **Consistencia del proyecto**: Si el proyecto existente usa otras convenciones, mantén la consistencia
- **Líneas largas**: A veces es mejor tener una línea un poco más larga que dividirla de forma confusa

---

## Recursos Adicionales

- **PEP 8 oficial**: <https://peps.python.org/pep-0008/>
- **PEP 8 en español**: <https://pep8-es.readthedocs.io/>
- **Guía de estilo de Google para Python**: <https://google.github.io/styleguide/pyguide.html>

---

## Conclusión

PEP 8 no es solo sobre seguir reglas; es sobre escribir código que **otros puedan leer y mantener**.

Al seguir estas convenciones, contribuyes a hacer el ecosistema Python más accesible y profesional.

**¡Empieza a aplicar PEP 8 en tu código hoy mismo!**

---

**¿Tienes dudas sobre alguna regla específica?** Consulta la documentación oficial o pregunta en la comunidad.

**¡Código limpio, código feliz!**
