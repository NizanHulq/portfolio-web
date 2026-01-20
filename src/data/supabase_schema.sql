-- =============================================
-- SUPABASE SQL SETUP FOR PORTFOLIO WEBSITE
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Projects Table (dengan kategori Web2/Web3)
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  category VARCHAR(50) DEFAULT 'web2', -- 'web2' atau 'web3'
  tools TEXT,
  summary TEXT,
  image_url VARCHAR(500),
  link VARCHAR(500),
  github_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Experiences Table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  company_link VARCHAR(500),
  time_period VARCHAR(100),
  address VARCHAR(255),
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Settings Table
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- INSERT DEFAULT SETTINGS
-- =============================================
INSERT INTO settings (key, value) VALUES 
  ('cv_link', 'https://drive.google.com/file/d/158AlzKCYZFRP69b5v3hx9MrhpmnWeHwx/view?usp=sharing'),
  ('whatsapp_number', '6287776917317');

-- =============================================
-- INSERT EXPERIENCES DATA
-- =============================================
INSERT INTO experiences (position, company, company_link, time_period, address, description, order_index) VALUES
(
  'Backend Developer',
  'PT Voltras International',
  'https://voltras.co.id/',
  'Dec 2024 - Present',
  'Yogyakarta, Indonesia',
  'Successfully developed and deployed a new Airline Gateway Service from scratch, integrating external airline supplier APIs into our system to support seamless communication and data exchange—used directly by all end users. Maintained and optimized our existing gateway for Sabre GDS integration, ensuring smooth real-time interactions with airline suppliers. Solved a critical pricing issue involving currency conversion and rounding mismatches, delivering a hybrid solution that preserved backend integrity while aligning with user display needs. Proposed and implemented an efficient alternative to caching by optimizing database queries and using a scheduler to manage data retrieval within resource constraints.',
  1
),
(
  'Frontend Web Developer',
  'PT Citra Numusi Birawa',
  'https://www.instagram.com/cinurawa.id/',
  'Aug 2023 - Jan 2024',
  'Remote, Indonesia',
  'Developed projects as part of the final project requirement for graduation from UGM. Implemented interface designs created by the UI/UX designer using Laravel, jQuery, and Bootstrap CSS. Improved website performance, achieving an average total blocking time of 0.002 ms for JavaScript script performance.',
  2
),
(
  'Software Engineer Intern',
  'PT DW International (Stone Depot)',
  'https://stonedepot.co.id/',
  'Feb 2023 - Feb 2024',
  'Cirebon, Indonesia',
  'Developed and maintained internal ERP systems using Laravel, CodeIgniter frameworks, and React Js. Migrated the internal ERP system from CodeIgniter to Laravel within three months, working as one of only two developers. Demonstrated strong front-end and back-end development skills with proficiency in HTML, CSS, JavaScript, PHP, and MySQL. Created user-friendly and efficient web applications that met the needs of clients and users.',
  3
),
(
  'Assistant Lecturer',
  'Universitas Gadjah Mada (UGM)',
  'https://trpl.sv.ugm.ac.id/',
  'Aug 2022 - Des 2023',
  'Yogyakarta, Indonesia',
  'Assist lecturers in teaching basic programming courses using python and web programming using the laravel framework. Support teaching lecturers in delivering high-quality education by collaborating with them on course design, content development, and assessment methods. Facilitate student learning and academic success by creating a supportive and engaging learning environment, responding to their queries and concerns, and monitoring their progress and performance. Assist in preparing materials and resources for the lecturers by researching relevant topics, compiling information, and producing syllabi, assignments, exams, and presentations. Provide feedback and guidance to students by grading their work, offering constructive comments, and suggesting areas for improvement.',
  4
);

