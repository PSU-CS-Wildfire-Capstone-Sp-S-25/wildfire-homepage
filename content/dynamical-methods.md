# WRF-SFIRE Simulation Guide with WRFxPy

This guide outlines the complete process for creating and running wildfire simulations using wrfxpy with wrf-sfire.

## Prerequisites

### 1. Create Spack Package for WRF-SFIRE

First, you'll need the custom spack package for wrf-sfire:

-   **Repository**: [wrf-sfire spack package](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wf-capstone-docker/blob/main/package.py)

### 2. Install Required Packages with Spack

Install the necessary spack packages:

```bash
# Install wrf-sfire spack package
spack install wrf-sfire

# Install WPS (WRF Preprocessing System)
spack install wps
```

### 3. Install wrfxpy

Install the forked version of wrfxpy:

-   **Repository**: [wrfxpy fork](https://github.com/PSU-CS-Wildfire-Capstone-Sp-S-25/wrfxpy)
-   **Installation Documentation**: [Running WRF-SFIRE with real data in the WRFx system](https://wiki.openwfm.org/wiki/Running_WRF-SFIRE_with_real_data_in_the_WRFx_system#WRFx_system)

Follow the installation instructions in the documentation to properly set up wrfxpy on your system.

## Simulation Creation Process

### Step 1: Research Phase

Before creating any simulation, you need to gather essential fire data:

#### Required Information

-   **Fire Location**: Geographic coordinates or area boundaries
-   **Start Time**: When the fire began
-   **Duration**: How long the fire burned
-   **Fire Size**: Maximum area covered by the fire

### Step 2: Convert Research to Job JSON

Tool for helping configure domains: [WRFDomainWizard](https://jiririchter.github.io/WRFDomainWizard/)

Documentation can be found here for more information on the keys used in the wrfxpy job json files: [wrfxpy docs](https://wrfxpy.readthedocs.io/en/latest/forecasting.html)

#### Job JSON Example

Palisades Fire Jan 2025 Example:
```json
{

    "wps_namelist_path": "/path/to/default.wps",
    "wrf_namelist_path": "/path/to/default.input",
    "fire_namelist_path": "/path/to/default.fire",
    "emissions_namelist_path": "/path/to/default.fire_emissions",
    "wps_geog_path": "/path/to/WPS_GEOG",
    "job_id": "<job_name>",
    "wall_time_hrs": 96,
    "grib_source": "GFSA",
    "start_utc": "2025-01-06_12:00:00",
    "end_utc": "2025-01-11_12:00:00",
    "qsys":"ORCA_SFIRE",
    "num_nodes": 9,
    "ppn": 9,
    "postproc": {
        "1": ["T2","PSFC","WINDSPD","WINDVEC","SMOKE_INT"],
        "3": ["T2","PSFC","WINDSPD","WINDVEC","FIRE_AREA","FGRNHFX","SMOKE_INT"],
        "2": ["T2","PSFC","WINDSPD","WINDVEC","SMOKE_INT"],
        "description": "palisades fire with smaller cell size and more accurate trulat"
    },
    "grid_code": "<job_name>",
    "domains": {
        "1": {
            "cell_size": [2000,2000],
            "truelats": [34.568,34.568],
            "stand_lon": -128.617,
            "center_latlon": [34.0733,-118.5439],
            "history_interval": 60,
            "geog_res": ".3s",
            "domain_size": [97,97],
            "subgrid_ratio": [0,0],
            "time_step": 10,
            "interval_seconds": 3600
        },
        "2": {
            "parent_time_step_ratio": 3,
            "parent_start": [33,33],
            "history_interval": 30,
            "geog_res": ".3s",
            "parent_id": 1,
            "subgrid_ratio": [0,0],
            "parent_end": [64,64],
            "parent_cell_size_ratio": 3
        },
        "3": {
            "parent_time_step_ratio": 3,
            "parent_start": [33,33],
            "history_interval": 15,
            "geog_res": ".3s",
            "parent_id": 2,
            "subgrid_ratio": [15,15],
            "parent_end": [64,64],
            "parent_cell_size_ratio": 3
        }
    },
    "ignitions": {
        "3": [
            {
                "time_utc": "2025-01-07_17:00:00",
                "latlon": [34.0733,-118.5439],
                "duration_s": 240
            }
        ]
    }
}
```

#### Breaking Down The Example

##### Paths To Files

```json
"wps_namelist_path": "/path/to/default.wps",
"wrf_namelist_path": "/path/to/default.input",
"fire_namelist_path": "/path/to/default.fire",
"emissions_namelist_path": "/path/to/default.fire_emissions",
"wps_geog_path": "/path/to/WPS_GEOG",
```

For those first 4 options typically you would put the path to the default options in [wrfxpy/etc/nlists/](https://github.com/openwfm/wrfxpy/tree/master/etc/nlists). While the last one is the path to the directory that contains your static data for WPS as shown [here](https://wiki.openwfm.org/wiki/Running_WRF-SFIRE_with_real_data_in_the_WRFx_system#Get_WPS_static_data).

##### Job Configuration

```json
"wall_time_hrs": 96,
"grib_source": "GFSA",
"start_utc": "2025-01-06_12:00:00",
"end_utc": "2025-01-11_12:00:00",
"qsys":"ORCA_SFIRE",
"num_nodes": 9,
"ppn": 9,
```

These are variables that will be  used in the sbatch job wrfxpy creates and runs for you.

-   **wall_time_hrs**: This will be the time limit for the sbatch job when the simulation runs
-   **grib_source**: The source which you will get your weather observations from. Valid options being HRRR, NAM, NAM227, NARR, CFSR, GFSA, and GFSF
-   **start_utc**: The start time for the simulation
-   **end_utc**: The end time for the simulation
-   **qsys**: The sbatch template to use
-   **num_nodes**: Number of nodes to use in the simulation
-   **ppn**: Number of processors to use per node in the simulation

##### Job Post Processing

```json
"postproc": {
        "1": ["T2","PSFC","WINDSPD","WINDVEC","SMOKE_INT"],
        "3": ["T2","PSFC","WINDSPD","WINDVEC","FIRE_AREA","FGRNHFX","SMOKE_INT"],
        "2": ["T2","PSFC","WINDSPD","WINDVEC","SMOKE_INT"],
}
```

Each numbered key above means perform post processing on these domains (1, 2, 3) and create these specified visualizations.

##### Simulation Domains

```json
"domains": {
        "1": {
            "cell_size": [2000,2000],
            "truelats": [34.568,34.568],
            "stand_lon": -128.617,
            "center_latlon": [34.0733,-118.5439],
            "history_interval": 60,
            "geog_res": ".3s",
            "domain_size": [97,97],
            "subgrid_ratio": [0,0],
            "time_step": 10,
            "interval_seconds": 3600
        },
        "2": {
            "parent_time_step_ratio": 3,
            "parent_start": [33,33],
            "history_interval": 30,
            "geog_res": ".3s",
            "parent_id": 1,
            "subgrid_ratio": [0,0],
            "parent_end": [64,64],
            "parent_cell_size_ratio": 3
        },
        "3": {
            "parent_time_step_ratio": 3,
            "parent_start": [33,33],
            "history_interval": 15,
            "geog_res": ".3s",
            "parent_id": 2,
            "subgrid_ratio": [15,15],
            "parent_end": [64,64],
            "parent_cell_size_ratio": 3
        }
    },
```

Here each numbered key refers to the domain with the keys inside of them the configuration of that domain. For more information on the specific keys check the [wrfxpy documentation](https://wrfxpy.readthedocs.io/en/latest/forecasting.html#domains)

-   **cell_size**: The size in meters for each cell in the domain [x, y]
-   **trulats**: The true latitudes of the LCC projection
-   **stanlon**: The standard longitude of the LCC projection
-   **center_latlon**: The center point
-   **history_interval**: the history interval in minutes
-   **geog_res**: The resolution of geographical/fuel data to use
-   **domain_size**: The number of cells to use in the domain [x, y]
-   **subgrid_ratio**: The refinement ratio for x and y direction for the fire grid, default is 1, 1
-   **time_step**: Time step in seconds
-   **interval_seconds**: How often to receive meteorological data from the pre-processing steps in seconds
-   **parent_time_step_ratio**: The ratio of child time step to parent time step
-   **parent_start**: The [x, y] coordinates of the parents domain which this domain starts
-   **parent_end**: The [x, y] coordinates of the parents domain which this domain ends
-   **parent_id**: The ID of the parent the current domain is nested in
-   **subgrid_ratio**: The refinement ratio for x and y direction for the fire grid
-   **parent_cell_size_ratio**: The ratio of the size of the child cell to the parent cell

##### Ignitions

```json
"ignitions": {
    "3": [
        {
            "time_utc": "2025-01-07_17:00:00",
            "latlon": [34.0733,-118.5439],
            "duration_s": 240
        }
    ]
}
```

Much like for domains, the numbered keys here correspond to a domain that will run fire modeling. 

-   **time_utc**: The time which the ignition will start
-   **latlon**: The latitude and longitude of the ignition
-   **duration_s**: The duration in seconds for the ignition


### Step 3: Create SBATCH Script

Prepare a SLURM batch script for job submission:

```bash
#!/bin/bash
#SBATCH --job-name=<job_name>
#SBATCH --output=<job_name>.out
#SBATCH --error=<job_name>.err
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --cpus-per-task=1
#sbatch --mem-per-cpu=3GB
#SBATCH --time=96:00:00
unset SLURM_MEM_PER_NODE
cd /path/to/wrfxpy

./forecast.sh /path/to/<job_file>.json
```

### Step 4: Run the Simulation

Submit your simulation job to the SLURM scheduler:

```bash
sbatch /path/to/sbatch/script.sh
```

## Resources

-   [WRFXPY Documentation](https://wiki.openwfm.org/wiki/Running_WRF-SFIRE_with_real_data_in_the_WRFx_system#WRFx_system)
-   [Additional WRFXPY Documentation](https://wrfxpy.readthedocs.io/en/latest/forecasting.html)
-   [WRF-SFIRE Wiki](https://wiki.openwfm.org/wiki/WRF-SFIRE)
-   [SLURM Documentation](https://slurm.schedmd.com/documentation.html)
-   [SPACK Documentation](https://spack.readthedocs.io/en/latest/)
-   [WRF Domain Wizard](https://jiririchter.github.io/WRFDomainWizard)
