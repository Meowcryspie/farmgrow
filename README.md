# 🌱 EC Link · Autogrow EC Mini Remote Management

> **Live Demo:** [https://meowcryspie.github.io/farmgrow/](https://meowcryspie.github.io/farmgrow/)

A modern, high-precision remote management and monitoring application for **Autogrow EC Mini** nutrient controllers across commercial greenhouse and indoor hydroponic farms.

---

## 🚀 Live Public Access

The web app is live on GitHub Pages:
👉 **[https://meowcryspie.github.io/farmgrow/](https://meowcryspie.github.io/farmgrow/)**

---

## ✨ Features & Modern UX

* **Emerald Noir OLED Dark Mode & Daylight Botany Themes**: Clean light botanical daylight theme and high-contrast OLED dark mode with ambient glows.
* **Realistic Device Chassis Simulator**: Dynamic Island status bar (`9:41`, Wi-Fi, 5G, battery level) and iPhone 16 Pro chassis with one-click full-screen expander.
* **Live Telemetry & Heartbeat Radar**: Real-time sensor micro-drift simulation ($\pm 0.02$ EC and $\pm 0.1$ °C jitter every 3.5s) with pulsing beacons and latency indicators.
* **Animated Dosing Engine**: Real-time nutrient pump simulation with rotational motor animation, liquid fill progress meter, customizable injection volumes (`10ml`, `20ml`, `50ml`), and instant toast notifications.
* **Interactive History Chart & Scrubber**: Touch/cursor scrubbing on EC history with glowing safe-operating tolerance bands, delta vs setpoint, and relative timestamps.
* **Curved EC Sweep Gauge**: High-contrast radial gauge displaying safe corridor limits, alarm thresholds, and target setpoint notches.
* **Dual Customer & Admin Workspaces**: Customer mobile PWA view and comprehensive desktop Fleet Overview console with device provisioning and batch updates.

---

## 🛠️ Tech Stack

* **React 19** + **TypeScript**
* **Vite 8**
* **React Router 7** (with GitHub Pages SPA routing and 404 redirection)
* **Playwright** (End-to-End browser acceptance tests)
* **Oxlint**

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Meowcryspie/farmgrow.git
cd farmgrow

# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build
npm run build

# Run Playwright E2E tests
npx playwright test
```
