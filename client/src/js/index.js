import { Workbox } from 'workbox-window';
import '../css/styles.css';

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox('./src-sw.js');
  workboxSW.register();
  console.log('Service worker has been registered!')
} else {
  console.error('Service workers are not supported in this browser.');
}
