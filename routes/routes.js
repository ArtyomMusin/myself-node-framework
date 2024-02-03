const Router = require('../custom-express/Router')

const router = new Router()

const users = [
    {_id: '213wqeqw', name: 'Andy'},
    {_id: 'sad32eads', name: 'Andrew'}
]

router.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

router.get('/users', (req, res) => {
    res.send(users)
})

router.get('/posts', (req, res) => {
    res.send('<h1>Posts!</h1>')
})

router.post('/posts', (req, res) => {
    res.send('<h1>Posts!</h1>')
})

module.exports = router