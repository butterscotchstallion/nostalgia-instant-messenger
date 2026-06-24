// Static assets live in /public/nim-assets and are served from the site root.
export const asset = (name: string): string => `/nim-assets/${name}`;
