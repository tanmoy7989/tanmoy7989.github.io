// Web CV source — copied to src/data/cv.ts at build time.
// Edit this file for the website CV. Edit resume.tex for the PDF.

export const education = [
  {
    school: 'University of California Santa Barbara',
    time: '2013 - 2018',
    degree: 'Ph.D. Chemical Engineering',
    location: 'Santa Barbara, CA, USA',
    description: 'Graduate emphasis in Computational Science & Engineering (High Performance Computing)',
  },
  {
    school: 'Indian Institute of Technology Kharagpur',
    time: '2008 - 2013',
    degree: 'M.Tech & B.Tech (Hons.) Chemical Engineering, Integrated Dual Degree',
    location: 'Kharagpur, WB, India',
    description: '',
  },
];

export const experiences = [
  {
    company: 'Amgen Inc.',
    time: 'April 2024 - present',
    title: 'Principal Protein Design Scientist',
    location: 'South San Francisco, CA, USA',
    description:
      'Multispecific pharmacokinetic modeling, MLOps pipelines for biophysical property prediction, and in-silico display library design.',
  },
  {
    company: 'Amgen Inc.',
    time: 'Oct 2023 - March 2024',
    title: 'Senior Protein Design Scientist',
    location: 'South San Francisco, CA, USA',
    description: 'Combinatorial protein library design for multispecific antibody engineering.',
  },
  {
    company: 'Novo Nordisk Research Center Seattle',
    time: '2022 - 2023',
    title: 'Protein Design Scientist',
    location: 'Seattle, WA, USA',
    description:
      'Computational PEGylation scanning for peptide half-life extension; biologics design with structure prediction and active learning.',
  },
  {
    company: 'University of California San Francisco',
    time: '2019 - 2022',
    title: 'Postdoctoral Scholar — Andrej Sali lab',
    location: 'San Francisco, CA, USA',
    description:
      'Nanobody–spike biophysics, crosslink-guided integrative modeling, and multimodal whole-cell models of pancreatic beta cells.',
  },
  {
    company: 'University of California Santa Barbara',
    time: '2013 - 2018',
    title: 'Graduate Research — M. Scott Shell lab',
    location: 'Santa Barbara, CA, USA',
    description:
      'Coarse-grained MD for phase separation and protein folding; HPC cluster administration.',
  },
];

export const publications = [];

export const skills = [
  {
    title: 'Protein Design',
    description: 'Rosetta, RFDiffusion + ProteinMPNN + AlphaFold, Protein Language Models (ESM2, Amplify)',
  },
  {
    title: 'Molecular Modeling',
    description: 'openMM, LAMMPS, GROMACS, IMP, Modeller, UCSF ChimeraX, PyMOL',
  },
  {
    title: 'ML / MLOps',
    description: 'PyTorch, PyTorch-Lightning, Tensorflow-probability, PyMC3, MLFlow, AWS Batch',
  },
  {
    title: 'Programming Languages',
    description: 'Python (+Cython ~10k+ lines), Fortran-90 (~1k+ lines), C++ (~4k+ lines), Bash',
  },
];
