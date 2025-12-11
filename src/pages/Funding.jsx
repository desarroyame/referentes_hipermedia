import { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/dataProcessing';

function Funding({ convocatorias }) {
  const [sortBy, setSortBy] = useState('anio-desc');
  const [filterProgram, setFilterProgram] = useState('todos');

  const programs = useMemo(() => {
    const progs = new Set();
    convocatorias.forEach(c => {
      if (c.programa) progs.add(c.programa);
    });
    return Array.from(progs).sort();
  }, [convocatorias]);

  const sortedConvocatorias = useMemo(() => {
    let filtered = [...convocatorias];

    // Filtrar por programa
    if (filterProgram !== 'todos') {
      filtered = filtered.filter(c => c.programa === filterProgram);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'anio-desc':
          return (b.anio || 0) - (a.anio || 0);
        case 'anio-asc':
          return (a.anio || 0) - (b.anio || 0);
        case 'monto-desc':
          return (b.presupuesto || b.monto || 0) - (a.presupuesto || a.monto || 0);
        case 'monto-asc':
          return (a.presupuesto || a.monto || 0) - (b.presupuesto || b.monto || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [convocatorias, sortBy, filterProgram]);

  const totalPresupuesto = useMemo(() => {
    return sortedConvocatorias.reduce((sum, c) => {
      return sum + (c.presupuesto || c.monto || 0);
    }, 0);
  }, [sortedConvocatorias]);

  return (
    <div className="funding">
      <div className="funding-header">
        <h2>Convocatorias y Programas de Financiación</h2>
        <p className="funding-intro">
          Explora las oportunidades de financiación para proyectos de diseño hipermedia,
          videojuegos y experiencias interactivas en Colombia.
        </p>
      </div>

      <div className="funding-stats">
        <div className="stat-card">
          <span className="stat-value">{sortedConvocatorias.length}</span>
          <span className="stat-label">Convocatorias</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatCurrency(totalPresupuesto)}</span>
          <span className="stat-label">Presupuesto Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{programs.length}</span>
          <span className="stat-label">Programas</span>
        </div>
      </div>

      <div className="funding-controls">
        <div className="control-group">
          <label htmlFor="program">Programa:</label>
          <select
            id="program"
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
          >
            <option value="todos">Todos</option>
            {programs.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="anio-desc">Año (más reciente)</option>
            <option value="anio-asc">Año (más antiguo)</option>
            <option value="monto-desc">Monto (mayor a menor)</option>
            <option value="monto-asc">Monto (menor a mayor)</option>
          </select>
        </div>
      </div>

      <div className="convocatorias-list">
        {sortedConvocatorias.map((conv, index) => (
          <div key={conv.id || index} className="convocatoria-card">
            <div className="conv-header">
              <h3>{conv.programa || conv.entidad}</h3>
              {conv.anio && <span className="conv-year">{conv.anio}</span>}
            </div>

            <div className="conv-body">
              {conv.entidad && conv.programa !== conv.entidad && (
                <p className="conv-entity"><strong>Entidad:</strong> {conv.entidad}</p>
              )}

              {conv.organizacion && (
                <p><strong>Organización:</strong> {conv.organizacion}</p>
              )}

              {conv.categoria && (
                <p><strong>Categoría:</strong> {conv.categoria}</p>
              )}

              {(conv.presupuesto || conv.monto) && (
                <p className="conv-amount">
                  <strong>Presupuesto:</strong> {formatCurrency(conv.presupuesto || conv.monto)}
                </p>
              )}

              {conv.proyectos && (
                <p><strong>Proyectos financiados:</strong> {conv.proyectos}</p>
              )}

              {conv.cupos && (
                <p><strong>Cupos:</strong> {conv.cupos}</p>
              )}

              {conv.estimulos && (
                <p><strong>Estímulos:</strong> {conv.estimulos}</p>
              )}

              {conv.resolucion && (
                <p className="conv-resolution"><strong>Resolución:</strong> {conv.resolucion}</p>
              )}

              {conv.ganadores && conv.ganadores.length > 0 && (
                <div className="conv-winners">
                  <strong>Ganadores:</strong>
                  <ul>
                    {conv.ganadores.slice(0, 5).map((ganador, i) => (
                      <li key={i}>{ganador}</li>
                    ))}
                    {conv.ganadores.length > 5 && (
                      <li className="more-winners">...y {conv.ganadores.length - 5} más</li>
                    )}
                  </ul>
                </div>
              )}

              {conv.nota && (
                <p className="conv-note">{conv.nota}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Funding;
