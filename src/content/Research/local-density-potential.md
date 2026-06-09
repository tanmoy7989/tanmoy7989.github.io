---
title: "Local Density Potentials for Liquid-Liquid Phase Separation"
description: "Introduced the local density potential for structurally and thermodynamically accurate coarse-grained MD simulations of liquid-liquid phase separation."
year: "2016"
tags: ["coarse-graining", "molecular dynamics", "LAMMPS", "phase separation"]
venue: "Shell lab, UCSB"
img: "/images/research/localdensity.png"
---

Developed computationally efficient many-body potentials for improving solvent models in implicit-solvent systems using variational inference techniques. Benchmarked on folding of alkanes and liquid–liquid phase separation in coarse-grained aqueous solutions of small hydrophobes (benzene and methanol).

Depending only on the mean-field local density around solute particles, these potentials significantly improved predictions of pair structure and clustering behavior across widely varying mixture compositions — among the few structurally accurate molecular models of liquid–liquid phase separation in the chemical engineering literature.

- [First paper](https://aip.scitation.org/doi/abs/10.1063/1.4958629) introducing the local density potential
- [Second paper](https://pubs.acs.org/doi/abs/10.1021/acs.jpcb.7b12446) on benzene–water phase behavior
- Submitted as a [`pair style`](https://docs.lammps.org/pair_local_density.html) to LAMMPS
