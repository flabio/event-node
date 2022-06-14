const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            rol: '/api/rol',
            user: '/api/user',
            organization: '/api/organization',
            typeevent: '/api/type_event',
            event: '/api/event',
        }
        //conecta db
        this.conectarDB()
        // Middleware
        this.middlewares();
        //rutas de mi app
        this.routes();

    }
    async conectarDB() {
        await dbConnection()
    }
    middlewares() {
        //lectura y parseo body
        this.app.use(express.json())
        // CORS
        this.app.use(cors())
        //Directorio public
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routers/authRouter'));
        this.app.use(this.paths.user, require('../routers/userRouter'));
        this.app.use(this.paths.rol, require('../routers/rolRouter'));
        this.app.use(this.paths.organization, require('../routers/organizationRouter'));
        this.app.use(this.paths.typeevent, require('../routers/typeeventRouter'));
        this.app.use(this.paths.event, require('../routers/eventRouter'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port ", this.port)
        });
    }
}

module.exports = Server