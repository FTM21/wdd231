// ═══════════════════════════════════════════════════
//  Luxembourg Chamber of Commerce — home.js
//  Handles: Weather API, Spotlights, Footer, Nav
// ═══════════════════════════════════════════════════

// ── Configuration ──
const CITY_NAME    = 'Luxembourg City';
const CITY_COORDS  = { lat: 49.6116, lon: 6.1319 };
// NOTE: Replace with your real OpenWeatherMap API key
const OWM_API_KEY  = 'YOUR_OPENWEATHERMAP_API_KEY';
const OWM_UNITS    = 'metric'; // Celsius

// ── Footer: year & last modified ──
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  'Last Modified: ' + document.lastModified;

// ── Hamburger Menu ──
const menuToggle = document.getElementById('menu-toggle');
const mainNav    = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// ═══════════════════════════════════════════════════
//  WEATHER — OpenWeatherMap API
// ═══════════════════════════════════════════════════

const WEATHER_ICONS = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '⛅',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌦️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
};

function getWeatherIcon(iconCode) {
  return WEATHER_ICONS[iconCode] || '🌡️';
}

function getDayName(timestamp, offset = 0) {
  const d = new Date((timestamp + offset) * 1000);
  return d.toLocaleDateString('en-GB', { weekday: 'short' });
}

async function loadWeather() {
  const weatherEl = document.getElementById('weather-content');
  if (!weatherEl) return;

  if (OWM_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    renderWeatherDemo(weatherEl);
    return;
  }

  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CITY_COORDS.lat}&lon=${CITY_COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`
    );

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${CITY_COORDS.lat}&lon=${CITY_COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`
    );

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error('Weather API error');
    }

    const current  = await currentRes.json();
    const forecast = await forecastRes.json();

    renderWeather(weatherEl, current, forecast);

  } catch (err) {
    console.warn('Weather load failed, using demo data:', err.message);
    renderWeatherDemo(weatherEl);
  }
}

function renderWeather(el, current, forecast) {
  const icon  = getWeatherIcon(current.weather[0].icon);
  const temp  = Math.round(current.main.temp);
  const feels = Math.round(current.main.feels_like);
  const desc  = current.weather[0].description;
  const humid = current.main.humidity;
  const wind  = Math.round(current.wind.speed * 3.6); // m/s → km/h

  // Get one reading per day from forecast (skip today)
  const days = [];
  const seen = new Set();
  const todayStr = new Date().toDateString();

  for (const item of forecast.list) {
    const d = new Date(item.dt * 1000);
    const key = d.toDateString();
    if (key === todayStr || seen.has(key)) continue;
    seen.add(key);
    days.push(item);
    if (days.length === 3) break;
  }

  el.innerHTML = `
    <div class="weather-current">
      <span class="weather-icon-large">${icon}</span>
      <div class="weather-temp-block">
        <span class="temperature">${temp}°C</span>
        <span class="description">${desc}</span>
        <span class="weather-location">${CITY_NAME}</span>
      </div>
    </div>
    <dl class="weather-details">
      <div class="weather-detail-item">
        <dt>Feels Like</dt><dd>${feels}°C</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Humidity</dt><dd>${humid}%</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Wind</dt><dd>${wind} km/h</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Conditions</dt><dd>${desc}</dd>
      </div>
    </dl>
    <p class="forecast-title">3-Day Forecast</p>
    <div class="forecast-grid">
      ${days.map(d => `
        <div class="forecast-day">
          <span class="day-name">${getDayName(d.dt)}</span>
          <span class="day-icon">${getWeatherIcon(d.weather[0].icon)}</span>
          <span class="day-temp">${Math.round(d.main.temp)}°C</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderWeatherDemo(el) {
  // Static demo data for Luxembourg in winter
  el.innerHTML = `
    <div class="weather-current">
      <span class="weather-icon-large">🌥️</span>
      <div class="weather-temp-block">
        <span class="temperature">6°C</span>
        <span class="description">Partly cloudy</span>
        <span class="weather-location">${CITY_NAME}</span>
      </div>
    </div>
    <dl class="weather-details">
      <div class="weather-detail-item">
        <dt>Feels Like</dt><dd>3°C</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Humidity</dt><dd>78%</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Wind</dt><dd>22 km/h</dd>
      </div>
      <div class="weather-detail-item">
        <dt>Conditions</dt><dd>Partly cloudy</dd>
      </div>
    </dl>
    <p class="forecast-title">3-Day Forecast</p>
    <div class="forecast-grid">
      <div class="forecast-day">
        <span class="day-name">Tomorrow</span>
        <span class="day-icon">🌧️</span>
        <span class="day-temp">4°C</span>
      </div>
      <div class="forecast-day">
        <span class="day-name">Thu</span>
        <span class="day-icon">❄️</span>
        <span class="day-temp">1°C</span>
      </div>
      <div class="forecast-day">
        <span class="day-name">Fri</span>
        <span class="day-icon">⛅</span>
        <span class="day-temp">5°C</span>
      </div>
    </div>
    <p style="font-size:0.7rem;color:rgba(255,255,255,0.3);margin-top:0.75rem;">
      Demo data — add your OpenWeatherMap API key in home.js to see live weather.
    </p>
  `;
}

// ═══════════════════════════════════════════════════
//  SPOTLIGHTS — fetch members.json
// ═══════════════════════════════════════════════════

async function loadSpotlights() {
  const container = document.getElementById('spotlight-grid');
  if (!container) return;

  try {
    const res  = await fetch('data/members.json');
    if (!res.ok) throw new Error('Could not load members data');
    const data = await res.json();

    // Filter gold & silver only
    const eligible = data.members.filter(
      m => m.membership === 'gold' || m.membership === 'silver'
    );

    // Shuffle randomly
    const shuffled = eligible.sort(() => Math.random() - 0.5);

    // Pick 2 or 3 (always 3 if enough members)
    const count    = shuffled.length >= 3 ? 3 : 2;
    const selected = shuffled.slice(0, count);

    container.innerHTML = selected.map(m => renderSpotlightCard(m)).join('');

  } catch (err) {
    console.error('Spotlights load error:', err);
    container.innerHTML = `
      <p style="color:var(--clr-muted);font-size:0.88rem;grid-column:1/-1;">
        Member spotlights are currently unavailable.
      </p>
    `;
  }
}

function renderSpotlightCard(member) {
  const levelLabel = member.membership === 'gold' ? '★ Gold Member' : '◈ Silver Member';
  const levelClass = member.membership;

  // Build logo or fallback initial badge
  const logoHtml = `
    <div class="spotlight-logo-wrap" style="width:80px;height:48px;display:flex;align-items:center;justify-content:center;background:white;border-radius:6px;border:1px solid #dde1e7;padding:6px;">
      <span style="font-family:var(--font-display);font-size:1.2rem;font-weight:700;color:var(--clr-dark);">
        ${member.name.charAt(0)}
      </span>
    </div>
  `;

  return `
    <div class="spotlight-card">
      ${logoHtml}
      <span class="spotlight-level ${levelClass}">${levelLabel}</span>
      <div class="spotlight-name">${member.name}</div>
      <div class="spotlight-info">
        <span><span class="icon">📞</span>${member.phone}</span>
        <span><span class="icon">📍</span>${member.address}</span>
      </div>
      <a href="${member.website}" target="_blank" rel="noopener" class="spotlight-website">
        🌐 Visit Website
      </a>
    </div>
  `;
}


loadWeather();
loadSpotlights();