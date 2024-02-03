const http = require("http");
const EventEmitter = require('events')

module.exports = class App {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res))
            req.parseBody(() => {
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)
                if (!emitted) {
                    res.end('<h1>404 Not found</h1>')
                }
            })
        })
    }

    use (middleware) {
        this.middlewares.push(middleware)
    }

    addRouter (router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res)
                })
            })
        })
    }

    listen(port, handler) {
        this.server.listen(port, handler)
    }

    _getRouteMask (path, method) {
        return `[${path}]:[${method}]`
    }
}