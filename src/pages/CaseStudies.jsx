import { getFeaturedProjects } from '../utils/dataProcessing';

function CaseStudies({ data }) {
  const featured = getFeaturedProjects(data);

  const getImpactBadge = (project) => {
    if (project.premio) {
      if (project.premio.toLowerCase().includes('golden nica')) return { text: 'Premio Internacional', color: '#f59e0b' };
      if (project.premio.toLowerCase().includes('unreal') || project.premio.toLowerCase().includes('google')) return { text: 'Reconocimiento Tech', color: '#8b5cf6' };
      if (project.premio.toLowerCase().includes('apple')) return { text: 'Best of Apple', color: '#3b82f6' };
      return { text: 'Premiado', color: '#10b981' };
    }
    if (project.resultados) {
      if (project.resultados.toLowerCase().includes('reducción') || project.resultados.toLowerCase().includes('ahorro')) {
        return { text: 'Alto Impacto ROI', color: '#ef4444' };
      }
    }
    if (project.descargas) {
      return { text: 'Alto Alcance', color: '#06b6d4' };
    }
    return null;
  };

  return (
    <div className="case-studies">
      <div className="cases-header">
        <h2>Casos de Estudio Destacados</h2>
        <p className="cases-intro">
          Proyectos colombianos que han alcanzado reconocimiento internacional,
          generado impacto medible o demostrado excelencia en diseño hipermedia.
        </p>
      </div>

      <div className="featured-grid">
        {featured.map((project, index) => {
          const badge = getImpactBadge(project);
          const orgName = project.estudio || project.empresa || project.museo || project.artista;

          return (
            <div key={index} className="featured-card">
              {badge && (
                <div className="impact-badge" style={{ backgroundColor: badge.color }}>
                  {badge.text}
                </div>
              )}

              <div className="featured-header">
                <span className="featured-type">{project.tipo}</span>
                {project.anio && <span className="featured-year">{project.anio}</span>}
              </div>

              <h3 className="featured-title">{project.nombre}</h3>

              {orgName && (
                <p className="featured-org">{orgName}</p>
              )}

              {project.ciudad && (
                <p className="featured-location">
                  {project.ciudad}{project.departamento && project.departamento !== project.ciudad ? `, ${project.departamento}` : ''}
                </p>
              )}

              {project.descripcion && (
                <p className="featured-description">{project.descripcion}</p>
              )}

              <div className="featured-details">
                {project.motor && (
                  <div className="detail-item">
                    <span className="detail-label">Motor:</span>
                    <span className="detail-value">{project.motor}</span>
                  </div>
                )}

                {project.plataformas && (
                  <div className="detail-item">
                    <span className="detail-label">Plataformas:</span>
                    <span className="detail-value">
                      {Array.isArray(project.plataformas)
                        ? project.plataformas.join(', ')
                        : project.plataformas}
                    </span>
                  </div>
                )}

                {project.hardware && (
                  <div className="detail-item">
                    <span className="detail-label">Hardware:</span>
                    <span className="detail-value">
                      {Array.isArray(project.hardware)
                        ? project.hardware.join(', ')
                        : project.hardware}
                    </span>
                  </div>
                )}

                {project.genero && (
                  <div className="detail-item">
                    <span className="detail-label">Género:</span>
                    <span className="detail-value">{project.genero}</span>
                  </div>
                )}
              </div>

              {project.premio && (
                <div className="featured-highlight premio">
                  <strong>Premio:</strong> {project.premio}
                </div>
              )}

              {project.resultados && (
                <div className="featured-highlight resultados">
                  <strong>Resultados:</strong> {project.resultados}
                </div>
              )}

              {project.descargas && (
                <div className="featured-highlight descargas">
                  <strong>Descargas:</strong> {project.descargas}
                </div>
              )}

              {project.cliente && (
                <div className="featured-client">
                  <strong>Cliente:</strong> {project.cliente}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {featured.length === 0 && (
        <div className="no-featured">
          <p>No se encontraron proyectos destacados.</p>
        </div>
      )}
    </div>
  );
}

export default CaseStudies;
