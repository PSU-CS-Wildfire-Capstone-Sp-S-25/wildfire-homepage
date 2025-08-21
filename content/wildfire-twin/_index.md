# Numerical Weather Prediction Models

## Weather Research and Forecasting (WRF)

The Weather Research and Forcasting (WRF) model is a community model, develop jointly by the National Center for Atmospheric Research (NCAR) and multiple US agencies such as the NOAA, NCEP, and the Air Force. It is regional-based and can be configured to work across multiple scales, though commonly used at mesoscale. WRFs primary application comes from it flexability, and can be tooled for multiple uses, often by coupling with WRF. This leads to many WRF extensions, like WRF-Chem, WRF-Hydro, and WRF-Fire, which specialize in paticulars like severe weather, and storm-scale predictions. This is a strength, as it is has community backing, giving it a multitude of options and capabilites for various applications. However, WRF does has weaknesses, it being a limited-area model makes it depend on external boundary conditions that lead to lateral bonundary errors over a long run time. It also features multiple dynamic cores, which necessitates a CPU-intensive approach.

## Global Forecast System (GFS)

The Global Forecast System (GFS) is a model developed by NOAA's National Center for Environmental Prediction (NCEP). It is primarily a US global weather model with development coodination between NOAA and partners like NASA, and university researchers via the Unified Forecast System initiative [US Department of Commerce, 2020].
The model functions as an analysis cycle, updating atmospheric states every 6 hours, within a 6-hour window, using a vasy array of observational data. Its primary application is to provide global forecasts for medium-range weather predition worldwide, and it gives guidance for up to two weeks. This punctuality is a strength, as it fast, has open avalibility, in addition to its timely updates. However, this comes at the cost of resolution, and still does not rival the best global models [US Department of Commerce, 2020].

## ECMWF Integrated Forecasting System (IFS)

The European Centre for Medium-Range Weather Forecasts's Intergrated Forecating System (ECMWF IFS) is a model developed by 30 international organizations and supported by over 30 European states. Renown for its leading global forecasting skill, IFS includes advance physics parameterization, which is continually updated and optimized for the IFS physics. It uses about 137 vertical levels, and orecasts are projected out to 10 days at full resolution and extended to 15 days with slightly coarser resolution beyond 10 days [COMMpla|Trust-IT, 2022].

---

# Deep Learning Weather Prediction

## FourCastNet (NVIDIA)

FourCastNet is a deep learning weather model developed by NVIDIA that uses adaptive Fourier neural operators to emulate global weather forecasting. It produces accurate short to medium range predictions, matching the accuracy of Numerical Weather Predition model EXMWF IFS. The primary strength of the model is its speed, generating a week-long global forecast in under two seconds. However, the model is limited by longer-range accuracy for certain atmospheric fields, lagging behind the top physics-based models [Pathak et al., 2022].

## GraphCast (DeepMind)

GraphCast is a global weather forecasting system developed by Google DeepMind, that leverages a graph neural network architecture to predict atmospheric dynamics. It is trained on decades of historical reanalysis data, and can predict the temporal evolution of hundreds of meteorological variables up to 10 days into the future. It significantly outpreforms ECMWF's IFS on 90% of evaluated targets, improving tropical cyclone tracks, atmospheric river forecasts, and heat wave prediction. This 10 day forcast can be done under 1 minute, on a single TPU, reducing computational cost, but still remaining computationally intensive [Lam et al., 2023].

## Pangu-Weather (Huawei)

Pangu-Weather is a A transformer-based AI model developed by Huawei. It employs a three-dimentional Earth-specific Tranformer architecture that is designed to incorperated the vertical structure of the atmosphere. Pangu-Weather was the first AI model to exceed ECMWF's IFS in deterministic forecast accuracy across all evaluated variables and lead times when tested on 39 years of reanalysis data. It also demostrated superior skill for predicting extreme weather events. Once trained, the model can generate 10000 times faster than IFS, however this comes at the cost of training, involving significant computational resources [Bi et al.,2022].

## Aurora (Microsoft)

Aurora is a deep learning model developed by Microsoft, designed to handle multiple domains, including weather, air quality, and ocean prediction under a single framework. It is pretrained on over a million hours of climate and weather data, and can be fine-tuned for a specific task with minimal training. It can deliver state-of-the-art accuracy across multiple domains, often outperforming specialized operational models, while remaining faster. Its main strength is adaptability, enabling rapid deployment for new forecasting applications [Bodnar et al., 2024].

## Comparative Overview
FourCastNet, GraphCast, Pangu-Weather, and Aurora represents significant advancements in AI-based weather forecasting, yet they differ in their core approaches and strengths. FourCastNet uses Fourier neural operators to achieve extremely fast global forecasts and supports large ensemble generation, though
with slightly reduced long-range accuracy in its initial version [Pathak et al 2022]. GraphCast applies GNNs to model spatial relationships, achieving high accuracy in extreme event prediction and medium-range forecasting efficiency

## Train FourCastNet
