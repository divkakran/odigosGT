// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseImageUrl: 'assets/images/',
  baseApiUrl: 'http://testing.birdapps.org/guide-v2/cms/api-v5/',
  paySuccess: 'http://testing.birdapps.org/guide-v2/cms/payu/success_web.php',
  furl      : 'http://testing.birdapps.org/guide-v2/cms/payu/fail_web.php',
  payULive  : 'https://test.payu.in/_payment' 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
