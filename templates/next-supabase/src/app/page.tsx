const cards = [
  "Next.js App Router con TypeScript",
  "Supabase preparado como servicio externo",
  "Documentación AI-first y validación de higiene",
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Scaffold inicial</p>
        <h1>Base fullstack lista para adaptar</h1>
        <p>
          Codex debe normalizar el brief, definir modelos, completar auth/datos y ajustar la
          interfaz al producto real.
        </p>
      </section>

      <section className="grid" aria-label="Elementos incluidos">
        {cards.map((card) => (
          <article className="card" key={card}>
            <h2>{card}</h2>
            <p>Incluido en la plantilla mínima del MVP.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
