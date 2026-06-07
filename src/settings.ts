import { siteTheme } from '../theme.config.mjs';

export const settings = {
  siteTitle: "Tanmoy Sanyal",
  siteDescription: "Protein design scientist and aspiring Bayesian.",
  siteUrl: "https://tanmoy7989.github.io",
  authorName: "Tanmoy Sanyal",
  authorLabel: "Scientist, Protein Design | Structural Biology",
  profileImage: "/profile.jpg",
  bio: `I am a protein design scientist at Amgen, working at the intersection
of structural biology, machine learning, and statistical mechanics.
My work spans mini-binder and antibody design, MLOps pipelines for
biophysical property prediction, and computational methods for
non-canonical peptide modifications.`,
  socialLinks: {
    github: "https://github.com/tanmoy7989",
    linkedin: "https://linkedin.com/in/tanmoy-sanyal",
    scholar: "https://scholar.google.com/citations?user=MastYM0AAAAJ&hl=en",
    email: "tanmoy.7989@gmail.com",
  },
  nav: [
    { label: "About", href: "/" },
    { label: "Research", href: "/research" },
    { label: "CV", href: "/cv" },
    { label: "Publications", href: "https://scholar.google.com/citations?user=MastYM0AAAAJ&hl=en", external: true },
  ],
  resumePdf: "/resume.pdf",
  /** Resolved from theme_colors.json via theme.config.mjs */
  theme: siteTheme,
};

// Backward-compatible exports for template components
export const profile = {
  fullName: settings.authorName,
  title: settings.authorLabel,
  institute: "",
  author_name: settings.authorName,
  research_areas: [] as { title: string; description: string; field: string }[],
};

export const social = {
  email: settings.socialLinks.email ?? "",
  linkedin: settings.socialLinks.linkedin ?? "",
  x: "",
  bluesky: "",
  github: settings.socialLinks.github ?? "",
  gitlab: "",
  scholar: settings.socialLinks.scholar ?? "",
  inspire: "",
  arxiv: "",
  orcid: "",
};

export const template = {
  website_url: settings.siteUrl,
  menu_left: false,
  transitions: true,
  lightTheme: siteTheme.lightThemeName,
  darkTheme: siteTheme.darkThemeName,
  excerptLength: 200,
  postPerPage: 5,
  base: "",
};

export const seo = {
  default_title: settings.siteTitle,
  default_description: settings.siteDescription,
  default_image: settings.profileImage,
};
