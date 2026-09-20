import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="studio" aria-label="FUSE Criativos">
      <p className="eyebrow">FUSE / ESTÚDIO CRIATIVO</p>
      <h1>FUSE Criativos</h1>
      <p className="summary">
        Direção de arte profissional para a sua próxima campanha, preparada para gerar no ChatGPT.
      </p>
      <button type="button" onClick={() => setOpened(true)}>
        Abrir demonstração
      </button>
      {opened && (
        <section className="notice" aria-live="polite">
          <strong>UI renderizada com sucesso.</strong>
          <span>A próxima fase adicionará o wizard de campanha, arquivos e briefing.</span>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

