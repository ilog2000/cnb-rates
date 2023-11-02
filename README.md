## Currency Converter

This is a simple web application to convert a limited number of currencies basing on currency exchange rates from the Czech National Bank (Česká národní banka, ČNB).

The application is built with React and TypeScript. Vite `create app` template was used to start it.
```shell
npm create vite@latest cnb-rates -- --template react-ts
```

To run the application locally, clone the repository and run:
```shell
npm run dev
```

### TODO
- [ ] Load currency exchange rates from the ČNB API only once a working day at 2pm CET.
