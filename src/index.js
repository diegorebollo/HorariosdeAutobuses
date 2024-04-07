import Fastify from "fastify";
import cros from '@fastify/cors'
import { PrismaClient } from "@prisma/client";
import {scrap} from "../scripts/scraper.js";

const app = Fastify({
    logger: true
});
await app.register(cros,{})

const prisma = new PrismaClient();

app.get('/api/estaciones', async (req, reply) => {    
    const {s} = req.query;

    if(s) {
        const busquedaEstaciones = await prisma.estacion.findMany({
            take: 4,
            where:{
                name: {
                    startsWith: s
                }
            }
        })
        return busquedaEstaciones;
    } else {
        const allEstaciones = await prisma.estacion.findMany();
        return allEstaciones;
    }
    

});

app.get('/api/busqueda/:origenId/:destinoId', async (request, reply) => {
    const origenId = Number(request.params.origenId);
    const destinoId = Number(request.params.destinoId);

    if(isNaN(origenId)|| isNaN(destinoId)){
        reply.status(400).send({ msg: 'Params must be numbers' });
        return;
    };

    const origen = await prisma.estacion.findFirst({
        where: {
            id: origenId
        }
    });

    const destino = await prisma.estacion.findFirst({
        where: {
            id: destinoId
        }
    });

    if (!origen) {
        reply.status(400).send({ msg: `Estación with ID ${origenId} not found.` });
        return;
    }

    if (!destino) {
        reply.status(400).send({ msg: `Estación with ID ${destinoId} not found.` });
        return;
    }

    const ruta = await prisma.ruta.findFirst({
        where: {
            origenId: origen.id,
            destinoId: destino.id
        },
        include: {
            estacionOrigen: true,
            estacionDestino: true
        }                
    })

    if(ruta == null){

        const rawData = await scrap(origen.id, destino.id);
        const isRawDataValid = rawData === null ? false : true;
        const newRuta = await prisma.ruta.create({
            data:{
                origenId: origen.id,
                destinoId: destino.id,
                isValid: isRawDataValid,
                data: rawData,
            },
            include: {
                estacionOrigen: true,
                estacionDestino: true
            } 
        })

        return newRuta

    } else {
        return ruta
    }

})

try{
    app.listen({port: 3000});
} catch (error) {
    app.log.error(error);
    process.exit(1);
}
