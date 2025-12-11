function ProjectCard({ project }) {
  const getProjectName = () => {
    return project.nombre || 'Sin nombre';
  };

  const getOrganization = () => {
    return project.estudio || project.empresa || project.museo || project.artista || 'No especificado';
  };

  const getLocation = () => {
    const parts = [];
    if (project.ciudad) parts.push(project.ciudad);
    if (project.departamento && project.departamento !== project.ciudad) parts.push(project.departamento);
    return parts.join(', ') || 'No especificada';
  };

  const getTechInfo = () => {
    const techs = [];
    if (project.motor) techs.push(project.motor);
    if (project.tecnologia) {
      if (Array.isArray(project.tecnologia)) {
        techs.push(...project.tecnologia.slice(0, 2));
      } else {
        techs.push(project.tecnologia);
      }
    }
    return techs.length > 0 ? techs.join(', ') : null;
  };

  const getTypeColor = () => {
    switch (project.tipoId) {
      case 'videojuego':
        return '#667eea';
      case 'experiencia-fisica':
        return '#f093fb';
      case 'exposicion':
        return '#4facfe';
      default:
        return '#667eea';
    }
  };

  return (
    <div className="project-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <strong>{project.tipo}</strong>
        {project.anio && <span>{project.anio}</span>}
      </div>

      <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>{getProjectName()}</h3>

      <div>
        <div style={{ marginBottom: '0.3rem' }}>
          <strong>Organización:</strong> {getOrganization()}
        </div>

        <div style={{ marginBottom: '0.3rem' }}>
          <strong>Ubicación:</strong> {getLocation()}
        </div>

        {getTechInfo() && (
          <div style={{ marginBottom: '0.3rem' }}>
            <strong>Tecnología:</strong> {getTechInfo()}
          </div>
        )}

        {project.genero && (
          <div style={{ marginBottom: '0.3rem' }}>
            <strong>Género:</strong> {project.genero}
          </div>
        )}

        {project.plataformas && (
          <div style={{ marginBottom: '0.3rem' }}>
            <strong>Plataformas:</strong> {Array.isArray(project.plataformas)
              ? project.plataformas.join(', ')
              : project.plataformas}
          </div>
        )}

        {project.premio && (
          <div style={{ marginBottom: '0.3rem', background: '#f0f0f0', padding: '0.25rem' }}>
            <strong>Premio:</strong> {project.premio}
          </div>
        )}

        {project.resultados && (
          <div style={{ marginBottom: '0.3rem', background: '#f0f0f0', padding: '0.25rem' }}>
            <strong>Resultados:</strong> {project.resultados}
          </div>
        )}
      </div>

      {project.descripcion && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: '1.4' }}>{project.descripcion}</p>
      )}
    </div>
  );
}

export default ProjectCard;
