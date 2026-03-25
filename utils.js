// js/utils.js

export function getCodeFromURL() {
  return location.pathname.split('/').pop().toUpperCase();
}

export function getClientId() {
  let id = localStorage.getItem('jltg_client_id');
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('jltg_client_id', id); }
  return id;
}

export function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

export function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

export function $(id) { return document.getElementById(id); }

export function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function catColor(cat) {
  return { timebonus: 'green', curse: 'orange', veto: 'purple', randomizer: 'blue', trap: 'red' }[cat] || 'muted';
}
export function catIcon(cat) {
  return { timebonus: '⏳', curse: '🪄', veto: '🛡️', randomizer: '🎲', trap: '🪤' }[cat] || '🃏';
}
export function questionColor(cat) {
  return { orange: 'orange', blue: 'blue', red: 'red', yellow: 'yellow' }[cat] || 'muted';
}
export function questionEmoji(cat) {
  return { orange: '🟠', blue: '🔵', red: '🔴', yellow: '🟡' }[cat] || '❓';
}
