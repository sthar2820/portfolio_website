
import { Project, Experience, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Automated Analytics Data Pipeline',
    description: 'Designed and implemented an automated data ingestion and transformation pipeline to standardize, validate, and prepare analytics-ready datasets for enterprise use.',
    technologies: ['Python', 'ETL', 'Streamlit', 'Data Validation'],
    role: 'Lead Developer',
    impact: 'Delivered end-to-end transparent workflows and automated data quality issue identification.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda3ef66851?auto=format&fit=crop&q=80&w=800',
    isPrimary: true
  },
  {
    id: 'p2',
    title: 'ML Stock Prediction Dashboard',
    description: 'Interactive stock analysis dashboard integrating an LSTM (Long Short-Term Memory) model to forecast trends for 100+ stock prices.',
    technologies: ['Python', 'LSTM', 'Streamlit', 'Scikit-Learn'],
    role: 'Data Scientist',
    impact: 'Achieved high accuracy evaluated via RMSE/MAE, providing actionable data-driven decision support.',
    imageUrl: 'https://images.unsplash.com/photo-1611974715853-288ee155460f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    title: 'Manufacturing BI Transformation',
    description: 'Replaced manual Excel trackers with interactive Power BI dashboards for executive-level leadership reporting.',
    technologies: ['Power BI', 'Power Query', 'Power Automate'],
    role: 'BI Intern',
    impact: 'Improved transparency and eliminated 20+ hours of manual effort per month.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p4',
    title: 'Healthcare Analytics System',
    description: 'Analyzed 500+ patient records to build SQL-based reports and dashboards for health camp initiatives.',
    technologies: ['SQL', 'Power BI', 'Data Analysis'],
    role: 'Data Analyst Intern',
    impact: 'Reduced manual data entry time by 40% and improved accessibility for decision-makers.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p5',
    title: 'Inventory Audit & Root Cause Analysis',
    description: 'Conducted a deep-dive manufacturing audit to investigate inventory discrepancies and document workflows.',
    technologies: ['Excel', 'Process Mapping', 'Root Cause Analysis'],
    role: 'Special Projects Intern',
    impact: 'Identified label mismanagement as a root cause and implemented corrective reporting actions.',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'Dura-Shiloh Industries',
    position: 'IT Intern - Data Engineering & Analytics',
    duration: 'Jun 2025 - Dec 2025',
    description: [
      'Designed and maintained analytics pipelines ingesting 100+ structured datasets weekly (~50k+ rows).',
      'Implemented data quality and business-rule checks reducing reporting errors.',
      'Automated recurring cross-department reporting using Python and Power Automate, improving efficiency by 35%.',
      'Analyzed operational process data to identify gaps and partnered with engineering for improvements.'
    ]
  },
  {
    id: 'exp2',
    company: 'Nepal Red Cross Society',
    position: 'Data Analyst Intern',
    duration: 'Jun 2024 - Aug 2024',
    description: [
      'Analyzed 500+ patient records from free health camps to support health and safety initiatives.',
      'Built SQL-based reports that reduced manual data entry time by 40%.',
      'Automated recurring reports using SQL queries, improving reliability of organizational reporting.'
    ]
  },
  {
    id: 'exp3',
    company: 'University of Louisiana at Monroe',
    position: 'IT Support Technician',
    duration: 'Feb 2023 - May 2025',
    description: [
      'Diagnosed and resolved over 1,000 technical issues for students and faculty.',
      'Supported cross-department data needs and contributed to improved operational efficiency.'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Balance Between Logic and Creativity',
    date: 'Oct 2025',
    content: 'Studying Computer Science at ULM has taught me the precision of logic, but my work in Data Analytics shows me the beauty of patterns. I find that my best insights come when I step away from the screen.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'A Glimpse into Campus Life',
    date: 'Aug 2025',
    content: 'Serving as the Vice-President of the NSA on campus has been an incredible experience in leadership and community building. Here is a small highlight from our recent event.',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];
