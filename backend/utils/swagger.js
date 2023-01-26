const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pa cuando API',
      description: 'Servidor de una facilitador de eventos',
      version: '1.0.0'
    },
    servers: [{ url: process.env.HOST_CLOUD }],
    tags: [{
      name: 'User',
      description: 'Operations about user'
    },
    {
      name: 'Publications',
      description: 'Operations about Publications'
    },
    {
      name: 'States',
      description: 'Operations about states'
    },
    {
      name: 'Cities',
      description: 'Operations about cities'
    },
    {
      name: 'Roles',
      description: 'Operations about roles'
    }
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          description: `<strong>Add 'JWT' before insert token :</strong> 'JWT 2sdasd.....dsdsdsd'`,
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      },
      schemas: {
        user: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'username'],
          properties: {
            id: {
              type: 'string',
              format: "uuid",
              example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            firstName: {
              type: 'string',
              example: 'JH'
            },
            lastName: {
              type: 'string',
              example: 'delaCruz'
            },
            email: {
              type: 'string',
              format: "email",
              example: 'quebendicion@email.com'
            },
            username: {
              type: 'string',
              example: 'jhdelacruz777'
            }
          }
        },
        Publications: {
          type: 'object',
          required: ['profile_id', 'publication_type_id', 'title', 'description', 'content', 'picture', 'city_id'],
          properties: {
            profile_id: {
              type: 'string',
              format: "uuid",
              example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            publication_type_id: {
              type: 'string',
              format: "integer",
              example: "1"
            },
            title: {
              type: 'string',
              example: 'newTitle'
            },
            description: {
              type: 'string',
              example: 'newDescription'
            },
            content: {
              type: 'string',
              example: 'newContent'
            },
            picture: {
              type: 'string',
              example: 'newPicture'
            },
            city_id: {
              type: 'string',
              format: "integer",
              example: "1"
            }
          }
        },
        States: {
          type: 'object',
          required: ['country_id', 'name'],
          properties: {
            country_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Cities: {
          type: 'object',
          required: ['state_id', 'name'],
          properties: {
            state_id: {
              type: 'string',
              example: 'John'
            },
            name: {
              type: 'string',
              example: 'Doe'
            }
          }
        },
        Roles: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'John'
            }
          }
        }
      }
    },
    paths: {
      '/api/v1/auth/sign-up': {
        post: {
          tags: [
            'User'
          ],
          summary: 'Add a new User',
          description: 'Add a new User',
          operationId: 'addUser',
          requestBody: {
            description: 'After registering, a verification email will be sent to your email',
            content: {
              'application/json': {
                schema: {
                  '$ref': '#/components/schemas/user'
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                      },
                      email: {
                        type: 'string', example: 'unknown@email.com'
                      },
                      username: {
                        type: 'string', example: 'unknown'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          }
        }
      },
      '/api/v1/auth/login ': {
        post: {
          tags: [
            'User'
          ],
          summary: 'Login to the page',
          description: 'Login to the page Pa cuando',
          operationId: 'LogIn',
          requestBody: {
            description: 'After login you will receive a token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string', example: 'unknown@email.com'
                    },
                    password: {
                      type: 'string', example: 'pass1234'
                    }
                  }
                }
              }
            },
            required: true
          },
          responses: {
            201: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string', example: 'Correct Credentials!'
                      },
                      token: {
                        type: 'string', example: '3fed23.......434&ñ#+34-'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid ID supplied'
            }
          }
        }
      },
      '/api/v1/auth/info-user ': {
        get: {
          tags: [
            'User'
          ],
          summary: 'Get my data',
          description: 'Get my information',
          operationId: 'in',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                      },
                      email: {
                        type: 'string', example: 'unknown@email.com'
                      },
                      username: {
                        type: 'string', example: 'unknown'
                      }
                    }
                  }
                }
              }
            }
          },
          security: [
            {
              jwtAuth: []
            }
          ]
        },
      },
      '/api/v1/publications ': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/publications/{publication_id}': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        },
        put: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/publications/{publication_id}/vote': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/user/{user_id}': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        },
        put: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/user/{user_id}/vote': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/user/{user_id}/publications': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },
      '/api/v1/users': {
        get: {
          tags: [
            "Publications"
          ],
          summary: "get all Publications",
          description: "search all users of the social network",
          operationId: "findAllUser",
        }
      },



    }
  },
  apis: ['src/users/users.router.js', 'src/follows/follows.router.js', 'src/posts/posts.router.js', 'src/auth/auth.router.js']
}


const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, /*port*/) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(
    `SWAGGER HOST: /api/v1/docs `
  )
}

module.exports = { swaggerDocs }