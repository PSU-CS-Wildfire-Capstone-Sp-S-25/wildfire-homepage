
<h1 style="text-align:center; font-size:2.5rem; color:#111; margin-bottom:1.1rem; margin-top:2.2rem; font-weight:800; letter-spacing:0.01em; font-family: 'Segoe UI', 'Arial', sans-serif;">
Wildfire forecasts and simulations for everyone.<br>
<span style="font-size:1.15rem; font-weight:400; color:#444;">See how wildfires might spread—powered by dynamical models and AI.</span>
</h1>

## Introduction

<blockquote style="border-left: 5px solid #3949ab; background: #f7f8fa; padding: 1.1rem 1.5rem; margin: 1.5rem 0; font-size: 1.13rem; color: #222; font-style: italic;">
Wildfires are a growing threat, causing massive economic, environmental, and health impacts. Major events can cost billions and affect thousands of lives.<br><br>
To help address this, our Portland State University Capstone team built a forecasting platform that uses advanced modeling and AI to predict wildfire spread that's more easily accessible to the public.
</blockquote>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin: 2.5rem 0 2rem 0;">
    <div style="flex: 1 1 400px; max-width: 500px; min-width: 250px; display: flex; flex-direction: column; align-items: center;">
        <img src="/PalisadesSimulation.gif" alt="Palisades Fire Simulation" style="width: 100%; max-width: 500px; height: auto; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.13); aspect-ratio: 4/3; object-fit: cover;">
        <div style="text-align:center; color:#333; margin-top:1.1rem; font-size:1.12rem; font-weight: 500;">
            Palisades Fire Simulation (Model Output)<br>
            <span style="font-size:0.98rem; color:#555;">Simulated fire spread for the Palisades Fire event.</span>
        </div>
    </div>
    <div style="flex: 1 1 400px; max-width: 500px; min-width: 250px; display: flex; flex-direction: column; align-items: center;">
        <img src="/CaldorSimulation.gif" alt="Caldor Fire Simulation" style="width: 100%; max-width: 500px; height: auto; border-radius: 10px; box-shadow: 0 1px 6px rgba(0,0,0,0.08); aspect-ratio: 4/3; object-fit: cover;">
        <div style="text-align:center; color:#555; margin-top:0.75rem; font-size:0.98rem;">
            Caldor Fire Simulation (Model Output)<br>
            Simulated fire spread from our WRF-SFIRE model.
        </div>
    </div>
</div>

<h2 style="text-align:center; font-size:2rem; color:#111; margin: 2.5rem 0 1.2rem 0; font-weight:800; letter-spacing:0.01em; font-family: 'Segoe UI', 'Arial', sans-serif;">
Models & Technologies Used
</h2>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2.5rem; margin: 2.5rem 0 2rem 0;">
    <div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 2rem 1.2rem 1.5rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
        <h3 style="color:#222; font-size:1.35rem; margin-bottom:0.7rem; text-align:center;">NVIDIA FourCastNet</h3>
        <p style="color:#333; font-size:1.05rem; text-align:center; margin-bottom:1.1rem;">A state-of-the-art AI model for fast, accurate weather and climate forecasting. FourCastNet uses deep learning to predict complex atmospheric patterns, making wildfire spread simulations faster and more efficient.</p>
        <a href="https://docs.nvidia.com/deeplearning/physicsnemo/physicsnemo-sym/user_guide/neural_operators/fourcastnet.html" target="_blank" style="color:#3949ab; text-decoration:underline; font-weight:500;">Learn more</a>
    </div>
        <div style="flex: 1 1 340px; max-width: 400px; min-width: 240px; background: #f7f8fa; border-radius: 14px; box-shadow: 0 2px 12px rgba(60,60,60,0.09); padding: 2rem 1.2rem 1.5rem 1.2rem; display: flex; flex-direction: column; align-items: center;">
            <img src="/NSF_Logo.png" alt="NSF Logo" style="width: 100%; max-width: 180px; height: auto; margin-bottom: 0.7rem; margin-top: -0.5rem; display: block; object-fit: contain;">
            <h3 style="color:#222; font-size:1.35rem; margin-bottom:0.7rem; text-align:center;">WRF-SFIRE</h3>
            <p style="color:#333; font-size:1.05rem; text-align:center; margin-bottom:1.1rem;">A powerful model that simulates the two-way interaction between wildfires and weather. WRF-SFIRE helps us understand and predict how fires and local weather influence each other in real time.</p>
            <a href="https://www.mmm.ucar.edu/models/wrf" target="_blank" style="color:#3949ab; text-decoration:underline; font-weight:500;">Learn more</a>
        </div>
</div>
