"use client"

import { LicenseInfo } from '@mui/x-data-grid-premium';
import { MUI_LICENSE_KEY } from '@/lib/constants';

export function initializeMUILicense() {
  try {
    LicenseInfo.setLicenseKey(MUI_LICENSE_KEY);
  } catch (error) {
    console.error('Error setting MUI license:', error);
  }
}