# TechCore

**Languages:** English | [Español](README.es.md)

TechCore is a catalog of technology deals designed to help you find interesting products on Amazon Spain without starting your search from scratch. The home page brings together categories, featured deals, and popular products; from product pages and listings, you can review the available information and continue to Amazon if you decide to buy.

**TechCore is not a store and does not process payments.** Its purpose is to help you discover and compare products; purchases are completed on Amazon. Prices, discounts, availability, and ratings may change and should be checked on the seller’s page.

## What you can explore

- **Technology categories:** Browse by product type, such as laptops, mobile phones, headphones, peripherals, watches, or cameras, depending on the configured categories.
- **Featured deals:** View a selection of products marked as featured.
- **Popular products:** Browse items that the catalog identifies as most popular.
- **Product information:** View available details, such as current and previous prices, discount, description, features, ratings, and images.
- **Seller access:** Open the Amazon link associated with a product to check current information and make a purchase there.

The content shown depends on the products and categories loaded in the database. The interface may show empty sections if no data has been configured yet.

## How it works

1. TechCore loads the active categories and products stored in its catalog.
2. The home page presents the categories, a selection of featured deals, and popular products when available.
3. You can browse the deals listing and filter by the parameters supported by the page.
4. To buy, follow the product link to Amazon; TechCore does not handle payment or shipping.

## Run the project locally

### Requirements

- Node.js and npm.
- PostgreSQL accessible from the development environment.
- The environment variables required to connect the application to the database, according to the local configuration.

### Installation

```bash
git clone https://github.com/ericsnet/TechCore.git
cd TechCore
npm install
```

Configure the PostgreSQL connection and the environment variables used by the project configuration. Also make sure the required schema and data are prepared before starting the application.

### Development server

```bash
npm run dev
```

Open the local address shown by Next.js in the terminal.

### Checks and build

```bash
npm run lint
npm run typecheck
npm run build
```

To start the compiled version:

```bash
npm run start
```

## Project technologies

- Next.js and React for the web application.
- TypeScript for the application code.
- PostgreSQL to store products and categories.
- Drizzle ORM to query the database.
- Tailwind CSS for styling.

These tools describe how the project is built; TechCore’s purpose is to make it easier to discover technology deals.

## Project status

TechCore is under development. Visible features depend on the implemented pages and on the catalog containing valid data. Do not assume that prices update automatically or that all deals have been verified in real time.

## Authorship and license

Copyright (c) 2026 ericsnet. All rights reserved. See [`LICENSE`](LICENSE) for the terms of use.