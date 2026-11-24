# Leia Lab

Sitio de Leia Lab, desarrollado con Next.js App Router, React, TypeScript y Tailwind CSS.

## Desarrollo

```sh
npm ci
npm run dev
```

La página se encuentra en `app/page.tsx` y tiene cuatro secciones: Inicio, Servicios, Casos de uso y Contacto. Los enlaces de navegación están centralizados en `components/navigation.ts`; WhatsApp, Instagram y el correo confirmado, en `components/contact-info.ts`. Si el correo está vacío, no se publica ningún enlace de email.

El contacto principal es WhatsApp. LeiaBot prepara una consulta local en el navegador y, al enviar desde el formulario o tocar el botón de WhatsApp, abre la conversación para que la persona confirme el envío; no envía mensajes a un servidor. El historial se conserva en el navegador y se puede reiniciar desde el chat. No hay un formulario de correo activo.

Las partículas y el cubo respetan la preferencia de movimiento reducido. Las capturas públicas de los proyectos y sus fuentes están en `public/projects/`; los recursos oficiales de las marcas y sus fuentes, en `public/brand/`.

## Verificación

```sh
npm run lint
npm run build
npm start
```

El repositorio `leiaslab/leialab` despliega en Vercel al actualizar `main`. Los casos de uso son referencias visuales: no tienen enlaces, botones de acceso ni aplicaciones incrustadas. Las capturas se alojan en este repositorio; las aplicaciones originales son independientes.
