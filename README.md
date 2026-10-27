# kraken-dashboard

NZXT CAM web integration for the Kraken Elite circular display.

## Project structure

- `index.html` contains the dashboard markup and clock face.
- `styles.css` contains the circular layout, theme, and animations.
- `script.js` updates the clock and renders monitoring data from the NZXT CAM callback.

Open `index.html` in a browser for a visual preview. In NZXT CAM, the integration
receives system readings through `window.nzxt.v1.onMonitoringDataUpdate`.