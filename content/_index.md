
<h1 style="text-align:center; font-size:2.5rem; color:#111; margin-bottom:1.1rem; margin-top:2.2rem; font-weight:800; letter-spacing:0.01em; font-family: 'Segoe UI', 'Arial', sans-serif;">
Wildfire forecasts and simulations for everyone.<br>
<span style="font-size:1.15rem; font-weight:400; color:#444;">See how wildfires might spread—powered by real models and AI.</span>
</h1>

## Introduction
Wildfires represent a critical and escalating threat, inflicting devastating economic, environmental, and human costs. The financial toll of a single major wildfire event can soar into the hundreds of billions of dollars, while the health impacts from smoke can lead to thousands of indirect deaths.

To address this challenge, our Capstone Project made this forecasting platform. 

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

## Technologies Used

*   **WRF-SFIRE:** A cutting-edge model that simulates the complex, two-way interaction between atmospheric conditions and fire behavior, allowing the fire to influence local weather and vice-versa.
*   **Artificial Intelligence:** Using NVIDIA's FourCastNet model, the project seeks to make forecasts faster and less computationally expensive than with traditional models. The AI is intended to learn and account for the unknown physics of wildfires at smaller scales, improving the accuracy of predictions.
