'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

var port = process.env.PORT || 8000;

var routes = {
    css: {
        method: 'GET',
        path: '/styles/{path*}',
        handler: createDirectoryRoute('styles')
    },
    js: {
        method: 'GET',
        path: '/scripts/{path*}',
        handler: createDirectoryRoute('scripts')
    },
    assets: {
        method: 'GET',
        path: '/assets/{path*}',
        handler: createDirectoryRoute('assets')
    },
    templates: {
        method: 'GET',
        path: '/templates/{path*}',
        handler: createDirectoryRoute('templates')
    },
    spa: {
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: Path.join(__dirname, '/dist/index.html')
        }
    }
};

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ host: 'localhost', port: port });

server.register(Inert, function () {
    // Add the routes
    server.route([routes.css, routes.js, routes.assets, routes.templates, routes.spa]);

    // Start the server
    server.start(() => {
        console.log('Server running at:', server.info.uri)
    });
});

function createDirectoryRoute(directory) {
    return {
        directory: {
            path: Path.join(__dirname, '/dist/', directory)
        }
    };
}

module.exports = server;