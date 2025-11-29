const AccordionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path
        className="transition-all duration-300 group-data-[state=open]:[d:path('M7_4L12_9L17_4')]"
        d="M7 9L12 4L17 9"
      ></path>
      <path
        className="transition-all duration-300 group-data-[state=open]:[d:path('M7_20L12_15L17_20')]"
        d="M7 15L12 20L17 15"
      ></path>
    </svg>
  );
};

export default AccordionIcon;
