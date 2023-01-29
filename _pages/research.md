---
layout: single
author_profile: true
header:
    overlay_image: assets/images/banner.png
    overlay_filter: linear-gradient(rgba(0, 0, 0, 1), rgba(255, 255, 255, 0))
title: "Research"
permalink: /research/
---

## Coarse grained backbone forcefields for template free protein folding
<img align="left" style="width:100%; margin:5px" src="../assets/images/protein_model.png">
Developed simplistic coarse-grained models of hydrophilic and hydrophobic poly-amino acids which can be intelligently combined to produce remarkably accurate backbone models for folding short peptide fragments as well as globular protein domains. This work was a proof of principle for protein backbone models designed from amino-acid polymers, and using only native contact based sidechain interactions. Demonstrated the potential to successfully fold 200+ residue proteins. Possible future directions include combining reduced alphabet and full alphabet sidechain interactions with aforementioned backbone forcefields to produce sequence chemistry dependent protein models.

- [Paper](https://aip.scitation.org/doi/10.1063/1.5108761) published in Journal of Chemical Physics (JCP). This was later selected as an editor's pick and made it to the list of 88 most influential articles of 2019 in JCP.

- A bare bones [github repository](https://github.com/tanmoy7989/protein_model) for this project has been set up but not fully documented yet. Note that a substantial part of the code uses the `sim` package written in Python-2.7. A copy of `sim` can be obtained through personal request to [M. Scott Shell](https://chemengr.ucsb.edu/people/m-scott-shell) at University of California Santa Barbara.

Coarse grained backbone forcefield paramters in a LAMMPS format input file can be found [here](../assets/others/go_model_ff.tar).

This work also involved the creation of a [post-processing utility](https://docs.lammps.org/Tools.html#replica) that re-orders LAMMPS replica exchange trajectories (generated using `fix/temper`) by temperature.




<br><br><br>

## Coarse-grained molecular models of fluid phase equilibria
<img align="right" style="width:60%; margin:5px" src="../assets/images/localdensity.png">
Developed computationally efficient manybody potentials for improving solvent models in implicit solvent systems using variational inference techniques. Benchmarked the method on folding of alkanes and liquid-liquid phase separation in coarse-grained binary solutions of small hydrophobes (such as benzene or methanol in water). Depending only on the mean-field local density around solute particles, such potentials signficantly improved predictions of pair structure and clustering behavior of either component across widely varying mixture compositions. This work constitutes one of the very few structurally accurate molecular models of liquid-liquid phase separation in the chemical engineering literature.

- Our [first paper](https://aip.scitation.org/doi/abs/10.1063/1.4958629) introduced the mathematical and computational details of the local density potential.
- Our [second paper](https://pubs.acs.org/doi/abs/10.1021/acs.jpcb.7b12446) applied the method to develop thermodynamically robust models of phase behavior in benzene-water mixtures.
- We also co-wrote a [paper](https://pubs.acs.org/doi/abs/10.1021/acs.jctc.8b01170) with [van der Vegt group](https://www.cpc.tu-darmstadt.de/research_cpc/topics_cpc/index.en.jsp) at TU Darmstadt to investigate the applicability of the local density approach to structurally inhomogeneous mixtures of methanol in water.

The local density potential was submitted as a [`pair style`](https://docs.lammps.org/pair_local_density.html) to the molecular simulation software LAMMPS.