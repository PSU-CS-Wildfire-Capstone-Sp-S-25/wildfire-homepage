---
title: "PSU Capstone Project for Wildfire Prediction"
---

## 🌲 Project Description

The **Wildfire Digital Twin** is a capstone project by Portland State University computer science students that aims to create a public website for forecasting the spread of wildfires. In response to the growing cost of wildfires—which cause billions of dollars in damage and significant loss of life and health impacts annually—this project leverages advanced open source modelings and artificial intelligence to provide critical, timely information about potential spread of any reported wildfire location. The platform is being developed first for the **Pacific Northwest**, with a design that allows for future expansion to other regions.

---

## 🔥 Introduction

Wildfires represent a critical and escalating threat, inflicting devastating economic, environmental, and human costs. As noted by AccuWeather, the economic toll of a single major wildfire event can soar into the **hundreds of billions of dollars**, while the health impacts from smoke can lead to thousands of indirect deaths.

To address this challenge, the Wildfire Digital Twin project is developing a sophisticated forecasting platform. The core of this project is the integration of two powerful technologies to make it more accessible to the public:

- **WRF-SFIRE**: A long time proven and well supported model that simulates the complex, two-way interaction between atmospheric conditions and fire behavior, allowing the fire to influence local weather and vice-versa.

- **Artificial Intelligence**: Using NVIDIA’s **FourCastNet**, the project seeks to make forecasts faster and less computationally expensive than traditional models. The AI is intended to learn and account for the unknown physics of wildfires at smaller scales, improving the accuracy of predictions.

The platform will feature a **user-friendly website** where individuals and emergency responders can report a new fire and receive a forecast of its potential spread. This tool is designed to aid in critical decisions, from mobilizing firefighting resources to planning evacuations. By providing accessible and data-driven predictions, the Wildfire Digital Twin aims to **mitigate the destructive power of wildfires** and **enhance community safety**.

---

## 🛠️ How We Started

This project began as part of the **Senior Capstone Program** at Portland State University. Our interdisciplinary team—comprised of students interested in software engineering—was mentored by the highly regarded Dr. Safa Mote, a Computational and Applied Mathematician and Systems Scientist (Physicist), with the goal of building a meaningful, real-world solution to a growing environmental crisis.

In our early phases, we:

- Researched the latest wildfire models and forecasting technologies.
- We consulted with academic mentors, under the guidance of Dr. Safa Mote, to acquire a deep understanding of the physical properties of wildfire behavior.
- Defined a roadmap to integrate real atmospheric and terrain data into a responsive, web-based forecasting platform.

From day one, our vision was to create not just a technical solution, but a **practical tool** that communities could actually use.

---

## 💡 What We've Come Up With

Over the course of development, we've built a platform that includes:

- A backend pipeline for ingesting and processing **weather, topography, and fire ignition data**.
- Integration with the **WRF-SFIRE** model for physics-based simulations.
- Experimental implementation of **FourCastNet**, an AI model for accelerated forecasting.
- An intuitive **web interface** that allows users to report a fire location and view projected spread in a map-based format.

Our tool is designed with flexibility in mind—enabling rapid updates, modular architecture, and geographic scalability.

---

## 📘 How to Use Our Tool

1. **Visit the Website**: Navigate to the homepage of the Wildfire Digital Twin.
2. **Report a Fire**: Use the interactive map to mark a fire location or enter coordinates manually.
3. **Submit**: Our system will run a forecast simulation using the integrated models.
4. **View Forecast**: Within moments, you’ll see a projected fire spread overlay based on terrain, wind, and fuel data.
5. **Access Resources**: Users can also view real-time weather overlays, evacuation zone guidance, and more.

We aim to support not only **emergency responders and agencies**, but also **community members**, **researchers**, and **local governments** looking to make informed, fast decisions in the face of wildfire threats.
