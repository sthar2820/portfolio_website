
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <section className="mb-16">
        <h1 className="serif-title text-5xl mb-6 text-slate-900 leading-tight">
          Turning complex data into <span className="italic">actionable</span> intelligence.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          I'm <strong>Rohan Shrestha</strong>, a Data Analytics professional focused on building analytics-ready data models and automated pipelines. 
          With a strong foundation in Computer Science and hands-on experience in industrial data engineering, I specialize in improving data reliability and decision-making for enterprise reporting.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:sthar2820@gmail.com" className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-800 transition-colors">
            Get in Touch
          </a>
          <a href="https://www.linkedin.com/in/shrestharo2002/" target="_blank" rel="noopener noreferrer" className="border border-slate-200 text-slate-600 px-6 py-3 rounded-md font-medium hover:border-slate-400 transition-colors">
            LinkedIn Profile
          </a>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Core Expertise</h2>
          <ul className="space-y-3 text-slate-700 text-sm">
            <li><strong>Data Analysis:</strong> Python (pandas, NumPy), SQL, Excel</li>
            <li><strong>Data Engineering:</strong> ETL Pipelines, Databricks, BigQuery</li>
            <li><strong>Governance:</strong> Data Validation, Quality Checks, Accuracy</li>
            <li><strong>Visualization:</strong> Power BI, Interactive Dashboards, Streamlit</li>
            <li><strong>Cloud:</strong> Azure, Google Cloud Platform (GCP)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Education</h2>
          <div className="mb-4">
            <h3 className="font-bold text-slate-900">University of Louisiana at Monroe</h3>
            <p className="text-sm text-slate-600 italic">Bachelor of Science, Computer Science</p>
            <p className="text-sm text-slate-500">GPA: 3.68 | Expected May 2026</p>
          </div>
          <div className="text-xs text-slate-500 leading-relaxed">
            <p><strong>Coursework:</strong> AI, Database Management, Data Structures, Calculus, Linear Algebra, Internet Programming.</p>
            <p className="mt-2"><strong>Achievements:</strong> Dean's Scholar, NSA VP, Elevator Pitch Contest (3rd Place).</p>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="serif-title text-3xl mb-6">Professional Summary</h2>
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
          <p className="text-slate-600 leading-relaxed">
            Based in Monroe, LA, I have developed a deep interest in the intersection of data engineering and business strategy. 
            During my time at Dura-Shiloh Industries and Nepal Red Cross, I've seen firsthand how automation and clean data pipelines can transform operational efficiency. 
            I am passionate about building tools that not only process numbers but empower people to make better choices.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
