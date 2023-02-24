# Kepler Wizard

[Read about project](./TASK.md)

## Development

-   install nodejs and npm
-   install node dependencies `npm ci`
-   set up [default env variables](./.env)
-   run docker db `npm run db`
-   run development services:
    -   frontend [fron app](./packages/front/src/main.tsx) `npm run dev:front`
    -   develop [back app](./packages/back/src/main.ts) `npm run dev:back`
    -   or both `npm run dev`
