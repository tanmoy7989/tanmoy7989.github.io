# Website Rebuild Plan
**tanmoy7989.github.io — Jekyll → Astro**

## Context

| Item | Value |
|---|---|
| Current repo | https://github.com/tanmoy7989/tanmoy7989.github.io (Jekyll + Minimal Mistakes) |
| Target template | https://github.com/maiobarbero/astro_academia (fork directly) |
| Design reference | https://donovanr.github.io |
| LaTeX resume | `resume/resume.tex` — already complete, do not regenerate |

**Key decisions already made:**
- Single source of truth for CV: `content/cv.md` in Format F (defined below)
- Research items: individual `.md` files in `src/content/Research/`
- Publications: external link to Google Scholar — no local data file
- LaTeX PDF compiled via `pdflatex`; output served as `/resume.pdf`
- Build: Node + texlive Docker (local), GitHub Actions (deploy)

---

## Target Repo Structure

```
tanmoy7989.github.io/
├── .github/workflows/
│   ├── deploy.yml           # production deploy on push to main
│   └── test_build.yml       # PR sanity check
├── _jekyll_archive/         # old Jekyll site — DO NOT TOUCH
├── content/
│   └── cv.md                # Format F unified CV source (single source of truth)
├── dockerfiles/
│   ├── Dockerfile.website   # Node 20 image for Astro
│   └── Dockerfile.texlive   # minimal texlive for pdflatex
├── public/
│   ├── profile.jpg          # profile photo — must be added manually
│   └── resume.pdf           # compiled from resume/resume.tex
├── resume/
│   └── resume.tex           # LaTeX source — already exists, do not regenerate
├── scripts/
│   ├── parse_cv.mjs         # shared parser for Format F
│   ├── cv_to_ts.mjs         # Format F → src/data/cv.ts
│   └── cv_to_tex.mjs        # stub (copies resume.tex for now; see note in Step 4)
├── src/
│   ├── content/
│   │   └── Research/        # one .md per research project
│   │       ├── mlops-pipeline.md
│   │       ├── multispecifics-ode.md
│   │       ├── display-library.md
│   │       ├── peptide-pegylation.md
│   │       ├── biologics-minibinders.md
│   │       ├── nanobody-spike.md
│   │       ├── smc56-structure.md
│   │       ├── whole-cell-model.md
│   │       ├── local-density-potential.md
│   │       └── cg-protein-folding.md
│   ├── data/
│   │   └── cv.ts            # GENERATED — gitignored, do not edit directly
│   ├── pages/
│   │   ├── index.astro      # Home / About
│   │   ├── research.astro   # Research card grid
│   │   ├── cv.astro         # Web CV + PDF download
│   │   └── 404.astro
│   ├── content/
│   │   └── config.ts        # Astro content collection schema
│   └── settings.ts          # site-wide config
├── astro.config.mjs
├── build_local.sh           # local dev + build script
├── build_containers.sh      # Docker image builder
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Step 1 — Repo Setup

### 1.1 Archive old Jekyll content
Move all Jekyll-specific files into `_jekyll_archive/` to keep the root clean.
Do not delete — kept for reference.

```bash
mkdir -p _jekyll_archive
git mv _config.yml _data _drafts _includes _layouts _pages _sass \
       configs Gemfile index.md _jekyll_archive/ 2>/dev/null || true
# Also move old resume toolchain but NOT resume/resume.tex
git mv resume/content resume/jsonresume-theme-cortado _jekyll_archive/ 2>/dev/null || true
git commit -m "chore: archive Jekyll site into _jekyll_archive/"
```

### 1.2 Bootstrap astro_academia template
```bash
git clone --depth=1 https://github.com/maiobarbero/astro_academia.git /tmp/astro_academia
cp -r /tmp/astro_academia/src ./src
cp -r /tmp/astro_academia/public ./public
cp /tmp/astro_academia/astro.config.mjs \
   /tmp/astro_academia/package.json \
   /tmp/astro_academia/package-lock.json \
   /tmp/astro_academia/tailwind.config.mjs \
   /tmp/astro_academia/tsconfig.json \
   /tmp/astro_academia/.nvmrc .
