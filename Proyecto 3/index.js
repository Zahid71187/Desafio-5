import express from 'express'
import router  from './routes.js'

const app = express()
const PORT = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/productos', router)


app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
    res.render('agregarProductos', { exitoso: false, error: false})
})

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})

app.on('error', (err) => console.log('Error: ', err))


