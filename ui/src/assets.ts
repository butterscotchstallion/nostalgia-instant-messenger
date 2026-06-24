// Static assets live in /public/nim-assets and are served from the site root.
export const asset = (name: string): string => `/nim-assets/${name}`;

// Buddy icons live in /public/buddy-icons and are served from the site root.
export const buddyIcon = (name: string): string => `/buddy-icons/${name}`;
