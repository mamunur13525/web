import { Connects } from "@/data/demo/connects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const ConnectSection = () => {
  return (
    <section className="w-full py-12 mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Connects.map((connect) => (
          <a
            key={connect.name}
            href={connect.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-3 py-3 rounded-xl border border-border bg-card hover:bg-accent transition-colors duration-200 group"
          >
            <div className="shrink-0 w-16 h-16 rounded-lg bg-background flex items-center justify-center">
              <Image
                src={connect.icon}
                alt={connect.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:underline">
                {connect.name}
              </h3>
              <p className="text-sm text-muted-foreground">{connect.handle}</p>
            </div>

            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default ConnectSection;
