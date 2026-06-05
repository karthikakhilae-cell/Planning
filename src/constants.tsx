import {
  Database,
  BarChart3,
  Code2,
  Cpu,
  Calendar
} from "lucide-react";
import React from "react";

export const PROJECTS = [
  {
    id: 'isometric-bom-extractor',
    title: 'Isometric BOM Extractor (IsoMTO)',
    category: 'Engineering Automation',
    description: 'A fully offline Python tool that OCRs the Bill of Materials from piping isometric drawings (vector PDFs with no text layer) and reconciles every item code against a project code master — exact, fuzzy, and reverse-lookup-by-description matching — producing one combined Excel/CSV for material take-off. Flags uncertain rows rather than guessing.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
    tags: ['Python', 'OCR', 'Tesseract', 'PyMuPDF', 'Pandas', 'EPC Piping'],
    link: 'https://github.com/akhilkarthik/isometric-bom-extractor'
  },
  {
    id: 'p6-schedule-visualizer',
    title: 'P6 Schedule Visualizer',
    category: 'Project Controls',
    description: 'A unified tool that connects to Primavera P6 from three sources — native .xer files, the P6 EPPM REST API, or the P6 SQL database — normalizes the data into one model, and visualizes it through an interactive Streamlit app (Gantt, S-curve, discipline progress) plus a one-click Power BI Excel export.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
    tags: ['Python', 'Streamlit', 'Primavera P6', 'Power BI', 'Plotly'],
    link: 'https://github.com/akhilkarthik/p6-schedule-visualizer'
  },
  {
    id: 'p6-health-checker',
    title: 'P6 Schedule Health Checker',
    category: 'Project Controls',
    description: 'A Python CLI tool that audits Primavera P6 schedules using the DCMA 14-Point methodology. Parses native .xer exports, runs ten schedule-quality checks (open ends, leads/lags, hard constraints, negative float, high duration, missing resources), computes a weighted health score, and generates a professional PDF report.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
    tags: ['Python', 'Primavera P6', 'DCMA 14-Point', 'PDF Reporting'],
    link: 'https://github.com/akhilkarthik/p6-schedule-health-checker'
  },
  {
    id: 'fabric-lakehouse',
    title: 'Enterprise Fabric Data Lakehouse',
    category: 'Microsoft Fabric',
    description: 'Designed and deployed an end-to-end operational analytics platform in Microsoft Fabric using Synapse Spark pipelines, Lakehouse Delta tables, and DirectLake Power BI semantic models.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
    tags: ['Microsoft Fabric', 'Synapse Spark', 'DirectLake', 'Power BI'],
    link: 'https://github.com/akhilkarthik/Enterprise-Fabric-Data-Lakehouse'
  },
  {
    id: 'planning-automation',
    title: 'AI-Powered Primavera P6 Audit Automation',
    category: 'AI Automations',
    description: 'Developed an automated Python and GenAI scheduling assistant utilizing LangChain and Gemini APIs to audit Primavera P6 schedules and compile automated operational risk assessments.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    tags: ['AI Automations', 'Python', 'Primavera P6', 'LangChain'],
    link: 'https://github.com/akhilkarthik/P6-Schedule-AI-Automation'
  },
  {
    id: 'db-optimization',
    title: 'Database Architecture & Query Optimization',
    category: 'Database Engineering',
    description: 'Optimized a high-throughput enterprise database schema, writing advanced query partitions and indexes to improve transaction response times by 65%.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    tags: ['SQL Server', 'Database Tuning', 'ETL/ELT', 'Data Architectures'],
    link: 'https://github.com/akhilkarthik/Enterprise-Database-Optimization'
  },
  {
    id: 'spotify-analysis',
    title: 'Spotify Power BI Analysis',
    category: 'Data Analytics',
    description: 'Advanced Power BI analysis covering enriched datasets with Python, Glass morphism background, and DENEB visuals.',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    tags: ['Power BI', 'Python', 'DENEB'],
    link: 'https://github.com/akhilkarthik/Adavanced-Power-bi-project'
  },
  {
    id: 'grocery-analytics',
    title: 'Grocery-store Data Analysis',
    category: 'Data Analytics',
    description: 'Sophisticated Sales Analytics Dashboard for strategic decision-making through intricate data analysis and forecasting.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
    year: '2023',
    tags: ['Power BI', 'Forecasting', 'SQL'],
    link: 'https://github.com/akhilkarthik/Power-bi-Grocery-store-Data-Analysis'
  },
  {
    id: 'spacex-landing',
    title: 'SpaceX Falcon-9 Landing Prediction',
    category: 'Machine Learning',
    description: 'Predictive model to determine successful Falcon 9 first-stage landings, leveraging historical launch data.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop',
    year: '2023',
    tags: ['Python', 'Machine Learning', 'Data Science'],
    link: 'https://github.com/akhilkarthik/SpaceX-Falcon-9-first-stage-Landing-Prediction'
  },
  {
    id: 'survey-analysis',
    title: 'Professional Survey Analysis',
    category: 'Data Analytics',
    description: 'Deep dive into survey data, unraveling trends in geographical distributions and job satisfaction levels.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    year: '2022',
    tags: ['Power BI', 'Data Visualization', 'Insights'],
    link: 'https://github.com/akhilkarthik/Professional-survey-Analysis-using-Power-bi'
  },
  {
    id: 'housing-cleaning',
    title: 'Housing Data Cleaning (SQL)',
    category: 'Data Analytics',
    description: 'Comprehensive data cleaning process in SQL Server to transform raw housing data into a usable format for analysis.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    year: '2022',
    tags: ['SQL', 'Data Cleaning', 'Database'],
    link: 'https://github.com/akhilkarthik/Housing-Data_cleaning_Sql'
  },
  {
    id: 'chicago-analysis',
    title: 'Chicago Data Analysis',
    category: 'Data Analytics',
    description: 'Integrating SQL and Python to analyze socioeconomic indicators, public schools, and crime data in Chicago.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop',
    year: '2021',
    tags: ['SQL', 'Python', 'Data Analysis'],
    link: 'https://github.com/akhilkarthik/Chicago-data-analysis-with-sql-and-Python'
  },
  {
    id: 'bitcoin-chart',
    title: 'Real-time Bitcoin Candlestick',
    category: 'Data Analytics',
    description: 'Python-based real-time visualization of Bitcoin price movements using candlestick charts and live API data.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop',
    year: '2021',
    tags: ['Python', 'API', 'Visualization'],
    link: 'https://github.com/akhilkarthik/Realtime-Bitcoin-Candlestick-chart_python'
  },
  {
    id: 'face-detection',
    title: 'Face Detection System',
    category: 'Machine Learning',
    description: 'Computer vision project implementing real-time face detection using Python and OpenCV libraries.',
    image: 'https://home.dartmouth.edu/sites/home/files/styles/16_9_lg/public/2023-11/AI_face_recognition_technology.jpg?h=0a8b6f8b&itok=n7x7WDVk',
    year: '2021',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    link: 'https://github.com/akhilkarthik/Face-detection'
  },
  {
    id: 'satellite-tracking',
    title: 'Satellite Tracking System',
    category: 'Machine Learning',
    description: 'Real-time satellite position tracking and visualization using Python and orbital mechanics libraries.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
    year: '2020',
    tags: ['Python', 'SpaceTech', 'Data Science'],
    link: 'https://github.com/akhilkarthik/Satellite_tracking'
  },
  {
    id: 'pizza-database',
    title: 'Pizza Delivery Database',
    category: 'Data Analytics',
    description: 'Designing and implementing a robust SQL database for a pizza delivery service, optimizing order management.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    year: '2020',
    tags: ['SQL', 'Database Design', 'Optimization'],
    link: 'https://github.com/akhilkarthik/Sql_Pizza_delivery_database'
  },
  {
    id: 'sql-intermediate',
    title: 'SQL Intermediate Projects',
    category: 'Data Analytics',
    description: 'A collection of intermediate SQL scripts covering complex joins, subqueries, and data manipulation techniques.',
    image: 'https://www.ed2go.com/common/images/1/17136.jpg',
    year: '2021',
    tags: ['SQL', 'Data Manipulation', 'Database'],
    link: 'https://github.com/akhilkarthik/Sql_intermediate'
  },
  {
    id: 'tableau-viz',
    title: 'Tableau Visualization Project',
    category: 'Data Analytics',
    description: 'Interactive Tableau dashboards visualizing complex datasets to uncover hidden patterns and business insights.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop',
    year: '2022',
    tags: ['Tableau', 'Data Visualization', 'Dashboard'],
    link: 'https://github.com/akhilkarthik/Tableau-Visualization-Project'
  },
  {
    id: 'covid-sql',
    title: 'SQL Covid Project',
    category: 'Data Analytics',
    description: 'Analyzing global COVID-19 data using SQL to track infection rates, deaths, and vaccination progress across regions.',
    image: 'https://storage.googleapis.com/kaggle-datasets-images/3159770/5470717/7dbbf5e7331eb39d4309a8f8c778d63d/dataset-cover.jpg?t=2023-04-20-19-26-35',
    year: '2021',
    tags: ['SQL', 'Data Analysis', 'Healthcare'],
    link: 'https://github.com/akhilkarthik/Sql_Covid_Project'
  },
  {
    id: 'python-data-suite',
    title: 'Python Data Analysis Suite',
    category: 'Data Analytics',
    description: 'Comprehensive toolkit for data manipulation, statistical analysis, and visualization using Pandas and NumPy.',
    image: 'https://i.redd.it/rxezjyf4ojx41.png',
    year: '2021',
    tags: ['Python', 'Pandas', 'NumPy'],
    link: 'https://github.com/akhilkarthik/Data-Analysis-using-python'
  }
];

