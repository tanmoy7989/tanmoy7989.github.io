// Web CV source — copied to src/data/cv.ts at build time.
// Edit this file for the website CV. Edit resume.tex for the PDF.

export const education = [
  {
    school: 'University of California Santa Barbara',
    time: '2013 - 2018',
    degree: 'Ph.D. Chemical Engineering',
    location: 'Santa Barbara, CA, USA',
    description: 'Graduate emphasis in High Performance Computing',
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
    title: 'Principal Scientist',
    location: 'South San Francisco, CA, USA',
    description:
      'Avidity models for multispecific antibodies, Data efficient ML for protein property predition, Neural ODE models for systems biology.'
  },

  {
    company: 'Amgen Inc.',
    time: 'Oct 2023 - March 2024',
    title: 'Senior Scientist',
    location: 'South San Francisco, CA, USA',
    description: 'In-silico degenerate codon library optimization using protein language models, FAIR-ready MLOps framework for protein property prediction.',
  },
  {
    company: 'Novo Nordisk Research Center Seattle',
    time: '2022 - 2023',
    title: 'Protein Design Scientist',
    location: 'Seattle, WA, USA',
    description:
      'Computational scanning of PEG-ylation sites on peptides for half-life extension; biologics design using physics- and ML-based toolchains, and active learning.',
  },
  {
    company: 'University of California San Francisco',
    time: '2019 - 2022',
    title: 'Postdoctoral Scholar — Sali lab',
    location: 'San Francisco, CA, USA',
    description:
      'Integrative protein structure determination using chemical cross-links; Multimodal whole-cell models of pancreatic beta cells; biophysics of nanobody epitopes on pathogenic targets.',
  },
  {
    company: 'University of California Santa Barbara',
    time: '2013 - 2018',
    title: 'Graduate Research — Shell lab',
    location: 'Santa Barbara, CA, USA',
    description:
      'Variational inference algorthims for molecular mechanics models of liquid-liquid phase separation and protein folding.',
  },
];

export const publications = [];

export const skills = [
  {
    title: 'Computational Chemistry & Biology',
    description: 'Atomistic and coarse-grained MD simulations, peptide and antibody binder design, Bayesian inference for data-driven structure determination of macromolecular complexes, effective generertion of in-silico insights from wet-lab experiments.'
  },
  
  {
    title: 'AI/ML',
    description: 'Data efficient ML models and FAIR-ready MLOps for protein property prediction, sampling from protein language models, Neural ODE models for systems biology.'
  },

  {
    title: 'ML and Molecular Modeling Tech stack',
    description: 'Scikit-learn, PyTorch, Lightning, TensorFlow-Probability, PyMC3, MLFlow, Hydra, Dask, Lux (Julia), Flux (Julia), OpenMM, LAMMPS, GROMACS, IMP'
  }

];
