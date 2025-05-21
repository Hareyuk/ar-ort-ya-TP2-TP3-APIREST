import fs from 'fs'


class ModelFile {
    #nombreArchivo

    constructor() {
        this.#nombreArchivo = 'libros.json'
    }

    #leerArchivo = async nombre => {
        let libros = []
        try {
            libros = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch { }

        return libros
    }

    #escribirArchivo = async (nombre, libros) => {
        await fs.promises.writeFile(nombre, JSON.stringify(libros, null, '\t'))
    }

    obtenerLibros = async () => {
        return await this.#leerArchivo(this.#nombreArchivo)
    }

    obtenerLibro = async id => {
        const libros = await this.#leerArchivo(this.#nombreArchivo)
        const libro = libros.find(p => p.id === id)
        return libro || {}
    }

    guardarLibro = async libro => {
        const libros = await this.#leerArchivo(this.#nombreArchivo)
        libro.id = String(parseInt(libros[libros.length - 1]?.id || 0) + 1)   // ?. -> optional chaining
        libros.push(libro)
        await this.#escribirArchivo(this.#nombreArchivo, libros)
        return libro
    }

    actualizarLibro = async (id, libro) => {
        const libros = await this.#leerArchivo(this.#nombreArchivo)
        const index = libros.findIndex(p => p.id === id)
        if (index != -1) {
            const libroAnt = libros[index]
            const libroAct = { ...libroAnt, ...libro }
            libros.splice(index, 1, libroAct)
            await this.#escribirArchivo(this.#nombreArchivo, libros)
            return libroAct
        }
        else {
            return null
        }
    }

    borrarLibro = async id => {
        const libros = await this.#leerArchivo(this.#nombreArchivo)
        const index = libros.findIndex(p => p.id === id)
        if (index != -1) {
            const libro = libros.splice(index, 1)[0]
            await this.#escribirArchivo(this.#nombreArchivo, libros)
            return libro
        }
        else {
            return null
        }
    }
}

export default ModelFile