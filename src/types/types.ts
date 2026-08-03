type DescriptionListTypes = {
  title: string;
  list: {
    title: string;
    list: string[];
  }[];
};

type ProjectType = {
  id: number;
  icon?: string;
  image: {
    thumbnail: string;
    full_screen: string;
  };
  title: string;
  date: string;
  content?: string;
  slug: string;
  live: {
    preview: string;
    git: string;
    backend?: string;
  };
  type: string[];
};

type BlogType = {
  _id?: string;
  id?: number;
  slug: string;
  image: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
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

interface ConnectType {
  name: string;
  handle: string;
  icon: string;
  url: string;
}

interface TechStackType {
  name: string;
  icon: string;
  url: string;
}

export type {
  ProjectType,
  BlogType,
  ExperienceGroup,
  ExperienceItem,
  DescriptionItem,
  DescriptionListTypes,
  ConnectType,
  TechStackType,
};
