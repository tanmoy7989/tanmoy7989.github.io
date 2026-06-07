---
title: "nbspike: Integrative Epitope Mapping of SARS-CoV-2 Nanobodies"
description: "Docking score for nanobody–SARS-CoV-2 Spike interactions using chemical crosslinking and escape mutation data. Discovered vulnerable and resilient epitopes across variants of concern."
year: "2021"
tags: ["nanobody", "SARS-CoV-2", "epitope mapping", "crosslinking"]
venue: "UCSF Sali lab / eLife 2021"
paperUrl: "https://doi.org/10.7554/eLife.73027"
codeUrl: "https://github.com/salilab/nbspike"
img: "/images/research/nb_epitope.png"
---

Developed integrative protein–protein docking approaches to characterize the epitopes of nanobodies on the Receptor Binding Domain (RBD) of the SARS-CoV-2 spike protein. This was part of a diverse study of nanobodies as drug candidates against COVID-19, in collaboration with labs within the [National Center for Dynamic Interactome Research](https://www.ncdir.org/) (NCDIR).

Unlike traditional docking methods in PatchDock or Rosetta, this study unified chemical crosslinking and escape mutation data to pinpoint nanobody binding modes on the RBD. We built integrative rigid-body docking restraints within [IMP](https://integrativemodeling.org/) that predict coarse-grained nanobody binding modes and epitope shapes while reporting prediction uncertainties.

The structural models helped validate pairwise synergy between nanobodies on the RBD and stratified a repertoire of 20+ nanobodies into groups by their most probable target areas on the RBD surface.

- Tour de force [paper](https://elifesciences.org/articles/73027) on the anti-SARS-CoV-2 nanobody repertoire published in *eLife*
- Modeling scripts available at [nbspike](https://github.com/salilab/nbspike)
