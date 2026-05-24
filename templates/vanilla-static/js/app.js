const features = [
  {
    title: "Estructura base",
    body: "HTML semántico, estilos responsive y módulos JavaScript preparados para datos reales.",
  },
  {
    title: "Memoria AI",
    body: "Documentos operativos para que Codex y OpenCode puedan retomar el proyecto sin contexto previo.",
  },
  {
    title: "Validación",
    body: "Contrato de salida con ntfy, placeholders prohibidos y comandos claros para revisar higiene.",
  },
];

const grid = document.querySelector("#feature-grid");

if (grid) {
  grid.innerHTML = features
    .map(
      (feature) => `
        <article class="card">
          <h3>${feature.title}</h3>
          <p>${feature.body}</p>
        </article>
      `,
    )
    .join("");
}
