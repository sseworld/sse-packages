const { convertJsToTs, convertJsToTsSync } = require( 'js-to-ts-converter' );

// Sync
convertJsToTsSync( 'src/index.js' );
console.log( 'Done!' );