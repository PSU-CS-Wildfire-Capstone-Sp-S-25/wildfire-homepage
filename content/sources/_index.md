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

## Additional sources for our WRFXWeb instance and various wildfires

### General Info

https://gis-fema.hub.arcgis.com/pages/wildfires FEMA - Has the most recent American fire perimeters. Viewing space is less than desired.

https://burnseverity.cr.usgs.gov/baer/ BAER - Seems to have some burn area data, though we have to request them and map them ourselves, see the 2021 Bootleg Fire Perimeter & Burn Severity.

### Bootleg Fire

https://klamathalerts.com/2021/08/07/klamath-county-fire-update-for-august-7th-2021-bootleg-fire-at-87-percent-containment-new-fires-are-now-lined/ News Article from Klamath Alerts - Discusses fires at 87% containment, with fires being lined.

https://www.arcgis.com/home/item.html?id=41c248d3113344d78a680ab02f3e98ce 2021 Bootleg Fire Perimeter & Burn Severity - Data from US Forest Service and Burned Area Emergency Response, but link seems to be dead. Owner(?) of this visualization is Matthew Mayfield. UPDATE: BAER still exists! https://burnseverity.cr.usgs.gov/baer/ This is where the data is from, I think.

https://www.oregonlive.com/pacific-northwest-news/2021/08/bootleg-fire-once-the-largest-in-the-nation-is-now-fully-contained.html Article from The Oregonian - Discusses fire at full containment, old image from InciWeb Incident Information System (No longer on that site due to time passing)

https://thatoregonlife.com/2021/07/bootleg-perimeter-now-200-miles-281-thousand-acres-burned/ Bootleg Fire Perimeter - Not full fire, before it combined with the log fire, I think. From That Oregon Life.

https://hub.oregonexplorer.info/maps/848594cad4554eb9a1965e744d707494/about Oregon Fire Perimeter History - You have to specify the year, when viewing, but has the Bootleg fire perimeter.

https://www.oregonlive.com/data/2021/07/see-how-massive-bootleg-fire-grew-into-nations-largest-day-by-day.html PAYWALL - Looks like there might be an animation on the bootleg fire spreading… at least it looks like it on google images. There is a save of it on the internet archive but it's broken… https://archive.ph/2ewrd Secret link for viewing Sources: National Interagency Fire Center, NASA, NOAA, Oregon Department of Forestry Map: Mark Friesen/staff

### Lahaina Fire

https://ag.hawaii.gov/wp-content/uploads/2024/04/FSRI-Lahaina-Fire-Timeline-Phase-1-Report-Press-Conference-240417.pdf Lahaina Fire Comprehensive Report & Timeline - I think this was done by Underwriters Laboratories, for the State of Hawaii. Discusses pre fire conditions, and fire progression.

https://riskfrontiers.com/insights/the-august-9-2023-hawaii-wildfires/ Risk Assessment of the Lahaina Fire - Images are low res, very very low resolution. But it exists! I think this is done by this risk assessment company?

https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2Finteractive%2F2023%2F08%2F10%2Fus%2Fmaui-wildfire-map-hawaii.html&psig=AOvVaw3ETwKQWZPy0WZMIYtqLpmt&ust=1754691906732000&source=images&cd=vfe&opi=89978449&ved=0CBkQjhxqFwoTCNiYyfDe-Y4DFQAAAAAdAAAAABBj Lahaina Fire Damages - NYT has an article on the damages done, some of them seem nice? Could be used…

https://www.nytimes.com/2023/08/15/us/hawaii-maui-lahaina-fire.html Another NYT Article

https://www.mauirecovers.org/maps/fire-extent Fire Extents - From Maui Recovers has a map of old fires in Maui

### Palisades Fire

https://gis.data.ca.gov/search P1 gis.data.ca.gov/datasets/CALFIRE-Forestry::wfigs-2025-wildfire-perimeters/explore?location=34.074124%2C-118.538600%2C11.88 P2 WFIGS - 2025 Wildfire Perimeters - Data hosted on the California State Geoportal. Shows palisades perimeter

https://hub.arcgis.com/maps/ad51845ea5fb4eb483bc2a7c38b2370c/about Palisades And Eaton Dissolved Fire Perimeters (2025) - I think this is from the county of Los Angeles? It’s a map of fire perimeters specifically from the palisades and eaton area

https://www.fire.ca.gov/incidents/2025/1/7/palisades-fire Cal Fire Incident Map - Shows the fire perimeter. Hard to see…

https://www.sfchronicle.com/projects/california-fire-map/palisades-fire-2025 Palisades Fire over time - Shows fire spread!!!!

https://re-ngfs.ssec.wisc.edu/ This one takes setup, but also shows spread. Make sure you zoom into Palisades Region Absolute Tab, set time to January 7, 2025 - January 31, 2025 Collection NGFS, Fire Detection - WFIGS Can Adjust the time to make it slower or faster

### Cram Fire

https://re-ngfs.ssec.wisc.edu/ This one takes setup, but also shows spread. Make sure you zoom into region, Central Oregon Absolute Tab, set time to July 13, 2025 - July 22, 2025 Collection NGFS, Fire Detection - WFIGS Can Adjust the time to make it slower or faster

https://osfminfo.org/crews-making-progress-on-cram-fire-mapped-at-95769-acres/ Oregon State Fire Marshal Incident Blog, July 19. Has a decent, yet small image

https://centraloregonfire.org/2025/07/23/cram-fire-morning-update-wednesday-july-23-2025/ Central Oregon Fire Info, July 23rd 77% Containment

https://kcby.com/news/local/cram-fire-grows-to-94293-acres-as-windy-conditions-hamper-firefighting-efforts-jefferson-county-wasco-northwest-interagency-coordination-madras-sheriffs-office Local News KCBY 11, July 18th Uncontained at the time?

https://inciweb.wildfire.gov/incident-information/orprd-cram-fire Might have to back out and then zoom into the area to get a better, full picture. But also has resources.

### General 2023 Canada Fires -

The best I can do here is the wikipedia, The have map data… Maybe we can visualize it ourselves? https://commons.wikimedia.org/wiki/Data:2023_Canadian_wildfires_-_season_to_date.map

I feel like this fire is too broad for images, it’s an entire country…

## Acknowledgements

- ![ESTO Logo](https://esto.nasa.gov/wp-content/uploads/2020/02/esto-logo-white.svg) <br> National Aeronautics and Space Administration (NASA) FireSense Research Grant “Wildfire Digital Twin”, Earth Science and Technology Office
- ![NSF Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/NSF_logo.svg/1200px-NSF_logo.svg.png) ![ORCA logo](https://orca.pdx.edu/logo.png)<br>National Science Foundation Computational Award: Oregon Research Computing Accelerator (ORCA)
- Notion provided free access to Notion Plus for our group