# 🎯 Guía Rápida de Inicio - NeuralFilms

## ¡Bienvenido! 👋

Esta guía te ayudará a empezar en 5 minutos.

---

## 🚀 Inicio Rápido

### 1. Abre tu sitio
```
http://localhost/ProductoraAudiovisual/
```

### 2. Ve al panel de administración
```
http://localhost/ProductoraAudiovisual/admin.html
```

### 3. Agrega tu primer proyecto
- Click en "+ Agregar Proyecto"
- Completa el formulario
- Descarga el JSON
- Reemplaza `portfolio-data.json`
- Recarga la página principal

---

## 📁 Archivos Importantes

| Archivo | Para qué sirve | ¿Debo editarlo? |
|---------|----------------|-----------------|
| `index.html` | Página principal del sitio | ⚠️ Solo si quieres cambiar textos/diseño |
| `admin.html` | Panel para gestionar proyectos | ❌ No tocar |
| `portfolio-data.json` | Base de datos de proyectos | ✅ SÍ (o usa el panel admin) |
| `app.js` | Lógica del sitio | ❌ No tocar |
| `contact.php` | Envío de emails | ⚠️ Solo cambia tu email |

---

## ✅ Checklist de Configuración

### Paso 1: Personalización Básica
- [ ] Cambiar textos del hero (inicio de página)
- [ ] Actualizar servicios
- [ ] Modificar testimonios
- [ ] Cambiar logos de clientes

### Paso 2: Portfolio
- [ ] Abrir `admin.html`
- [ ] Agregar tus primeros 3 proyectos
- [ ] Descargar `portfolio-data.json`
- [ ] Reemplazar el archivo
- [ ] Verificar en la página principal

### Paso 3: Formulario de Contacto
- [ ] Abrir `contact.php`
- [ ] Cambiar el email de destino
- [ ] Probar enviando un mensaje de prueba
- [ ] Verificar que llegue el email

### Paso 4: Personalización Avanzada
- [ ] Cambiar colores (variables CSS)
- [ ] Agregar tu logo
- [ ] Modificar meta tags para SEO
- [ ] Optimizar imágenes

---

## 🎨 Cambios Rápidos de Diseño

### Cambiar Colores Principales

Abre `index.html` y busca (línea ~12):
```css
:root {
    --primary: #0D1B2A;        /* Fondo oscuro */
    --secondary: #00FFF5;      /* Cyan/turquesa */
    --accent: #FF006E;         /* Rosa/rojo */
    --tertiary: #7B2CBF;       /* Morado */
}
```

### Cambiar Logo
Busca en `index.html` (línea ~935):
```html
<div class="logo">NeuralFilms</div>
```
Reemplaza con:
```html
<div class="logo">TuNombre</div>
```

### Cambiar Título Principal
Busca (línea ~950):
```html
<h1>Creamos <span class="gradient-text">realidades</span> con inteligencia artificial</h1>
```

---

## 🆘 Solución de Problemas Comunes

### El portfolio no carga
**Síntoma:** La sección de portfolio aparece vacía

**Solución:**
1. Abre la consola (F12)
2. Busca errores en rojo
3. Verifica que `portfolio-data.json` esté en la carpeta raíz
4. Valida el JSON en: https://jsonlint.com

### Los videos no se reproducen
**Síntoma:** Al hacer click, el modal abre pero no se ve el video

**Solución:**
1. Verifica que uses URL de YouTube **embed** (no normal)
2. Formato correcto: `https://www.youtube.com/embed/VIDEO_ID`
3. Prueba con otro video público de YouTube

### El formulario no envía emails
**Síntoma:** Aparece el mensaje de éxito pero no llega el email

**Solución:**
1. Verifica que `contact.php` tenga tu email configurado
2. Comprueba que tu servidor soporte `mail()` de PHP
3. Revisa la carpeta de spam
4. Como alternativa, los datos se guardan en `localStorage` (F12 → Console → `localStorage.getItem('contactSubmissions')`)

### El panel admin no guarda cambios
**Síntoma:** Hago cambios pero no se reflejan en la página

**Solución:**
1. Después de guardar, **descarga el JSON**
2. **Reemplaza** el archivo `portfolio-data.json` manualmente
3. **Recarga** la página principal (Ctrl + F5)
4. El panel no edita el archivo directamente, solo genera el JSON

---

## 📞 Comandos Útiles para la Consola

Abre la consola del navegador (F12) en la página principal:

### Ver todos los proyectos actuales
```javascript
console.log(window.portfolioManager.items);
```

### Agregar proyecto rápido
```javascript
addPortfolioItem({
  title: "Nuevo Proyecto",
  description: "Test • Prueba",
  category: "comercial",
  image: "https://picsum.photos/800/450",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  type: "video"
});
```

### Eliminar proyecto por ID
```javascript
removePortfolioItem(5);  // Elimina el proyecto con ID 5
```

### Ver formularios enviados (backup)
```javascript
console.log(JSON.parse(localStorage.getItem('contactSubmissions')));
```

---

## 🎓 Recursos Útiles

### Imágenes Gratis
- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

### Videos de Stock
- **Pexels Videos**: https://www.pexels.com/videos
- **Mixkit**: https://mixkit.co
- **Coverr**: https://coverr.co

### Herramientas
- **Validar JSON**: https://jsonlint.com
- **Optimizar Imágenes**: https://tinypng.com
- **Colores**: https://coolors.co
- **Gradientes**: https://cssgradient.io

### Videos de YouTube para Pruebas
```
https://www.youtube.com/embed/dQw4w9WgXcQ
https://www.youtube.com/embed/9bZkp7q19f0
https://www.youtube.com/embed/jNQXAC9IVRw
```

---

## 📊 Estadísticas del Panel Admin

El panel muestra:
- **Total de proyectos**
- **Proyectos por categoría**
- **Vista previa de imágenes**
- **Edición/eliminación rápida**

---

## 🔐 Seguridad del Panel Admin

⚠️ **IMPORTANTE**: El archivo `admin.html` permite editar todo tu portfolio.

**Recomendaciones:**
1. No compartas la URL del panel
2. Elimina `admin.html` en producción (o protégela con contraseña)
3. Haz backups de `portfolio-data.json` regularmente

---

## 🚀 Próximos Pasos

Una vez configurado todo:

1. ✅ Agrega 5-10 proyectos reales
2. ✅ Personaliza colores y textos
3. ✅ Prueba el formulario de contacto
4. ✅ Optimiza imágenes (< 500KB cada una)
5. ✅ Prueba en móvil
6. ✅ Configura meta tags para SEO
7. ✅ Sube a tu servidor web

---

## 💡 Tips Pro

### Mejor rendimiento
- Usa WebP en vez de JPG/PNG
- Lazy loading ya está implementado
- Mantén imágenes bajo 500KB

### SEO
- Cambia el `<title>` en `index.html`
- Agrega meta description
- Usa URLs descriptivas para imágenes

### Experiencia de usuario
- Agrega proyectos regularmente
- Mantén las categorías organizadas
- Usa descripciones breves y claras

---

## 📱 Contacto y Soporte

Si tienes dudas:
1. Revisa este archivo
2. Lee el `README.md` completo
3. Abre la consola (F12) para ver errores
4. Valida tu JSON en jsonlint.com

---

**¡Listo! Ya puedes empezar a crear tu portfolio dinámico.**

Hecho por SantOps y ❤️ en Argentina
