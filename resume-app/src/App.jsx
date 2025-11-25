import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Resume from './components/Resume';
import ResumeForm from './components/ResumeForm';
import './App.css';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Resume />} />
          <Route path="/resume-form" element={<ResumeForm />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;
