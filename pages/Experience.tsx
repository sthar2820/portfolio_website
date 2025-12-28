
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Career Path</h2>
        <h1 className="serif-title text-4xl text-slate-900">Experience</h1>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:w-px before:bg-slate-100">
        {EXPERIENCES.map((exp, index) => (
          <div key={exp.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Dot */}
            <div className="absolute left-0 md:left-1/2 top-1 w-3 h-3 bg-indigo-600 rounded-full border-4 border-white transform -translate-x-1.5 z-10" />
            
            <div className="md:w-1/2 pl-8 md:pl-0">
               <div className={`bg-white border border-slate-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                  <span className="text-sm font-medium text-slate-400 mb-1 block">{exp.duration}</span>
                  <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-slate-500 leading-relaxed">• {item}</li>
                    ))}
                  </ul>
               </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
