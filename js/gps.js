// js/gps.js
import { supabase } from './supabase.js';

let watchId = null;

export function startTracking(playerId) {
  if (!navigator.geolocation) return;
  watchId = navigator.geolocation.watchPosition(
    async ({ coords: { latitude: lat, longitude: lng } }) => {
      await supabase.from('players')
        .update({ lat, lng, location_updated_at: new Date().toISOString() })
        .eq('id', playerId);
    },
    err => console.warn('GPS error:', err),
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  );
}

export function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}
