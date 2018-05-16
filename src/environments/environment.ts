// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAnE4wvCllTBVz97JnhsB8lcH9oMRFGmH4",
    authDomain: "vublog-fcfc4.firebaseapp.com",
    databaseURL: "https://vublog-fcfc4.firebaseio.com",
    projectId: "vublog-fcfc4",
    storageBucket: "vublog-fcfc4.appspot.com",
    messagingSenderId: "733910365153"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
