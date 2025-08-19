---
title: "Sources"
---

## Media Sources

- **Caldor Fire Progression GIF** – *Source unknown* <!-- (Remove or verify before final publishing) -->
- [Palisades True Fire Perimeter](https://hub-calfire-forestry.hub.arcgis.com/datasets/wfigs-2025-wildfire-perimeters/explore?location=34.050903%2C-118.575550%2C11.57) – CAL FIRE WFIG 2025 Wildfire Perimeter

## Data Sources

We use the following data sources for our project:

- FCN_ERA5_DATA_V0
	- This is the FourCastNet ERA5 data from their Globus instance. We use GlobusConnect to download this.
	- ERA5 data for FourCastNet [ Hersbach, H. et al., (2018) ] was originally downloaded from the Copernicus Climate Change Service (C3S) Climate Data Store, an open, free and unrestricted dataset.
	- https://app.globus.org/file-manager?origin_id=945b3c9e-0f8c-11ed-8daf-9f359c660fbd&origin_path=%2F~%2Fdata%2F
- MERRA2 Datasets
	- Publicly available MERRA-2 datasets from NASA.
	- These are open for public research use.
	- https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/
- WPS_GEOG
	- This is some data from OPENWFM (the organization responsible for WRFXPY and WRFXWeb) for WRFX related tasks.
	- https://demo.openwfm.org/web/wrfx/WPS_GEOG.tbz
- WFGIS_PERIMS
	- These are the CAL FIE eGIS perimeters.
	- The National Interagency Fire Center shall not be held liable for improper or incorrect use of the data described and/or contained herein. These data and related graphics (i.e. GIF or JPG format files) are not legal documents and are not intended to be used as such. The information contained in these data is dynamic and may change over time. The data are not better than the original sources from which they were derived. It is the responsibility of the data user to use the data appropriately and consistent within the limitations of geospatial data in general and these data in particular. The National Fire Center gives no warranty, expressed or implied, as to the accuracy, reliability, or completeness of these data. No warranty expressed or implied is made regarding the utility of the data on other systems for general or scientific purposes, nor shall the act of distribution constitute any such warranty. This disclaimer applies both to individual use of the data and aggregate use with other data.
	- https://hub-calfire-forestry.hub.arcgis.com/datasets/wfigs-2025-wildfire-perimeters/explore


## Repository Link

- [Our Complete GitHub Project](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25)

## Tools / Components

- [**FourCastNet**](https://github.com/NVlabs/FourCastNet) - Machine learning model for weather forecasting (licensed under BSD-3-Clause)
- [**WRFxpy**](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wrfxpy) – Python interface for processing WRF output (licensed under MIT License)
- [**WRFxweb**](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wrfxweb) – Our fork of the web-based visualization platform for WRF data (no license specified)
- [**SLURM**](https://slurm.schedmd.com/) - Job scheduling system for Linux clusters (used by ORCA and licensed under GNU GPL)
- **Hugo** – Static site generator for creating documentation
