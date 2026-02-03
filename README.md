# NeuralFilms - Sistema de Gestión Dinámica

## 🎬 Características Implementadas

### ✨ Sistema Dinámico de Portfolio
- **Carga automática** desde archivo JSON
- **Modal de video** con reproducción automática
- **Filtros interactivos** por categoría
- **Animaciones** suaves al cargar contenido
- **Formulario de contacto** funcional con backend PHP
- **Panel de administración** visual para gestionar contenido

---

## 📂 Estructura de Archivos

```
ProductoraAudiovisual/
├── index.html              # Página principal
├── admin.html              # Panel de administración (NUEVO!)
├── app.js                  # Sistema dinámico de portfolio
├── contact.php             # Backend para formulario de contacto
├── portfolio-data.json     # Datos del portfolio (EDITAR AQUÍ)
└── README.md              # Esta guía
```

---

## 🚀 Métodos para Agregar/Editar Contenido

### 🎯 Método 1: Panel de Administración (MÁS FÁCIL)

**El panel de administración es la forma más sencilla de gestionar tu contenido!**

1. Abre en tu navegador: `http://localhost/ProductoraAudiovisual/admin.html`
2. Haz clic en **"+ Agregar Proyecto"**
3. Completa el formulario:
   - **Título**: Nombre del proyecto
   - **Descripción**: Técnicas usadas (Ej: "Motion Graphics • IA")
   - **Categoría**: comercial, videoclip, corporativo, experimental
   - **URL Imagen**: Link a la imagen de portada
   - **URL Video**: Link de YouTube embed
4. Haz clic en **"Guardar Proyecto"**
5. Se descargará automáticamente el archivo `portfolio-data.json`
6. Reemplaza el archivo antiguo con el nuevo

**Características del panel:**
- ✅ Vista previa de todos tus proyectos
- ✅ Editar cualquier proyecto existente
- ✅ Eliminar proyectos
- ✅ Estadísticas en tiempo real
- ✅ Descarga automática del JSON actualizado
- ✅ No necesitas tocar código

---

### Método 2: Editar `portfolio-data.json` (Recomendado)

1. Abre el archivo `portfolio-data.json`
2. Agrega un nuevo objeto al array `items`:

```json
{
  "id": 7,
  "title": "Tu Nuevo Proyecto",
  "description": "Descripción corta • Técnicas usadas",
  "category": "comercial",
  "image": "URL_DE_LA_IMAGEN",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "type": "video"
}
```

**Categorías disponibles:**
- `comercial`
- `videoclip`
- `corporativo`
- `experimental`

**Importante:** Asegúrate de cambiar el `id` por un número único y mayor que los existentes.

### Método 2: Usar la Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Agregar un nuevo item
addPortfolioItem({
  title: "Mi Nuevo Video",
  description: "Motion Graphics • IA",
  category: "comercial",
  image: "https://ejemplo.com/imagen.jpg",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  type: "video"
});

// Eliminar un item por ID
removePortfolioItem(3);

// Actualizar un item existente
updatePortfolioItem(1, {
  title: "Título Actualizado",
  description: "Nueva descripción"
});
```

---

## 📧 Configurar Formulario de Contacto

### Configuración del Backend PHP

1. Abre `contact.php`
2. Busca la línea que dice:
   ```php
   $to = "tu-email@ejemplo.com";  // TU EMAIL AQUÍ
   ```
3. Reemplaza con tu email real:
   ```php
   $to = "tucorreo@gmail.com";
   ```
4. ¡Listo! Los emails llegarán automáticamente

### Características del Formulario

- ✅ Validación de campos
- ✅ Email con diseño HTML profesional
- ✅ Registro en archivo log (`contact-log.txt`)
- ✅ Sistema de respaldo con localStorage
- ✅ Indicador de carga al enviar
- ✅ Respuestas automáticas al usuario

### Si el Email No Funciona

El sistema tiene un **backup automático**:
- Si `contact.php` falla, los datos se guardan en `localStorage`
- Para ver las solicitudes guardadas, abre la consola del navegador (F12)
- Ejecuta: `console.log(JSON.parse(localStorage.getItem('contactSubmissions')))`

---

## 🎥 Cómo Obtener URL de YouTube Embed

1. Ve a tu video en YouTube
2. Haz clic en **Compartir** → **Insertar**
3. Copia solo la parte de la URL que dice:
   ```
   https://www.youtube.com/embed/CODIGO_DEL_VIDEO
   ```

Ejemplo:
- Video normal: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Para embed: `https://www.youtube.com/embed/dQw4w9WgXcQ`

