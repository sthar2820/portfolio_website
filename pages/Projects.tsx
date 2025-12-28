
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const primaryProject = PROJECTS.find(p => p.isPrimary);
  const otherProjects = PROJECTS.filter(p => !p.isPrimary);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Portfolio</h2>
        <h1 className="serif-title text-4xl text-slate-900">Selected Works</h1>
      </div>

      {/* Primary Project */}
      {primaryProject && (
        <section className="mb-16">
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900 text-white p-1 shadow-xl">
             <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-xl bg-white text-slate-900">
                <div className="h-full overflow-hidden">
                  <img 
                    src={primaryProject.imageUrl} 
                    alt={primaryProject.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-widest">Featured Project</span>
                  <h2 className="text-3xl font-bold mb-4">{primaryProject.title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {primaryProject.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-sm font-bold text-slate-800">Business Impact:</p>
                    <p className="text-sm text-slate-500 italic">{primaryProject.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryProject.technologies.map(t => (
                      <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* Grid for other projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherProjects.map(project => (
          <div key={project.id} className="border border-slate-100 rounded-xl overflow-hidden hover:border-slate-300 transition-colors flex flex-col">
            <div className="h-48 overflow-hidden bg-slate-200">
               <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map(t => (
                  <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase font-bold">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
