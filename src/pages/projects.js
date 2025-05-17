import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HireMe2 } from "@/components/HireMe2";

import van from "../../public/images/projects/van.png";
import layarjakti from "../../public/images/projects/layarjakti.png";
import jamu from "../../public/images/projects/jamu.png";
import harsa from "../../public/images/projects/harsa.png";
import propertio from "../../public/images/projects/propertio.png";
import skillbridge from "../../public/images/projects/skillbridge.png";
import indococo from "../../public/images/projects/indococo.png";
import stonedepot from "../../public/images/projects/stonedepot.png";
import kkn from "../../public/images/projects/kkn.png";
import consic from "../../public/images/projects/consic.png";
import datains from "../../public/images/projects/datains.png";
import archery from "../../public/images/projects/archery3.png";
import loading from "../../public/images/articles/GTA6-VICE.gif";

import TransitionEffect from "@/components/TransitionEffect";
import { motion, useMotionValue } from "framer-motion";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }
  return (
    <>
      <Link
        href={link}
        target={"_blank"}
        className="relative"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="capitalize text-xl font-semibold hover:underline dark:text-light md:text-lg xs:text-base sm:self-start">
          {title}
        </h2>
        <FramerImage
          src={img}
          ref={imgRef}
          alt={title}
          className="w-96 h-auto z-10 hidden absolute rounded-lg md:!hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
          style={{
            x: x,
            y: y,
          }}
          sizes="(max-width: 768px) 60vw,
              (max-width: 1200px) 40vw,
              33vw"
        />
      </Link>
    </>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-2 rounded-xl flex sm:flex-col justify-between 
      bg-light text-dark first:mt-0 border border-solid border-dark
      border-r-4 border-b-4 dark:bg-dark dark:border-light
      "
    >
      <MovingImg img={img} title={title} link={link} />
      <span
        className="text-primary font-semibold dark:text-primaryDark min-w-max pl-4 sm:self-start 
      sm:pl-0 xs:text-sm"
      >
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link,
  github,
  tools,
}) => {
  return (
    <article
      className="relative flex w-full items-center  justify-between rounded-3xl rounded-br-2xl border
border-solid border-dark bg-light p-12 shadow-2xl  dark:border-light dark:bg-dark  lg:flex-col 
lg:p-8 xs:rounded-2xl  xs:rounded-br-3xl xs:p-4 
    "
    >
      <div
        className="absolute  top-0 -right-3 -z-10 h-[103%] w-[101%] rounded-[2.5rem] rounded-br-3xl bg-dark
         dark:bg-light  xs:-right-2 xs:h-[102%] xs:w-[100%]
        xs:rounded-[1.5rem] "
      />

      <Link
        target="_blank"
        href={link}
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
      >
        <FramerImage
          src={img}
          className="h-auto w-full object-cover"
          alt={title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
        />
      </Link>
      <div className="flex w-1/2 flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-xl font-medium text-primary dark:text-light xs:text-base">
          {type}
        </span>
        <span className="text-xl font-medium text-primaryDark dark:text-primaryDark xs:text-base">
          {tools}
        </span>
        <Link
          target="_blank"
          href={link}
          className="underline-offset-2 hover:underline"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
            {title}
          </h2>
        </Link>
        <p className=" my-2 rounded-md font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link
            href={github}
            target={"_blank"}
            className="w-10"
            aria-label="github link"
          >
            <GithubIcon />
          </Link>
          <Link
            target="_blank"
            href={link}
            className="ml-4 rounded-lg
             bg-dark p-2 px-6 text-lg font-semibold
             sm:px-4 sm:text-base rounded-lg border-2 border-solid bg-dark
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base"
            aria-label="Project link"
          >
            View Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, tools, summary }) => {
  return (
    <article
      className="relative flex w-full flex-col items-center justify-center rounded-2xl  rounded-br-2xl 
      border  border-solid  border-dark bg-light p-6  shadow-2xl dark:border-light dark:bg-dark 
      xs:p-4
      "
    >
      <div
        className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark
         dark:bg-light  md:-right-2 md:w-[101%] xs:h-[102%]
        xs:rounded-[1.5rem]"
      />

      <Link
        target="_blank"
        href={link}
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="h-auto w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </Link>
      <div className="mt-4 flex w-full flex-col items-start justify-between">
        <span className="text-xl font-medium text-primary dark:text-light lg:text-lg md:text-base">
          {type}
        </span>
        <span className="text-xl font-medium text-primaryDark dark:text-primaryDark xs:text-base">
          {tools}
        </span>

        <Link
          target="_blank"
          href={link}
          className="underline-offset-2 hover:underline"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl ">
            {title}
          </h2>
        </Link>
        <p className=" my-2 rounded-md font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="flex w-full items-center  justify-between">
          <Link
            target="_blank"
            href={link}
            className="rounded-lg
             bg-dark mt-2 px-6 py-2 text-lg font-semibold
             sm:px-4 sm:text-base rounded-lg border-2 border-solid bg-dark
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
            "
            aria-label={title}
          >
            View Project
          </Link>
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | By Nizan</title>
        <meta
          name="description"
          content="Nizan's portfolio showcasing web development projects and skills."
        />
      </Head>

      <TransitionEffect />
      <main
        className={`mb-16  flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="All Projects Done with Joy ✨"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                type="Backend Development - Airline Booking"
                tools="Java | Springboot | PostgreSQL | Docker | Kubernetes"
                title="Voltras Agent Network"
                summary="As a Backend Engineer, I work on building and maintaining core services that power the airline booking ecosystem, primarily using Java and Spring Boot in a microservices architecture.
 Successfully developed and deployed a new Airline Gateway Service from scratch, which converts and standardizes external airline API formats to match our system’s internal format—used directly by all end users.
 Maintained and optimized our existing gateway for Sabre GDS integration, ensuring smooth real-time interactions with airline suppliers.
 Solved a critical pricing issue involving currency conversion and rounding mismatches, delivering a hybrid solution that preserved backend integrity while aligning with user display needs.
 Proposed and implemented an efficient alternative to caching by optimizing database queries and using a scheduler to manage data retrieval within resource constraints."
                img={van}
                link="https://www.travelagent.co.id/"
                github="/404/"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Fullstack Development - Web Platform"
                tools="Next JS | Typescript | TailwindCSS | Firebase"
                title="Layarjakti"
                img={layarjakti}
                summary="Layarjakti is a web platform developed for the Kejaksaan Tinggi Negeri in Yogyakarta, designed to streamline case submissions and reporting for local Kantor Kejaksaan Negeri across the DI Yogyakarta region. For this project, I was responsible for adding new features, including a reporting function and a report history tracker within the Layarjakti dashboard. My work spanned the entire development process, from designing the UI to integrating it with Firestore for data storage. The project was built using Next.js with TypeScript, paired with Firestore as the database, resulting in a dynamic and secure platform that supports efficient data handling for legal case management."
                link="https://layarjakti.id/"
                github="/404/"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Frontend Development - Landing Page"
                tools="HTML | CSS | JavaScript | Bootstrap"
                title="Antony Jamu"
                img={jamu}
                summary="This freelance project was developed as a promotional landing page for Antony Jamu, an instant herbal drink brand. Our team consisted of two developers: one responsible for the backend, while I handled the frontend. My role included designing the UI and building the frontend structure of the site. The website was created using HTML, CSS with Bootstrap, and plain JavaScript without any additional libraries, making it a simple and effective solution that meets the client’s needs. It was an enjoyable project to work on in my spare time, allowing me to keep my coding skills sharp while creating a clean and engaging landing page."
                link="/projects/clay-gatsby-theme"
                github="/404/"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="Frontend Development - LMS"
                tools="Javascript | React JS | Tailwind CSS"
                title="Harsa Edu"
                summary="Harsa.edu is a web-based application designed to assist instructors and administrators in managing online courses available on the Harsa Learning Management System, which is mobile-based, along with content such as classes, categories, and FAQs. Harsa Edu is a web application created to fulfill the final project assignment for independent studies at Alterra Academy. As a frontend developer, I successfully developed several features designed by the UI/UX team and shared by the head of the frontend division. This collaborative effort showcases the practical application of skills and teamwork, culminating in a functional and user-centric educational platform."
                img={harsa}
                link="https://harsa-frontend-vercel.vercel.app/"
                github="https://github.com/HarsaEdu/harsa-frontend.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Frontend Development - Property Information System"
                tools="Laravel | Jquery | CSS Bootstrap"
                title="Propertio"
                img={propertio}
                summary="This is a project that I used to complete my final project as a graduation requirement and also to implement a business proposal idea that my senior had. Here I became a frontend developer who implemented all the interface designs that had been made by the UI UX designer in this project. This project uses Laravel framework, Jquery and Bootstrap CSS."
                link="https://beta.propertio.id/"
                github="/404/"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Frontend Development - Landing Page"
                tools="ReactJS | Tailwind CSS | Cakra UI"
                title="SkillBridge"
                img={skillbridge}
                summary="Skillbridge  is a learning management system (LMS) website created to meet the needs of business units in the training field. it is created using javascript, react js framework, and tailwind CSS. I worked on the frontend for the landing page side of this project. The frontend is done with React JS and tailwind CSS using UI components from Cakra UI."
                link="https://skillbridge-murex.vercel.app/"
                github="/404/"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="Fullstack Development - ERP System"
                tools="Laravel | Bootstrap | Jquery"
                title="Indococo Internal System"
                summary="This is my second project as a Fullstack Developer at PT. D&W International. This is a project to create an admin dashboard for data entry of the company with the brand Indococo so that later the data can be processed and visualized according to needs. The system created here is tailored to the needs of management on the Indococo brand. This project uses the Laravel framework and CSS Bootstrap."
                img={indococo}
                link="/404/"
                github="/404/"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Fullstack Development - ERP System"
                tools="CodeIgniter | Jquery | CSS Bootstrap"
                title="Stone Depot Internal System"
                img={stonedepot}
                summary="This is my project as a Fullstack developer at PT. D&W International. This is a project to create an admin dashboard for data entry of the company with the brand Stonedepot so that the data collected can be processed and visualized according to the needs. This project uses the Codeigniter framework and CSS Bootstrap."
                link="/404/"
                github="/404/"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Wordpress Web Development - Landing Page"
                tools="Wordpress | Elementor | CSS"
                title="Telaga Menjer Website"
                img={kkn}
                summary="I have developed the KKN Telaga Menjer Wonosobo website, as depicted in the image above. I crafted this website utilizing WordPress and Elementor. The motivation behind creating this KKN website was to provide a promotional platform for Telaga Menjer tourism, as well as for the Maron and Tlogo villages located in the Wonosobo Regency."
                link="/404/"
                github="/404/"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="Fullstack Development - Landing Page Dynamic"
                tools="HTML | CSS | JS | PHP | MVC"
                title="Consic Website"
                summary="The goal of this freelance project is to develop a website that provides information and tickets for music concerts. The website is coded in PHP, a native programming language, and follows the MVC design pattern."
                img={consic}
                link="/404/"
                github="/https://github.com/NizanHulq/project-consic.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Frontend Development - Website"
                tools="ReactJS | Tailwind CSS | Kepler.gl"
                title="Big Data Mobility Website"
                img={datains}
                summary="This project is an initiative from the Industrial Lecturer who originated from Data Ins Company. This is a web-based project that is helpful for displaying GIS (Geographic Information System) from data that has been examined beforehand. This project employs React Js Framework and kepler.gl library."
                link="/404/"
                github="https://github.com/NizanHulq/mobility-maps-app.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Flutter App - Mobile App"
                tools="Flutter | Dart | Firebase"
                title="Amanah Archery App"
                img={archery}
                summary="I developed this project as part of my Industrial Practice internship at a software house company in Surabaya. The project involved creating a mobile application using Flutter. The application was designed to monitor the attendance, training, and scoring of archery clubs. I used Firebase database to implement CRUD data features for the application."
                link="/404/"
                github="https://github.com/arkefallen/archery-club.git"
              />
            </div>
          </div>

          <div>
            <ul className="flex flex-col items-center relative pt-16">
              <Article
                title="Adding more soon, thanks for the interest!"
                img={loading}
                time="1 min read"
                date=""
                link="https://github.com/nizanhulq/"
              />
            </ul>

            <div className="mt-2 flex items-center justify-between gap-3 grid-cols-2">
              <Link
                href="https://drive.google.com/file/d/1qe4frUtGGsM1D60s5l5uQX4YTdQ1rw-F/view?usp=sharing"
                target={"_blank"}
                className={`flex items-center rounded-lg border-2 border-solid bg-light p-2.5 px-6 text-lg font-semibold
            capitalize text-dark hover:border-light hover:bg-dark hover:text-light 
            dark:bg-dark dark:text-light dark:hover:bg-light dark:hover:text-dark
            md:p-2 md:px-4 md:text-base
             `}
              >
                View My CV
              </Link>
              <Link
                href="/about/"
                target={"_self"}
                className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
              >
                Get To Know Me
              </Link>
            </div>
            <HireMe2 />
          </div>
        </Layout>
      </main>
    </>
  );
}
