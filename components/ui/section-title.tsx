const SectionTitle = ({
  title = "",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-wide font-stack mb-5">
        {title || ""}
      </h1>
      {children}
    </section>
  );
};

export default SectionTitle;
