
# FourCastNet Methods

FourCastNet is a deep learning–based weather forecasting model developed initially by NVIDIA. Unlike traditional numerical models that rely solely on physics-based equations, FCN uses a transformer-style neural network (called Adaptive Fourier Neural Operators, or AFNOs) to learn global atmospheric dynamics directly from reanalysis data. By combining speed with accuracy, FCN can generate weather forecasts orders of magnitude faster than conventional approaches, while maintaining competitive skill scores.
Why did we choose FCN?

When evaluating AI weather models, we considered multiple state-of-the-art options. Google’s GraphCast has demonstrated impressive forecast accuracy at global scales, while Huawei’s Pangu-Weather emphasizes high-resolution, physics-informed forecasting. However, both models come with substantial overhead in terms of training complexity and computational requirements. 

FourCastNet was selected based on its AFNO-based architecture. It combines a balance of power and efficiency, making it comparatively lightweight. It made sense, considering we needed a model that could handle our rapid experimentation and quick fine-tuning. This efficiency allows us to spend more time refining the wildfire-specific data pipeline, rather than allocating massive resources to maintain or scale the model itself.

## How FCN works

At its core, FCN takes in atmospheric state variables (like wind components, surface temperature, and pressure) and predicts how these evolve over time. The AFNO layers transform weather fields into the frequency domain, capture global dependencies, and then project them back into physical space. This process makes FCN both efficient and scalable for long-range forecasting. By running autoregressive rollouts, the model can generate full time series forecasts extending days or weeks into the future.
## How FCN works with our wildfire data

To adapt FCN to wildfire applications, we preprocess outputs from the WRF-SFIRE dynamic model, an advanced physics-based simulator that produces high-resolution fire spread and weather interactions. From these runs, we extract key meteorological and fire-related variables (wind speed, temperature, humidity, surface heat flux, and fire area). These variables are converted into the standardized H5 format FCN expects, with consistent normalization statistics (means and standard deviations).