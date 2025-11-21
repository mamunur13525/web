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
  image: {
    thumbnail: string;
    full_screen: string;
  };
  title: string;
  description: {
    long: string;
    short: string;
    list: string[];
  };
  slug: string;
  live: {
    preview: string;
    git: string;
  };
  type: string[];
};

export type { ProjectType, BlogType };