-- =============================================
-- INSERT PROJECTS DATA
-- =============================================
INSERT INTO projects (title, type, category, tools, summary, image_url, link, github_url, is_featured, order_index) VALUES
(
  'Voltras Agent Network',
  'Backend Development - Airline Booking',
  'web2',
  'Java | Springboot | PostgreSQL | Docker | Kubernetes',
  'As a Backend Engineer, I work on building and maintaining core services that power the airline booking ecosystem, primarily using Java and Spring Boot in a microservices architecture. Successfully developed and deployed a new Airline Gateway Service from scratch, which converts and standardizes external airline API formats to match our system''s internal format—used directly by all end users. Maintained and optimized our existing gateway for Sabre GDS integration, ensuring smooth real-time interactions with airline suppliers. Solved a critical pricing issue involving currency conversion and rounding mismatches, delivering a hybrid solution that preserved backend integrity while aligning with user display needs. Proposed and implemented an efficient alternative to caching by optimizing database queries and using a scheduler to manage data retrieval within resource constraints.',
  'van.png',
  'https://www.travelagent.co.id/',
  '/404/',
  true,
  1
),
(
  'Layarjakti',
  'Fullstack Development - Web Platform',
  'web2',
  'Next JS | Typescript | TailwindCSS | Firebase',
  'Layarjakti is a web platform developed for the Kejaksaan Tinggi Negeri in Yogyakarta, designed to streamline case submissions and reporting for local Kantor Kejaksaan Negeri across the DI Yogyakarta region. For this project, I was responsible for adding new features, including a reporting function and a report history tracker within the Layarjakti dashboard. My work spanned the entire development process, from designing the UI to integrating it with Firestore for data storage. The project was built using Next.js with TypeScript, paired with Firestore as the database, resulting in a dynamic and secure platform that supports efficient data handling for legal case management.',
  'layarjakti.png',
  'https://layarjakti.id/',
  '/404/',
  false,
  2
),
(
  'Antony Jamu',
  'Frontend Development - Landing Page',
  'web2',
  'HTML | CSS | JavaScript | Bootstrap',
  'This freelance project was developed as a promotional landing page for Antony Jamu, an instant herbal drink brand. Our team consisted of two developers: one responsible for the backend, while I handled the frontend. My role included designing the UI and building the frontend structure of the site. The website was created using HTML, CSS with Bootstrap, and plain JavaScript without any additional libraries, making it a simple and effective solution that meets the client''s needs. It was an enjoyable project to work on in my spare time, allowing me to keep my coding skills sharp while creating a clean and engaging landing page.',
  'jamu.png',
  '/projects/clay-gatsby-theme',
  '/404/',
  false,
  3
),
(
  'Harsa Edu',
  'Frontend Development - LMS',
  'web2',
  'Javascript | React JS | Tailwind CSS',
  'Harsa.edu is a web-based application designed to assist instructors and administrators in managing online courses available on the Harsa Learning Management System, which is mobile-based, along with content such as classes, categories, and FAQs. Harsa Edu is a web application created to fulfill the final project assignment for independent studies at Alterra Academy. As a frontend developer, I successfully developed several features designed by the UI/UX team and shared by the head of the frontend division. This collaborative effort showcases the practical application of skills and teamwork, culminating in a functional and user-centric educational platform.',
  'harsa.png',
  'https://harsa-frontend-vercel.vercel.app/',
  'https://github.com/HarsaEdu/harsa-frontend.git',
  true,
  4
),
(
  'Propertio',
  'Frontend Development - Property Information System',
  'web2',
  'Laravel | Jquery | CSS Bootstrap',
  'This is a project that I used to complete my final project as a graduation requirement and also to implement a business proposal idea that my senior had. Here I became a frontend developer who implemented all the interface designs that had been made by the UI UX designer in this project. This project uses Laravel framework, Jquery and Bootstrap CSS.',
  'propertio.png',
  'https://beta.propertio.id/',
  '/404/',
  false,
  5
),
(
  'SkillBridge',
  'Frontend Development - Landing Page',
  'web2',
  'ReactJS | Tailwind CSS | Cakra UI',
  'Skillbridge is a learning management system (LMS) website created to meet the needs of business units in the training field. it is created using javascript, react js framework, and tailwind CSS. I worked on the frontend for the landing page side of this project. The frontend is done with React JS and tailwind CSS using UI components from Cakra UI.',
  'skillbridge.png',
  'https://skillbridge-murex.vercel.app/',
  '/404/',
  false,
  6
),
(
  'Indococo Internal System',
  'Fullstack Development - ERP System',
  'web2',
  'Laravel | Bootstrap | Jquery',
  'This is my second project as a Fullstack Developer at PT. D&W International. This is a project to create an admin dashboard for data entry of the company with the brand Indococo so that later the data can be processed and visualized according to needs. The system created here is tailored to the needs of management on the Indococo brand. This project uses the Laravel framework and CSS Bootstrap.',
  'indococo.png',
  '/404/',
  '/404/',
  true,
  7
),
(
  'Stone Depot Internal System',
  'Fullstack Development - ERP System',
  'web2',
  'CodeIgniter | Jquery | CSS Bootstrap',
  'This is my project as a Fullstack developer at PT. D&W International. This is a project to create an admin dashboard for data entry of the company with the brand Stonedepot so that the data collected can be processed and visualized according to the needs. This project uses the Codeigniter framework and CSS Bootstrap.',
  'stonedepot.png',
  '/404/',
  '/404/',
  false,
  8
),
(
  'Telaga Menjer Website',
  'Wordpress Web Development - Landing Page',
  'web2',
  'Wordpress | Elementor | CSS',
  'I have developed the KKN Telaga Menjer Wonosobo website, as depicted in the image above. I crafted this website utilizing WordPress and Elementor. The motivation behind creating this KKN website was to provide a promotional platform for Telaga Menjer tourism, as well as for the Maron and Tlogo villages located in the Wonosobo Regency.',
  'kkn.png',
  '/404/',
  '/404/',
  false,
  9
),
(
  'Consic Website',
  'Fullstack Development - Landing Page Dynamic',
  'web2',
  'HTML | CSS | JS | PHP | MVC',
  'The goal of this freelance project is to develop a website that provides information and tickets for music concerts. The website is coded in PHP, a native programming language, and follows the MVC design pattern.',
  'consic.png',
  '/404/',
  'https://github.com/NizanHulq/project-consic.git',
  true,
  10
),
(
  'Big Data Mobility Website',
  'Frontend Development - Website',
  'web2',
  'ReactJS | Tailwind CSS | Kepler.gl',
  'This project is an initiative from the Industrial Lecturer who originated from Data Ins Company. This is a web-based project that is helpful for displaying GIS (Geographic Information System) from data that has been examined beforehand. This project employs React Js Framework and kepler.gl library.',
  'datains.png',
  '/404/',
  'https://github.com/NizanHulq/mobility-maps-app.git',
  false,
  11
),
(
  'Amanah Archery App',
  'Flutter App - Mobile App',
  'web2',
  'Flutter | Dart | Firebase',
  'I developed this project as part of my Industrial Practice internship at a software house company in Surabaya. The project involved creating a mobile application using Flutter. The application was designed to monitor the attendance, training, and scoring of archery clubs. I used Firebase database to implement CRUD data features for the application.',
  'archery3.png',
  '/404/',
  'https://github.com/arkefallen/archery-club.git',
  false,
  12
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY (Optional but recommended)
-- =============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON settings FOR SELECT USING (true);
