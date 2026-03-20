import { useEffect, useState } from 'react';
import API from '../services/api';

function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [customFields, setCustomFields] = useState([{ key: '', value: '' }]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);

  const [siteContent, setSiteContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    skills: '',
    contactEmail: '',
    contactLinkedIn: '',
    contactGitHub: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await API.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchSiteContent = async () => {
    try {
      const response = await API.get('/site-content');
      const data = response.data;

      setSiteContent({
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        aboutText: data.aboutText || '',
        skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
        contactEmail: data.contactEmail || '',
        contactLinkedIn: data.contactLinkedIn || '',
        contactGitHub: data.contactGitHub || ''
      });
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSiteContent();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSiteContentChange = (e) => {
    setSiteContent({
      ...siteContent,
      [e.target.name]: e.target.value
    });
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const removeCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields.length ? updatedFields : [{ key: '', value: '' }]);
  };

  const buildExtraFieldsObject = () => {
    const extraFields = {};

    customFields.forEach((field) => {
      if (field.key.trim() !== '') {
        extraFields[field.key] = field.value;
      }
    });

    return extraFields;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: ''
    });
    setCustomFields([{ key: '', value: '' }]);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        extraFields: buildExtraFieldsObject()
      };

      if (editId) {
        await API.put(`/projects/${editId}`, payload);
        setMessage('Project updated successfully ✅');
      } else {
        await API.post('/projects', payload);
        setMessage('Project added successfully ✅');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('Failed to save project');
    }
  };

  const handleSiteContentSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...siteContent,
        skills: siteContent.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      };

      await API.put('/site-content', payload);
      setMessage('Site content updated successfully ✅');
      fetchSiteContent();
    } catch (error) {
      console.error('Error updating site content:', error);
      setMessage('Failed to update site content');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || ''
    });

    if (project.extraFields && Object.keys(project.extraFields).length > 0) {
      const fieldsArray = Object.entries(project.extraFields).map(([key, value]) => ({
        key,
        value: Array.isArray(value) ? value.join(', ') : String(value)
      }));
      setCustomFields(fieldsArray);
    } else {
      setCustomFields([{ key: '', value: '' }]);
    }

    setEditId(project._id);
    setMessage(`Editing: ${project.title}`);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setMessage('Project deleted successfully ✅');

      if (editId === id) {
        resetForm();
      }

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('Failed to delete project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <div className="admin-page">
      <h1>🛠 Admin Control Panel</h1>
      <p>Manage your multiverse portfolio data here.</p>
      <button onClick={handleLogout}>Logout</button>

      <div className="admin-section">
        <h2>Site Content Management</h2>

        <form className="admin-form" onSubmit={handleSiteContentSubmit}>
          <input
            type="text"
            name="heroTitle"
            placeholder="Hero title"
            value={siteContent.heroTitle}
            onChange={handleSiteContentChange}
          />

          <textarea
            name="heroSubtitle"
            placeholder="Hero subtitle"
            value={siteContent.heroSubtitle}
            onChange={handleSiteContentChange}
          />

          <textarea
            name="aboutText"
            placeholder="About text"
            value={siteContent.aboutText}
            onChange={handleSiteContentChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills separated by commas"
            value={siteContent.skills}
            onChange={handleSiteContentChange}
          />

          <input
            type="email"
            name="contactEmail"
            placeholder="Contact email"
            value={siteContent.contactEmail}
            onChange={handleSiteContentChange}
          />

          <input
            type="text"
            name="contactLinkedIn"
            placeholder="LinkedIn link or username"
            value={siteContent.contactLinkedIn}
            onChange={handleSiteContentChange}
          />

          <input
            type="text"
            name="contactGitHub"
            placeholder="GitHub link or username"
            value={siteContent.contactGitHub}
            onChange={handleSiteContentChange}
          />

          <button type="submit">Save Site Content</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Project Management</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="custom-fields-section">
            <h3>Custom Fields</h3>

            {customFields.map((field, index) => (
              <div key={index} className="custom-field-row">
                <input
                  type="text"
                  placeholder="Field name"
                  value={field.key}
                  onChange={(e) =>
                    handleCustomFieldChange(index, 'key', e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Field value"
                  value={field.value}
                  onChange={(e) =>
                    handleCustomFieldChange(index, 'value', e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeCustomField(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-field-button"
              onClick={addCustomField}
            >
              + Add Custom Field
            </button>
          </div>

          <div className="admin-button-row">
            <button type="submit">
              {editId ? 'Update Project' : 'Add Project'}
            </button>

            {editId && (
              <button type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="admin-project-list">
          <h2>Existing Projects</h2>

          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="admin-project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.extraFields && Object.keys(project.extraFields).length > 0 && (
                  <div className="admin-extra-fields">
                    {Object.entries(project.extraFields).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </p>
                    ))}
                  </div>
                )}

                <div className="admin-card-actions">
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>

      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}

export default AdminPanel;