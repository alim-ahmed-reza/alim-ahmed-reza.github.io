import { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const defaultResumeData = {
  personalInfo: {
    name: 'Alim Ahmed Reza',
    title: 'Senior FullStack Developer',
    email: 'reza.alimahmed@gmail.com',
    phone: '+880 1778 746 494',
    linkedin: 'linkedin.com/in/alim-ahmed-reza-asif',
    github: 'github.com/Alim-Reza',
    hackerrank: 'hackerrank.com/aarasif2',
  },
  summary: {
    text: 'Backend-focused Software Engineer with 6+ years building scalable fintech and ERP systems. Strong in Java/Spring Boot, microservices, testing, and CI/CD. Known for refactoring legacy services, leading code reviews, and introducing code quality tooling to improve reliability and maintainability. Cross-functional communicator with experience collaborating directly with clients and stakeholders.',
    coreSkills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'JUnit', 'CI/CD (Jenkins)', 'Redis', 'Kafka'],
  },
  experience: [
    {
      id: 1,
      role: 'Sr. Software Engineer',
      company: 'Kona Software Lab Ltd',
      location: 'Dhaka, Bangladesh',
      duration: 'Apr 2022 – Present',
      description: 'Fintech product engineering across web and mobile.',
      bullets: [  
            "Re-designed notification service for client/adminportals, boosting performance by ~40%",
            "Refactored Spring Boot services and addedcomprehensive unit tests (≈75% coverage) toimprove reliability and maintainability",
            "Ran proactive code reviews and introducedSonarQube, streamlining quality gates and reviewflow",
            "Redesigned user-facing site and product portal for acrypto trading platform, increasing overallperformance by ~70%; built a Flutter app for mobileparity"
    ],
    },
    {
      id: 2,
      role: 'Software Engineer',
      company: 'RedDot Digital Ltd',
      location: 'Dhaka, Bangladesh',
      duration: 'Jul 2021 – Apr 2022',
      description: 'Telecom solutions development and operations.',
      bullets: [
        'Maintained development/deployment pipelines, achieving ~95% on-time releases and reducing post-release issues by ~25%.',
        'Integrated payment services into client sites to enable streamlined transactions.',
      ],
    },
    {
      id: 3,
      role: 'Software Engineer',
      company: 'CoKreates Ltd',
      location: 'Dhaka, Bangladesh',
      duration: 'May 2019 – Jul 2021',
      description: 'Government-scale ERP (microservices) delivery.',
      bullets: [
        'Contributed to full‑stack microservice-based ERP; supported requirements/stakeholder sessions, reducing bottlenecks by ~25% and improving scalability/performance by ~15%.',
        'Authored bash scripts and automated deployment pipelines to elevate developer efficiency.',
      ],
    },
  ],
  skills: ['Spring Boot', 'Java', 'Microservices', 'Redis', 'Kafka', 'Git', 'Bash', 'Jenkins', 'Docker', 'JUnit', 'E2E Testing', 'React', 'Next.js', 'Angular'],
  projects: [
    {
      id: 1,
      title: 'CMS — Card Management System (Backend)',
      description: 'Banking integration service; substantially improved data-fetching policies for read‑heavy APIs.',
    },
    {
      id: 2,
      title: 'Kona Integrated Portal (Backend)',
      description: 'Multi‑tenant portal for onboarding/managing fintech clients; improved backend notification system throughput.',
    },
    {
      id: 3,
      title: 'GRP — Government ERP (Full‑stack)',
      description: 'Piloted at Planning Division; built robust reporting module (Django), team‑wide bash automation, and automated deployment pipeline; frequent stakeholder sessions to unblock delivery.',
    },
    {
      id: 4,
      title: 'Kona Token Trade (Frontend & App)',
      description: 'Crypto trading platform; delivered multilateral trading view and buy/sell flows; migrated from React (JS) to Next.js (TS) with security hardening against XSS; rebuilt mobile UI in Flutter.',
    },
    {
      id: 5,
      title: 'Kona Plate (Frontend)',
      description: 'Open API platform for selling and sandbox testing; built complex tree‑style API explorer component.',
    },
    {
      id: 6,
      title: 'Altair (Full-stack)',
      description: 'Marketplace for 3D object for free download and upload and hiring talents. Led a small team of 4 members and maintained full-stack development.',
    }
  ],
  education: [
    {
      id: 1,
      degree: 'MSc in Computer Science & Engineering',
      institution: 'North South University',
      duration: 'Jan 2025 – Present',
      location: 'Dhaka, Bangladesh',
    },
    {
      id: 2,
      degree: 'BSc in Computer Science & Engineering',
      institution: 'American International University – Bangladesh',
      duration: 'Jan 2016 – Jan 2020',
      location: 'Dhaka, Bangladesh',
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : defaultResumeData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (newData) => {
    setResumeData(newData);
  };

  const resetToDefault = () => {
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData, resetToDefault }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
