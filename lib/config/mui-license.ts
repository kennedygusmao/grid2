"use client"

import { LicenseInfo } from '@mui/x-data-grid-premium';

const MUI_LICENSE_KEY = 'b768012debc3f04b7d25d7c2c2b34f72Tz01ODk0MSxFPTE3MTU4NzE5OTQwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=';

export function initializeMUILicense() {
  if (typeof window !== 'undefined') {
    try {
      LicenseInfo.setLicenseKey(MUI_LICENSE_KEY);
    } catch (error) {
      console.error('Error initializing MUI X license:', error);
    }
  }
}