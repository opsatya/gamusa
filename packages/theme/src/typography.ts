/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the font family and styles based.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 08/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Relative Imports */
import { pxToRem } from '@lektus/utils';

// ----------------------------------------------------------------------

type FontSizeMeasurement = {
  sm: number;
  md: number;
  lg: number;
};

// ----------------------------------------------------------------------

/**
 * To set fontsize according to the width of the screen.
 *
 * @param sm - small font size
 * @param md - medium font size
 * @param lg - large font size
 * @returns font size based on the width of the screen
 */
function responsiveFontSizes({
  sm,
  md,
  lg,
}: FontSizeMeasurement): Record<string, { fontSize: string }> {
  return {
    '@media (min-width:768px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:1024px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1440px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const typography = {
  fontFamily: "'Figtree', sans-serif",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  // ------- Headings -------
  // h1–h4: responsive (landing pages scale down on mobile)
  // h5–h6: fixed (small enough, used mainly in app UI)
  // Weight tapers with size — bold for major headings, semibold for minor ones
  h1: {
    fontWeight: 700,
    lineHeight: 1.1,
    ...responsiveFontSizes({ sm: 32, md: 40, lg: 48 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.15,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 36 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.2,
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 28 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.3,
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 }),
  },
  h5: { fontWeight: 600, lineHeight: 1.4, fontSize: pxToRem(16) },
  h6: { fontWeight: 600, lineHeight: 1.5, fontSize: pxToRem(14) },

  // ------- MUI standard variants (used internally by MUI components) -------
  // Standard body — 13px is the base size for paragraphs, inputs, labels, etc.
  subtitle1: { fontWeight: 600, fontSize: pxToRem(14), lineHeight: 1.5 },
  subtitle2: { fontWeight: 500, fontSize: pxToRem(13), lineHeight: 1.5 },
  body1: { fontWeight: 400, fontSize: pxToRem(13), lineHeight: 1.5 },
  body2: { fontWeight: 400, fontSize: pxToRem(12), lineHeight: 1.5 },
  caption: { fontWeight: 400, fontSize: pxToRem(11), lineHeight: 1.5 },
  overline: {
    fontWeight: 600,
    fontSize: pxToRem(10),
    letterSpacing: 1.2,
    lineHeight: 1.5,
  },
  button: { fontWeight: 500, fontSize: pxToRem(14), lineHeight: 1.5 },

  // ------- Design token system — size × weight -------
  // Scale: XS(10) → S(12) → Base(13) → M(14) → L(16)

  // Large — 16px
  bodyLRegular: { fontWeight: 400, fontSize: pxToRem(16), lineHeight: 1.5 },
  bodyLMedium: { fontWeight: 500, fontSize: pxToRem(16), lineHeight: 1.5 },
  bodyLSemibold: { fontWeight: 600, fontSize: pxToRem(16), lineHeight: 1.5 },
  bodyLBold: { fontWeight: 700, fontSize: pxToRem(16), lineHeight: 1.5 },

  // Medium — 14px
  bodyMRegular: { fontWeight: 400, fontSize: pxToRem(14), lineHeight: 1.5 },
  bodyMMedium: { fontWeight: 500, fontSize: pxToRem(14), lineHeight: 1.5 },
  bodyMSemibold: { fontWeight: 600, fontSize: pxToRem(14), lineHeight: 1.5 },
  bodyMBold: { fontWeight: 700, fontSize: pxToRem(14), lineHeight: 1.5 },

  // Base — 13px (standard body size: paragraphs, inputs, labels, table cells)
  bodyBaseRegular: { fontWeight: 400, fontSize: pxToRem(13), lineHeight: 1.6 },
  bodyBaseMedium: { fontWeight: 500, fontSize: pxToRem(13), lineHeight: 1.6 },
  bodyBaseSemibold: { fontWeight: 600, fontSize: pxToRem(13), lineHeight: 1.6 },
  bodyBaseBold: { fontWeight: 700, fontSize: pxToRem(13), lineHeight: 1.6 },

  // Small — 12px
  bodySRegular: { fontWeight: 400, fontSize: pxToRem(12), lineHeight: 1.5 },
  bodySMedium: { fontWeight: 500, fontSize: pxToRem(12), lineHeight: 1.5 },
  bodySSemibold: { fontWeight: 600, fontSize: pxToRem(12), lineHeight: 1.5 },
  bodySBold: { fontWeight: 700, fontSize: pxToRem(12), lineHeight: 1.5 },

  // XSmall — 10px
  bodyXSRegular: { fontWeight: 400, fontSize: pxToRem(10), lineHeight: 1.5 },
  bodyXSMedium: { fontWeight: 500, fontSize: pxToRem(10), lineHeight: 1.5 },
  bodyXSSemibold: { fontWeight: 600, fontSize: pxToRem(10), lineHeight: 1.5 },
  bodyXSBold: { fontWeight: 700, fontSize: pxToRem(10), lineHeight: 1.5 },
};

export default typography;
