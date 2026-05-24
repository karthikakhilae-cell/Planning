export interface Intent {
  keywords: string[];
  response: string;
  suggestions: string[];
}

export const ASSISTANT_KNOWLEDGE: Intent[] = [
  {
    keywords: ["hi", "hello", "hey", "hey there", "greetings"],
    response: "Hi there! I'm Laura, Akhil's digital assistant. I'm here to help you explore his work, skills, and experience. What would you like to know?",
    suggestions: ["Tell me about Akhil", "Show me his projects", "How can I contact him?"]
  },
  {
    keywords: ["who is akhil", "akhil?", "who is this", "tell me about akhil", "who is he?"],
    response: "Akhil is a Data science researcher and Project data Analyst with over 5+ years of experience. He loves turning complex data into meaningful stories. Want to know more about his background?",
    suggestions: ["His Experience", "His Education", "His Core Skills"]
  },
  {
    keywords: ["project", "work", "portfolio", "show me his projects", "show all projects", "show me projects", "his projects"],
    response: "Akhil has worked on some amazing data projects! Some highlights include his Spotify Power BI Analysis, SpaceX Landing Prediction, and Chicago Data Analysis. You can see them all in the 'Work' section. Which one sounds interesting?",
    suggestions: ["Spotify Analysis", "SpaceX Prediction", "Chicago Data Analysis", "Show all projects"]
  },
  {
    keywords: ["skill", "tech", "stack", "what are his skills?", "his core skills", "his skills"],
    response: "Akhil is a pro with SQL, Python, Power BI, and Tableau. He also has experience with Machine Learning and Agile Management. Is there a specific skill you're looking for?",
    suggestions: ["SQL Expertise", "Python Skills", "Data Visualization", "Machine Learning"]
  },
  {
    keywords: ["contact", "email", "hire", "how can i contact him?", "contact akhil", "contact him"],
    response: "You can reach Akhil directly via email or connect with him on LinkedIn. He's always open to interesting collaborations!",
    suggestions: ["LinkedIn Profile", "GitHub Profile", "Send an inquiry"]
  },
  {
    keywords: ["spotify analysis"],
    response: "The Spotify Power BI Analysis is one of Akhil's favorites! It uses Python for data enrichment and features a sleek glass-morphism design with DENEB visuals. It's a great example of his ability to blend aesthetics with deep analytics.",
    suggestions: ["See the code", "Other projects", "His SQL work"]
  },
  {
    keywords: ["spacex prediction"],
    response: "This project uses Machine Learning to predict successful Falcon 9 first-stage landings. It's built with Python and leverages historical launch data to provide actionable insights. Pretty cool, right?",
    suggestions: ["See the code", "Other ML projects", "His Python skills"]
  },
  {
    keywords: ["chicago data analysis"],
    response: "In this project, Akhil integrated SQL and Python to analyze socioeconomic indicators, public schools, and crime data in Chicago. It really showcases his ability to handle large, complex datasets.",
    suggestions: ["See the code", "His SQL skills", "Data Science work"]
  },
  {
    keywords: ["his experience"],
    response: "Akhil has over 5 years of experience in project management, business operations, and data science. He's currently focused on AI and ML research, helping organizations bridge the gap between intuition and data-driven decisions.",
    suggestions: ["His Education", "His Skills", "Contact him"]
  },
  {
    keywords: ["his education"],
    response: "Akhil has a strong academic background in data science and project management. He's constantly learning and staying up-to-date with the latest trends in AI and Machine Learning. Would you like to see his certifications?",
    suggestions: ["Certifications", "His Skills", "His Projects"]
  },
  {
    keywords: ["linkedin profile"],
    response: "You can find Akhil's professional profile on LinkedIn. Feel free to reach out and connect!",
    suggestions: ["GitHub Profile", "Email him", "Back to chat"]
  },
  {
    keywords: ["github profile"],
    response: "Check out all of Akhil's open-source work and repositories on GitHub. He's quite active there!",
    suggestions: ["LinkedIn Profile", "Show projects", "Back to chat"]
  },
  {
    keywords: ["send an inquiry"],
    response: "You can use the contact form on the 'Home' or 'Contact' pages to send a direct inquiry. Akhil usually responds within 24-48 hours. Anything else I can help with?",
    suggestions: ["Go to Contact", "His Email", "Back to chat"]
  },
  {
    keywords: ["quick summary"],
    response: "In short: Akhil is a Data Scientist with 5+ years of experience, an expert in SQL/Python/Power BI, and a passionate AI researcher. He's great at making data talk! What's next?",
    suggestions: ["Show projects", "Contact him", "Who is he?"]
  },
  {
    keywords: ["see the code"],
    response: "You can find the source code for most of Akhil's projects on his GitHub profile. He values clean, well-documented code. Would you like the link?",
    suggestions: ["GitHub Profile", "Other projects", "Back to chat"]
  },
  {
    keywords: ["other projects", "tell me more"],
    response: "Besides the highlights, Akhil has worked on various data analysis and visualization projects. From socioeconomic studies to financial forecasting, he's covered a lot of ground. What area interests you most?",
    suggestions: ["SQL Projects", "ML Projects", "Power BI Work"]
  },
  {
    keywords: ["his sql work", "his sql skills", "sql expertise", "sql projects"],
    response: "Akhil is highly proficient in SQL, using it for complex data extraction, transformation, and analysis. He's worked with large-scale databases to uncover deep insights. Want to see a specific SQL project?",
    suggestions: ["Chicago Data Analysis", "Other projects", "His Python skills"]
  },
  {
    keywords: ["other ml projects", "machine learning"],
    response: "In addition to SpaceX, Akhil has explored various ML models for classification and regression tasks. He's particularly interested in predictive analytics and deep learning. Should we look at his ML stack?",
    suggestions: ["SpaceX Prediction", "Python Skills", "His Focus"]
  },
  {
    keywords: ["his python skills", "python skills"],
    response: "Python is Akhil's go-to language for data science. He uses libraries like Pandas, NumPy, Scikit-learn, and Matplotlib for end-to-end data processing and modeling. Want to see his Python work?",
    suggestions: ["SpaceX Prediction", "Spotify Analysis", "Other projects"]
  },
  {
    keywords: ["data science work", "data visualization"],
    response: "Akhil excels at turning raw data into visual stories using tools like Power BI and Tableau. He focuses on creating intuitive dashboards that drive business decisions. Want to see his best dashboard?",
    suggestions: ["Spotify Analysis", "Power BI Work", "Tableau Work"]
  },
  {
    keywords: ["certifications"],
    response: "Akhil holds several certifications in Data Science, SQL, and Project Management from reputable platforms. These validate his expertise and commitment to continuous learning. Want to see his LinkedIn for the full list?",
    suggestions: ["LinkedIn Profile", "His Education", "His Skills"]
  },
  {
    keywords: ["email him", "his email"],
    response: "You can email Akhil directly at karthikakhil.ae@gmail.com. He's always happy to discuss new opportunities or data science trends!",
    suggestions: ["Send an inquiry", "LinkedIn Profile", "Back to chat"]
  },
  {
    keywords: ["back to chat", "go to about page"],
    response: "I'm here to help! We can talk more about Akhil's projects, his background, or how he can help your team. What's on your mind?",
    suggestions: ["Tell me about Akhil", "Show me his projects", "How can I contact him?"]
  },
  {
    keywords: ["go to contact"],
    response: "You can find the contact form at the bottom of the Home page or on the dedicated Contact page. It's the easiest way to reach out!",
    suggestions: ["Send an inquiry", "Email him", "LinkedIn Profile"]
  },
  {
    keywords: ["contact for resume"],
    response: "If you'd like a copy of Akhil's latest resume, feel free to send him an email or a message on LinkedIn. He'll get back to you shortly!",
    suggestions: ["Email him", "LinkedIn Profile", "Quick Summary"]
  },
  {
    keywords: ["power bi work", "tableau work"],
    response: "Akhil is a master of data visualization tools. His dashboards are known for being both insightful and visually stunning. Would you like to see his Spotify dashboard?",
    suggestions: ["Spotify Analysis", "Other projects", "His Skills"]
  },
  {
    keywords: ["his focus", "what is he focused on", "current focus"],
    response: "Akhil is currently deep-diving into AI and Machine Learning research. He's passionate about exploring how generative AI can be applied to real-world data problems. Want to see his ML projects?",
    suggestions: ["ML Projects", "SpaceX Prediction", "His Skills"]
  },
  {
    keywords: ["show projects", "contact him", "who is he?"],
    response: "I can help with that! What would you like to explore first?",
    suggestions: ["Show me projects", "Contact Akhil", "Who is Akhil?"]
  },
  {
    keywords: ["what can you do?", "help", "what are you?", "how can you help?"],
    response: "I'm Laura, your guide to Akhil's portfolio! I can tell you about his data science projects, his technical skills, his professional experience, or even help you get in touch with him. What are you interested in?",
    suggestions: ["Show me projects", "His Skills", "Who is Akhil?"]
  },
  {
    keywords: ["welcome", "thanks", "thank you", "thx"],
    response: "You're very welcome! I'm happy to help. Is there anything else you'd like to know about Akhil?",
    suggestions: ["Show me projects", "His Skills", "Who is Akhil?"]
  }
];

export const AKHIL_DETAILS = {
  currentRole: "Data science researcher / Project Analyst",
  experience: "5+ years",
  location: "India",
  currentFocus: "AI & ML Research",
  lastUpdated: "April 2026",
  funFact: "Loves turning complex data into visual stories."
};