npm install
git add -A && git commit -m "chore: bootstrap astro_academia template"
```

### 1.3 Verify blank template builds
```bash
npm run dev    # → http://localhost:4321  (template content, no errors)
npm run build  # → dist/ produced cleanly
```

### 1.4 Add generated files to .gitignore
Append to `.gitignore`:
```
src/data/cv.ts
dist/
.astro/
```

---

## Step 2 — Format F Specification

`content/cv.md` is the **single source of truth** for both the web CV page and the LaTeX PDF.

### Syntax rules
- **YAML front matter** (between `---` delimiters): personal metadata (name, email, etc.)
- **`## Section Name`**: opens a top-level CV section
- **`### Entry Title | Date Range`**: opens an entry within a section; ` | ` separates title from date
- **`### [web]`**: opens a **web-only block** — content below is included in the web CV but **stripped from LaTeX output**; closed by the next `##` or `###` heading
- Everything outside `### [web]` blocks: **shared** — goes to both outputs

### content/cv.md (full content — populate exactly as follows)

```markdown
---
name: Tanmoy Sanyal
label: "Scientist, Protein Design || Structural Biology"
email: tanmoy.7989@gmail.com
phone: "(805) 637-0375"
website: https://tanmoy7989.github.io
linkedin: https://linkedin.com/in/tanmoy-sanyal
github: https://github.com/tanmoy7989
location: San Francisco Bay Area, CA
scholar: https://scholar.google.com/citations?user=FILL_IN_YOUR_SCHOLAR_ID
---

## Education

### University of California Santa Barbara | 2013--2018
**Ph.D. Chemical Engineering**
Santa Barbara, CA, USA
Graduate emphasis in Computational Science & Engineering (High Performance Computing)

### Indian Institute of Technology Kharagpur | 2008--2013
**M.Tech & B.Tech (Hons.) Chemical Engineering, Integrated Dual Degree**
Kharagpur, WB, India

## Experience

### Amgen Inc. | Nov 2023--Present
**Principal Protein Design Scientist** (April 2024--Present)
**Senior Protein Design Scientist** (Oct 2023--March 2024)
South San Francisco, CA, USA

- Multispecifics design platform: Developed cloud-native parallelized ODE solvers for pharmacokinetic modeling of bispecific molecules. Deployed via ML regression achieving 50x speedup.
- Statistical mechanics of multispecific molecules: Translated superselectivity models from multivalent ligands to multispecifics; undergoing experimental validation on bispecific candidates.
- MLOps architect for protein design: Created Amgen's first cloud-native end-to-end MLOps pipeline for biophysical property prediction from protein sequences; adopted across 8+ antibody design projects.
- In-silico display library design: Linear-programming algorithms to optimize degenerate codon libraries using protein language models. Set internal record for fastest request-to-delivery (~3 days) for a 1M+ diverse antibody library.

### Novo Nordisk Research Center Seattle | 2022--2023
**Protein Design Scientist**
Seattle, WA, USA

- Peptide modifications for half-life extension: Developed a computational method for systematically scanning PEGylation sites on peptides. Published and open-sourced a benchmark study on GLP-1 analogs for anti-obesity therapeutics.

### University of California San Francisco | 2019--2022
**Postdoctoral Scholar** — Andrej Sali lab
San Francisco, CA, USA

- Biologics design: Designed mini-binders using Rosetta-ddg and RFDiffusion/ProteinMPNN/AlphaFold workflow. Active-learning pipeline with GP regression achieved 20x affinity improvement over 3 iterations.
- Scientific software development: Re-tooled AlphaFold-2 with AWS for ~100k sequence cloud-native structure prediction; routinely applied in variant design.
- Nanobody biophysics and vaccine design: Developed docking score for nanobody-SARS-CoV-2 Spike interactions using chemical crosslinking and escape mutation data; discovered resilient and vulnerable epitopes across variants of concern.
- Protein structure via chemical crosslinks: Developed graph sampling algorithms for domain boundary extraction from crosslinking data; published first coarse-grained structure of full SMC5/6 complex.
- Whole cell models: Bayesian networks combining continuum, particle, and network scale models of the pancreatic beta-cell into a proof-of-concept multimodal digital twin (Pancreatic Beta-Cell Consortium, UCSF/USC).

### University of California Santa Barbara | 2013--2018
**Graduate Research** — M. Scott Shell lab
Santa Barbara, CA, USA

- Coarse-graining for bulk liquids: Introduced the local density potential for accurate CG MD simulations of liquid-liquid phase separation.
- Coarse-graining for protein folding: Developed protein backbone models for template-free folding of 200+ residue CG domains and self-assembly in amyloidogenic peptides using variational inference.
- High Performance Computing: Administered 144-core Linux (Rocks 6.2) cluster; wrote utilities for automating resource sharing.

## Skills

### Protein Design
Rosetta, RFDiffusion + ProteinMPNN + AlphaFold, Protein Language Models (ESM2, Amplify)

### Molecular Modeling
openMM, LAMMPS, GROMACS, IMP, Modeller, UCSF ChimeraX, PyMOL

### ML / MLOps
PyTorch, PyTorch-Lightning, Tensorflow-probability, PyMC3, MLFlow, AWS Batch

### Programming Languages
Python (+Cython ~10k+ lines), Fortran-90 (~1k+ lines), C++ (~4k+ lines), Bash

### [web]
Effective GitHub Copilot pair programmer

## Open Source

### nnprotscan | 2024
Computational scanning of chemical modification sites in peptides

### nbspike | 2022
Integrative epitope prediction for SARS-CoV-2 nanobodies

### IMP-raindrops | 2021
Crosslink-guided domain discovery

### PDB-Dev deposition (SMC5/6) | 2021
First coarse-grained structure of the full SMC5/6 protein complex

### LAMMPS local density potential | 2016
Local density potential implementation for liquid-liquid phase separation simulations

## Volunteering

### Peer Review | 2019--Present
Structure, Journal of Physical Chemistry, Proteins: Structure Function and Bioinformatics, Review of Scientific Instruments, Rapid Reviews Covid-19, Life

## Publications

### Thomas et al. 2024
N. Thomas, **T. Sanyal**, P. Greisen Jr. & K. Diebler, Structure-Based Computational Scanning of Chemical Modification Sites in Biologics, *ACS Omega*, 9(34), 36787--36794.

### Mast et al. 2021
F.D. Mast, P.C. Fridy, N.E. Karen *et al.* (incl. **T. Sanyal**), Highly synergistic combinations of nanobodies that target SARS-CoV-2 and are resistant to escape, *eLife*, 10: e73027.

### Raveh et al. 2021
B. Raveh, L. Sun, K.L. White, **T. Sanyal** *et al.*, Bayesian metamodeling of complex biological systems across varying representations, *PNAS*, 118(35) e2104559118.

### Yu et al. 2021
Y. Yu, S. Li, Z. Ser, **T. Sanyal** *et al.*, Integrative analysis reveals unique structural and functional features of the Smc5/6 complex, *PNAS*, 118(19) e2026844118.

### Sanyal et al. 2019
**T. Sanyal**, J. Mittal and M.S. Shell, A hybrid, bottom-up, structurally-accurate, Go-like coarse-grained protein model, *J. Chem. Phys.*, 151(4): 044111.

### Sanyal & Shell 2016
**T. Sanyal** and M.S. Shell, Coarse-grained models using local-density potentials optimized with the relative entropy, *J. Chem. Phys.*, 145, 034109.

## Research Interests

### [web]
Multi-specific molecules, Nanobodies, Optimizing LLM inference pipelines,
Integrative structure modeling, Non-canonical amino acids,
Variational methods for Bayesian inference
```

