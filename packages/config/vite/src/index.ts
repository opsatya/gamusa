import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export interface LektusViteOptions {
  /** Port for local dev server */
  port: number;
  /** URL base path e.g. '/recruitment' */
  basePath: string;
  /** Absolute path to the app's src directory — pass: path.resolve(__dirname, 'src') */
  srcDir: string;
}

export function createViteConfig(options: LektusViteOptions): UserConfig {
  return defineConfig({
    plugins: [react()],
    base: options.basePath,
    server: {
      port: options.port,
      host: true,
    },
    resolve: {
      alias: {
        '@': options.srcDir,
      },
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-mui': [
              '@mui/material',
              '@mui/icons-material',
              '@emotion/react',
              '@emotion/styled',
            ],
          },
        },
      },
    },
  }) as UserConfig;
}
