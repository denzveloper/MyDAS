interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "MIDAS",
  description: "Your trusted marketing partner for digital success",
  url: "https://midas.agency",
  links: {
    github: "https://github.com/yourusername/midas",
  },
};
