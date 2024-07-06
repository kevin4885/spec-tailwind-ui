import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.js',
    },
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'Speculated Tailwind UI',
            formats: ['es', 'umd'],
            fileName: (format) => `spec-tailwind-ui.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                interop: 'auto',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
