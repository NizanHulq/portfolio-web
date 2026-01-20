import { motion } from "framer-motion";
import React, { useRef } from "react";

// Fallback skills data if database fetch fails
const fallbackSkills = [
  { name: "HTML", x_position: "-12vw", y_position: "0vw" },
  { name: "JavaScript", x_position: "12vw", y_position: "0vw" },
  { name: "PHP", x_position: "0vw", y_position: "10vw" },
  { name: "Tailwind", x_position: "0vw", y_position: "-10vw" },
  { name: "Java", x_position: "-18vw", y_position: "-12vw" },
  { name: "Spring Boot", x_position: "18vw", y_position: "-12vw" },
  { name: "React Js", x_position: "-20vw", y_position: "8vw" },
  { name: "Next Js", x_position: "20vw", y_position: "8vw" },
  { name: "Laravel", x_position: "0vw", y_position: "-18vw" },
  { name: "PostgreSQL", x_position: "-12vw", y_position: "-22vw" },
  { name: "Oracle", x_position: "12vw", y_position: "-22vw" },
  { name: "Git", x_position: "-32vw", y_position: "-5vw" },
  { name: "Docker", x_position: "32vw", y_position: "-5vw" },
  { name: "Kubernetes", x_position: "-28vw", y_position: "12vw" },
  { name: "Grafana", x_position: "28vw", y_position: "12vw" },
  { name: "Solidity", x_position: "0vw", y_position: "22vw" },
];

const Skill = ({ name, x, y }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
      className="cursor-default w-max origin-center absolute 
       font-semibold bg-dark text-light py-3 px-6 rounded-full dark:bg-light dark:text-dark
       lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3  xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold
       "
    >
      {name}
    </motion.div>
  );
};

const Skills = ({ skills = [] }) => {
  const ref = useRef(null);
  
  // Use database skills or fallback
  const displaySkills = skills.length > 0 ? skills : fallbackSkills;
  
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32">
        Skills
      </h2>
      <div
        ref={ref}
        className="w-full h-[100vh] relative bg-circularLight dark:bg-circularDark  flex items-center justify-center 
      mb-64 md:mb-32 rounded-full
      lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:bg-circularLightMd md:dark:bg-circularDarkMd 
      sm:bg-circularLightSm sm:dark:bg-circularDarkSm lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] 
      "
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-default flex rounded-full font-semibold bg-dark text-light px-6 py-7 shadow-dark
        dark:bg-light dark:text-dark lg:p-6 md:p-4 xs:text-xs xs:p-2
        "
        >
          Web
        </motion.div>

        {displaySkills.map((skill, index) => (
          <Skill 
            key={skill.id || index}
            name={skill.name} 
            x={skill.x_position} 
            y={skill.y_position} 
          />
        ))}
      </div>
    </>
  );
};

export default Skills;
