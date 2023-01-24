const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')

dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Red Social API",
            description: "Servidor de una red social",
            version: "1.0.0"
        },
        servers: [{ url: process.env.HOST_CLOUD }],
        tags: [{
            name: "User",
            description: "Operations about user"
        }, {
            name: "Publications",
            description: "Operations about Post"
        }],
        components: {
            securitySchemes: {
                jwtAuth: {
                    description: `<strong>Add 'JWT' before insert token :</strong> "JWT 2sdasd.....dsdsdsd"`,
                    type: 'apiKey',
                    in: "header",
                    name: 'Authorization'
                }
            },
            schemas: {
                user: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'nickName', 'password', 'gender', 'birthday'],
                    properties: {
                        firstName: {
                            type: 'string',
                            example: "John"
                        },
                        lastName: {
                            type: 'string',
                            example: "Doe"
                        },
                        email: {
                            type: 'string',
                            format: "date",
                            example: "name@email.com"
                        },
                        nickName: {
                            type: 'string',
                            example: "aka"
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            example: "pass1234"
                        },
                        gender: {
                            type: 'string',
                            example: "male"
                        },
                        birthday: {
                            type: "string",
                            format: "date",
                            example: "1945-12-12"
                        },
                    }
                },
                post: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: "uuid",
                            example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        },
                        userId: {
                            type: 'string',
                            format: "uuid",
                            example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        },
                        content: {
                            type: "string",
                            example: "new post"
                        }
                    }
                },
                follow: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: "uuid",
                            example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        },
                        firstName: {
                            type: 'string',
                            example: "NameONE"
                        },
                        lastName: {
                            type: "string",
                            example: "LastNameTWO"
                        }
                    }
                }
            }
        },
        paths: {
            "/api/v1/users": {
                post: {
                    tags: [
                        "User"
                    ],
                    summary: "Add a new User",
                    description: "Add a new User to red social",
                    operationId: "addUser",
                    requestBody: {
                        description: "After registering, a verification email will be sent to your email",
                        content: {
                            "application/json": {
                                schema: {
                                    "$ref": "#/components/schemas/user"
                                }
                            }
                        },
                        required: true
                    },
                    responses: {
                        201: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        "$ref": "#/components/schemas/user"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    }
                },
                get: {
                    tags: [
                        "User"
                    ],
                    summary: "get all Users",
                    description: "search all users of the social network",
                    operationId: "findAllUser",
                    responses: {
                        200: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            properties: {
                                                id: {
                                                    type: 'string', example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                                },
                                                firstName: {
                                                    type: 'string', example: "Name"
                                                },
                                                lastName: {
                                                    type: 'string', example: "LastName"
                                                },
                                                email: {
                                                    type: 'string', format: "date", example: "unknown@email.com"
                                                },
                                                gender: {
                                                    type: 'string', example: "male"
                                                },
                                                birthday: {
                                                    type: "string", format: "date", example: "1925-12-12"
                                                },
                                                nickName: {
                                                    type: 'string', example: "aka"
                                                },
                                                isVerified: {
                                                    type: 'boolean', example: "false"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    }
                }
            }
        }
    },
    apis: ["src/users/users.router.js","src/follows/follows.router.js","src/posts/posts.router.js","src/auth/auth.router.js"]
}


const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
    console.log(
        `SWAGGER HOST: /api/v1/docs `
    );
}

module.exports = { swaggerDocs }