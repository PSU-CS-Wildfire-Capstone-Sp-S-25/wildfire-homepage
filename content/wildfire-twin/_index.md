
<h1 style="text-align:center; font-size:2.2rem; color:#1a237e; margin-bottom:2.2rem; font-weight:800; letter-spacing:0.01em; font-family: 'Segoe UI', 'Arial', sans-serif;">Weather Models Overview</h1>
<style>
.model-tile {
	text-decoration: none !important;
	display: block;
	width: 100%;
	background: #f7f8fa;
	border-radius: 14px;
	box-shadow: 0 2px 12px rgba(60,60,60,0.09);
	padding: 1.5rem 1.2rem 1.2rem 1.2rem;
	transition: background 0.2s, box-shadow 0.2s;
}
.model-tile:hover, .model-tile:focus {
	background: #e3e6f3;
	box-shadow: 0 4px 18px rgba(60,60,60,0.16);
}
</style>
<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin: 2.5rem 0 2rem 0;">
	<!-- WRF -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#wrf" class="model-tile">
					<img src="/wrf.png" alt="WRF Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">Weather Research and Forecasting (WRF)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">A flexible, community-driven regional weather model developed by NCAR and US agencies. WRF is widely used for mesoscale forecasting and supports many extensions for specialized applications.</p>
				</a>
	</div>
	<!-- GFS -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#gfs" class="model-tile">
					<img src="/gfs.png" alt="GFS Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">Global Forecast System (GFS)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">NOAA's global weather model, providing medium-range forecasts worldwide. GFS is fast, open, and updated every 6 hours, but trades some resolution for speed and coverage.</p>
				</a>
	</div>
	<!-- IFS -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#ifs" class="model-tile">
					<img src="/ifs.jpg" alt="IFS Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">ECMWF Integrated Forecasting System (IFS)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">Europe's leading global model, renowned for forecast skill and advanced physics. IFS provides up to 15-day forecasts with high vertical resolution and continual updates.</p>
				</a>
	</div>
	<!-- FourCastNet -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#fourcastnet" class="model-tile">
					<img src="/NVIDIA-logo-BL.jpeg" alt="FourCastNet Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">FourCastNet (NVIDIA)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">A deep learning model by NVIDIA using Fourier neural operators for fast, accurate global weather forecasts. Excels at short- to medium-range predictions with high speed.</p>
				</a>
	</div>
	<!-- GraphCast -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#graphcast" class="model-tile">
					<img src="/DeepMind_logo.png" alt="GraphCast Logo (Google DeepMind)" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">GraphCast (Google DeepMind)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">A global weather forecasting system from Google DeepMind, using graph neural networks to predict atmospheric dynamics and extreme events up to 10 days ahead.</p>
				</a>
	</div>
	<!-- Pangu-Weather -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#pangu" class="model-tile">
					<img src="/Huawei_Standard_logo.svg" alt="Pangu-Weather Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">Pangu-Weather (Huawei)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">A transformer-based AI model by Huawei, designed for fast, accurate global forecasts and extreme event prediction, using a 3D Earth-specific architecture.</p>
				</a>
	</div>
	<!-- Aurora -->
	<div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 1.5rem 1.2rem 1.2rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
					<a href="#aurora" class="model-tile">
					<img src="/Microsoft_logo.svg" alt="Aurora Logo" style="width: 100%; max-width: 220px; height: 120px; border-radius: 14px; object-fit: contain; background: #fff; margin: 0 auto 0.9rem auto; display:block;">
					<h3 style="color:#222; font-size:1.18rem; margin-bottom:0.7rem; text-align:center;">Aurora (Microsoft)</h3>
					<div style="text-align:center; color:#1a237e; font-size:1.01rem; font-weight:bold; margin-bottom:0.5rem;"><strong>Click here for more info</strong></div>
					<p style="color:#333; font-size:1.01rem; text-align:center;">A deep learning model from Microsoft, pretrained on massive climate data for weather, air quality, and ocean prediction. Adaptable and fast, often outperforming specialized models.</p>
				</a>
	</div>
</div>


---


---

<div style="margin-top:3.5rem;"></div>
<h2 style="text-align:center; font-size:1.7rem; color:#222; margin-bottom:2.2rem; font-weight:700;">Detailed Model Descriptions</h2>

<div id="wrf"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/wrf.png" alt="WRF Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">Weather Research and Forecasting (WRF)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">The Weather Research and Forcasting (WRF) model is a community model, develop jointly by the National Center for Atmospheric Research (NCAR) and multiple US agencies such as the NOAA, NCEP, and the Air Force. It is regional-based and can be configured to work across multiple scales, though commonly used at mesoscale. WRFs primary application comes from it flexability, and can be tooled for multiple uses, often by coupling with WRF. This leads to many WRF extensions, like WRF-Chem, WRF-Hydro, and WRF-Fire, which specialize in paticulars like severe weather, and storm-scale predictions. This is a strength, as it is has community backing, giving it a multitude of options and capabilites for various applications. However, WRF does has weaknesses, it being a limited-area model makes it depend on external boundary conditions that lead to lateral bonundary errors over a long run time. It also features multiple dynamic cores, which necessitates a CPU-intensive approach.</p>

