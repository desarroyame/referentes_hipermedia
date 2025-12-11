import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Explorer from './pages/Explorer';
import CaseStudies from './pages/CaseStudies';
import Funding from './pages/Funding';
import TechEcosystem from './pages/TechEcosystem';
import Context from './pages/Context';
import { loadData, getAllProjects, getStats } from './utils/dataProcessing';

function App() {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedData = await loadData();
        setData(loadedData);
        const allProjects = getAllProjects(loadedData);
        setProjects(allProjects);
        const calculatedStats = getStats(loadedData);
        setStats(calculatedStats);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos. Por favor, recarga la página.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Router basename="/referentes_hipermedia">
      <div className="app">
        <Header stats={stats} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Explorer projects={projects} />} />
            <Route path="/casos-estudio" element={<CaseStudies data={data} />} />
            <Route path="/convocatorias" element={<Funding convocatorias={data.convocatorias || []} />} />
            <Route path="/ecosistema" element={<TechEcosystem data={data} />} />
            <Route path="/contexto" element={<Context data={data} projects={projects} />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>
            Referentes Hipermedia Colombia | Datos hasta {data?.metadatos?.ultimaActualizacion || '2024'}
          </p>
          <p className="footer-note">
            Instrumento de visualización para estudiantes de diseño hipermedia
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
