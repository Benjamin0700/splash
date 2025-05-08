import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    https: {
      key: './localhost-key.pem',  // путь к приватному ключу
      cert: './localhost.pem',     // путь к сертификату
    },
  },
});
