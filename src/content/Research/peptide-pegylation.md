---
title: "nnprotscan: PEGylation Site Scanning for Half-Life Extension"
description: "Computational method for systematically scanning chemical modification sites on peptides. Benchmark study on GLP-1 analogs for anti-obesity therapeutics."
year: "2024"
tags: ["peptide design", "non-canonical amino acids", "half-life", "open source"]
venue: "Novo Nordisk / ACS Omega 2024"
paperUrl: "https://pubs.acs.org/doi/10.1021/acsomega.4c04685"
codeUrl: "https://github.com/tanmoy7989/nnprotscan"
img: "/images/research/protractor_scan_protocol.jpeg"
---

While fatty acid and related biopolymers have been conjugated with peptides for half-life extension through albumin binding for almost a decade, there are surprisingly few systematic methods for designing the chemistry or acylation location of such biopolymers on drug molecules.

At Novo Nordisk Research Center Seattle, I developed a high-throughput computational workflow for screening biopolymers and optimizing their attachment location on peptide scaffolds to minimize undesirable interactions with the peptide or target receptor. The problem maps directly into modifying peptide scaffolds with non-canonical amino acids that possess long-chain fatty acid sidechain groups — applicable to designing non-canonical modifications to biologics beyond peptides.

The approach was benchmarked on GLP-1 analogs for anti-obesity therapeutics and open-sourced as [nnprotscan](https://github.com/tanmoy7989/nnprotscan).
