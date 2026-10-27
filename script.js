const $ = id => document.getElementById(id);

function show(id, value, digits = 0) {
  $(id).textContent = Number.isFinite(value)
    ? value.toFixed(digits) : "--";
}

function bar(id, value) {
  $(id).style.width = Number.isFinite(value)
    ? Math.max(0, Math.min(100, value)) + "%" : "0%";
}

function firstNumber(...values) {
  return values.find(v => typeof v === "number" && Number.isFinite(v));
}

function loadPercent(load, utilization) {
  const value = Number.isFinite(load) ? load * 100 : utilization;
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : NaN;
}

function render(data) {
  const cpu = data?.cpus?.[0];
  const gpu = data?.gpus?.[0];

  const cpuTemperature = firstNumber(
    cpu?.temperature, cpu?.temp
  );
  const cpuUsage = loadPercent(cpu?.load, cpu?.utilization);
  const gpuTemperature = firstNumber(
    gpu?.temperature, gpu?.temp
  );
  const gpuUsage = loadPercent(gpu?.load, gpu?.utilization);

  show("cpuTemp", cpuTemperature);
  show("cpuLoad", cpuUsage);
  show("gpuTemp", gpuTemperature);
  show("gpuLoad", gpuUsage);

  bar("cpuBar", cpuUsage);
  bar("gpuBar", gpuUsage);
  bar("cpuTempBar", cpuTemperature);
  bar("gpuTempBar", Number.isFinite(gpuTemperature)
    ? gpuTemperature : NaN);
}

window.nzxt = window.nzxt || {};
window.nzxt.v1 = window.nzxt.v1 || {};
window.nzxt.v1.onMonitoringDataUpdate = render;

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  const time = [now.getHours(), now.getMinutes()]
    .map(value => String(value).padStart(2, "0"))
    .join(":");

  $("hourHand").style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
  $("minuteHand").style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  $("secondHand").style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  $("digitalClock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);
