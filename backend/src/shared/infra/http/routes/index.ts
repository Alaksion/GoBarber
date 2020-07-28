import { Router } from 'express';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import UserRouter from '@modules/users/infra/http/routes/users.routes';
import AppointmentRouter from '@modules/appointments/infra/http/routes/appointements.routes';

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
