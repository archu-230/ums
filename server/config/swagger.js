const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "User Management REST API built with Node.js, Express, MongoDB, JWT Authentication, Refresh Tokens, Pagination, Validation, and Swagger Documentation.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
                components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                }
            }
        }

    },

    apis: ["./routes/**/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;