---

## 🖼️ Cómo Obtener URLs de Imágenes

### Opción 1: Unsplash (Gratis)
1. Ve a [unsplash.com](https://unsplash.com)
2. Busca una imagen
3. Haz clic derecho → Copiar dirección de imagen
4. Usa esa URL en el campo `image`

### Opción 2: Tus Propias Imágenes
1. Sube la imagen a tu servidor
2. Usa la ruta: `img/nombre-archivo.jpg`
3. Crea una carpeta `img/` en la raíz del proyecto

---

## 📧 Formulario de Contacto

El formulario se abre automáticamente cuando se hace clic en:
- "Ver Nuestros Trabajos"
- "Agendar Consultoría Gratuita"

### Para Enviar Emails Reales

**Actualmente:** Los datos se muestran en la consola (para testing)

**Para producción**, edita el archivo `app.js` en la función `handleFormSubmit()`:

```javascript
// Descomenta estas líneas:
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

Necesitarás crear un backend PHP, Node.js o usar servicios como:
- **Formspree** (fácil, gratis)
- **EmailJS** (sin backend)
- **PHP mail()** (si tienes PHP en tu servidor)

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `index.html`:

```css
:root {
    --primary: #0D1B2A;        /* Color de fondo principal */
    --secondary: #00FFF5;      /* Color acento cyan */
    --tertiary: #7B2CBF;       /* Color morado */
    --accent: #FF006E;         /* Color rosa/rojo */
}
```

### Cambiar Textos

Todos los textos están en `index.html`. Busca las secciones:
- `<section class="hero">` - Texto del banner principal
- `<section class="services">` - Servicios
- `<section class="portfolio">` - Portfolio
- `<footer>` - Pie de página

---

## 🔧 Solución de Problemas

### El portfolio no carga
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que `portfolio-data.json` tenga JSON válido
4. Usa un validador: [jsonlint.com](https://jsonlint.com)

### Los videos no se reproducen
- Asegúrate de usar URLs de **embed** de YouTube
- Verifica que el video no esté privado
- Prueba con otro video público

### El formulario no envía
- Actualmente solo muestra un alert
- Para enviar emails reales, necesitas configurar un backend

---

## 📱 Características Adicionales

### Modal de Video
- Click en cualquier item del portfolio
- Reproducción automática
- Cerrar con X, clic fuera, o tecla ESC

### Filtros Dinámicos
- Los botones filtran automáticamente
- Animaciones suaves al cambiar

### Animaciones
- Elementos aparecen al hacer scroll
- Efectos hover mejorados
- Transiciones fluidas

---

## 🌐 Despliegue

### Local (XAMPP)
Ya está listo. Solo abre: `http://localhost/ProductoraAudiovisual/`

### Subir a Internet
1. Sube todos los archivos por FTP
2. Asegúrate que `portfolio-data.json` y `app.js` estén en la raíz
3. Verifica que el servidor sirva archivos `.json`

---

## 💡 Consejos Pro

### Performance
- Usa imágenes optimizadas (WebP, comprimidas)
- Lazy loading ya está implementado
- Los videos solo cargan al abrir el modal

### SEO
- Cambia el `<title>` en `index.html`
- Agrega meta descriptions
- Usa nombres descriptivos en las imágenes

### Mantenimiento
- Haz backup de `portfolio-data.json` antes de editar
- Mantén los IDs únicos y secuenciales
- Prueba en diferentes navegadores

---

## 🆘 Soporte

Si necesitas ayuda:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos estén en su lugar
3. Asegúrate que el JSON sea válido

---

## 📝 Ejemplo Completo de portfolio-data.json

```json
{
  "items": [
    {
      "id": 1,
      "title": "Campaña Innovadora",
      "description": "Motion Graphics • IA Generativa",
      "category": "comercial",
      "image": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
      "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "type": "video"
    },
    {
      "id": 2,
      "title": "Video Musical",
      "description": "VFX • Color Grading",
      "category": "videoclip",
      "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop",
      "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "type": "video"
    }
  ]
}
```

---

**¡Listo! Ahora puedes actualizar tu portfolio fácilmente sin tocar el código HTML.**

Hecho por SantOps y ❤️ en Argentina
