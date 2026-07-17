import { EXPERIENCES } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const Experience = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AnimatedSection>
        <div className="mb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Career Path</h2>
          <h1 className="serif-title text-4xl text-stone-900">The Journey</h1>
        </div>
        <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto text-center mb-16">
          Each role has shaped how I think about data, systems, and the people who rely on them. Here's the path so far.
        </p>
      </AnimatedSection>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-300 via-orange-300 to-amber-400"></div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <AnimatedSection key={exp.id} delay={0.15 * index} animation="slide-right">
              <div className="relative pl-10">
                <div className="absolute left-0 top-7 w-[15px] h-[15px] rounded-full bg-gradient-to-br from-amber-400 to-orange-500 ring-4 ring-[#FAF7F2] z-10"></div>

                <div className="bg-white border border-stone-200/60 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200/60 transition-all duration-300">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{exp.duration}</span>
                  <h3 className="text-xl font-bold text-stone-900 mt-1">{exp.position}</h3>
                  <p className="text-amber-700 font-medium text-sm mb-4">{exp.company}</p>
                  <ul className="space-y-2.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-stone-500 leading-relaxed flex items-start">
                        <span className="text-amber-400 mr-2 mt-1.5 flex-shrink-0">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
