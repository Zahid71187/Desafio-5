import  express from 'express'
import  Contenedor  from './Contenedor.js'

const  { Router } = express
const router = Router()

const contenedor = new Contenedor('productos.txt')

router.get('/', async(req, res) => {
    try{
        const productos = await contenedor.getAll()
        res.render('verProductos', { productos })
    }catch(error){
        console.log('Error: ', error)
        res.status(500).json({ error})
    }
})


router.get('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const producto = await contenedor.getById(id)

         if(!producto) return res.json({ message: 'El producto no existe '})

        res.status(200).json({
            producto
        })
    }catch(error){
        console.log('Error: ',  error)

        res.status(500).json({ error })
    }
})

router.post('/', async(req, res) => {
    try{
        const producto = req.body
        if(!producto.title || !producto.price  || !producto.thumbnail) 
        return res.render('agregarProductos', { error : true})

        await contenedor.save(producto)
        res.redirect('/')

    }catch(error){
        console.log('Error: ',  error)
        res.status(500).json({ error })
    }
})

router.put('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const producto = req.body
        console.log(id)
        console.log(producto)
        const updateProducto = await contenedor.updateById(id, producto)

        res.status(200).json({ message: updateProducto})
    }catch(error){
        console.log('Error: ', error)+
        res.status(500).json({ error})
    }

})

router.delete('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const deleteProducto = await contenedor.deleteById(id)

        res.status(200).json({ message: deleteProducto})

    }catch(error){
        console.log('Error: ', error)
        res.status(500).json({ error })
    }
})


export default router  