---

## Step 3 — Glue Scripts

Install `gray-matter` for front matter parsing:
```bash
npm install gray-matter --save-dev
```

### 3.1 scripts/parse_cv.mjs

Shared parser returning `{ meta, sections }`.

```js
// scripts/parse_cv.mjs
import fs from 'fs';
import matter from 'gray-matter';

export function parseCv(filepath = 'content/cv.md') {
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data: meta, content } = matter(raw);

  const sections = [];
  // Split on ## headings
  const sectionChunks = content.split(/^## /m).filter(Boolean);

  for (const chunk of sectionChunks) {
    const lines = chunk.split('\n');
    const sectionName = lines[0].trim();
    const body = lines.slice(1).join('\n').trimStart();

    // Split section body on ### headings
    const entryChunks = body.split(/^### /m).filter(Boolean);
    const entries = [];

    for (const ec of entryChunks) {
      const eLines = ec.split('\n');
      const headingRaw = eLines[0].trim();
      const entryBody = eLines.slice(1).join('\n').trim();

      if (headingRaw === '[web]') {
        // Mark last entry (or section) as having a web-only appendage
        entries.push({ heading: '[web]', dateRange: '', body: entryBody, webOnly: true });
      } else {
        const sepIdx = headingRaw.lastIndexOf(' | ');
        const heading = sepIdx >= 0 ? headingRaw.slice(0, sepIdx).trim() : headingRaw;
        const dateRange = sepIdx >= 0 ? headingRaw.slice(sepIdx + 3).trim() : '';
        entries.push({ heading, dateRange, body: entryBody, webOnly: false });
      }
    }

    sections.push({ name: sectionName, entries });
  }

  return { meta, sections };
}
```

