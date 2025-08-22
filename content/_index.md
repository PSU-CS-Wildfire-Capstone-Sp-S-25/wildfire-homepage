## Project Description

The Wildfire Digital Twin is a Portland State University capstone project to build a public website for forecasting wildfire spread and weather. By combining advanced modeling and AI, the platform delivers timely, critical information to help reduce wildfire impacts. The initial focus is the Pacific Northwest, with plans to expand to other regions.

## Introduction

Wildfires represent a critical and escalating threat, inflicting devastating economic, environmental, and human costs. As noted by AccuWeather, the financial toll of a single major wildfire event can soar into the hundreds of billions of dollars, while the health impacts from smoke can lead to thousands of indirect deaths.
To address this challenge, the Wildfire Digital Twin project is developing a sophisticated forecasting platform. The core of this project is the integration of two powerful technologies:

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


*   **WRF-SFIRE:** A cutting-edge model that simulates the complex, two-way interaction between atmospheric conditions and fire behavior, allowing the fire to influence local weather and vice-versa.
*   **Artificial Intelligence:** Using NVIDIA's FourCastNet model, the project seeks to make forecasts faster and less computationally expensive than with traditional models. The AI is intended to learn and account for the unknown physics of wildfires at smaller scales, improving the accuracy of predictions.

---
The platform will feature a user-friendly website where individuals and emergency responders can report a new fire and receive a forecast of its potential spread. This tool is designed to aid in critical decisions, from mobilizing firefighting resources to planning evacuations. By providing accessible and data-driven predictions, the Wildfire Digital Twin aims to mitigate the destructive power of wildfires and enhance community safety.
---