
import { trackExternalLink } from '../utils/analytics';

const Footer = () => {
  return (
    <footer className="border-t border-slate-100 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Rohan Shrestha. Data Analytics & Computer Science.
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-slate-400 text-xs font-medium uppercase tracking-wider">
          <a href="https://www.linkedin.com/in/shrestharo2002/" target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin', 'https://www.linkedin.com/in/shrestharo2002/')} className="hover:text-indigo-600 transition-colors">LinkedIn</a>
          <a href="https://github.com/sthar2820" target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github', 'https://github.com/sthar2820')} className="hover:text-indigo-600 transition-colors">GitHub</a>
          <a href="mailto:sthar2820@gmail.com" onClick={() => trackExternalLink('email', 'mailto:sthar2820@gmail.com')} className="hover:text-indigo-600 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