### 3.2 scripts/cv_to_ts.mjs

Maps Format F sections to the `cv.ts` TypeScript object that astro_academia's CV page consumes.
Web-only blocks are **included** in this output.

```js
// scripts/cv_to_ts.mjs
import fs from 'fs';
import { parseCv } from './parse_cv.mjs';

const { meta, sections } = parseCv();

// Helper: find section by name (case-insensitive)
const getSection = (name) =>
  sections.find((s) => s.name.toLowerCase() === name.toLowerCase());

// Build each cv field
const education = (getSection('Education')?.entries ?? [])
  .filter((e) => !e.webOnly)
  .map((e) => ({
    degree: e.heading,
    year: e.dateRange,
    description: e.body.trim(),
  }));

const experience = (getSection('Experience')?.entries ?? [])
  .filter((e) => !e.webOnly)
  .map((e) => ({
    title: e.heading,
    year: e.dateRange,
    description: e.body.trim(),
  }));

// Skills: each non-web entry is a category; body = comma-separated items
const skillEntries = (getSection('Skills')?.entries ?? []);
const skillsShared = skillEntries.filter((e) => !e.webOnly).map((e) => ({
  category: e.heading,
  items: e.body.split(',').map((s) => s.trim()).filter(Boolean),
}));
const skillsWebExtra = skillEntries
  .filter((e) => e.webOnly)
  .map((e) => e.body.trim())
  .join(' ');

const openSource = (getSection('Open Source')?.entries ?? [])
  .filter((e) => !e.webOnly)
  .map((e) => ({ name: e.heading, year: e.dateRange, description: e.body.trim() }));

const volunteering = (getSection('Volunteering')?.entries ?? [])
  .filter((e) => !e.webOnly)
  .map((e) => ({ role: e.heading, year: e.dateRange, description: e.body.trim() }));

const publications = (getSection('Publications')?.entries ?? [])
  .filter((e) => !e.webOnly)
  .map((e) => ({ key: e.heading, citation: e.body.trim() }));

const interests = (getSection('Research Interests')?.entries ?? [])
  .filter((e) => e.webOnly)
  .map((e) => e.body.trim())
  .join(' ');

const cv = {
  meta,
  education,
  experience,
  skills: skillsShared,
  skillsWebNote: skillsWebExtra,
  openSource,
  volunteering,
  publications,
  interests,
};

const output = `// AUTO-GENERATED by scripts/cv_to_ts.mjs — DO NOT EDIT
// Edit content/cv.md instead, then re-run: node scripts/cv_to_ts.mjs

export const cv = ${JSON.stringify(cv, null, 2)} as const;
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/cv.ts', output);
console.log('✓ src/data/cv.ts generated');
```

### 3.3 scripts/cv_to_tex.mjs

**For now**, this is a stub: it simply ensures `resume/resume.tex` exists and is up to date.
Full injection support (replace hardcoded content with `%%INJECT%%` placeholders) is a future task.

```js
// scripts/cv_to_tex.mjs
// Stub: validates that resume/resume.tex exists.
// Future work: replace hardcoded content with injected values from content/cv.md.
import fs from 'fs';

