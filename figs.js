#!/usr/bin/env node
/*jslint node: true, nomen: true */

'use strict';

var path = require('path'),
    nutil = require('util'),
    colors = require('colors'),
    optimist = require('optimist'),
    util = require('./util');

var argv = optimist
    .usage('Figs configuration inspector')
    .alias('h', 'help')
    .alias('s', 'stack')
    .alias('d', 'dir')
    .describe('help', 'this message')
    .describe('stack', 'print all configs in the inheritance chain')
    .describe('dir', 'shows ')
    .argv;

var root = path.dirname(global.process.mainModule.filename),
    show_colors = true;

if (argv.d) {
    root = path.resolve(root, argv.d);
}

var out = util.whereTheMagicHappens(root, process.env);

if (argv.h) {
    optimist.showHelp();
} else if (argv.s) {
    console.log(show_colors ? 'Root:  '.magenta : 'Root:  ', root);

    out.files.forEach(function (file) {
        console.log(
            show_colors ? 'Loaded:'.green : 'Loaded:',
            file[0],
            nutil.inspect(file[1], true, null, show_colors)
        );
    });

    out.envs.forEach(function (env) {
        console.log(
            show_colors ? 'Env:   '.green : 'Env:   ',
            env[0] + '=' + nutil.inspect(env[1], true, null, show_colors)
        );
    });

    console.log(
        show_colors ? 'Output:'.blue : 'Output:',
        nutil.inspect(out.config, true, null, show_colors)
    );
} else {
    console.log(nutil.inspect(out.config, true, null, show_colors));
}
