import { getTechStats } from '../utils/dataProcessing';

function TechEcosystem({ data }) {
  const { engines, platforms } = getTechStats(data);

  const sortedEngines = Object.entries(engines).sort((a, b) => b[1] - a[1]);
  const sortedPlatforms = Object.entries(platforms).sort((a, b) => b[1] - a[1]);

  const totalEngines = Object.values(engines).reduce((sum, val) => sum + val, 0);
  const totalPlatforms = Object.values(platforms).reduce((sum, val) => sum + val, 0);

  const getBarWidth = (value, total) => {
    return `${(value / total) * 100}%`;
  };

  const getEngineColor = (engine) => {
    if (engine.toLowerCase().includes('unity')) return '#222c37';
    if (engine.toLowerCase().includes('unreal')) return '#313131';
    return '#667eea';
  };

  const getPlatformColor = (platform) => {
    if (platform.toLowerCase().includes('pc')) return '#5865f2';
    if (platform.toLowerCase().includes('ps') || platform.toLowerCase().includes('playstation')) return '#003087';
    if (platform.toLowerCase().includes('xbox')) return '#107c10';
    if (platform.toLowerCase().includes('switch') || platform.toLowerCase().includes('nintendo')) return '#e60012';
    if (platform.toLowerCase().includes('mobile') || platform.toLowerCase().includes('android') || platform.toLowerCase().includes('ios')) return '#3ddc84';
    if (platform.toLowerCase().includes('vr') || platform.toLowerCase().includes('quest')) return '#1c1e20';
    return '#667eea';
  };

  return (
    <div className="tech-ecosystem">
      <div className="tech-header">
        <h2>Ecosistema Tecnológico</h2>
        <p className="tech-intro">
          Análisis de las tecnologías, motores y plataformas más utilizadas
          en proyectos de diseño hipermedia en Colombia.
        </p>
      </div>

      <div className="tech-sections">
        <section className="tech-section">
          <h3>Motores de Desarrollo</h3>
          <p className="section-description">
            Principales engines utilizados para crear videojuegos y experiencias interactivas.
          </p>

          <div className="stats-grid">
            {sortedEngines.map(([engine, count]) => (
              <div key={engine} className="stat-item">
                <div className="stat-header">
                  <span className="stat-name">{engine}</span>
                  <span className="stat-count">{count} proyectos</span>
                </div>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: getBarWidth(count, totalEngines),
                      backgroundColor: getEngineColor(engine)
                    }}
                  />
                </div>
                <div className="stat-percentage">
                  {((count / totalEngines) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {sortedEngines.length === 0 && (
            <p className="no-data">No hay datos de motores disponibles.</p>
          )}
        </section>

        <section className="tech-section">
          <h3>Plataformas de Distribución</h3>
          <p className="section-description">
            Plataformas donde se publican y distribuyen los proyectos.
          </p>

          <div className="stats-grid">
            {sortedPlatforms.map(([platform, count]) => (
              <div key={platform} className="stat-item">
                <div className="stat-header">
                  <span className="stat-name">{platform}</span>
                  <span className="stat-count">{count} proyectos</span>
                </div>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: getBarWidth(count, totalPlatforms),
                      backgroundColor: getPlatformColor(platform)
                    }}
                  />
                </div>
                <div className="stat-percentage">
                  {((count / totalPlatforms) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {sortedPlatforms.length === 0 && (
            <p className="no-data">No hay datos de plataformas disponibles.</p>
          )}
        </section>

        <section className="tech-insights">
          <h3>Insights Tecnológicos</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Motor Dominante</h4>
              <p className="insight-value">
                {sortedEngines[0] ? sortedEngines[0][0] : 'N/A'}
              </p>
              <p className="insight-description">
                {sortedEngines[0]
                  ? `Utilizado en ${sortedEngines[0][1]} proyectos (${((sortedEngines[0][1] / totalEngines) * 100).toFixed(1)}%)`
                  : 'No disponible'}
              </p>
            </div>

            <div className="insight-card">
              <h4>Plataforma Principal</h4>
              <p className="insight-value">
                {sortedPlatforms[0] ? sortedPlatforms[0][0] : 'N/A'}
              </p>
              <p className="insight-description">
                {sortedPlatforms[0]
                  ? `Presente en ${sortedPlatforms[0][1]} proyectos`
                  : 'No disponible'}
              </p>
            </div>

            <div className="insight-card">
              <h4>Diversidad de Motores</h4>
              <p className="insight-value">{sortedEngines.length}</p>
              <p className="insight-description">
                Diferentes motores utilizados en el ecosistema
              </p>
            </div>

            <div className="insight-card">
              <h4>Alcance Multi-plataforma</h4>
              <p className="insight-value">{sortedPlatforms.length}</p>
              <p className="insight-description">
                Plataformas diferentes cubiertas
              </p>
            </div>
          </div>
        </section>

        <section className="tech-recommendations">
          <h3>Recomendaciones para Estudiantes</h3>
          <div className="recommendations-list">
            <div className="recommendation">
              <div className="rec-icon">💡</div>
              <div className="rec-content">
                <h4>Aprende Unity</h4>
                <p>
                  Unity es el motor más utilizado en el ecosistema colombiano.
                  Su versatilidad y comunidad lo hacen ideal para comenzar.
                </p>
              </div>
            </div>

            <div className="recommendation">
              <div className="rec-icon">🎮</div>
              <div className="rec-content">
                <h4>Desarrolla Multi-plataforma</h4>
                <p>
                  Muchos proyectos exitosos se publican en múltiples plataformas.
                  Considera PC, consolas y mobile desde el inicio.
                </p>
              </div>
            </div>

            <div className="recommendation">
              <div className="rec-icon">🚀</div>
              <div className="rec-content">
                <h4>Explora Realidad Virtual/AR</h4>
                <p>
                  Las experiencias inmersivas están creciendo. Meta Quest y otras
                  plataformas VR/AR son tendencia en experiencias físicas.
                </p>
              </div>
            </div>

            <div className="recommendation">
              <div className="rec-icon">🏆</div>
              <div className="rec-content">
                <h4>Especialízate pero sé Versátil</h4>
                <p>
                  Domina un motor principal, pero conoce las alternativas.
                  Unreal Engine es preferido para proyectos de alto perfil.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TechEcosystem;
