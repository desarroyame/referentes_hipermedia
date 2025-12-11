function FilterBar({ filters, onFilterChange, cities, technologies }) {
  return (
    <div className="filter-bar">
      <div className="filters">
        <div>
          <input
            type="search"
            placeholder="Buscar proyectos..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            value={filters.tipo || 'todos'}
            onChange={(e) => onFilterChange({ ...filters, tipo: e.target.value })}
          >
            <option value="todos">Todos</option>
            <option value="videojuego">Videojuegos</option>
            <option value="experiencia-fisica">Experiencias Físicas</option>
            <option value="exposicion">Exposiciones</option>
          </select>
        </div>

        <div>
          <label htmlFor="ciudad">Ciudad:</label>
          <select
            id="ciudad"
            value={filters.ciudad || 'todas'}
            onChange={(e) => onFilterChange({ ...filters, ciudad: e.target.value })}
          >
            <option value="todas">Todas</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tecnologia">Tecnología:</label>
          <select
            id="tecnologia"
            value={filters.tecnologia || 'todas'}
            onChange={(e) => onFilterChange({ ...filters, tecnologia: e.target.value })}
          >
            <option value="todas">Todas</option>
            {technologies.slice(0, 15).map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="anio">Año:</label>
          <input
            type="text"
            id="anio"
            placeholder="Ej: 2020"
            value={filters.anio || ''}
            onChange={(e) => onFilterChange({ ...filters, anio: e.target.value })}
          />
        </div>

        {(filters.tipo !== 'todos' || filters.ciudad !== 'todas' || filters.tecnologia !== 'todas' || filters.anio || filters.search) && (
          <button
            className="btn"
            onClick={() => onFilterChange({ tipo: 'todos', ciudad: 'todas', tecnologia: 'todas', anio: '', search: '' })}
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
