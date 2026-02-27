import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        detail: 'detail.html',
        factory: 'factory.html',
        engineer: 'engineer.html',
        supplier: 'supplier.html',
        countertop: 'countertop.html',
        'portal-login': 'portal-login.html',
        'admin-login': 'admin-login.html',
      },
    },
  },
});
