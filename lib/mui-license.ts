"use client"

import { LicenseInfo } from '@mui/x-data-grid-premium';

export function initializeMUILicense() {
  if (typeof window !== 'undefined') {
    try {
      LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE_KEY || 'test-license-1234');
    } catch (error) {
      console.warn('Warning: Using test license key for MUI X Data Grid Premium');
    }
  }
}