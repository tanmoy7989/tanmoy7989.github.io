const THEME_PREFIX = 'tsanyal';

/** Set `accent` to any key in `colors`. Add named colors as needed. */
export const themeColors = {
  accent: 'teal',
  colors: {
    rose: '#e879a8',
    blush: '#f9a8d4',
    berry: '#db2777',
    coral: '#fb7185',
    amber: '#f59e0b',
    teal: '#14b8a6',
    ocean: '#0ea5e9',
    violet: '#8b5cf6',
  },
} as const;

function resolveAccentHex(config: typeof themeColors): string {
  const hex = config.colors[config.accent as keyof typeof config.colors];
  if (!hex) {
    const names = Object.keys(config.colors).join(', ');
    throw new Error(
      `settings.themeColors: unknown accent "${config.accent}". Available names: ${names}`
    );
  }
  return hex;
}

const accentHex = resolveAccentHex(themeColors);

export const siteTheme = {
  accent: accentHex,
  accentName: themeColors.accent,
  colors: themeColors.colors,
  lightThemeName: `${THEME_PREFIX}-light`,
  darkThemeName: `${THEME_PREFIX}-dark`,
};

/** Build DaisyUI light + dark themes from the resolved accent hex. */
export function buildDaisyThemes(accent: string = accentHex) {
  return {
    [siteTheme.lightThemeName]: {
      primary: accent,
      'primary-content': '#ffffff',
      secondary: accent,
      'secondary-content': '#ffffff',
      accent,
      'accent-content': '#ffffff',
      neutral: '#1f2937',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#f3f4f6',
      'base-content': '#1f2937',
    },
    [siteTheme.darkThemeName]: {
      primary: accent,
      'primary-content': '#ffffff',
      secondary: accent,
      'secondary-content': '#ffffff',
      accent,
      'accent-content': '#111827',
      neutral: '#e5e7eb',
      'base-100': '#111827',
      'base-200': '#1f2937',
      'base-300': '#374151',
      'base-content': '#f9fafb',
    },
  };
}

export const settings = {
  siteTitle: "Tanmoy Sanyal",
  siteDescription: "Protein design scientist and aspiring Bayesian.",
  siteUrl: "https://tanmoy7989.github.io",
  authorName: "Tanmoy Sanyal",
  authorLabel: "",
  profileImage: "/profile.png",
  bio: `I am a principal scientist at <a href="https://www.amgen.com" class="link link-accent">Amgen</a>, working at the intersection of structural biology, antibody design, and applied machine learning.

Previously I re-designed peptide based drugs for enhanced half-lives using computational methods, as a protein design scientist at <a href="https://www.novonordisk-us.com" class="link link-accent">Novo Nordisk</a>.

Before that, I was a postdoc in the <a href="https://salilab.org/index.html" class="link link-accent">Sali lab</a> at <a href="https://bts.ucsf.edu" class="link link-accent">University of California San Francisco</a>, where I developed integrative protein structure determination methods from chemical cross-link data.

I received my PhD in Chemical Engineering from <a href="https://chemengr.ucsb.edu" class="link link-accent">University of California Santa Barbara</a>, where I was advised by <a href="https://theshelllab.org" class="link link-accent">M. Scott Shell</a>, and developed variational inference algorithms for molecular mechanics models of equilibrium phase behavior and protein biophysics.`,
  socialLinks: {
    github: "https://github.com/tanmoy7989",
    linkedin: "https://linkedin.com/in/tanmoy-sanyal",
    scholar: "https://scholar.google.com/citations?user=MastYM0AAAAJ&hl=en",
    email: "tanmoy.7989@gmail.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "CV", href: "/cv" },
    { label: "Publications", href: "https://scholar.google.com/citations?user=MastYM0AAAAJ&hl=en", external: true },
  ],
  resumePdf: "/resume.pdf",
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
