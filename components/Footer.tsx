"use client";

import { Connects } from "@/data/demo/connects";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full mt-24 overflow-hidden">
      {/* Gradient Background - Theme Aware */}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground font-stack">
                Mamun Ahmed
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full Stack Developer crafting exceptional digital experiences
                with modern technologies.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {Connects.map((connect) => (
                  <a
                    key={connect.name}
                    href={connect.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted border border-border hover:border-muted-foreground/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                    title={connect.name}
                  >
                    <Image
                      src={connect.icon}
                      alt={connect.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
              <a
                href="mailto:mamun.ahmed13525@gmail.com"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm mt-4"
              >
                <Mail className="w-4 h-4" />
                <span className="group-hover:underline underline-offset-2">
                  mamun.ahmed13525@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              © {currentYear} Mamun Ahmed. All rights reserved.
            </p>
          </div>

          {/* Large Text Background */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none scale-y-170">
            <span className="text-8xl md:text-9xl font-bold text-foreground/5 whitespace-nowrap font-stack ">
              Full Stack
              <span className="hidden sm:inline"> Dev.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
