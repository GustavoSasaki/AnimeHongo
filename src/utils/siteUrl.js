const dev = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line import/prefer-default-export
export const server = dev ? 'http://localhost:3000' : 'https://anime-hongo.vercel.app';
