import express from 'express'
import handlebars from 'express-handlebars'
import router  from './routes.js'

const app = express()
const PORT = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/productos', router)

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', async(req, res) => {
    res.render('agregarProductos')
})

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})

app.on('error', (err) => console.log('Error: ', err))


