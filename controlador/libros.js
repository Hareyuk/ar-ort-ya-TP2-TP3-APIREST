import Servicio from '../servicio/libros.js'


class Controlador {
    #servicio

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerLibros = async (req,res) => {
        const { id } = req.params
        const libros = await this.#servicio.obtenerLibros(id)
        res.json(libros)
    }

    guardarLibro = async (req,res) => {
        const libro = req.body
        const libroGuardado = await this.#servicio.guardarLibro(libro)
        res.json(libroGuardado)
    }

    actualizarLibro = async (req,res) => {
        const { id } = req.params
        const libro = req.body
        const libroActualizado = await this.#servicio.actualizarLibro(id, libro)
        res.status(libroActualizado? 200:404).json(libroActualizado? libroActualizado : {})
    }

    borrarLibro = async (req,res) => {
        const { id } = req.params
        const libroEliminado = await this.#servicio.borrarLibro(id)
        res.status(libroEliminado? 200:404).json(libroEliminado? libroEliminado : {})
    }
}

export default Controlador