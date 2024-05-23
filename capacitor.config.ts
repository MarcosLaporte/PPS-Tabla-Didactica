import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pp2.app',
  appName: 'Tabla de Idiomas',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      launchFadeOutDuration: 2000,
      splashFullScreen: false
    }
  }
};

export default config;
