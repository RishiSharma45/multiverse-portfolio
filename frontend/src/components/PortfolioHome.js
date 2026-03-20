import { useEffect, useState } from 'react';
import API from '../services/api';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import ProjectsSection from './ProjectsSection';
import Skills from './Skills';
import Contact from './Contact';

function PortfolioHome() {
  const [projects, setProjects] = useState([]);
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [projectsResponse, siteContentResponse] = await Promise.all([
//         API.get('/projects'),
//         API.get('/site-content')
//       ]);

//       console.log('Projects response:', projectsResponse.data);
//       console.log('Site content response:', siteContentResponse.data);

//       setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []);
//       setSiteContent(siteContentResponse.data || null);
//     } catch (err) {
//       console.error('Error fetching portfolio data:', err);
//       setError('Failed to load portfolio data');
//       setProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [projectsResponse, siteContentResponse] = await Promise.all([
        API.get('/projects'),
        API.get('/site-content')
      ]);

      console.log('Projects response:', projectsResponse.data);
      console.log('Site content response:', siteContentResponse.data);

      setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []);
      setSiteContent(siteContentResponse.data || null);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Failed to load portfolio data');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <div className="app">
      <Navbar />

      {loading && (
        <section className="section">
          <p>Loading portfolio...</p>
        </section>
      )}

      {error && (
        <section className="section">
          <p>{error}</p>
        </section>
      )}

      {!loading && !error && siteContent && (
        <>
          <Hero
            heroTitle={siteContent.heroTitle}
            heroSubtitle={siteContent.heroSubtitle}
          />
          <About aboutText={siteContent.aboutText} />
          <ProjectsSection projects={projects} />
          <Skills skills={siteContent.skills} />
          <Contact
            email={siteContent.contactEmail}
            linkedIn={siteContent.contactLinkedIn}
            gitHub={siteContent.contactGitHub}
          />
        </>
      )}
    </div>
  );
}

export default PortfolioHome;