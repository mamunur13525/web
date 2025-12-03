type DescriptionListTypes = {
  title: string;
  list: {
    title: string;
    list: string[];
  }[];
};

type ProjectType = {
  id: number;
  image: {
    thumbnail: string;
    full_screen: string;
  };
  title: string;
  description: {
    long: string;
    short: string;
    list: DescriptionListTypes[];
  };
  slug: string;
  live: {
    preview: string;
    git: string;
  };
  type: string[];
};
type BlogType = {
  id: number;
  slug: string;
  image: string;
  title: string;
  category: string;
};

interface DescriptionItem {
  text: string;
  subItems?: DescriptionItem[];
}

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: DescriptionItem[];
  skills: string[];
  type: "education" | "experience" | "freelance";
}

interface ExperienceGroup {
  id: string;
  organization: string;
  logo: string;
  list: ExperienceItem[];
}

export type { ProjectType, BlogType, ExperienceGroup, DescriptionItem };
