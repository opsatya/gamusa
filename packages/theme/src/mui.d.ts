import type * as React from 'react';

declare module '@mui/material/styles' {
  interface CustomShadows {
    z1: string;
    z4: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  }

  interface Theme {
    customShadows: CustomShadows;
  }

  interface ThemeOptions {
    customShadows?: CustomShadows;
  }

  interface PaletteColor {
    lighter: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface Shape {
    borderRadiusXs: number;
    borderRadiusSm: number;
    borderRadiusMd: number;
  }

  interface BreakpointOverrides {
    laptop: true;
  }

  interface CommonColors {
    orange: string;
    blue: string;
    purple: string;
    pink: string;
    pinkLight: string;
    pinkDark: string;
  }

  interface TypographyVariants {
    // Body scale: XS(10) → S(12) → Base(13) → M(14) → L(16)
    bodyLRegular: React.CSSProperties;
    bodyLMedium: React.CSSProperties;
    bodyLSemibold: React.CSSProperties;
    bodyLBold: React.CSSProperties;

    bodyMRegular: React.CSSProperties;
    bodyMMedium: React.CSSProperties;
    bodyMSemibold: React.CSSProperties;
    bodyMBold: React.CSSProperties;

    bodyBaseRegular: React.CSSProperties;
    bodyBaseMedium: React.CSSProperties;
    bodyBaseSemibold: React.CSSProperties;
    bodyBaseBold: React.CSSProperties;

    bodySRegular: React.CSSProperties;
    bodySMedium: React.CSSProperties;
    bodySSemibold: React.CSSProperties;
    bodySBold: React.CSSProperties;

    bodyXSRegular: React.CSSProperties;
    bodyXSMedium: React.CSSProperties;
    bodyXSSemibold: React.CSSProperties;
    bodyXSBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyLRegular?: React.CSSProperties;
    bodyLMedium?: React.CSSProperties;
    bodyLSemibold?: React.CSSProperties;
    bodyLBold?: React.CSSProperties;

    bodyMRegular?: React.CSSProperties;
    bodyMMedium?: React.CSSProperties;
    bodyMSemibold?: React.CSSProperties;
    bodyMBold?: React.CSSProperties;

    bodyBaseRegular?: React.CSSProperties;
    bodyBaseMedium?: React.CSSProperties;
    bodyBaseSemibold?: React.CSSProperties;
    bodyBaseBold?: React.CSSProperties;

    bodySRegular?: React.CSSProperties;
    bodySMedium?: React.CSSProperties;
    bodySSemibold?: React.CSSProperties;
    bodySBold?: React.CSSProperties;

    bodyXSRegular?: React.CSSProperties;
    bodyXSMedium?: React.CSSProperties;
    bodyXSSemibold?: React.CSSProperties;
    bodyXSBold?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyLRegular: true;
    bodyLMedium: true;
    bodyLSemibold: true;
    bodyLBold: true;

    bodyMRegular: true;
    bodyMMedium: true;
    bodyMSemibold: true;
    bodyMBold: true;

    bodyBaseRegular: true;
    bodyBaseMedium: true;
    bodyBaseSemibold: true;
    bodyBaseBold: true;

    bodySRegular: true;
    bodySMedium: true;
    bodySSemibold: true;
    bodySBold: true;

    bodyXSRegular: true;
    bodyXSMedium: true;
    bodyXSSemibold: true;
    bodyXSBold: true;
  }
}
