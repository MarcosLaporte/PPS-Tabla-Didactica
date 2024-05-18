import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pp2.app',
  appName: 'PPS-PP-App2',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      launchShowDuration: 1000,
      splashFullScreen: false
    }
  }
};

export default config;
