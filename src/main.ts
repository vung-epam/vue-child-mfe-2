import { createAuth0 } from '@auth0/auth0-vue';
import Aura from '@primeuix/themes/aura';
import * as Sentry from '@sentry/vue';
import { createSentryPiniaPlugin } from '@sentry/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import { router } from './routers/index.ts';
import { queryClient } from './shared/plugins/queryClient.ts';

const pinia = createPinia();

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render(props: Record<string, unknown>) {
      const { theme } = props as {
        theme?: { darkMode?: boolean; locale?: string };
      };
      return h(App, { theme });
    },
    serverPort: 4103,
  },
  handleInstance: (app) => {
    Sentry.init({
      app,
      dsn: 'https://0d344f744e0f6d6337d4d5348ab9a169@o4511460243472384.ingest.us.sentry.io/4511460269359104',
      sendDefaultPii: true,
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.5,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
    app.use(router);
    app.use(pinia);
    app.use(PrimeVue, { theme: { preset: Aura } });
    pinia.use(createSentryPiniaPlugin());
    app.use(VueQueryPlugin, { queryClient });
    app.use(
      createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        },
      }),
    );
  },
});

const mountVue = () => {
  const app = createApp(App, { theme: { darkMode: false, locale: 'mock' } });
  Sentry.init({
    app,
    dsn: 'https://0d344f744e0f6d6337d4d5348ab9a169@o4511460243472384.ingest.us.sentry.io/4511460269359104',
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.5,
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
  app.use(router);
  app.use(pinia);
  pinia.use(createSentryPiniaPlugin());
  app.use(PrimeVue, { theme: { preset: Aura } });
  app.use(VueQueryPlugin, { queryClient });

  app.use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      },
    }),
  );
  app.mount('#app');
};

if (import.meta.env.MODE === 'development' && document.getElementById('app')) {
  mountVue();
}

export const bootstrap = async (props: Record<string, unknown>) => {
  console.log('Child Vue App 2: Bootstrapping');
  await vueLifecycles.bootstrap(props);
};

export const mount = async (props: Record<string, unknown>) => {
  console.log('Child Vue App 2: Mounting with props:', props);
  await vueLifecycles.mount(props);
};

export const unmount = async (props: Record<string, unknown>) => {
  console.log(
    'Child Vue App 2: Cleaning up state stores before unmounting DOM.',
  );
  await vueLifecycles.unmount(props);
};
