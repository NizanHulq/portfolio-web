import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import profile from "../../public/images/profile/nizan's anime face png.png";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { HireMe2 } from "@/components/HireMe2";
import { getExperiences, getSetting, getSkills } from "@/lib/supabase";

function AnimatedNumberFramerMotion({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );

  return <span ref={ref} />;
}

export default function About({ experiences, cvLink, skills }) {
  const startDate = new Date("2020-09-01T00:00:00");
  const [days, setDays] = useState(0);

  useEffect(() => {
    const now = new Date();
    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);
  return (
    <>
      <Head>
        <title>About NexTemp</title>
        <meta
          name="description"
          content="NexTemp, A open-source portfolio theme built with Nextjs"
        />
      </Head>

      <TransitionEffect />
      <main
        className={`flex  w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Let Passion Lead Your Purpose 🔥"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div
              className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 
            md:col-span-8"
            >
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                BIOGRAPHY
              </h2>
              <p className="font-medium ">
                I'm Nizan Dhiaulhaq, a backend engineer who also enjoys bringing
                full-stack ideas to life. Currently, I work at Voltras
                International, where I build scalable backend systems using
                Java, Spring Boot, and microservices architecture to power a B2B
                travel platform. I've developed and maintained gateway services
                that integrate with major airline APIs like Sabre and other
                GDS/NDC suppliers, helping streamline real-time booking
                experiences.
              </p>
              <p className="my-4 font-medium">
                Before diving deep into backend engineering, I built several
                full-stack systems using Laravel, CodeIgniter, React.js, and
                Tailwind CSS. From user-facing dashboards to internal management
                tools. That journey gave me a strong sense of how frontend and
                backend decisions shape user experience and system flow as a
                whole. I love solving messy backend challenges, optimizing data
                flows, and writing code that quietly makes everything else run
                smoother.
              </p>
              <p className="my-4 font-medium">
                P.S. I still get excited over a clean UI, a clever React
                component, or a perfectly placed anime reference. Also, not an
                AI-generated person—promise 😄.
              </p>
            </div>
            <div
              className="relative col-span-3 h-max rounded-2xl border-2 border-solid border-dark 
            bg-light p-8 dark:border-light dark:bg-dark
            xl:col-span-4 md:col-span-8 md:order-1
            "
            >
              <div
                className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%]  rounded-[2rem] rounded-br-3xl 
                bg-dark
        dark:bg-light  "
              />
              <Image
                className="h-auto w-full rounded-2xl border-2 border-solid border-dark"
                priority={true}
                src={profile}
                alt="Travis Lord"
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
            <div
              className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row 
            xl:items-center md:order-3"
            >
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={days} />+
                </span>
                <h3
                  className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  Days of Coding
                </h3>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={1000} />
                </span>
                <h3
                  className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  Bugs Made
                </h3>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={999} />
                </span>
                <h3
                  className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  Bugs Crushed
                </h3>
              </div>
            </div>
            <HireMe2 />
          </div>

          <Skills skills={skills} />
          <Experience experiences={experiences} cvLink={cvLink} />
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [experiences, cvLink, skills] = await Promise.all([
      getExperiences(),
      getSetting('cv_link'),
      getSkills()
    ]);

    return {
      props: {
        experiences: experiences || [],
        cvLink: cvLink || "https://drive.google.com/file/d/158AlzKCYZFRP69b5v3hx9MrhpmnWeHwx/view?usp=sharing",
        skills: skills || []
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        experiences: [],
        cvLink: "https://drive.google.com/file/d/158AlzKCYZFRP69b5v3hx9MrhpmnWeHwx/view?usp=sharing",
        skills: []
      }
    };
  }
}
