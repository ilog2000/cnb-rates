## Currency Converter

This is a simple web application to convert a limited number of currencies basing on currency exchange rates from the Czech National Bank (Česká národní banka, ČNB).

The application is built with React and TypeScript. Vite `create app` template was used to start it.

To run the application locally, clone the repository and run:
```shell
npm run dev
```

At the moment there is no API on the back end to get ČNB echange rates and return them to the front end. The direct request from React app to the ČNB API is blocked by the CORS policy, so the proxy capabilities (redirects/rewrites) are used:
* on local environment in Vite server (see `vite.config.ts`),
* on Vercel (see `vercel.json`),
* on Netlify (see `_redirects` in `public` folder).

### TODO
- [ ] Load currency exchange rates from the ČNB API only once a working day at 2pm CET.
