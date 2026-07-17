import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { trackResumeView, trackResumeDownload, trackExternalLink } from '../utils/analytics';

const skills = [
  { num: '01', title: 'Data Analysis', desc: 'Python (pandas, NumPy), SQL, Excel, Exploratory Data Analysis' },
  { num: '02', title: 'Data Engineering', desc: 'ETL Pipelines, Databricks, BigQuery, Streamlit' },
  { num: '03', title: 'Governance', desc: 'Data Validation, Quality Checks, Root Cause Analysis' },
  { num: '04', title: 'Visualization', desc: 'Power BI, Interactive Dashboards, Power Query' },
  { num: '05', title: 'Cloud', desc: 'Azure, Google Cloud Platform (GCP), Git/GitHub' },
];

const SectionDivider = () => (
  <div className="flex items-center justify-center py-6">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300/50"></div>
    <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full mx-4"></div>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300/50"></div>
  </div>
);

const Home = () => {
  const [showResume, setShowResume] = useState(false);
  const resumePath = '/input/Rohan_Shrestha_Resume_DA.pdf';

  const handleResumeOpen = () => {
    trackResumeView();
    setShowResume(true);
  };

  const handleResumeDownload = () => {
    trackResumeDownload();
  };

  const handleExternalLink = (linkType: 'email' | 'linkedin', url: string) => {
    trackExternalLink(linkType, url);
  };

  return (
    <div>
      {/* Chapter 1: The Introduction */}
      <section className="hero-gradient py-16 md:py-24 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <AnimatedSection className="w-full md:w-2/5 flex-shrink-0" animation="scale" delay={0.1}>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-300 via-orange-300 to-amber-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-stone-200/50">
                  <img
                    src="/input/Nexus_DevDays_11-14-25-3-2.jpg"
                    alt="Rohan Shrestha"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>

            <div className="w-full md:w-3/5">
              <AnimatedSection delay={0.15}>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-100/60 px-4 py-2 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2.5 animate-pulse"></span>
                  Data Analytics & Engineering
                </span>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <h1 className="serif-title text-4xl md:text-5xl lg:text-6xl mb-6 text-stone-900 leading-tight">
                  Logic and clarity <br />
                  <span className="italic gradient-text">behind the data.</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.35}>
                <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-lg">
                  I build systems that translate complex datasets into clear, functional insights. My work focuses on creating reliable data pipelines and automated workflows that help teams move from observation to informed action.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.45}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:sthar2820@gmail.com"
                    onClick={() => handleExternalLink('email', 'mailto:sthar2820@gmail.com')}
                    className="bg-stone-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                  >
                    Contact Me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shrestharo2002/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleExternalLink('linkedin', 'https://www.linkedin.com/in/shrestharo2002/')}
                    className="bg-white border border-stone-200 text-stone-700 px-8 py-3.5 rounded-xl font-medium hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                  <button
                    onClick={handleResumeOpen}
                    className="bg-white border border-amber-200 text-amber-700 px-8 py-3.5 rounded-xl font-medium hover:border-amber-300 hover:shadow-md hover:shadow-amber-100 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Resume
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* Chapter 2: My Story */}
        <section className="py-20">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 text-center mb-3">The Story</p>
            <h2 className="serif-title text-3xl md:text-4xl text-stone-900 mb-4 text-center">How I Got Here</h2>
          </AnimatedSection>
          <SectionDivider />
          <AnimatedSection delay={0.15}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-stone-200/60 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 rounded-r-full"></div>
                <div className="pl-6 space-y-6">
                  <p className="text-stone-600 leading-relaxed text-lg">
                    It started with curiosity -- a need to understand how systems actually function beneath the surface. That curiosity led me from Computer Science into the world of data analytics, where I found my purpose: turning complexity into clarity.
                  </p>
                  <p className="text-stone-600 leading-relaxed text-lg">
                    From managing large-scale industrial datasets to streamlining reporting for non-profit health camps, I've learned that the best solutions are both technically sound and simple to use. Every project is a balance between logic and utility -- finding the most direct path to solving a problem without adding unnecessary complexity.
                  </p>
                  <p className="text-stone-500 leading-relaxed text-base italic">
                    I'm currently completing my studies at the University of Louisiana at Monroe, continuing to refine my approach to data engineering and strategic decision-making.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Chapter 3: The Craft */}
        <section className="pb-20">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 text-center mb-3">The Craft</p>
            <h2 className="serif-title text-3xl md:text-4xl text-stone-900 mb-4 text-center">Where I Focus</h2>
          </AnimatedSection>
          <SectionDivider />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            {skills.map((skill, i) => (
              <AnimatedSection key={skill.num} delay={0.08 * i} animation="fade-up">
                <div className="group bg-white rounded-xl border border-stone-200/60 p-5 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-1 transition-all duration-300 h-full">
                  <span className="text-3xl font-black text-stone-100 group-hover:text-amber-100 transition-colors duration-300 block mb-3">{skill.num}</span>
                  <h4 className="font-bold text-stone-800 text-sm mb-2">{skill.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{skill.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Chapter 4: The Foundation */}
        <section className="pb-20">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 text-center mb-3">The Foundation</p>
            <h2 className="serif-title text-3xl md:text-4xl text-stone-900 mb-4 text-center">Education</h2>
          </AnimatedSection>
          <SectionDivider />

          <AnimatedSection animation="scale" delay={0.1}>
            <div className="max-w-2xl mx-auto relative bg-white rounded-2xl border border-stone-200/60 p-8 hover:shadow-xl transition-shadow duration-500 mt-4">
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-b-full"></div>
              <h4 className="font-bold text-stone-900 text-xl mt-2">University of Louisiana at Monroe</h4>
              <p className="text-stone-600 italic mb-1">Bachelor of Science, Computer Science</p>
              <p className="text-sm font-semibold text-amber-700 mb-4">GPA: 3.68 | Expected May 2026</p>
              <div className="text-xs text-stone-500 leading-relaxed space-y-2 pt-4 border-t border-stone-100">
                <p><strong className="text-stone-700">Relevant Coursework:</strong> Artificial Intelligence, Database Management, Data Structures & Algorithms, Calculus, Linear Algebra, Discrete Structures.</p>
                <p><strong className="text-stone-700">Recognition:</strong> Dean's Scholar, NSA Vice-President (Campus), Elevator Pitch Contest - Third Position.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Chapter 5: Explore More */}
        <section className="pb-20">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 text-center mb-3">Continue Reading</p>
            <h2 className="serif-title text-3xl md:text-4xl text-stone-900 mb-4 text-center">Explore My Work</h2>
          </AnimatedSection>
          <SectionDivider />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { to: '/projects', title: 'The Projects', desc: 'Problems I found worth solving -- from data pipelines to predictive models.', label: 'View Projects' },
              { to: '/experience', title: 'The Journey', desc: 'A timeline of roles that shaped how I think about data and systems.', label: 'View Experience' },
              { to: '/blog', title: 'The Person', desc: 'Life beyond the spreadsheets -- soccer, music, and what keeps me grounded.', label: 'Read Blog' },
            ].map((card, i) => (
              <AnimatedSection key={card.to} delay={0.1 * i}>
                <Link
                  to={card.to}
                  className="group block bg-white border border-stone-200/60 hover:border-amber-300/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-1 h-full"
                >
                  <h4 className="font-bold text-stone-900 group-hover:text-amber-700 mb-2 transition-colors duration-200 text-lg">{card.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">{card.desc}</p>
                  <span className="inline-block mt-5 text-amber-600 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    &rarr; {card.label}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-backdrop" onClick={() => setShowResume(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col animate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-stone-100">
              <h3 className="font-bold text-stone-900">Resume</h3>
              <div className="flex gap-2">
                <a
                  href={resumePath}
                  download="Rohan_Shrestha_Resume.pdf"
                  onClick={handleResumeDownload}
                  className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-800 transition-all"
                >
                  Download
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  className="text-stone-400 hover:text-stone-600 px-3 py-2 rounded-lg hover:bg-stone-100 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src={resumePath} className="w-full h-full" title="Resume Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
