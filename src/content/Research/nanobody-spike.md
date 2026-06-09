---
title: "nbspike: Integrative Epitope Mapping of SARS-CoV-2 Nanobodies"
description: "Docking score for nanobody–SARS-CoV-2 Spike interactions using chemical crosslinkS and escape mutation data. Discovered vulnerable and resilient epitopes across variants of concern."
year: "2021"
tags: ["nanobody", "SARS-CoV-2", "epitope mapping", "crosslinking"]
venue: "Sali lab, UCSF"
img: "/images/research/nb_epitope.png"
---

Developed integrative protein–protein docking score to characterize the epitopes of nanobodies on the Receptor Binding Domain (RBD) of the SARS-CoV-2 spike protein. This was part of a diverse study of nanobodies as drug candidates against COVID-19, in collaboration with labs within the [National Center for Dynamic Interactome Research](https://www.ncdir.org/) (NCDIR).

Unlike traditional docking methods in PatchDock or Rosetta, this study unified chemical crosslinking and escape mutation data to pinpoint nanobody binding modes on the RBD. We built integrative rigid-body docking restraints within [IMP](https://integrativemodeling.org/) that predict coarse-grained nanobody binding modes and epitope shapes while reporting prediction uncertainties.

The structural models helped validate pairwise synergy between nanobodies on the RBD and stratified a repertoire of 20+ nanobodies into groups by their most probable target areas on the RBD surface.

Subsequently, we extended the epitope characterization to variants of concern and painted a vulnerability landscape of Spike RBD regions to nanobody therapies.

- [First paper](https://elifesciences.org/articles/73027) - Anti-SARS-CoV-2 nanobody repertoire published in *eLife*
- [Second paper](https://elifesciences.org/articles/89423) - Extended characterization of variants of concern published in *eLife*
- Modeling scripts available at [nbspike](https://github.com/salilab/nbspike)
