import { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { trackProjectView, trackExternalLink } from '../utils/analytics';
import AnimatedSection from '../components/AnimatedSection';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const primaryProject = PROJECTS.find(p => p.isPrimary);
  const otherProjects = PROJECTS.filter(p => !p.isPrimary);

  const handleProjectDetails = (project: Project) => {
    trackProjectView(project.id, project.title);
    setSelectedProject(project);
  };

  const handleLiveDemo = (url: string, projectTitle: string) => {
    trackExternalLink('live_demo', url, projectTitle);
  };

  const handleGithub = (url: string, projectTitle: string) => {
    trackExternalLink('project_github', url, projectTitle);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <AnimatedSection>
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Portfolio</h2>
          <h1 className="serif-title text-4xl text-stone-900">Selected Works</h1>
        </div>
        <p className="text-stone-500 leading-relaxed max-w-2xl mb-12">
          Each project represents a problem I found worth solving. From automated pipelines to predictive models, these are the systems I've built to turn raw data into clear, actionable outcomes.
        </p>
      </AnimatedSection>

      {/* Featured Project */}
      {primaryProject && (
        <AnimatedSection animation="scale" className="mb-16">
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200/60 hover:shadow-xl transition-shadow duration-500">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"></div>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-full overflow-hidden">
                <img
                  src={primaryProject.imageUrl}
                  alt={primaryProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">Featured Project</span>
                <h2 className="text-2xl font-bold mb-3 text-stone-900">{primaryProject.title}</h2>
                <p className="text-stone-500 mb-4 leading-relaxed text-sm">{primaryProject.description}</p>
                <div className="mb-5 bg-stone-50 rounded-lg p-3 border border-stone-100">
                  <p className="text-xs font-bold text-stone-700">Business Impact</p>
                  <p className="text-xs text-stone-500 italic mt-0.5">{primaryProject.impact}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {primaryProject.technologies.map(t => (
                    <span key={t} className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-semibold">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {primaryProject.websiteUrl && (
                    <a href={primaryProject.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleLiveDemo(primaryProject.websiteUrl!, primaryProject.title)} className="bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-stone-800 hover:shadow-md transition-all duration-300">
                      Live Demo
                    </a>
                  )}
                  {primaryProject.githubUrl && (
                    <a href={primaryProject.githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleGithub(primaryProject.githubUrl!, primaryProject.title)} className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-xs font-medium hover:border-stone-300 hover:shadow-sm transition-all duration-300">
                      GitHub
                    </a>
                  )}
                  {primaryProject.details && (
                    <button onClick={() => handleProjectDetails(primaryProject)} className="bg-white border border-amber-200 text-amber-700 px-4 py-2 rounded-lg text-xs font-medium hover:border-amber-300 hover:shadow-sm transition-all duration-300">
                      Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((project, i) => (
          <AnimatedSection key={project.id} delay={0.1 * i} animation="fade-up">
            <div className="group bg-white border border-stone-200/60 rounded-2xl overflow-hidden hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-50/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-stone-100 relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-amber-700 transition-colors duration-200">{project.title}</h3>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.map(t => (
                    <span key={t} className="text-[10px] bg-stone-50 text-stone-600 px-2 py-1 rounded-full uppercase font-bold tracking-wide border border-stone-100">{t}</span>
                  ))}
                </div>
                {(project.githubUrl || project.websiteUrl || project.details) && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-100">
                    {project.websiteUrl && (
                      <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleLiveDemo(project.websiteUrl!, project.title)} className="text-xs bg-stone-900 text-white px-3.5 py-1.5 rounded-lg font-medium hover:bg-stone-800 transition-all duration-300">
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleGithub(project.githubUrl!, project.title)} className="text-xs bg-white border border-stone-200 text-stone-600 px-3.5 py-1.5 rounded-lg font-medium hover:border-stone-300 transition-all duration-300">
                        GitHub
                      </a>
                    )}
                    {project.details && (
                      <button onClick={() => handleProjectDetails(project)} className="text-xs bg-white border border-amber-200 text-amber-700 px-3.5 py-1.5 rounded-lg font-medium hover:border-amber-300 transition-all duration-300">
                        Details
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{selectedProject.role}</span>
                <h3 className="font-bold text-stone-900 text-xl mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-stone-400 hover:text-stone-600 p-2 rounded-lg hover:bg-stone-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-stone-600 mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-800 mb-3">Key Features & Highlights</h4>
                <ul className="space-y-2">
                  {selectedProject.details?.map((detail, index) => (
                    <li key={index} className="flex items-start text-sm text-stone-600">
                      <span className="text-amber-500 mr-2.5 mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-800 mb-3">Business Impact</h4>
                <p className="text-sm text-stone-500 italic bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">{selectedProject.impact}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-800 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(t => (
                    <span key={t} className="text-xs bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full font-semibold">{t}</span>
                  ))}
                </div>
              </div>

              {selectedProject.media && selectedProject.media.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-stone-800 mb-3">Project Gallery</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.media.map((item, index) => (
                      <div key={index} className="rounded-xl overflow-hidden bg-stone-100 ring-1 ring-stone-200/50">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={`${selectedProject.title} - ${index + 1}`}
                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        ) : (
                          <video src={item.url} controls className="w-full h-32 object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-stone-100 flex gap-3 bg-stone-50/50">
              {selectedProject.websiteUrl && (
                <a href={selectedProject.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleLiveDemo(selectedProject.websiteUrl!, selectedProject.title)} className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-800 transition-all duration-300">
                  Live Demo
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleGithub(selectedProject.githubUrl!, selectedProject.title)} className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-stone-300 transition-all duration-300">
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
