import { auto } from 'browser-unhandled-rejection';
import { serviceWorkerUpdate } from 'web-utility';
import { documentReady, render, createCell } from 'web-cell';

import { PageFrame } from './page';

auto();

self.addEventListener('unhandledrejection', event => {
  const { message } = event.reason;

  if (!message) return;

  event.preventDefault();

  self.alert(message);
});

const { serviceWorker } = window.navigator;

if (process.env.NODE_ENV !== 'development')
  serviceWorker
    ?.register('sw.js')
    .then(serviceWorkerUpdate)
    .then(worker => {
      if (window.confirm('检测到新版本，是否立即启用？'))
        worker.postMessage({ type: 'SKIP_WAITING' });
    });

serviceWorker?.addEventListener('controllerchange', () =>
  window.location.reload(),
);

documentReady.then(() => render(<PageFrame />));
