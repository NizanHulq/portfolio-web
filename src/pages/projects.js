import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { HireMe2 } from "@/components/HireMe2";
import { getProjects, getSetting } from "@/lib/supabase";

import TransitionEffect from "@/components/TransitionEffect";
import { motion, useMotionValue } from "framer-motion";

// Import images
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

// Image mapping for static imports
const imageMap = {
  "van.png": van,
  "layarjakti.png": layarjakti,
  "jamu.png": jamu,
  "harsa.png": harsa,
  "propertio.png": propertio,
  "skillbridge.png": skillbridge,
  "indococo.png": indococo,
  "stonedepot.png": stonedepot,
  "kkn.png": kkn,
  "consic.png": consic,
  "datains.png": datains,
  "archery3.png": archery,
};

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
        {typeof img === 'string' ? (
          <motion.img
            src={img}
            className="h-auto w-full object-cover"
            alt={title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
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
        )}
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
        {typeof img === 'string' ? (
          <motion.img
            src={img}
            alt={title}
            className="h-auto w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
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
        )}
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

// Tab Filter Component
const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web2", label: "Web2" },
    { key: "web3", label: "Web3" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-16">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300
            border-2 border-solid
            ${
              activeCategory === cat.key
                ? "bg-dark text-light border-dark dark:bg-light dark:text-dark dark:border-light"
                : "bg-light text-dark border-dark hover:bg-dark hover:text-light dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
            }
            md:px-4 md:py-2 md:text-base
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default function Projects({ projects = [], cvLink }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter((p) => p.is_featured);
  const regularProjects = filteredProjects.filter((p) => !p.is_featured);

  // Helper function to get image
  const getProjectImage = (imageUrl) => {
    // Check if it's a static import (existing images)
    if (imageMap[imageUrl]) {
      return imageMap[imageUrl];
    }
    // For uploaded images, add the full path
    if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
      return `/images/projects/${imageUrl}`;
    }
    // If it's already a full URL or path, return as is
    return imageUrl || van;
  };

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

          {/* Category Filter Tabs */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            {/* Featured Projects */}
            {featuredProjects.map((project, index) => (
              <div key={project.id || index} className="col-span-12">
                <FeaturedProject
                  type={project.type}
                  tools={project.tools}
                  title={project.title}
                  summary={project.summary}
                  img={getProjectImage(project.image_url)}
                  link={project.link}
                  github={project.github_url || "/404/"}
                />
              </div>
            ))}

            {/* Regular Projects */}
            {regularProjects.map((project, index) => (
              <div
                key={project.id || `regular-${index}`}
                className="col-span-6 sm:col-span-12"
              >
                <Project
                  type={project.type}
                  tools={project.tools}
                  title={project.title}
                  img={getProjectImage(project.image_url)}
                  summary={project.summary}
                  link={project.link}
                />
              </div>
            ))}
          </div>

          {/* Show message if no projects in category */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-dark/75 dark:text-light/75">
                No {activeCategory} projects yet. Stay tuned! 🚀
              </p>
            </div>
          )}

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
                href={cvLink || "#"}
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

export async function getServerSideProps() {
  try {
    const [projects, cvLink] = await Promise.all([
      getProjects(),
      getSetting("cv_link"),
    ]);

    return {
      props: {
        projects: projects || [],
        cvLink:
          cvLink ||
          "https://drive.google.com/file/d/1qe4frUtGGsM1D60s5l5uQX4YTdQ1rw-F/view?usp=sharing",
      },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      props: {
        projects: [],
        cvLink:
          "https://drive.google.com/file/d/1qe4frUtGGsM1D60s5l5uQX4YTdQ1rw-F/view?usp=sharing",
      },
    };
  }
}
