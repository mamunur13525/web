import React from "react";
import HowWorks from "./HowWorks";
import Reading from "./Reading";
import HomeProjects from "./HomeProjects";
import Map from "./Map";
import Experience from "./Experience";

const RenderComponent = ({ type = "" }: { type: string }) => {
  if (type === "experience") return <Experience />;
  if (type === "projects") return <HomeProjects />;
  if (type === "reading") return <Reading />;
  if (type === "map") return <Map />;
  if (type === "how_work") return <HowWorks />;
  return null;
};

export default RenderComponent;
