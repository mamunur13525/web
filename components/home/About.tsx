import React from "react";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-16">
      <h1 className="flex flex-col md:flex-row items-start md:items-center gap-2 text-3xl md:text-4xl font-bold tracking-wide font-stack mb-2">
        About
      </h1>

      <div className="space-y-2 text-base md:text-lg leading-relaxed">
        {/* Main intro */}
        <p className="flex items-start gap-1 text-gray-700 dark:text-gray-300">
          <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
          <span>
            Design Engineer with 5+ years of experience, known for pixel-perfect
            execution and strong attention to small details.
          </span>
        </p>

        {/* Skills */}
        <p className="flex items-start gap-1 text-gray-700 dark:text-gray-300">
          <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
          <span>
            {" "}
            Skilled in <span className="font-semibold">Next.js</span>,{" "}
            <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">TypeScript</span>, and modern
            front-end technologies; building high-quality, user-centric web and
            mobile applications.
          </span>
        </p>

        {/* Passion */}
        <p className="flex items-start gap-1 text-gray-700 dark:text-gray-300">
          <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
          <span>
            Passionate about exploring new technologies and turning ideas into
            reality through polished, thoughtfully crafted personal projects.
          </span>
        </p>

        {/* ZaDark Project */}
        <div>
          <p className="flex items-start gap-1text-gray-700 dark:text-gray-300">
            <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
            <span>
              Creator of{" "}
              <Link
                href="https://github.com/mamunur13525/ZaDark"
                className="font-semibold hover:underline"
              >
                ZaDark
              </Link>{" "}
              (2022): enhances the Zalo experience on PC & Web
            </span>
          </p>
          <div className="ml-6 space-y-1">
            <p className=" text-gray-600 dark:text-gray-400">
              <span className="text-gray-400 dark:text-gray-500 mr-2">•</span>
              <span>
                {" "}
                80k+ downloads on{" "}
                <Link href="#" className="hover:underline">
                  SourceForge
                </Link>
              </span>
            </p>
            <p className=" text-gray-600 dark:text-gray-400">
              <span className="text-gray-400 dark:text-gray-500 mr-2">•</span>
              <span>
                20k+ active users on the{" "}
                <Link href="#" className="hover:underline">
                  Chrome Web Store
                </Link>
              </span>
            </p>
          </div>
        </div>

        {/* React Wheel Picker */}
        <div>
          <p className="flex items-start gap-1 text-gray-700 dark:text-gray-300">
            <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
            <span>
              {" "}
              Creator of{" "}
              <Link
                href="https://github.com/mamunur13525/react-wheel-picker"
                className="font-semibold hover:underline"
              >
                React Wheel Picker
              </Link>
              : iOS-like wheel picker with inertia scrolling & infinite loop
            </span>
          </p>
          <div className="ml-6 space-y-1">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="text-gray-400 dark:text-gray-500 mr-2">•</span>
              4k+ weekly downloads on{" "}
              <Link href="#" className="hover:underline">
                npm
              </Link>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="text-gray-400 dark:text-gray-500 mr-2">▲</span>
              <Link href="#" className="hover:underline">
                Vercel OSS Program
              </Link>{" "}
              summer 2025 cohort
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
