/** @type {import('next').NextConfig} */
const nextConfig = {
    // Otras configuraciones de Next.js...
    typescript: {
        // Asegúrate de incluir la ruta a tus declaraciones de tipo personalizadas
        // Esto puede ser necesario para que TypeScript las reconozca correctamente
        // Si tus declaraciones de tipo personalizadas están en un archivo llamado "custom.d.ts" en la raíz del proyecto, puedes hacer esto:
        types: ["next/types/global", "./custom.d.ts"],
    },
};

module.exports = nextConfig;
