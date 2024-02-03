require('dotenv').config()
const App = require('./custom-express/App')
const router = require('./routes/routes')
const parseUrl = require('./custom-express/parseUrl')
const parseBody = require('./custom-express/parseBody')
const jsonParser = require('./custom-express/parseJson')

const PORT = process.env.PORT || 5000
const url = 'http://localhost:3000'

const app = new App()

app.use(parseUrl(url))
app.use(parseBody)
app.use(jsonParser)
app.addRouter(router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
