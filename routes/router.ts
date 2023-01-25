import { Router, Request, Response } from 'express';

const router = Router();

// router: es lo q se utiliza para crear las apis endpoints, o servicios rest

// Endpoints
router.get('/mensajes', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo está bien!'
    });
});

router.post('/mensajes', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;


    res.json({
        ok: true,
        cuerpo,
        de
    });
});


router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});






export default router;