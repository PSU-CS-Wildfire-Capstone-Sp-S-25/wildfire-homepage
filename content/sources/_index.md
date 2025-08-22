---
title: "Sources"
---


---


## Media Sources

- **Caldor Fire Progression GIF** – *Source unknown* <!-- (Remove or verify before final publishing) -->
- [CAL FIRE WFIG 2025 Wildfire Perimeter: Palisades True Fire Perimeter](https://hub-calfire-forestry.hub.arcgis.com/datasets/wfigs-2025-wildfire-perimeters/explore?location=34.050903%2C-118.575550%2C11.57)

---



## Data Sources

We use the following data sources for our project:

- **FCN_ERA5_DATA_V0**  
	FourCastNet ERA5 data from their Globus instance. [ERA5 data for FourCastNet (Hersbach, H. et al., 2018)](https://app.globus.org/file-manager?origin_id=945b3c9e-0f8c-11ed-8daf-9f359c660fbd&origin_path=%2F~%2Fdata%2F) was originally downloaded from the Copernicus Climate Change Service (C3S) Climate Data Store, an open, free and unrestricted dataset.

- **MERRA2 Datasets**  
	Publicly available [MERRA-2 datasets from NASA](https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/). These are open for public research use.

- **WPS_GEOG**  
	Data from OPENWFM (the organization responsible for WRFXPY and WRFXWeb) for WRFX related tasks. [Download WPS_GEOG.tbz](https://demo.openwfm.org/web/wrfx/WPS_GEOG.tbz)

- **WFGIS_PERIMS**  
	[CAL FIRE eGIS perimeters](https://hub-calfire-forestry.hub.arcgis.com/datasets/wfigs-2025-wildfire-perimeters/explore). The National Interagency Fire Center shall not be held liable for improper or incorrect use of the data described and/or contained herein. These data and related graphics (i.e. GIF or JPG format files) are not legal documents and are not intended to be used as such. The information contained in these data is dynamic and may change over time. The data are not better than the original sources from which they were derived. It is the responsibility of the data user to use the data appropriately and consistent within the limitations of geospatial data in general and these data in particular. The National Fire Center gives no warranty, expressed or implied, as to the accuracy, reliability, or completeness of these data. No warranty expressed or implied is made regarding the utility of the data on other systems for general or scientific purposes, nor shall the act of distribution constitute any such warranty. This disclaimer applies both to individual use of the data and aggregate use with other data.



---


## Repository Link

- [Our Complete GitHub Project](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25)


---


## Tools & Components

- [**FourCastNet**](https://github.com/NVlabs/FourCastNet) — Machine learning model for weather forecasting *(BSD-3-Clause)*
- [**WRFxpy**](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wrfxpy) — Python interface for processing WRF output *(MIT License)*
- [**WRFxweb**](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wrfxweb) — Web-based visualization platform for WRF data *(no license specified)*
- [**SLURM**](https://slurm.schedmd.com/) — Job scheduling system for Linux clusters *(GNU GPL)*
- **Hugo** – Static site generator for creating documentation


## Additional Sources for WRFXWeb and Wildfires

**General Info:**

- [FEMA Wildfires GIS Hub](https://gis-fema.hub.arcgis.com/pages/wildfires) — Has the most recent American fire perimeters. Viewing space is less than desired.


- [BAER Burn Area Data](https://burnseverity.cr.usgs.gov/baer/) — Some burn area data, though requests and manual mapping may be required. See the 2021 Bootleg Fire Perimeter & Burn Severity.


### Bootleg Fire

- [Klamath Alerts News Article](https://klamathalerts.com/2021/08/07/klamath-county-fire-update-for-august-7th-2021-bootleg-fire-at-87-percent-containment-new-fires-are-now-lined/) — Discusses fires at 87% containment, with fires being lined.
- [2021 Bootleg Fire Perimeter & Burn Severity (USFS/BAER)](https://www.arcgis.com/home/item.html?id=41c248d3113344d78a680ab02f3e98ce) — Data from US Forest Service and Burned Area Emergency Response (link may be dead). [BAER](https://burnseverity.cr.usgs.gov/baer/) is the data source.
- [The Oregonian Article](https://www.oregonlive.com/pacific-northwest-news/2021/08/bootleg-fire-once-the-largest-in-the-nation-is-now-fully-contained.html) — Discusses fire at full containment, old image from InciWeb Incident Information System.
- [That Oregon Life: Bootleg Fire Perimeter](https://thatoregonlife.com/2021/07/bootleg-perimeter-now-200-miles-281-thousand-acres-burned/) — Not full fire, before it combined with the log fire.
- [Oregon Fire Perimeter History](https://hub.oregonexplorer.info/maps/848594cad4554eb9a1965e744d707494/about) — Specify the year to view the Bootleg fire perimeter.
- [Bootleg Fire Growth Animation (OregonLive, paywall)](https://www.oregonlive.com/data/2021/07/see-how-massive-bootleg-fire-grew-into-nations-largest-day-by-day.html) — Animation of fire spread. [Internet Archive Save (may be broken)](https://archive.ph/2ewrd)


### Lahaina Fire

- [Lahaina Fire Comprehensive Report & Timeline (PDF)](https://ag.hawaii.gov/wp-content/uploads/2024/04/FSRI-Lahaina-Fire-Timeline-Phase-1-Report-Press-Conference-240417.pdf) — By Underwriters Laboratories for the State of Hawaii. Discusses pre-fire conditions and fire progression.
- [Risk Assessment of the Lahaina Fire (Risk Frontiers)](https://riskfrontiers.com/insights/the-august-9-2023-hawaii-wildfires/) — Images are low resolution, but the assessment exists.
- [NYT: Lahaina Fire Damages (Map)](https://www.nytimes.com/interactive/2023/08/10/us/maui-wildfire-map-hawaii.html) — Article on the damages done.
- [NYT: Lahaina Fire Article](https://www.nytimes.com/2023/08/15/us/hawaii-maui-lahaina-fire.html)
- [Maui Recovers: Fire Extents Map](https://www.mauirecovers.org/maps/fire-extent) — Map of old fires in Maui.


### Palisades Fire

- [CALFIRE Forestry: WFIGS 2025 Wildfire Perimeters](https://gis.data.ca.gov/datasets/CALFIRE-Forestry::wfigs-2025-wildfire-perimeters/explore?location=34.074124%2C-118.538600%2C11.88) — Data hosted on the California State Geoportal. Shows Palisades perimeter.
- [Palisades and Eaton Dissolved Fire Perimeters (2025)](https://hub.arcgis.com/maps/ad51845ea5fb4eb483bc2a7c38b2370c/about) — Map of fire perimeters from the county of Los Angeles.
- [Cal Fire Incident Map: Palisades Fire](https://www.fire.ca.gov/incidents/2025/1/7/palisades-fire) — Shows the fire perimeter.
- [SF Chronicle: Palisades Fire Over Time](https://www.sfchronicle.com/projects/california-fire-map/palisades-fire-2025) — Shows fire spread.
- [NGFS Fire Detection (Palisades Region)](https://re-ngfs.ssec.wisc.edu/) — Shows spread. Zoom into Palisades Region Absolute Tab, set time to January 7–31, 2025. Collection NGFS, Fire Detection - WFIGS. Can adjust the time to make it slower or faster.


### Cram Fire

- [NGFS Fire Detection (Central Oregon)](https://re-ngfs.ssec.wisc.edu/) — Shows spread. Zoom into Central Oregon Absolute Tab, set time to July 13–22, 2025. Collection NGFS, Fire Detection - WFIGS. Can adjust the time to make it slower or faster.
- [Oregon State Fire Marshal Incident Blog, July 19](https://osfminfo.org/crews-making-progress-on-cram-fire-mapped-at-95769-acres/) — Has a decent, yet small image.
- [Central Oregon Fire Info, July 23rd (77% Containment)](https://centraloregonfire.org/2025/07/23/cram-fire-morning-update-wednesday-july-23-2025/)
- [KCBY 11 Local News, July 18th](https://kcby.com/news/local/cram-fire-grows-to-94293-acres-as-windy-conditions-hamper-firefighting-efforts-jefferson-county-wasco-northwest-interagency-coordination-madras-sheriffs-office) — Uncontained at the time.
- [InciWeb: Cram Fire Incident Information](https://inciweb.wildfire.gov/incident-information/orprd-cram-fire) — May need to zoom into the area for a better, full picture. Also has resources.


### General 2023 Canada Fires

- [2023 Canadian Wildfires Map (Wikimedia Commons)](https://commons.wikimedia.org/wiki/Data:2023_Canadian_wildfires_-_season_to_date.map) — Interactive map of the 2023 Canadian wildfires season.


## Acknowledgements

- <img src="https://esto.nasa.gov/wp-content/uploads/2020/02/esto-logo-white.svg" alt="ESTO Logo" width="120">  
  National Aeronautics and Space Administration (NASA) FireSense Research Grant “Wildfire Digital Twin”, Earth Science and Technology Office

- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/NSF_logo.svg/1200px-NSF_logo.svg.png" alt="NSF Logo" width="100"> 
  <img src="https://orca.pdx.edu/logo.png" alt="ORCA Logo" width="100">  
  National Science Foundation Computational Award: Oregon Research Computing Accelerator (ORCA)

- Notion provided free access to Notion Plus for our group
