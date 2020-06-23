import {Router} from 'express'
import AppointmentRouter from './appointements.routes'
const router = Router()

router.use('/appointments', AppointmentRouter)
/*
O primeiro parâmetro da linha acima indica que todas as rotas disponíveis
no arquivo auxiliar AppointmentRouter serão acessados através de /appointments/{nome da rota}
Desas forma, podemos declarar as rotas dentro do arquivo somente com "/"
*/





export default router



