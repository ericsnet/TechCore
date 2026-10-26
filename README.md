# TechCore

TechCore es un catálogo de ofertas de tecnología pensado para ayudar a encontrar productos interesantes en Amazon España sin tener que empezar la búsqueda desde cero. La página principal reúne categorías, ofertas destacadas y productos populares; desde las fichas y listados puedes revisar la información disponible y continuar en Amazon si decides comprar.

**TechCore no es una tienda ni procesa pagos.** Su función es ayudarte a descubrir y comparar productos; la compra se completa en Amazon. Los precios, descuentos, disponibilidad y valoraciones pueden cambiar y deben comprobarse en la página del vendedor.

## Qué puedes explorar

- **Categorías de tecnología:** entra por tipo de producto, por ejemplo portátiles, móviles, auriculares, periféricos, relojes o cámaras, según las categorías configuradas.
- **Ofertas destacadas:** consulta una selección de productos marcados como destacados.
- **Productos populares:** revisa los artículos que el catálogo identifica como más populares.
- **Información del producto:** consulta los datos disponibles, como precio actual y anterior, descuento, descripción, características, valoraciones e imágenes.
- **Acceso al vendedor:** abre el enlace de Amazon asociado al producto para comprobar la información vigente y realizar allí la compra.

El contenido que aparece depende de los productos y categorías cargados en la base de datos. La interfaz puede mostrar secciones vacías si todavía no hay datos configurados.

## Cómo funciona

1. TechCore carga las categorías y los productos activos guardados en su catálogo.
2. La página principal presenta las categorías, una selección de ofertas destacadas y, cuando existen, los productos populares.
3. Puedes explorar el listado de ofertas y filtrar por los parámetros que admite la página.
4. Para comprar, sigues el enlace del producto hacia Amazon; TechCore no gestiona el pago ni el envío.

## Ejecutar el proyecto en local

### Requisitos

- Node.js y npm.
- PostgreSQL accesible desde el entorno de desarrollo.
- Las variables de entorno necesarias para conectar la aplicación con la base de datos, de acuerdo con la configuración local.

### Instalación

```bash
git clone https://github.com/ericsnet/TechCore.git
cd TechCore
npm install
```

Configura la conexión a PostgreSQL y las variables de entorno que use la configuración del proyecto. Comprueba también que el esquema y los datos necesarios estén preparados antes de iniciar la aplicación.

### Servidor de desarrollo

```bash
npm run dev
```

Abre la dirección local que indique Next.js en la terminal.

### Comprobaciones y compilación

```bash
npm run lint
npm run typecheck
npm run build
```

Para iniciar la versión compilada:

```bash
npm run start
```

## Tecnologías del proyecto

- Next.js y React para la aplicación web.
- TypeScript para el código de la aplicación.
- PostgreSQL para almacenar productos y categorías.
- Drizzle ORM para consultar la base de datos.
- Tailwind CSS para los estilos.

Estas herramientas describen cómo está construido el proyecto; el propósito de TechCore es facilitar el descubrimiento de ofertas de tecnología.

## Estado del proyecto

TechCore está en desarrollo. Las funciones visibles dependen de las páginas implementadas y de que el catálogo tenga datos válidos. No debe asumirse que los precios se actualizan automáticamente ni que todas las ofertas han sido verificadas en tiempo real.

## Autoría y licencia

Copyright (c) 2026 ericsnet. All rights reserved. Consulta el archivo [`LICENSE`](LICENSE) para conocer las condiciones de uso.