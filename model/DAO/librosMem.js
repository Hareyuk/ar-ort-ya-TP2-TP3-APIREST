
class ModelMem {
    #libros

    constructor() {
        this.#libros = [
            { id: '1',  title: 'Un enemigo del pueblo', author: "Henrik Ibsen", price: 1234.56,    stock: 2 },
            { id: '2',  title: 'El mar que nos trajo', author: "Griselda Gambaro", price: 2345.67,    stock: 4 },
            { id: '3',  title: 'El pájaro azul', author: "Maurice Maeterlinck", price: 3456.78,    stock: 2 },
        ]
    }

    obtenerLibros = async () => this.#libros

    obtenerLibro = async id => {
        const libro = this.#libros.find(p => p.id === id)
        return libro || {}
    }

    guardarLibro = async libro => {
        libro.id = String(parseInt(this.#libros[this.#libros.length-1]?.id || 0) + 1)   // ?. -> optional chaining
        //Agregado para que sean numéricos los valores sí o sí.
        libro.price = Number(libro.price)
        libro.stock = Number(libro.stock)
        this.#libros.push(libro)
        return libro
    }

    actualizarLibro = async (id,libro) => {
        const index = this.#libros.findIndex(p => p.id === id)
        if(index != -1) {
            const libroAnt = this.#libros[index]
            const libroAct = { ...libroAnt, ...libro }
            this.#libros.splice(index, 1, libroAct)
            return libroAct
        }
        else {
            return null
        }
    }

    borrarLibro = async id => {
        const index = this.#libros.findIndex(p => p.id === id)
        if(index != -1) {
            const libro = this.#libros.splice(index, 1)[0]
            return libro
        }
        else {
            return null
        }
    }
}

export default ModelMem