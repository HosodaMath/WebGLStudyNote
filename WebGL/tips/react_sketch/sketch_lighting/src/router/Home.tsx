import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <header className="wrapper">
        <h1>Lighting Sketch</h1>
      </header>
      <section className="wrapper sketch">
        <Link className="navigationLink" to="directinalLighting1">
          Directinal Lighting1
        </Link>
        <Link className="navigationLink" to="directinalLighting2">
          Directinal Lighting2
        </Link>
        <Link className="navigationLink" to="directinalLighting3">
          Directinal Lighting3
        </Link>
      </section>
    </div>
  );
};
