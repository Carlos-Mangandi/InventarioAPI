import 'reflect-metadata'
import Server from './server/server.js'
import dotenv from 'dotenv'
import { AppDataSource } from './data-source'

dotenv.config()

const server = new Server()
    server.listen()

    AppDataSource.initialize().then(async(conection) =>{
        if(conection){
            console.log(`==> Conection with data base successfully <==`)
        }
    }).catch((error) => console.log(error + 'Conection database failed') + error)
