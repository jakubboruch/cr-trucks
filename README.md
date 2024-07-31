## Frontend Developer Task

The goal of the task is to create a page with a form for managing truck data. The form should be integrated with the mock API available at the following address:
http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com/

The page is to be a part of the first module of the ERP application. It is assumed that there will be more modules for managing different resources (e.g. employee, factory, customer) in the future.

The user should be able to perform CRUD operations on a given resource, taking into account that each truck:

- must have unique alphanumeric code
- must have a name
- must have a status included in the following set: "Out Of Service", "Loading", "To Job", "At Job", "Returning"
    - "Out Of Service" status can be set regardless of the current status of the Truck
    - each status can be set if the current status of the Truck is "Out of service"
    - the remaining statuses can only be changed in the following order:
      Loading -> To Job -> At Job -> Returning
    - when Truck has "Returning" status it can start "Loading" again.
- may have a description

To complete the task, use one of the following frameworks: Vue.js 3, React or AngularJS 1.x

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
