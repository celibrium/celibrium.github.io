// Replace the draft text here when you're ready to build out each chapter.
export const chapters = [
  { id: 'experience', label: 'Experience', subtitle: 'The journey so far', description: 'A record of the teams, challenges, and meaningful work that shape my journey as a software engineer.', detail: 'Professional experience', placeholder: 'Company, role, dates, technologies, and accomplishments will live here.' },
  { id: 'projects', label: 'Projects', subtitle: 'Ideas brought to life', description: 'A collection of things built with curiosity, care, and a desire to make something useful.', detail: 'Selected work', placeholder: 'Project previews, technology stacks, source code, and live demos will live here.' },
  { id: 'about', label: 'About me', subtitle: 'Meet the player', description: 'Hi, I’m Charmaine. A software engineer with a curious mind and a love for thoughtful digital experiences.', detail: 'Beyond the code', placeholder: 'My background, technical skills, interests, and a few things that make me, me.' },
  { id: 'resume', label: 'Resume', subtitle: 'The full story', description: 'An overview of my experience, skills, and education — collected in one place.', detail: 'Document not yet available', placeholder: 'A viewable and downloadable PDF resume will be added here soon.' },
  { id: 'contact', label: 'Contact me', subtitle: 'Start a conversation', description: 'Great work starts with a conversation. This is where we can connect about an idea, an opportunity, or something worth building.', detail: 'Contact details coming soon', placeholder: 'Email, LinkedIn, and GitHub links will be added here.' },
] as const;
export type Chapter = typeof chapters[number];

export const experiences = [
  {
    company: 'Scotiabank',
    role: 'Software Engineer',
    dates: 'April 2026 — Present',
    location: 'Toronto, Ontario',
    status: 'Current quest',
    technologies: ['React', 'JavaScript', 'Java', 'Spring Boot'],
    accomplishments: [
      'Developed full-stack customer onboarding features, integrating React workflows with Java and Spring Boot services used by bank branches.',
      'Implemented backend authorization logic that restricts high-risk customer actions based on derogatory account status, supporting business-policy compliance and preventing unauthorized onboarding activity.',
      'Added a new credit card product option to the customer onboarding workflow across the React frontend and Spring Boot backend, enabling support for additional banking products.',
    ],
  },
  {
    company: 'Scotiabank',
    role: 'Software Engineer Intern',
    dates: 'September 2025 — December 2025',
    location: 'Toronto, Ontario',
    status: 'Quest complete',
    technologies: ['Java', 'React', 'JavaScript', 'REST APIs', 'Agile'],
    accomplishments: [
      'Extended Java backend models and mapping logic to expose lost and stolen card statuses, then integrated the data into React customer-profile components.',
      'Implemented debouncing for address lookup API calls in JavaScript, reducing redundant requests by 40% and improving form performance and usability.',
      'Contributed within an Agile and Scrum team through sprint planning, backlog refinement, daily stand-ups, peer code reviews, and iterative delivery.',
    ],
  },
  {
    company: 'Citibank',
    role: 'Software Engineer Intern',
    dates: 'May 2024 — August 2024',
    location: 'Mississauga, Ontario',
    status: 'Quest complete',
    technologies: ['Scala', 'Shell', 'Java', 'Spring Boot', 'REST APIs'],
    accomplishments: [
      'Implemented Scala ETL processes for a Close Process Management tool, supporting accurate and timely financial reporting.',
      'Developed and deployed automated shell scripts to detect job failures and trigger scheduled tasks, reducing manual processing time by 30% and improving operational reliability.',
      'Developed a full-stack mock trading platform using Java and Spring Boot, integrating secure RESTful APIs to streamline transaction management.',
    ],
  },
] as const;
