# Kepler Wizard

[Read about project](./TASK.md)

## Development

-   install nodejs and docker compose
-   install node dependencies `npm ci`
-   set up [default env variables](./.env)
-   run docker mongodb `npm run db`
-   run development services:
    -   front [fron app](./packages/front/src/main.tsx) `npm run dev:front`
    -   back [back app](./packages/back/src/main.ts) `npm run dev:back`
    -   or both `npm run dev`
