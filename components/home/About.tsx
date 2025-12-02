import SectionTitle from "../ui/section-title";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { aboutContent } from "@/data/demo/about";

const AboutSection = () => {
  return (
    <SectionTitle title="About">
      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="text-lg font-semibold mb-4 mt-8 text-foreground"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-secondary-foreground leading-relaxed mb-4"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul className="space-y-3 mb-6 pl-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="flex items-start gap-2 text-secondary-foreground">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <span {...props} />
              </li>
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-foreground" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="font-semibold text-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        >
          {aboutContent}
        </ReactMarkdown>
      </div>
    </SectionTitle>
  );
};

export default AboutSection;
