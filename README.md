# Leia Lab

Sitio de Leia Lab, desarrollado con Next.js App Router, React, TypeScript y Tailwind CSS.

## Desarrollo

```sh
npm ci
npm run dev
```

La página se encuentra en `app/page.tsx` y tiene cuatro secciones: Inicio, Servicios, Casos de uso y Contacto. Los enlaces de navegación están centralizados en `components/navigation.ts`; WhatsApp, Instagram y el correo confirmado, en `components/contact-info.ts`. Si el correo está vacío, no se publica ningún enlace de email.

El contacto principal es WhatsApp. Al tocar LeiaBot o su saludo animado se abre directamente la conversación con Mariano, con un mensaje inicial preparado para que la persona confirme el envío en WhatsApp. El acceso funciona como un enlace HTML y no requiere JavaScript. No hay un chat intermedio, almacenamiento local de consultas ni un formulario de correo activo.

Las partículas y el cubo respetan la preferencia de movimiento reducido. Las capturas públicas de los proyectos y sus fuentes están en `public/projects/`; los recursos oficiales de las marcas y sus fuentes, en `public/brand/`.

## Verificación

```sh
npm run lint
npm run build
npm start
```

El repositorio `leiaslab/leialab` despliega en Vercel al actualizar `main`. Los casos de uso son referencias visuales: no tienen enlaces, botones de acceso ni aplicaciones incrustadas. Las capturas se alojan en este repositorio; las aplicaciones originales son independientes.
