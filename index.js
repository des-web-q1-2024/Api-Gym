import express from 'express';
import { Evento } from './controllers/routes/routeEvento.js';
const app = express();
const port = 4000;


app.use(express.json())
app.use('/api/evento', Evento)

app.listen(port, ()=>{
	console.log(`escuchando en el puerto ${port}`)
});
