const PageTitle = ({ title = "" }: { title: string }) => {
  return (
    <div>
      <span className="pl-12 pr-4 py-3 w-fit rounded-2xl text-2xl uppercase tracking-wider font-semibold relative">
        <span className="font-serif font-bold absolute left-0 top-1">
          ___
        </span>

        {title}
      </span>
    </div>
  );
};

export default PageTitle;
