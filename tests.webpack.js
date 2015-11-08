var context = require.context('./src/universal', true, /-test\.js$/);
context.keys().forEach(context);
