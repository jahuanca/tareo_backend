'use-strict'

const { setup, serve} = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Cliente API",
        description: "API Informacion",
        contact: {
          name: "Jhuanca"
        },
        servers: ["http://localhost:3002"]
      }
    },
    apis: ['routes/*.js']
    //apis: ["app.js"]
};

const swaggerDocs= swaggerJsDoc(swaggerOptions)

module.exports={
    path: "/api-docs", serve: serve, setUp: setup(swaggerDocs)
}