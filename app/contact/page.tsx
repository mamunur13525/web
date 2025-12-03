import ContactForm from "@/components/contacts/ContactForm";
import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";

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
