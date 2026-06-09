---
title: "Multimodal Digital Twin of the Pancreatic Beta-Cell"
description: "Bayesian networks combining continuum, particle, and network-scale models of the pancreatic beta-cell. Software lead for the Pancreatic Beta-Cell Consortium (UCSF/USC)."
year: "2021"
tags: ["whole-cell modeling", "Bayesian networks", "systems biology"]
venue: "Sali lab, UCSF"
paperUrl: "https://doi.org/10.1073/pnas.2104559118"
img: "/images/research/metamodeling.png"
---

Developed directed graphical models for integrating models of the pancreatic beta cell at different length scales under a common statistical framework. Component sub-models included pharmacokinetic models of glucose–insulin dynamics, simplified Brownian diffusion models of molecular interaction between glucose and insulin vesicles, and ODE-based network models describing enzyme kinetics from glucose entry to Ca²⁺-mediated insulin vesicle exocytosis.

Built Bayes nets in PyMC3 and designed a lightweight API to automatically combine models into an overarching whole-cell model that can query arbitrary variable relationships — for example, how insulin vesicle translocation speed (a microscopic property) changes in response to glucose intake (a macroscopic property).

We named the approach "Bayesian metamodeling" and published a proof-of-concept [paper](https://www.pnas.org/doi/10.1073/pnas.2104559118) as part of the [Pancreatic Beta Cell Consortium](https://dornsife.usc.edu/bridge-institute/pancreatic-beta-cell-consortium/). A [tutorial](https://github.com/tanmoy7989/bayesian_metamodeling_tutorial) is available in PyMC3.
