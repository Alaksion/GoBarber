import { Router } from 'express';
import AppointmentRouter from './appointements.routes';
import UserRouter from './users.routes';
import SessionRouter from './sessions.routes';

const router = Router();

router.use('/appointments', AppointmentRouter);
router.use('/users', UserRouter);
router.use('/session', SessionRouter);
/*
O primeiro parâmetro da linha acima indica que todas as rotas disponíveis
no arquivo auxiliar AppointmentRouter serão acessados através de /appointments/{nome da rota}
Desas forma, podemos declarar as rotas dentro do arquivo somente com "/"
*/

export default router;
