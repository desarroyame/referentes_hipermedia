// Utilidades para procesar y filtrar los datos

export const loadData = async () => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const response = await fetch(`${baseUrl}data.json`);
  const data = await response.json();
  return data;
};

export const getAllProjects = (data) => {
  if (!data) return [];

  const projects = [];

  // Videojuegos
  if (data.videojuegos) {
    data.videojuegos.forEach(item => {
      projects.push({
        ...item,
        tipo: 'Videojuego',
        tipoId: 'videojuego'
      });
    });
  }

  // Experiencias Físicas
  if (data.experienciasFisicas) {
    data.experienciasFisicas.forEach(item => {
      projects.push({
        ...item,
        tipo: 'Experiencia Física',
        tipoId: 'experiencia-fisica'
      });
    });
  }

  // Exposiciones Museográficas
  if (data.exposicionesMuseograficas) {
    data.exposicionesMuseograficas.forEach(item => {
      projects.push({
        ...item,
        tipo: 'Exposición Museográfica',
        tipoId: 'exposicion'
      });
    });
  }

  return projects;
};

export const filterProjects = (projects, filters) => {
  let filtered = [...projects];

  // Filtrar por tipo
  if (filters.tipo && filters.tipo !== 'todos') {
    filtered = filtered.filter(p => p.tipoId === filters.tipo);
  }

  // Filtrar por año
  if (filters.anio) {
    filtered = filtered.filter(p => p.anio && p.anio.toString().includes(filters.anio));
  }

  // Filtrar por ciudad
  if (filters.ciudad && filters.ciudad !== 'todas') {
    filtered = filtered.filter(p =>
      p.ciudad && p.ciudad.toLowerCase() === filters.ciudad.toLowerCase()
    );
  }

  // Filtrar por tecnología
  if (filters.tecnologia && filters.tecnologia !== 'todas') {
    filtered = filtered.filter(p => {
      // Buscar en tech_stack
      if (p.tech_stack && Array.isArray(p.tech_stack)) {
        return p.tech_stack.some(tech => 
          tech.nombre && tech.nombre.toLowerCase().includes(filters.tecnologia.toLowerCase())
        );
      }
      // Fallback a campos legacy
      if (p.motor && p.motor.toLowerCase().includes(filters.tecnologia.toLowerCase())) return true;
      if (p.tecnologia && p.tecnologia.toLowerCase().includes(filters.tecnologia.toLowerCase())) return true;
      return false;
    });
  }

  // Búsqueda por texto
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      (p.nombre && p.nombre.toLowerCase().includes(searchLower)) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(searchLower)) ||
      (p.estudio && p.estudio.toLowerCase().includes(searchLower)) ||
      (p.empresa && p.empresa.toLowerCase().includes(searchLower)) ||
      (p.museo && p.museo.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
};

export const getUniqueCities = (projects) => {
  const cities = new Set();
  projects.forEach(p => {
    if (p.ciudad) cities.add(p.ciudad);
  });
  return Array.from(cities).sort();
};

export const getUniqueTechnologies = (projects) => {
  const techs = new Set();
  projects.forEach(p => {
    // Obtener tecnologías de tech_stack
    if (p.tech_stack && Array.isArray(p.tech_stack)) {
      p.tech_stack.forEach(tech => {
        if (tech.nombre) techs.add(tech.nombre);
      });
    }
    // Fallback a campos legacy
    if (p.motor) techs.add(p.motor);
    if (p.tecnologia) {
      if (Array.isArray(p.tecnologia)) {
        p.tecnologia.forEach(t => techs.add(t));
      } else {
        techs.add(p.tecnologia);
      }
    }
  });
  return Array.from(techs).sort();
};

export const getStats = (data) => {
  const projects = getAllProjects(data);

  const totalVideojuegos = data.videojuegos?.length || 0;
  const totalExperiencias = data.experienciasFisicas?.length || 0;
  const totalExposiciones = data.exposicionesMuseograficas?.length || 0;
  const totalConvocatorias = data.convocatorias?.length || 0;

  // Calcular años
  const years = projects.map(p => p.anio).filter(y => y);
  const minYear = years.length > 0 ? Math.min(...years) : null;
  const maxYear = years.length > 0 ? Math.max(...years) : null;

  // Calcular presupuesto total de convocatorias
  let totalPresupuesto = 0;
  if (data.convocatorias) {
    data.convocatorias.forEach(conv => {
      if (conv.presupuesto) {
        totalPresupuesto += conv.presupuesto;
      } else if (conv.monto) {
        totalPresupuesto += conv.monto;
      }
    });
  }

  return {
    totalProyectos: projects.length,
    totalVideojuegos,
    totalExperiencias,
    totalExposiciones,
    totalConvocatorias,
    minYear,
    maxYear,
    yearsSpan: maxYear && minYear ? maxYear - minYear : 0,
    totalPresupuesto,
    ciudades: getUniqueCities(projects).length
  };
};

export const getFeaturedProjects = (data) => {
  const projects = getAllProjects(data);

  // Proyectos con premios internacionales o alto impacto
  return projects.filter(p =>
    (p.premio && (
      p.premio.toLowerCase().includes('international') ||
      p.premio.toLowerCase().includes('golden nica') ||
      p.premio.toLowerCase().includes('unreal') ||
      p.premio.toLowerCase().includes('google') ||
      p.premio.toLowerCase().includes('apple')
    )) ||
    (p.resultados && (
      p.resultados.toLowerCase().includes('reducción') ||
      p.resultados.toLowerCase().includes('ahorro') ||
      p.resultados.toLowerCase().includes('millones')
    )) ||
    (p.descargas && parseInt(p.descargas.replace(/\D/g, '')) > 10000)
  ).slice(0, 12); // Top 12
};

export const getTechStats = (data) => {
  const projects = getAllProjects(data);

  const engines = {};
  const platforms = {};

  projects.forEach(p => {
    // Engines
    if (p.motor) {
      engines[p.motor] = (engines[p.motor] || 0) + 1;
    }

    // Plataformas
    if (p.plataformas) {
      if (Array.isArray(p.plataformas)) {
        p.plataformas.forEach(plat => {
          platforms[plat] = (platforms[plat] || 0) + 1;
        });
      } else if (typeof p.plataformas === 'string') {
        platforms[p.plataformas] = (platforms[p.plataformas] || 0) + 1;
      }
    }
  });

  return { engines, platforms };
};

export const getTimelineData = (data) => {
  const projects = getAllProjects(data);
  const convocatorias = data.convocatorias || [];

  const timeline = {};

  // Agrupar proyectos por año
  projects.forEach(p => {
    if (p.anio) {
      if (!timeline[p.anio]) {
        timeline[p.anio] = { proyectos: [], convocatorias: [] };
      }
      timeline[p.anio].proyectos.push(p);
    }
  });

  // Agrupar convocatorias por año
  convocatorias.forEach(c => {
    if (c.anio) {
      if (!timeline[c.anio]) {
        timeline[c.anio] = { proyectos: [], convocatorias: [] };
      }
      timeline[c.anio].convocatorias.push(c);
    }
  });

  return timeline;
};

export const formatCurrency = (amount) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