const tex = 'resume/resume.tex';
if (!fs.existsSync(tex)) {
  console.error(`✗ ${tex} not found. Did you run the LaTeX step?`);
  process.exit(1);
}
console.log(`✓ ${tex} present — LaTeX source ready`);
```

### 3.4 package.json hooks

Add `predev` and `prebuild` scripts so `cv.ts` is always regenerated before Astro runs:

```json
"scripts": {
  "predev": "node scripts/cv_to_ts.mjs",
  "prebuild": "node scripts/cv_to_ts.mjs",
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

---

## Step 4 — settings.ts

Replace the template's `src/settings.ts` entirely:

```ts
// src/settings.ts
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
    scholar: "FILL_IN_YOUR_GOOGLE_SCHOLAR_URL",
  },
  nav: [
    { label: "About",        href: "/" },
    { label: "Research",     href: "/research" },
    { label: "CV",           href: "/cv" },
    { label: "Publications", href: "FILL_IN_YOUR_GOOGLE_SCHOLAR_URL", external: true },
  ],
  resumePdf: "/resume.pdf",
};
```

**Manual step:** Add `public/profile.jpg` (your profile photo). The template may include a
placeholder — replace it.

---

## Step 5 — Home Page (index.astro)

Edit `src/pages/index.astro` to produce a two-column hero layout matching donovanr.github.io:

**Left column:** profile photo (`settings.profileImage`), centered.
**Right column:** name (`settings.authorName`), label (`settings.authorLabel`), bio (`settings.bio`), then a row of icon-link buttons for GitHub, LinkedIn, Scholar, and a CV download button.

Tailwind classes for the two-column layout:
```html
<div class="flex flex-col md:flex-row gap-10 items-center max-w-4xl mx-auto py-16 px-6">
  <!-- Left -->
  <div class="flex-shrink-0">
    <img src={settings.profileImage} alt={settings.authorName}
         class="rounded-full w-48 h-48 object-cover shadow-lg" />
  </div>
  <!-- Right -->
  <div class="flex flex-col gap-4">
    <h1 class="text-4xl font-bold">{settings.authorName}</h1>
    <p class="text-lg text-gray-500">{settings.authorLabel}</p>
    <p class="text-base leading-relaxed">{settings.bio}</p>
    <!-- Social links row -->
    ...
  </div>
</div>
```

Remove the template's blog/post preview section from the home page (we have a separate Research page).

---

## Step 6 — Research Collection

### 6.1 src/content/config.ts

```ts
import { defineCollection, z } from 'astro:content';

const Research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    tags: z.array(z.string()).optional().default([]),
    venue: z.string().optional(),
    paperUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { Research };
```

### 6.2 Research .md files

Create the following files in `src/content/Research/`.
Each file: YAML frontmatter + optional Markdown body for extended description.

**src/content/Research/mlops-pipeline.md**
```markdown
---
title: "Cloud-Native MLOps Pipeline for Protein Design"
description: "End-to-end MLOps pipeline for supervised biophysical property prediction from protein sequences. Adopted across 8+ antibody design projects at Amgen."
year: "2023"
tags: ["MLOps", "protein design", "AWS", "deep learning"]
venue: "Amgen Inc."
---
```

**src/content/Research/multispecifics-ode.md**
```markdown
---
title: "Pharmacokinetic Modeling of Bispecific Molecules"
description: "Cloud-native parallelized ODE solvers for bispecific molecule PK modeling, deployed via ML regression achieving 50x speedup over direct ODE integration."
year: "2024"
tags: ["multispecifics", "ODE", "pharmacokinetics", "ML"]
venue: "Amgen Inc."
---
```

**src/content/Research/display-library.md**
```markdown
---
title: "In-Silico Degenerate Codon Library Design"
description: "Linear-programming algorithms to optimize degenerate codon libraries using protein language models. Set internal record for fastest request-to-delivery (~3 days) for a 1M+ diverse antibody library."
year: "2024"
tags: ["combinatorial design", "protein language models", "antibody"]
venue: "Amgen Inc."
---
```

**src/content/Research/peptide-pegylation.md**
```markdown
---
title: "nnprotscan: PEGylation Site Scanning for Half-Life Extension"
description: "Computational method for systematically scanning chemical modification sites on peptides. Benchmark study on GLP-1 analogs for anti-obesity therapeutics."
year: "2024"
tags: ["peptide design", "non-canonical amino acids", "half-life", "open source"]
venue: "Novo Nordisk / ACS Omega 2024"
paperUrl: "https://pubs.acs.org/doi/10.1021/acsomega.4c04685"
codeUrl: "https://github.com/tanmoy7989/nnprotscan"
---
```

**src/content/Research/biologics-minibinders.md**
```markdown
---
title: "Mini-Binder Design via Active Learning"
description: "Mini-binders for a rare disease target using Rosetta-ddg and RFDiffusion/ProteinMPNN/AlphaFold. Active-learning pipeline with Gaussian process regression achieved 20x affinity improvement over 3 iterations."
year: "2022"
tags: ["protein design", "RFDiffusion", "active learning", "Gaussian processes"]
venue: "Amgen Inc."
---
```

**src/content/Research/nanobody-spike.md**
```markdown
---
title: "nbspike: Integrative Epitope Mapping of SARS-CoV-2 Nanobodies"
description: "Docking score for nanobody–SARS-CoV-2 Spike interactions using chemical crosslinking and escape mutation data. Discovered vulnerable and resilient epitopes across variants of concern."
year: "2021"
tags: ["nanobody", "SARS-CoV-2", "epitope mapping", "crosslinking"]
venue: "UCSF Sali lab / eLife 2021"
paperUrl: "https://doi.org/10.7554/eLife.73027"
codeUrl: "https://github.com/salilab/nbspike"
---
```

**src/content/Research/smc56-structure.md**
```markdown
---
title: "IMP-raindrops: Crosslink-Guided Domain Discovery"
description: "Graph sampling algorithms for domain boundary extraction from chemical crosslinking data. Published the first coarse-grained structure of the full SMC5/6 complex."
year: "2021"
tags: ["integrative modeling", "crosslinking", "SMC complex", "IMP"]
venue: "UCSF Sali lab / PNAS 2021"
paperUrl: "https://doi.org/10.1073/pnas.2026844118"
---
```

**src/content/Research/whole-cell-model.md**
```markdown
---
title: "Multimodal Digital Twin of the Pancreatic Beta-Cell"
description: "Bayesian networks combining continuum, particle, and network-scale models of the pancreatic beta-cell. Software lead for the Pancreatic Beta-Cell Consortium (UCSF/USC)."
year: "2021"
tags: ["whole-cell modeling", "Bayesian networks", "systems biology"]
venue: "UCSF Sali lab / PNAS 2021"
paperUrl: "https://doi.org/10.1073/pnas.2104559118"
---
```

**src/content/Research/local-density-potential.md**
```markdown
---
title: "Local Density Potential for Liquid-Liquid Phase Separation"
description: "Introduced the local density potential for structurally and thermodynamically accurate CG MD simulations of liquid-liquid phase separation."
year: "2016"
tags: ["coarse-graining", "molecular dynamics", "LAMMPS", "phase separation"]
venue: "UCSB Shell lab / J. Chem. Phys. 2016"
paperUrl: "https://doi.org/10.1063/1.4959965"
codeUrl: "https://github.com/tanmoy7989/lammps_local_density"
---
```

**src/content/Research/cg-protein-folding.md**
```markdown
---
title: "Coarse-Grained Protein Folding via Variational Inference"
description: "Protein backbone models for template-free folding of 200+ residue CG protein domains and self-assembly in amyloidogenic peptides using variational inference techniques."
year: "2019"
tags: ["coarse-graining", "protein folding", "variational inference", "amyloids"]
venue: "UCSB Shell lab / J. Chem. Phys. 2019"
paperUrl: "https://doi.org/10.1063/1.5044542"
---
```

### 6.3 src/pages/research.astro

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';  // use template's existing Layout
import { settings } from '../settings';

const items = (await getCollection('Research'))
  .sort((a, b) => parseInt(b.data.year) - parseInt(a.data.year));
---

<Layout title={`Research — ${settings.siteTitle}`}>
  <section class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold mb-8">Research</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-lg font-semibold leading-snug">{item.data.title}</h2>
            <span class="text-sm text-gray-400 ml-3 flex-shrink-0">{item.data.year}</span>
          </div>
          {item.data.venue && (
            <p class="text-sm text-gray-500 mb-2 italic">{item.data.venue}</p>
          )}
          <p class="text-sm text-gray-700 leading-relaxed mb-3">{item.data.description}</p>
          <div class="flex gap-3 flex-wrap">
            {item.data.tags?.map((tag) => (
              <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
          <div class="flex gap-4 mt-3">
            {item.data.paperUrl && (
              <a href={item.data.paperUrl} target="_blank"
                 class="text-xs text-blue-600 hover:underline">Paper →</a>
            )}
            {item.data.codeUrl && (
              <a href={item.data.codeUrl} target="_blank"
                 class="text-xs text-blue-600 hover:underline">Code →</a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
</Layout>
```

---

## Step 7 — CV Page (cv.astro)

Edit `src/pages/cv.astro` to render `src/data/cv.ts` content.

Key requirements:
- Import `{ cv }` from `'../data/cv'`
- Import `{ settings }` from `'../settings'`
- Render sections in this order: Education → Experience → Skills → Open Source → Volunteering → Publications
- Add a sticky or top-of-page **"Download PDF"** button linking to `settings.resumePdf`
- For Publications: render the list, then add a link to Google Scholar (`settings.socialLinks.scholar`)

Structure:
```astro
---
import { cv } from '../data/cv';
import { settings } from '../settings';
import Layout from '../layouts/Layout.astro';
---

<Layout title={`CV — ${settings.siteTitle}`}>
  <div class="max-w-3xl mx-auto px-6 py-12">

    <!-- PDF download button -->
    <div class="flex justify-end mb-8">
      <a href={settings.resumePdf} download
         class="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
        Download PDF
      </a>
    </div>

    <!-- Education -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Education</h2>
      {cv.education.map((e) => (
        <div class="mb-4">
          <div class="flex justify-between">
            <strong>{e.degree}</strong>
            <span class="text-gray-500 text-sm">{e.year}</span>
          </div>
          <p class="text-sm text-gray-600 whitespace-pre-line">{e.description}</p>
        </div>
      ))}
    </section>

    <!-- Experience -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Experience</h2>
      {cv.experience.map((e) => (
        <div class="mb-6">
          <div class="flex justify-between">
            <strong>{e.title}</strong>
            <span class="text-gray-500 text-sm">{e.year}</span>
          </div>
          <p class="text-sm text-gray-600 whitespace-pre-line mt-1">{e.description}</p>
        </div>
      ))}
    </section>

    <!-- Skills -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Skills</h2>
      {cv.skills.map((s) => (
        <div class="mb-2">
          <span class="font-semibold">{s.category}: </span>
          <span class="text-gray-700">{s.items.join(', ')}</span>
        </div>
      ))}
    </section>

    <!-- Open Source -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Open Source</h2>
      {cv.openSource.map((o) => (
        <div class="mb-3">
          <div class="flex justify-between">
            <strong>{o.name}</strong>
            <span class="text-gray-500 text-sm">{o.year}</span>
          </div>
          <p class="text-sm text-gray-600">{o.description}</p>
        </div>
      ))}
    </section>

    <!-- Volunteering -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Volunteering</h2>
      {cv.volunteering.map((v) => (
        <div class="mb-3">
          <div class="flex justify-between">
            <strong>{v.role}</strong>
            <span class="text-gray-500 text-sm">{v.year}</span>
          </div>
          <p class="text-sm text-gray-600">{v.description}</p>
        </div>
      ))}
    </section>

    <!-- Publications -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold border-b pb-2 mb-4">Selected Publications</h2>
      <ul class="list-none space-y-3">
        {cv.publications.map((p) => (
          <li class="text-sm text-gray-700" set:html={p.citation} />
        ))}
      </ul>
      <p class="mt-4 text-sm">
        Full list on
        <a href={settings.socialLinks.scholar} target="_blank"
           class="text-blue-600 hover:underline">Google Scholar →</a>
      </p>
    </section>

  </div>
</Layout>
```

---

## Step 8 — Build Workflow

### 8.1 Dockerfiles

**dockerfiles/Dockerfile.website**
```dockerfile
FROM node:20-alpine
WORKDIR /home
COPY package*.json ./
RUN npm ci
EXPOSE 4321
```

**dockerfiles/Dockerfile.texlive**
```dockerfile
FROM texlive/texlive:latest-small
RUN tlmgr update --self && \
    tlmgr install lato fontawesome5 paracol eso-pic \
                  microtype enumitem ifthen xcolor
```

### 8.2 build_local.sh

Replace existing file entirely:

```bash
#!/bin/bash
# build_local.sh
# Usage: ./build_local.sh [--mode local|deploy] [--skip-resume] [--skip-site]
set -e

MODE="local"
SKIP_RESUME=false
SKIP_SITE=false

for arg in "$@"; do
  case $arg in
    --mode=*) MODE="${arg#*=}" ;;
    --skip-resume) SKIP_RESUME=true ;;
    --skip-site)   SKIP_SITE=true ;;
  esac
done

REGISTRY=ghcr.io/tanmoy7989/tanmoy7989.github.io
DOCKER_TEXLIVE=$REGISTRY/tsanyal-texlive:latest

# Pull texlive image if missing
if [ "$SKIP_RESUME" = false ]; then
  if [ -z "$(docker images -q $DOCKER_TEXLIVE 2>/dev/null)" ]; then
    docker pull $DOCKER_TEXLIVE
  fi

  echo "→ Compiling LaTeX resume..."
  docker run --rm \
    -v "$(pwd)/resume":/workdir \
    -w /workdir \
    $DOCKER_TEXLIVE \
    sh -c "pdflatex -interaction=nonstopmode resume.tex && \
           pdflatex -interaction=nonstopmode resume.tex"
  cp resume/resume.pdf public/resume.pdf
  echo "✓ public/resume.pdf updated"
fi

echo "→ Generating src/data/cv.ts..."
node scripts/cv_to_ts.mjs

if [ "$SKIP_SITE" = false ]; then
  if [ "$MODE" = "local" ]; then
    echo "→ Starting Astro dev server..."
    npm run dev
  else
    echo "→ Building for deploy..."
    SITE_URL="https://tanmoy7989.github.io" npm run build
    echo "✓ dist/ ready for deployment"
  fi
fi
```

### 8.3 build_containers.sh

Replace existing file:

```bash
#!/bin/bash
# build_containers.sh — rebuild and push Docker images
set -e

REGISTRY=ghcr.io/tanmoy7989/tanmoy7989.github.io

echo "→ Building website image..."
docker build -f dockerfiles/Dockerfile.website \
  -t $REGISTRY/tsanyal-website:latest .

echo "→ Building texlive image..."
docker build -f dockerfiles/Dockerfile.texlive \
  -t $REGISTRY/tsanyal-texlive:latest .

echo "→ Pushing images..."
docker push $REGISTRY/tsanyal-website:latest
docker push $REGISTRY/tsanyal-texlive:latest

echo "✓ Done"
```

### 8.4 astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.SITE_URL || 'https://tanmoy7989.github.io',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
});
```

---

## Step 9 — GitHub Actions

### .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Compile LaTeX resume
        uses: xu-cheng/latex-action@v3
        with:
          working_directory: resume
          root_file: resume.tex
          compiler: pdflatex
          args: -interaction=nonstopmode -halt-on-error
          post_compile: "pdflatex -interaction=nonstopmode resume.tex"

      - name: Copy resume.pdf to public/
        run: cp resume/resume.pdf public/resume.pdf

      - name: Setup Node 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Generate cv.ts
        run: node scripts/cv_to_ts.mjs

      - name: Build Astro site
        run: npm run build
        env:
          SITE_URL: https://tanmoy7989.github.io

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### .github/workflows/test_build.yml

```yaml
name: Test Build (PRs)

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - name: Generate cv.ts (skip LaTeX for speed)
        run: node scripts/cv_to_ts.mjs
      - name: Build
        run: npm run build
        env:
          SITE_URL: https://tanmoy7989.github.io
```

---

## Step 10 — GitHub Pages Settings

In the repo **Settings → Pages**:
- **Source:** GitHub Actions *(not "Deploy from a branch")*

This is required for `deploy.yml` to work.

---

## Execution Order for Cursor

Execute steps in this order. Verify each before proceeding.

1. **Step 1** — Archive Jekyll files; bootstrap Astro template; `npm run dev` shows template.
2. **Step 2** — Create `content/cv.md` with full content.
3. **Step 3** — Write `scripts/parse_cv.mjs`, `cv_to_ts.mjs`, `cv_to_tex.mjs`; add `package.json` hooks; verify `node scripts/cv_to_ts.mjs` produces `src/data/cv.ts`.
4. **Step 4** — Update `src/settings.ts`; add `public/profile.jpg`.
5. **Step 5** — Edit `src/pages/index.astro` (two-column hero).
6. **Step 6** — Create `src/content/config.ts`; create all 10 research `.md` files; create `src/pages/research.astro`.
7. **Step 7** — Edit `src/pages/cv.astro` with PDF download button.
8. **Step 8** — Update `build_local.sh`, `build_containers.sh`, `astro.config.mjs`, Dockerfiles.
9. **Step 9** — Update `.github/workflows/deploy.yml` and `test_build.yml`.
10. **Step 10** — Set GitHub Pages source to GitHub Actions in repo settings.
11. **Final** — Run `./build_local.sh --mode local`; verify at `http://localhost:4321`.
12. **Deploy** — `git push origin main`; verify GitHub Actions completes and site is live.

---

## Constraints and Notes for Cursor

- **Do not modify** anything inside `_jekyll_archive/`.
- **Do not edit** `src/data/cv.ts` directly — it is generated. Edit `content/cv.md` instead.
- **Do not regenerate** `resume/resume.tex` — it already exists and is complete.
- The visual target is **donovanr.github.io**: two-column hero on Home, card grid on Research, clean structured CV with PDF download.
- Keep `tailwind.config.mjs` and astro_academia's existing Tailwind theme tokens; only customize layout and content.
- When the astro_academia template has a `BlogPosts` collection that conflicts with the `Research` collection, remove or ignore `BlogPosts` — it is not needed.
- `public/profile.jpg` must be added manually by the user; leave a `TODO` comment if it is missing.
- The Google Scholar URL in `settings.ts` and `content/cv.md` contains a `FILL_IN_YOUR_GOOGLE_SCHOLAR_URL` placeholder — leave as-is for Cursor to flag to the user.
