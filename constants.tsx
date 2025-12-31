
import { Project, Experience, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Automated Analytics Data Pipeline',
    description: 'Designed and implemented an automated data ingestion and transformation pipeline to standardize, validate, and prepare analytics-ready datasets for enterprise use.',
    technologies: ['Python', 'ETL', 'Streamlit', 'Data Validation'],
    role: 'Lead Developer',
    impact: 'Delivered end-to-end transparent workflows and automated data quality issue identification.',
    imageUrl: '/input/agentic_ss.png',
    isPrimary: true,
    githubUrl: 'https://github.com/sthar2820/Agentic_data_pipeline',
    websiteUrl: 'https://agenticdatapipeline-3xzk7rjrbdyexemhqmdqge.streamlit.app/',
    details: [
      'Built a fully automated data pipeline using Python and Streamlit for real-time data processing',
      'Implemented AI-powered data validation using Gemini API for intelligent quality checks',
      'Created interactive visualizations for data exploration and anomaly detection',
      'Designed modular ETL architecture supporting multiple data sources and formats',
      'Integrated automated reporting with email notifications for stakeholders',
      'Achieved 95% reduction in manual data processing time'
    ]
  },
  {
    id: 'p2',
    title: 'Hospital Readmissions Risk Pipeline',
    description: 'A data pipeline that merges CMS Hospital Readmissions data with CDC Social Vulnerability Index (SVI) to analyze readmission risk across socioeconomic factors.',
    technologies: ['Python', 'Pandas', 'Parquet', 'Power BI', 'GitHub Actions'],
    role: 'Data Engineer',
    impact: 'Enabled healthcare analytics by linking hospital performance metrics with community vulnerability indicators for risk stratification.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/sthar2820/hospital-readmissions-pipeline',
    details: [
      'Ingested CMS Hospital Readmissions Reduction Program (HRRP) data and CDC SVI data',
      'Cleaned and normalized facility IDs, ZIP codes, and numeric fields',
      'Merged hospital performance metrics with community vulnerability indicators',
      'Engineered risk features including 2×2 risk buckets (High/Low SVI × High/Low ERR)',
      'Created 4-category risk classification: High SVI + High ERR (highest risk) to Low SVI + Low ERR (lowest risk)',
      'Exported Power BI-ready datasets with 37 columns and auto-generated data dictionary',
      'Implemented CI/CD automation with GitHub Actions for pipeline runs',
      '🚧 Upcoming: Power BI visualization dashboard for interactive risk analysis'
    ]
    
  },
  {
    id: 'p3',
    title: 'ML Stock Prediction Dashboard',
    description: 'Interactive stock analysis dashboard integrating an LSTM (Long Short-Term Memory) model to forecast trends for 100+ stock prices.',
    technologies: ['Python', 'LSTM', 'Streamlit', 'Scikit-Learn'],
    role: 'Data Scientist',
    impact: 'Achieved high accuracy evaluated via RMSE/MAE, providing actionable data-driven decision support.',
    imageUrl: '/input/stock_prediction.png',
    githubUrl: 'https://github.com/sthar2820/Stock_Prediction_model',
    websiteUrl: 'https://stockpredictivemodel.streamlit.app/',
    details: [
      'Built an LSTM-based deep learning model for stock price forecasting',
      'Integrated real-time stock data fetching using yfinance API',
      'Created interactive Streamlit dashboard for visualizing predictions and trends',
      'Implemented model evaluation using RMSE and MAE metrics for accuracy assessment',
      'Supports forecasting for 100+ stock tickers with customizable prediction windows',
      'Visualizes historical data alongside predicted values for easy comparison'
    ]
  },
  {
    id: 'p4',
    title: 'SMITCH Auto-Extractor',
    description: 'Python automation tool that monitors Excel files and extracts structured data from complicated templates, solving data duplication and mismanagement issues for Power BI integration.',
    technologies: ['Python', 'Excel Automation', 'Data Cleaning', 'Windows Services'],
    role: 'Automation Developer',
    impact: 'Eliminated manual data extraction and resolved data quality issues including duplication and mismanagement.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/sthar2820/smitch_automated',
    details: [
      'Built file monitoring system that watches for modifications to .xlsx and .xlsm files',
      'Implemented automatic extraction of S.M.I.T.C.H. metrics, APW, and EBIT data upon file save',
      'Created 15-second cooldown mechanism to prevent duplicate processing of the same file',
      'Deployed as Windows service on company servers for continuous automated monitoring',
      'Connected to centralized SharePoint data sources for enterprise-wide data access',
      'Maintained comprehensive logging system for troubleshooting and performance tracking',
      'Enabled seamless Power BI integration through structured data output'
    ]
  },
  {
    id: 'p6',
    title: 'Inventory Audit & Root Cause Analysis',
    description: 'Conducted a deep-dive manufacturing audit to investigate inventory discrepancies and document workflows.',
    technologies: ['Excel', 'Process Mapping', 'Root Cause Analysis'],
    role: 'Special Projects Intern',
    impact: 'Identified label mismanagement as a root cause and implemented corrective reporting actions.',
    imageUrl: '/input/IMG_4137.jpg',
    details: [
      'Performed physical inventory counts and cross-referenced with system records',
      'Documented manufacturing workflows and identified process gaps',
      'Conducted root cause analysis on inventory discrepancies',
      'Created process maps to visualize workflow bottlenecks',
      'Presented findings and recommendations to management team'
    ],
    media: [
      { type: 'image', url: '/input/IMG_4137.jpg' },
      { type: 'image', url: '/input/IMG_4185.JPG' },
      { type: 'video', url: '/input/copy_3A8F3978-52D6-4244-AA6F-D261FDBFF5FB.mov' }
    ]
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
    title: 'Soccer - A Lifelong Passion',
    date: 'Dec 2025',
    content: 'I\'ve been playing soccer ever since I was a kid. The sport has taught me teamwork, discipline, and the importance of staying active. Whether it\'s a casual game with friends or a competitive match, soccer has always been my go-to way to unwind and stay connected with others.'
  },
  {
    id: 'b2',
    title: 'Finding Peace Through Music',
    date: 'Dec 2025',
    content: 'Playing guitar is my stress reliever. After long hours of coding or data analysis, picking up my guitar helps me decompress and find balance. Music offers a different kind of creativity - one that complements the logical thinking required in my technical work.'
  }
];
