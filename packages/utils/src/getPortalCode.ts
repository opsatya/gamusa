export const getPortalCode = (): string => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length > 0) {
    const firstSegment = segments[0].toLowerCase();
    // Assuming portal codes could be recruitment, crm, etc.
    if (['recruitment', 'crm', 'intranet'].includes(firstSegment)) {
      return firstSegment;
    }
  }

  // Default fallback portal
  return 'recruitment';
};
