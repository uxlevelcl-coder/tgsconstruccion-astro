import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';

export const GET: APIRoute = async () => {
  const e = site.empresa;
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const cabecera = `# TGS Construcción

> ${e.bajada} con un solo responsable, presupuesto sin costo en 24 horas y garantía por escrito.

TGS Construcción SpA ejecuta proyectos de remodelación en la Región Metropolitana.
Un solo responsable coordina gasfitería, electricidad, cerámica, muebles y pintura.
Cada obra parte con visita y medición, sigue con presupuesto detallado por partida y
termina con revisión junto al cliente y garantía por escrito.

Datos de contacto: WhatsApp ${e.telefono} · ${e.email} · ${e.direccion}
Horario: ${e.horario}
Cobertura: ${e.zonas}.

Este archivo reúne el texto completo de los artículos publicados. La versión
resumida con enlaces está en https://tgsconstruccion.cl/llms.txt

---`;

  const cuerpo = posts
    .map((p) => {
      const fecha = p.data.date.toISOString().slice(0, 10);
      return [
        `# ${p.data.title}`,
        ``,
        `URL: https://tgsconstruccion.cl/blog/${p.id}/`,
        `Publicado: ${fecha}`,
        `Descripción: ${p.data.description}`,
        ``,
        (p.body ?? '').trim(),
      ].join('\n');
    })
    .join('\n\n---\n\n');

  return new Response(`${cabecera}\n\n${cuerpo}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
