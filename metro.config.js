// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/* 
    SQLite config
    See more: https://docs.expo.dev/versions/latest/sdk/sqlite/
*/

config.resolver.assetExts.push('db')

module.exports = config;
