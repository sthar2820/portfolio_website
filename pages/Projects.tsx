
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-widest">Featured Project</span>
                  <h2 className="text-2xl font-bold mb-3">{primaryProject.title}</h2>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                    {primaryProject.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-800">Business Impact:</p>
                    <p className="text-xs text-slate-500 italic">{primaryProject.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {primaryProject.technologies.map(t => (
                      <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryProject.websiteUrl && (
                      <a href={primaryProject.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 transition-all">
                        Live Demo
                      </a>
                    )}
                    {primaryProject.githubUrl && (
                      <a href={primaryProject.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-slate-400 hover:bg-slate-50 transition-all">
                        GitHub
                      </a>
                    )}
                    {primaryProject.details && (
                      <button onClick={() => setSelectedProject(primaryProject)} className="border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                        Details
                      </button>
                    )}
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
              {(project.githubUrl || project.websiteUrl || project.details) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                  {project.websiteUrl && (
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition-all">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all">
                      GitHub
                    </a>
                  )}
                  {project.details && (
                    <button onClick={() => setSelectedProject(project)} className="text-xs border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-lg font-medium hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                      Details
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedProject.role}</span>
                <h3 className="font-bold text-slate-900 text-xl mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-slate-600 mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Key Features & Highlights</h4>
                <ul className="space-y-2">
                  {selectedProject.details?.map((detail, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-600">
                      <span className="text-indigo-600 mr-2 mt-0.5">&#10003;</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Business Impact</h4>
                <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-lg">{selectedProject.impact}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(t => (
                    <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-semibold">{t}</span>
                  ))}
                </div>
              </div>

              {/* Media Gallery */}
              {selectedProject.media && selectedProject.media.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">Project Gallery</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.media.map((item, index) => (
                      <div key={index} className="rounded-lg overflow-hidden bg-slate-100">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={`${selectedProject.title} - ${index + 1}`}
                            className="w-full h-32 object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        ) : (
                          <video
                            src={item.url}
                            controls
                            className="w-full h-32 object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              {selectedProject.websiteUrl && (
                <a href={selectedProject.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all">
                  Live Demo
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-slate-400 hover:bg-slate-50 transition-all">
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
