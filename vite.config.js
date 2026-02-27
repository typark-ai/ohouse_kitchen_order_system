import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        detail: 'detail.html',
        factory: 'factory.html',
        engineer: 'engineer.html',
        supplier: 'supplier.html',
        countertop: 'countertop.html',
      },
    },
  },
});
