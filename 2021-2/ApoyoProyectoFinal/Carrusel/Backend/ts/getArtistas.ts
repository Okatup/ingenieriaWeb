import {Artistas} from './Artistas';
require('dotenv').config();
//CONEXION A LA DB
const Pool=require('pg').Pool;
const pool = new Pool({
    user: process.env.USUARIO,
    host: process.env.LOCALHOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

console.log(process.env.DB_USER);

const GetArtistas= (req:any, res:any) => {
    let ListaArtistas=new Array<Artistas>();
    pool.query(`SELECT * FROM "Artistas"`, (err:any, respuesta:any) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of respuesta.rows) {
            ListaArtistas.push(row);
        }
         console.log(ListaArtistas);
        res.send(JSON.stringify({"status":"ok","items":ListaArtistas}));
        //client.end();
        
})
}

module.exports={
    GetArtistas
}