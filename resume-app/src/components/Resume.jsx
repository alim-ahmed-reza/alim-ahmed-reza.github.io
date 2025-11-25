import { useResume } from '../context/ResumeContext';
import './Resume.css';

const Resume = () => {
  const { resumeData } = useResume();

  return (
    <div className="resume-wrapper">
      <main className="page">
        {/* ===== Header ===== */}
        <header className="header">
          <div className="name-title">
            <h1>{resumeData.personalInfo.name}</h1>
            <div className="title">{resumeData.personalInfo.title}</div>
          </div>
          <div className="contacts">
            <span>
              <a href={`mailto:${resumeData.personalInfo.email}`}>
                {resumeData.personalInfo.email}
              </a>
            </span>
            <span>
              <a href={`tel:${resumeData.personalInfo.phone.replace(/\s/g, '')}`}>
                {resumeData.personalInfo.phone}
              </a>
            </span>
            <span>
              <a href={`https://${resumeData.personalInfo.linkedin}`}>
                {resumeData.personalInfo.linkedin}
              </a>
            </span>
            <span>
              <a href={`https://${resumeData.personalInfo.github}`}>
                {resumeData.personalInfo.github}
              </a>
            </span>
            <span>
              <a href={`https://${resumeData.personalInfo.hackerrank}`}>
                {resumeData.personalInfo.hackerrank}
              </a>
            </span>
          </div>
        </header>

        <div className="grid">
          {/* ===== Left Column: Summary & Experience (primary) ===== */}
          <div>
            {/* Summary */}
            <section className="section">
              <h2>Summary</h2>
              <p>{resumeData.summary.text}</p>
              <div className="taglist" aria-label="Core Skills">
                {resumeData.summary.coreSkills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="section">
              <h2>Experience</h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="exp-item">
                  <div className="role-hdr">
                    <h3>
                      {exp.role} · <span className="company">{exp.company}</span>
                    </h3>
                    <div className="meta">
                      {exp.duration} <span className="location">{exp.location}</span>
                    </div>
                  </div>
                  <p className="meta-row">{exp.description}</p>
                  <ul className="bullets">
                    {exp.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          {/* ===== Right Column: Skills, Projects, Education ===== */}
          <div>
            {/* Skills */}
            <section className="section">
              <h2>Skills</h2>
              <div className="taglist">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="section">
              <h2>Projects</h2>
              {resumeData.projects.map((project) => (
                <div key={project.id} className="proj-item">
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="section">
              <h2>Education</h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="edu-item">
                  <strong>{edu.degree}</strong>
                  <div className="meta">{edu.institution}</div>
                  <span className="meta-row">{edu.duration}</span>
                  <div className="meta-row">{edu.location}</div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
