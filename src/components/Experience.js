import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";
import Link from "next/link";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-slideGreen dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-primaryDark shadow-3xl 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Assistant Lecturer"
            company="Universitas Gadjah Mada (UGM)"
            time="Aug 2022 - Des 2023"
            address="Ygoyakarta, Indonesia"
            companyLink="https://trpl.sv.ugm.ac.id/"
            work="Assist lecturers in teaching basic programming courses using python and web programming using the laravel framework. Support teaching lecturers in delivering high-quality education by collaborating with them on course design, content development, and
assessment methods. Facilitate student learning and academic success by creating a supportive and engaging learning environment, responding to their
queries and concerns, and monitoring their progress and performance. Assist in preparing materials and resources for the lecturers by researching relevant topics, compiling information, and producing
syllabi, assignments, exams, and presentations. Provide feedback and guidance to students by grading their work, offering constructive comments, and suggesting areas for improvement."
          />

          <Details
            position="Software Engineer Intern"
            company="PT DW International (Stone Depot)"
            time="Feb 2023 - Feb 2024"
            address="Cirebon, Indonesia"
            companyLink="https://stonedepot.co.id/"
            work="Developed and maintained internal ERP systems using Laravel, CodeIgniter frameworks, and React Js. Migrated the internal ERP system from CodeIgniter to Laravel within three months, working as one of only two developers. Demonstrated strong front-end and back-end development skills with proficiency in HTML, CSS, JavaScript, PHP, and MySQL. Created user-friendly and efficient web applications that met the needs of clients and users."
          />

          <Details
            position="Frontend Web Developer"
            company="PT Citra Numusi Birawa"
            time="Aug 2023 - Jan 2024"
            address="Remote, Indonesia"
            companyLink="https://www.instagram.com/cinurawa.id/"
            work="Developed projects as part of the final project requirement for graduation from UGM. Implemented interface designs created by the UI/UX designer using Laravel, jQuery, and Bootstrap CSS. Improved website performance, achieving an average total blocking time of 0.002 ms for JavaScript script performance."
          />

          <Details
            position="Backend Developer"
            company="PT Voltras International"
            time="Dec 2024 - Present"
            address="Yogyakarta, Indonesia"
            companyLink="https://voltras.co.id/"
            work="Successfully developed and deployed a new Airline Gateway Service from scratch, integrating external airline supplier APIs into our system to support seamless communication and data exchange—used directly by all end users. Maintained and optimized our existing gateway for Sabre GDS integration, ensuring smooth real-time interactions with airline suppliers. Solved a critical pricing issue involving currency conversion and rounding mismatches, delivering a hybrid solution that preserved backend integrity while aligning with user display needs. Proposed and implemented an efficient alternative to caching by optimizing database queries and using a scheduler to manage data retrieval within resource constraints."
          />
        </ul>
      </div>
      <div className="mt-40 flex items-center justify-between gap-3 grid-cols-2">
        <Link
          href="/projects/"
          target={"_self"}
          className={`flex items-center rounded-lg border-2 border-solid bg-light p-2.5 px-6 text-lg font-semibold
            capitalize text-dark hover:border-light hover:bg-dark hover:text-light 
            dark:bg-dark dark:text-light dark:hover:bg-light dark:hover:text-dark
            md:p-2 md:px-4 md:text-base
             `}
        >
          View Projects
        </Link>
        <Link
          href="https://drive.google.com/file/d/1qe4frUtGGsM1D60s5l5uQX4YTdQ1rw-F/view?usp=sharing"
          target={"_blank"}
          className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
        >
          View My CV
        </Link>
      </div>
    </div>
  );
};

export default Experience;
