import { trackExternalLink } from '../utils/analytics';

const Footer = () => {
  return (
    <footer className="bg-stone-900 mt-20">
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold tracking-tight text-white">
              ROHAN <span className="text-amber-400">SHRESTHA</span>
            </span>
            <p className="text-stone-400 text-sm mt-1">Data Analytics & Computer Science</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/shrestharo2002/" target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin', 'https://www.linkedin.com/in/shrestharo2002/')} className="text-stone-400 hover:text-amber-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider">LinkedIn</a>
            <a href="https://github.com/sthar2820" target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github', 'https://github.com/sthar2820')} className="text-stone-400 hover:text-amber-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider">GitHub</a>
            <a href="mailto:sthar2820@gmail.com" onClick={() => trackExternalLink('email', 'mailto:sthar2820@gmail.com')} className="text-stone-400 hover:text-amber-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wider">Email</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-800 text-center">
          <p className="text-stone-500 text-xs">&copy; {new Date().getFullYear()} Rohan Shrestha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
