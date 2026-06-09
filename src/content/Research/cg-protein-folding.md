---
title: "Coarse-Grained Protein Folding via Variational Inference"
description: "Protein backbone models for template-free folding of 200+ residue CG protein domains and self-assembly in amyloidogenic peptides using variational inference techniques."
year: "2019"
tags: ["coarse-graining", "protein folding", "variational inference", "amyloids"]
venue: "Shell lab, UCSB"
img: "/images/research/protein_model.png"
---

Developed simplistic coarse-grained models of hydrophilic and hydrophobic poly-amino acids which can be intelligently combined to produce remarkably accurate backbone models for folding short peptide fragments as well as globular protein domains. This was a proof of principle for protein backbone models designed from amino-acid polymers using only native-contact-based sidechain interactions, successfully folding 200+ residue proteins.

- [Paper](https://aip.scitation.org/doi/10.1063/1.5108761) published in *J. Chem. Phys.* — later selected as an editor's pick among the 88 most influential articles of 2019
- [GitHub repository](https://github.com/tanmoy7989/protein_model) (partially documented)
- Coarse-grained backbone forcefield parameters in [LAMMPS format](../assets/others/go_model_ff.tar) (archived in Jekyll site)

This work also produced a [post-processing utility](https://docs.lammps.org/Tools.html#replica) that re-orders LAMMPS replica-exchange trajectories by temperature.
