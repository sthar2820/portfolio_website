
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showResume, setShowResume] = useState(false);
  const resumePath = '/input/Rohan_Shrestha_Data_Analyst.pdf';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <section className="mb-20 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Profile Photo Section */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl border-4 border-white bg-slate-100">
            <img 
              src="/input/Nexus_DevDays_11-14-25-3-2.jpg" 
              alt="Rohan Shrestha" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
          </div>
        </div>

        {/* Introduction Text Section */}
        <div className="w-full md:w-3/5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4">Data Analytics & Engineering</h2>
          <h1 className="serif-title text-4xl md:text-5xl lg:text-6xl mb-6 text-slate-900 leading-tight">
            Logic and clarity <br/><span className="italic font-medium">behind the data.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            I build systems that translate complex datasets into clear, functional insights. My work focuses on creating reliable data pipelines and automated workflows that help teams move from simple observation to informed action.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:sthar2820@gmail.com" className="bg-slate-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95">
              Contact Me
            </a>
            <a href="https://www.linkedin.com/in/shrestharo2002/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 text-slate-600 px-8 py-3.5 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all">
              LinkedIn
            </a>
            <button onClick={() => setShowResume(true)} className="border border-indigo-200 text-indigo-600 px-8 py-3.5 rounded-lg font-medium hover:border-indigo-400 hover:bg-indigo-50 transition-all">
              Resume
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6 flex items-center">
            <span className="w-8 h-px bg-indigo-200 mr-3"></span> Core Expertise
          </h3>
          <ul className="space-y-4 text-slate-700 text-sm">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 font-bold">01.</span>
              <span><strong>Data Analysis:</strong> Python (pandas, NumPy), SQL, Excel, Exploratory Data Analysis (EDA)</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 font-bold">02.</span>
              <span><strong>Data Engineering:</strong> ETL Pipelines, Databricks, BigQuery, Streamlit</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 font-bold">03.</span>
              <span><strong>Governance:</strong> Data Validation, Quality Checks, Root Cause Analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 font-bold">04.</span>
              <span><strong>Visualization:</strong> Power BI, Interactive Dashboards, Power Query</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 font-bold">05.</span>
              <span><strong>Cloud:</strong> Azure, Google Cloud Platform (GCP), Git/Github</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6 flex items-center">
            <span className="w-8 h-px bg-indigo-200 mr-3"></span> Education
          </h3>
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-4">
            <h4 className="font-bold text-slate-900 text-lg">University of Louisiana at Monroe</h4>
            <p className="text-sm text-slate-600 italic mb-1">Bachelor of Science, Computer Science</p>
            <p className="text-sm font-semibold text-indigo-600">GPA: 3.68 | Expected May 2026</p>
          </div>
          <div className="text-xs text-slate-500 leading-relaxed px-2 space-y-3">
            <p><strong>Relevant Coursework:</strong> Artificial Intelligence, Database Management, Data Structures & Algorithms, Calculus, Linear Algebra, Discrete Structures.</p>
            <p><strong>Recognition:</strong> Dean's Scholar, NSA Vice-President (Campus), Elevator Pitch Contest - Third Position.</p>
          </div>
        </div>
      </div>

      <section className="mt-24 mb-12">
        <h2 className="serif-title text-3xl mb-8">About Me</h2>
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-600/20 rounded-full"></div>
          <div className="pl-8">
            <p className="text-slate-600 leading-relaxed text-lg max-w-3xl">
              My interest in data analytics is rooted in a background in Computer Science and a practical need to understand how systems function under the surface. From managing large-scale industrial datasets to streamlining reporting for non-profit health camps, I prioritize building solutions that are both technically sound and easy to use.
              <br/><br/>
              I view every project as a balance between logic and utility—finding the most direct way to solve a problem without adding unnecessary complexity. I am currently completing my studies at the University of Louisiana at Monroe, where I continue to refine my approach to data engineering and strategic decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Links Section */}
      <section className="mt-16 mb-12 border-t border-slate-100 pt-16">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-8 text-center">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/projects" className="group bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-2xl p-6 transition-all">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 mb-2 transition-colors">My Projects</h4>
            <p className="text-sm text-slate-500">View my data analytics and engineering projects</p>
            <span className="inline-block mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">&rarr; View Projects</span>
          </Link>
          <Link to="/experience" className="group bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-2xl p-6 transition-all">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 mb-2 transition-colors">My Experience</h4>
            <p className="text-sm text-slate-500">Explore my professional journey and roles</p>
            <span className="inline-block mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">&rarr; View Experience</span>
          </Link>
          <Link to="/blog" className="group bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-2xl p-6 transition-all">
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 mb-2 transition-colors">My Blog</h4>
            <p className="text-sm text-slate-500">Read my thoughts and personal stories</p>
            <span className="inline-block mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">&rarr; View Blog</span>
          </Link>
        </div>
      </section>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowResume(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Resume</h3>
              <div className="flex gap-2">
                <a
                  href={resumePath}
                  download="Rohan_Shrestha_Resume.pdf"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all"
                >
                  Download
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  className="text-slate-400 hover:text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={resumePath}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