export const SKILLS = [
  { name: "Planning Engineering", icon: <Calendar className="w-4 h-4" />, items: ["Primavera P6", "MS Project", "Resource Optimization", "Scheduling Controls", "Agile / Lean Scrum"] },
  { name: "Microsoft Fabric & BI", icon: <BarChart3 className="w-4 h-4" />, items: ["Microsoft Fabric Lakehouse", "Synapse Analytics", "Power BI DirectLake", "DAX / DENEB Visuals", "Data Factory Pipelines"] },
  { name: "Data Science & AI", icon: <Cpu className="w-4 h-4" />, items: ["Python", "Predictive ML Modeling", "AI Automations", "LangChain & LLMs", "Advanced ETL / ELT"] },
  { name: "Database Engineering", icon: <Database className="w-4 h-4" />, items: ["SQL Server Optimization", "Database Architecture", "PostgreSQL", "Query Tuning & Indexing", "Data Partitioning"] }
];

export const SOCIAL_LINKS = {
  github: "https://github.com/akhilkarthik",
  linkedin: "https://www.linkedin.com/in/akhil-karthik/",
  instagram: "https://instagram.com/akhilkarthik.de",
  medium: "https://medium.com/@karthikakhil.in",
  email: "mailto:akhilkarthik001@gmail.com",
  cv: "https://drive.google.com/file/d/1AoxKOL9A18WQzuU3m-YUtwb9QxRyRLqh/view" // Placeholder CV link
};

export const PROFILE_PIC = "https://lh3.googleusercontent.com/d/1tk7ppgl-vYdJsRNaWQ2_F3-qCXcbWItI";
