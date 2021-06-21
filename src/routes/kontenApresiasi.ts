import { Router } from 'express';
import { uploader, multerUpload as upload } from './middleware/uploader';
import HttpException from './middleware/HttpException';
import {create as createKarya, getApresiasiByNamaHimpunan, getApresiasiByidHimpunan} from '../models/kontenApresiasi';
import { getIdHimpunan } from '../services/jurusan';

const router = Router();

export default (app: Router): void => {
    app.use('/kontenApresiasi', router);

    router.post('/uploadKonten', upload.single('kontenApresiasi'), (req, res, next) => {
        const namaHimpunan = req.body.nama?.toString();
        const tipeApresiasi = req.body.tipeApresiasi;
        const idHimpunan = 7; //untuk testing pake idHimpunan Himatika
        const fname = `[${Date.now()}]${req.file.originalname}`;
        const path = `https://wisjul21.sgp1.cdn.digitaloceanspaces.com/kontenApresiasi/${fname}`;
        try {
            uploader(req.file, path);
            createKarya( idHimpunan, path, path, tipeApresiasi); //masih ada parameter linkThumbnail
            res.status(201).send({ filename: fname });
        } catch(err) {
            console.log(err);
            next(err);
        }
    });

    router.get('/get', async (req, res, next) => {
        const namaHimpunan = req.query.namaHimpunan?.toString();
        if(!namaHimpunan) {
            const e = new HttpException(400, 'Tidak bisa mencari konten apresiasi tanpa nama himpunan.');
            next(e);
        } else {
            try {
                const kontenApresiasi = await getApresiasiByNamaHimpunan(namaHimpunan);
                res.json(kontenApresiasi);
            } catch(err) {
                console.error(err);
                next(err);
            }
        }
    });
};
