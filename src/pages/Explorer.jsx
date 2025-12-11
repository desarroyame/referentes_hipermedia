import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import { filterProjects, getUniqueCities, getUniqueTechnologies } from '../utils/dataProcessing';

function Explorer({ projects }) {
  const [filters, setFilters] = useState({
    tipo: 'todos',
    ciudad: 'todas',
    tecnologia: 'todas',
    anio: '',
    search: ''
  });

  const cities = useMemo(() => getUniqueCities(projects), [projects]);
  const technologies = useMemo(() => getUniqueTechnologies(projects), [projects]);
  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [projects, filters]
  );

  return (
    <div className="window-pane">
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        cities={cities}
        technologies={technologies}
      />

      <div className="mb-2">
        <h2 style={{ fontSize: '1.2rem' }}>Proyectos encontrados: {filteredProjects.length}</h2>
      </div>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={`${project.id || project.nombre}-${index}`} project={project} />
          ))
        ) : (
          <div className="window" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem' }}>No se encontraron proyectos con los filtros seleccionados.</p>
            <button className="btn" onClick={() => setFilters({ tipo: 'todos', ciudad: 'todas', tecnologia: 'todas', anio: '', search: '' })}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explorer;
