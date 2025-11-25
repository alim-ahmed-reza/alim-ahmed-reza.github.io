import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import './ResumeForm.css';

const ResumeForm = () => {
  const { resumeData, updateResumeData, resetToDefault } = useResume();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(resumeData);

  const handlePersonalInfoChange = (field, value) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [field]: value },
    });
  };

  const handleSummaryChange = (field, value) => {
    setFormData({
      ...formData,
      summary: { ...formData.summary, [field]: value },
    });
  };

  const handleCoreSkillsChange = (value) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({
      ...formData,
      summary: { ...formData.summary, coreSkills: skills },
    });
  };

  const handleSkillsChange = (value) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, skills });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
  };

  const handleExperienceBulletsChange = (index, value) => {
    const bullets = value.split('\n').filter(b => b.trim());
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], bullets };
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: Date.now(),
          role: '',
          company: '',
          location: '',
          duration: '',
          description: '',
          bullets: [],
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, projects: updated });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { id: Date.now(), title: '', description: '' },
      ],
    });
  };

  const removeProject = (index) => {
    const updated = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updated });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: Date.now(), degree: '', institution: '', duration: '', location: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData(formData);
    navigate('/');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default data? This cannot be undone.')) {
      resetToDefault();
      setFormData(resumeData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Edit Resume</h1>
        <div className="header-buttons">
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Reset to Default
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.personalInfo.title}
              onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="text"
              value={formData.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="text"
              value={formData.personalInfo.linkedin}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="text"
              value={formData.personalInfo.github}
              onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
              placeholder="github.com/username"
            />
          </div>
          <div className="form-group">
            <label>HackerRank</label>
            <input
              type="text"
              value={formData.personalInfo.hackerrank}
              onChange={(e) => handlePersonalInfoChange('hackerrank', e.target.value)}
              placeholder="hackerrank.com/username"
            />
          </div>
        </section>

        {/* Summary */}
        <section className="form-section">
          <h2>Summary</h2>
          <div className="form-group">
            <label>Summary Text *</label>
            <textarea
              value={formData.summary.text}
              onChange={(e) => handleSummaryChange('text', e.target.value)}
              rows="5"
              required
            />
          </div>
          <div className="form-group">
            <label>Core Skills (comma-separated) *</label>
            <input
              type="text"
              value={formData.summary.coreSkills.join(', ')}
              onChange={(e) => handleCoreSkillsChange(e.target.value)}
              placeholder="Java, Spring Boot, Microservices"
              required
            />
          </div>
        </section>

        {/* Experience */}
        <section className="form-section">
          <div className="section-header">
            <h2>Experience</h2>
            <button type="button" onClick={addExperience} className="btn-add">
              + Add Experience
            </button>
          </div>
          {formData.experience.map((exp, index) => (
            <div key={exp.id} className="array-item">
              <div className="item-header">
                <h3>Experience #{index + 1}</h3>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="form-group">
                <label>Role *</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  placeholder="Jan 2020 - Present"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Key Achievements (one per line) *</label>
                <textarea
                  value={exp.bullets.join('\n')}
                  onChange={(e) => handleExperienceBulletsChange(index, e.target.value)}
                  rows="4"
                  placeholder="Enter each achievement on a new line"
                  required
                />
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="form-section">
          <h2>Skills</h2>
          <div className="form-group">
            <label>Skills (comma-separated) *</label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="React, Node.js, Python"
              required
            />
          </div>
        </section>

        {/* Projects */}
        <section className="form-section">
          <div className="section-header">
            <h2>Projects</h2>
            <button type="button" onClick={addProject} className="btn-add">
              + Add Project
            </button>
          </div>
          {formData.projects.map((project, index) => (
            <div key={project.id} className="array-item">
              <div className="item-header">
                <h3>Project #{index + 1}</h3>
                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  rows="3"
                  required
                />
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="form-section">
          <div className="section-header">
            <h2>Education</h2>
            <button type="button" onClick={addEducation} className="btn-add">
              + Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="array-item">
              <div className="item-header">
                <h3>Education #{index + 1}</h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="text"
                  value={edu.duration}
                  onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                  placeholder="Jan 2020 - Dec 2024"
                  required
                />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </section>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save & View Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
