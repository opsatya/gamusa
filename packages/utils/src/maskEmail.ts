export const maskEmail = (email: string): string => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  if (!domain) return email;

  // Mask logic: keep first 2 chars, mask rest of username
  const maskedUsername =
    username.length > 2
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;

  return `${maskedUsername}@${domain}`;
};
