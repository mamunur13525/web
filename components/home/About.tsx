import Link from "next/link";
import SectionTitle from "../ui/section-title";

const AboutSection = () => {
  return (
    <SectionTitle title="About">
      <div className="space-y-5 text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p>
          Design Engineer with 5+ years of experience, recognized for
          pixel-perfect execution and a strong eye for detail. Skilled in{" "}
          <span className="font-semibold">Next.js</span>,{" "}
          <span className="font-semibold">React</span>,{" "}
          <span className="font-semibold">TypeScript</span>, and modern
          front-end technologies, building high-quality, user-focused web and
          mobile applications.
        </p>

        <p>
          Passionate about exploring new tools and transforming ideas into
          polished, thoughtfully crafted personal projects.
        </p>

        <div className="space-y-2">
          <p>
            Creator of{" "}
            <Link
              href="https://github.com/mamunur13525/ZaDark"
              className="font-semibold hover:underline"
            >
              ZaDark
            </Link>{" "}
            (2022) — a tool that enhances the Zalo experience on PC & Web
          </p>
          <p>• 80k+ downloads on SourceForge</p>
          <p>• 20k+ active users on the Chrome Web Store</p>
        </div>

        <div className="space-y-2">
          <p>
            Creator of{" "}
            <Link
              href="https://github.com/mamunur13525/react-wheel-picker"
              className="font-semibold hover:underline"
            >
              React Wheel Picker
            </Link>{" "}
            — an iOS-style wheel picker with inertia scrolling and infinite
            looping
          </p>
          <p>• 4k+ weekly downloads on npm</p>
          <p>▲ Selected for the Vercel OSS Program, Summer 2025 Cohort</p>
        </div>
      </div>
    </SectionTitle>
  );
};

export default AboutSection;
