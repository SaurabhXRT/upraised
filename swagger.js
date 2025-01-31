const swaggerAutogen= require('swagger-autogen');

const doc = {
  info: {
    title: 'gadgets API',
    description: 'All RESTAPI LISTED HERE',
  },
  host: process.env.SWAGGER_HOST,
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen()(outputFile, routes, doc);
