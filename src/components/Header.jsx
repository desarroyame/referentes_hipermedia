import { Link } from 'react-router-dom';

function Header({ stats }) {
  return (
    <header>
      <div className="title-bar">
        <h1>Referentes Hipermedia Colombia</h1>
      </div>
      
      {stats && (
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Proyectos</span>
            <span className="stat-value">{stats.totalProyectos}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Años</span>
            <span className="stat-value">{stats.yearsSpan}+</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Ciudades</span>
            <span className="stat-value">{stats.ciudades}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Convocatorias</span>
            <span className="stat-value">{stats.totalConvocatorias}</span>
          </div>
        </div>
      )}

      <div className="separator"></div>
      
      <nav>
        <Link to="/">Explorador</Link>
        <Link to="/casos-estudio">Casos de Estudio</Link>
        <Link to="/convocatorias">Convocatorias</Link>
        <Link to="/ecosistema">Ecosistema Tech</Link>
        <Link to="/contexto">Contexto</Link>
      </nav>
    </header>
  );
}

export default Header;
