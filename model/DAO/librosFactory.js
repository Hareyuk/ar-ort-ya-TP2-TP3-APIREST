import ModelMem from './librosMem.js'
import ModelFile from './librosFile.js'
import ModelMongoDB from './librosMongoDB.js'

class ModelFactory {
    static get(tipo) {
        switch(tipo) {
            case 'MEM':
                console.log('*** Persistiendo en Memoria ***')
                return new ModelMem()

            case 'FILE':
                console.log('*** Persistiendo en file system ***')
                return new ModelFile()

            case 'MONGODB':
                console.log('*** Persistiendo en MongoDB ***')
                return new ModelMongoDB()

            default:
                console.log('*** Persistiendo en Memoria (default) ***')
                return new ModelMem()
        }
    }
}

export default ModelFactory