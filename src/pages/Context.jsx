import { useState, useMemo } from 'react';
import { getTimelineData } from '../utils/dataProcessing';

function Context({ data, projects }) {
  const [selectedYear, setSelectedYear] = useState(null);
  const timeline = getTimelineData(data);
  const years = Object.keys(timeline).sort((a, b) => b - a);

  // Distribución geográfica
  const cityStats = useMemo(() => {
    const stats = {};
    projects.forEach(p => {
      if (p.ciudad) {
        if (!stats[p.ciudad]) {
          stats[p.ciudad] = { total: 0, videojuegos: 0, experiencias: 0, exposiciones: 0 };
        }
        stats[p.ciudad].total += 1;
        if (p.tipoId === 'videojuego') stats[p.ciudad].videojuegos += 1;
        if (p.tipoId === 'experiencia-fisica') stats[p.ciudad].experiencias += 1;
        if (p.tipoId === 'exposicion') stats[p.ciudad].exposiciones += 1;
      }
    });
    return Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
  }, [projects]);

  // Distribución por década
  const decadeStats = useMemo(() => {
    const stats = {};
    projects.forEach(p => {
      if (p.anio) {
        const decade = Math.floor(p.anio / 10) * 10;
        if (!stats[decade]) {
          stats[decade] = { total: 0, proyectos: [] };
        }
        stats[decade].total += 1;
        stats[decade].proyectos.push(p);
      }
    });
    return Object.entries(stats).sort((a, b) => b[0] - a[0]);
  }, [projects]);

  const maxCityProjects = cityStats.length > 0 ? cityStats[0][1].total : 0;

  return (
    <div className="context">
      <div className="context-header">
        <h2>Contexto Histórico y Geográfico</h2>
        <p className="context-intro">
          Evolución temporal y distribución espacial del ecosistema de diseño
          hipermedia en Colombia.
        </p>
      </div>

      <section className="timeline-section">
        <h3>Línea de Tiempo</h3>
        <p className="section-subtitle">
          {years.length > 0 && `${years[years.length - 1]} - ${years[0]}`}
        </p>

        <div className="timeline">
          {years.map(year => {
            const yearData = timeline[year];
            const totalProjects = yearData.proyectos.length;
            const totalConvocatorias = yearData.convocatorias.length;
            const isSelected = selectedYear === year;

            return (
              <div
                key={year}
                className={`timeline-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedYear(isSelected ? null : year)}
              >
                <div className="timeline-year">{year}</div>
                <div className="timeline-content">
                  <div className="timeline-stats">
                    <span className="timeline-count projects">
                      {totalProjects} proyecto{totalProjects !== 1 ? 's' : ''}
                    </span>
                    {totalConvocatorias > 0 && (
                      <span className="timeline-count convocatorias">
                        {totalConvocatorias} convocatoria{totalConvocatorias !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="timeline-details">
                      <div className="details-section">
                        <h4>Proyectos del año:</h4>
                        <ul>
                          {yearData.proyectos.slice(0, 10).map((p, i) => (
                            <li key={i}>
                              <span className="project-type">{p.tipo}:</span> {p.nombre}
                              {(p.estudio || p.empresa || p.museo) && (
                                <span className="project-org">
                                  {' '}— {p.estudio || p.empresa || p.museo}
                                </span>
                              )}
                            </li>
                          ))}
                          {yearData.proyectos.length > 10 && (
                            <li className="more-items">
                              ...y {yearData.proyectos.length - 10} más
                            </li>
                          )}
                        </ul>
                      </div>

                      {yearData.convocatorias.length > 0 && (
                        <div className="details-section">
                          <h4>Convocatorias del año:</h4>
                          <ul>
                            {yearData.convocatorias.slice(0, 5).map((c, i) => (
                              <li key={i}>
                                {c.programa || c.entidad}
                                {(c.presupuesto || c.monto) && (
                                  <span className="conv-amount">
                                    {' '}— ${((c.presupuesto || c.monto) / 1000000).toFixed(0)}M COP
                                  </span>
                                )}
                              </li>
                            ))}
                            {yearData.convocatorias.length > 5 && (
                              <li className="more-items">
                                ...y {yearData.convocatorias.length - 5} más
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="geography-section">
        <h3>Distribución Geográfica</h3>
        <p className="section-subtitle">Proyectos por ciudad</p>

        <div className="cities-chart">
          {cityStats.map(([city, stats]) => (
            <div key={city} className="city-item">
              <div className="city-header">
                <span className="city-name">{city}</span>
                <span className="city-total">{stats.total} proyectos</span>
              </div>

              <div className="city-bar-container">
                <div
                  className="city-bar"
                  style={{ width: `${(stats.total / maxCityProjects) * 100}%` }}
                >
                  <div className="bar-segment videojuegos" style={{ width: `${(stats.videojuegos / stats.total) * 100}%` }} />
                  <div className="bar-segment experiencias" style={{ width: `${(stats.experiencias / stats.total) * 100}%` }} />
                  <div className="bar-segment exposiciones" style={{ width: `${(stats.exposiciones / stats.total) * 100}%` }} />
                </div>
              </div>

              <div className="city-breakdown">
                {stats.videojuegos > 0 && (
                  <span className="breakdown-item videojuegos">
                    {stats.videojuegos} VG
                  </span>
                )}
                {stats.experiencias > 0 && (
                  <span className="breakdown-item experiencias">
                    {stats.experiencias} EF
                  </span>
                )}
                {stats.exposiciones > 0 && (
                  <span className="breakdown-item exposiciones">
                    {stats.exposiciones} EM
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="decades-section">
        <h3>Evolución por Década</h3>

        <div className="decades-grid">
          {decadeStats.map(([decade, stats]) => {
            const typeCount = stats.proyectos.reduce((acc, p) => {
              acc[p.tipoId] = (acc[p.tipoId] || 0) + 1;
              return acc;
            }, {});
            
            return (
              <div key={decade} className="decade-card">
                <h4>{decade}s</h4>
                <p className="decade-total">{stats.total} proyectos</p>
                <div className="decade-types">
                  {Object.entries(typeCount).map(([tipo, count]) => (
                    <div key={tipo} style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <strong>{tipo}:</strong> {count}
                    </div>
                  ))}
                </div>
                <p className="decade-description">
                  {decade < 2000 && 'Inicios de la museografía digital'}
                  {decade >= 2000 && decade < 2010 && 'Expansión de museos interactivos'}
                  {decade >= 2010 && decade < 2020 && 'Auge de videojuegos y realidad virtual'}
                  {decade >= 2020 && 'Ecosistema maduro y financiación consolidada'}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Context;