<div id="gfs"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/gfs.png" alt="GFS Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">Global Forecast System (GFS)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">The Global Forecast System (GFS) is a model developed by NOAA's National Center for Environmental Prediction (NCEP). It is primarily a US global weather model with development coodination between NOAA and partners like NASA, and university researchers via the Unified Forecast System initiative [US Department of Commerce, 2020].<br>The model functions as an analysis cycle, updating atmospheric states every 6 hours, within a 6-hour window, using a vasy array of observational data. Its primary application is to provide global forecasts for medium-range weather predition worldwide, and it gives guidance for up to two weeks. This punctuality is a strength, as it fast, has open avalibility, in addition to its timely updates. However, this comes at the cost of resolution, and still does not rival the best global models [US Department of Commerce, 2020].</p>

<div id="ifs"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/ifs.jpg" alt="IFS Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">ECMWF Integrated Forecasting System (IFS)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">The European Centre for Medium-Range Weather Forecasts's Intergrated Forecating System (ECMWF IFS) is a model developed by 30 international organizations and supported by over 30 European states. Renown for its leading global forecasting skill, IFS includes advance physics parameterization, which is continually updated and optimized for the IFS physics. It uses about 137 vertical levels, and orecasts are projected out to 10 days at full resolution and extended to 15 days with slightly coarser resolution beyond 10 days [COMMpla|Trust-IT, 2022].</p>

<div id="fourcastnet"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/NVIDIA-logo-BL.jpeg" alt="FourCastNet Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">FourCastNet (NVIDIA)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">FourCastNet is a deep learning weather model developed by NVIDIA that uses adaptive Fourier neural operators to emulate global weather forecasting. It produces accurate short to medium range predictions, matching the accuracy of Numerical Weather Predition model EXMWF IFS. The primary strength of the model is its speed, generating a week-long global forecast in under two seconds. However, the model is limited by longer-range accuracy for certain atmospheric fields, lagging behind the top physics-based models [Pathak et al., 2022].</p>

<div id="graphcast"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/DeepMind_logo.png" alt="GraphCast Logo (Google DeepMind)" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">GraphCast (Google DeepMind)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">GraphCast is a global weather forecasting system developed by Google DeepMind, that leverages a graph neural network architecture to predict atmospheric dynamics. It is trained on decades of historical reanalysis data, and can predict the temporal evolution of hundreds of meteorological variables up to 10 days into the future. It significantly outpreforms ECMWF's IFS on 90% of evaluated targets, improving tropical cyclone tracks, atmospheric river forecasts, and heat wave prediction. This 10 day forcast can be done under 1 minute, on a single TPU, reducing computational cost, but still remaining computationally intensive [Lam et al., 2023].</p>

<div id="pangu"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/Huawei_Standard_logo.svg" alt="Pangu-Weather Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">Pangu-Weather (Huawei)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">Pangu-Weather is a A transformer-based AI model developed by Huawei. It employs a three-dimentional Earth-specific Tranformer architecture that is designed to incorperated the vertical structure of the atmosphere. Pangu-Weather was the first AI model to exceed ECMWF's IFS in deterministic forecast accuracy across all evaluated variables and lead times when tested on 39 years of reanalysis data. It also demostrated superior skill for predicting extreme weather events. Once trained, the model can generate 10000 times faster than IFS, however this comes at the cost of training, involving significant computational resources [Bi et al.,2022].</p>

<div id="aurora"></div>
<div style="display:flex; align-items:center; gap:1rem; margin-top:2.2rem;">
	<img src="/Microsoft_logo.svg" alt="Aurora Logo" style="width: 56px; height: 56px; border-radius: 10px; object-fit: contain; background: #fff;">
	<h3 style="color:#1a237e; margin:0;">Aurora (Microsoft)</h3>
</div>
<p style="max-width:700px; margin-bottom:2.2rem;">Aurora is a deep learning model developed by Microsoft, designed to handle multiple domains, including weather, air quality, and ocean prediction under a single framework. It is pretrained on over a million hours of climate and weather data, and can be fine-tuned for a specific task with minimal training. It can deliver state-of-the-art accuracy across multiple domains, often outperforming specialized operational models, while remaining faster. Its main strength is adaptability, enabling rapid deployment for new forecasting applications [Bodnar et al., 2024].</p>

---