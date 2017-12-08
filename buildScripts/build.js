/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log( chalk.blue('Generating minified bundle for prod. This\'ll be a bit'));

webpack( webpackConfig ).run( (err, status) => {
     if(err) {
          console.log( chalk.red(err) );
          return 1;
     }

     const jsonStats = status.toJson();

     if( jsonStats.hasErrors ){
          return jsonStats.errors.map( error => console.log(chalk.red(error)));
     }

     if( jsonStats.hasWarnings ){
          console.log( chalk.yellow('Webpack generated the following warnings: '));
          jsonStats.warnings.map( warning => console.log(chalk.yellow(warning)));
     }

     console.log( `Webpack stats: ${status}`);
     console.log(chalk.green('Your app has been built for prod and written to /dist! ... p.s. you\'re pretty cool'));

     return 0;
})
