import type { Metadata } from "next";
import ContactForm from "@/components/contacts/ContactForm";
import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
};

export default function Home() {
  return (
    <div>
      <NestedNavbar />
      <section className="pt-10 mb-5">
        <PageTitle title="Contact Us" />
      </section>
      <ContactForm />
    </div>
  );
}
