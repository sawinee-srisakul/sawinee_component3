const courses = [
  {
    id: 1,
    title: 'Application of AI for Cyber Security',
    image: '/assets/IATD-Cyber-c.jpg',
    description:
      'Learn how to use machine learning (ML) and artificial intelligence (AI) tools to identify and assess cyber threats.',
    hours: '60 hours',
    detail:
      'This course provides an in-depth understanding of AI applications in cybersecurity. You will explore various ML techniques used to detect and prevent cyber threats.',
    modules: [
      'Introduction to AI in Cybersecurity',
      'Machine Learning for Threat Detection',
      'AI-based Intrusion Detection Systems',
      'Deep Learning for Security',
      'Ethical Considerations in AI Security',
    ],
  },
  {
    id: 2,
    title: 'Cloud Computing Foundations',
    image: '/assets/IATD-Cloud-Computing-c.jpg',
    description:
      'You will gain an understanding of the similarities and differences between on-premises and cloud applications, types of services available on cloud, and how to identify and acquire cloud computing resources for a given application scenario.',
    hours: '70 hours',
    detail:
      'You will learn about emerging technologies and be able to identify suitable computer, database and storage services for cloud applications. You will gain experience in designing a secure virtual network for a business scenario, effective cost management, and monitoring and resource management strategies for cloud applications.',
    modules: [
      'Introduction to cloud computing',
      'Enabling concepts and technologies',
      'Computing on cloud',
      'Data storage on cloud',
      'Databases on cloud',
      'Virtual networks',
      'Security in cloud',
    ],
  },
  {
    id: 3,
    title: 'Web Development (Back-End)',
    image: '/assets/Web-Development-Back-End.jpg',
    description:
      'Learn back-end development from scratch, focusing on scalability, resiliency, throughput, and latency.',
    hours: '60 hours',
    detail:
      'This micro-credential will start web development from scratch and will give you a unique experience focusing only on back-end development. The course will cover all the fundamental knowledge of back-end web development and will gradually build up your knowledge using many hands-on projects where you can develop your skills using the underpinning theories on backend principles including scalability, resiliency, throughput and latency. The course will also provide the fundamentals of developing highly scalable and resilient cloud-native applications.',
    modules: [
      'Getting started with back-end web development ',
      'Back-end principles and technology stack for back-end development ',
      'Front-end JS library - ReactJS ',
      'Back-end JS library - NodeJS and Express Framework ',
      'NoSQL database - MongoDB ',
      'Building an End-to-End web application using MongoDB, Express, ReactJS and NodeJS (MERN – Stack) ',
    ],
  },
  {
    id: 4,
    title: 'Python for Data Analytics',
    image: '/assets/IATD-Python-for-Data-Analytics.jpg',
    description:
      'Gain hands-on experience in Python for data analysis, including data manipulation, visualization, and predictive modeling techniques.',

    hours: '75 hours',
    detail:
      'This Microcredential will introduce you to the main concepts of data analytics pipeline using Python using real-world scenarios. In this course, you will prepare your data for analysis, perform simple data analysis, and create data visualisation and prediction models from data using Python libraries.',
    modules: [
      'Introductory programming concepts and use of notebooks for your data analytics projects ',
      'Exploring and cleaning your data ',
      'Data manipulation and abstraction ',
      'Data visualisation using Python libraries',
    ],
  },
];

export default courses;
