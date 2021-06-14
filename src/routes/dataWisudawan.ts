import { Router } from 'express';
import Wisudawan from '../models/wisudawan';
// import Jurusan from '../models/jurusan';
// import Himpunan from '../models/himpunan';
import { getJurusan, getIdHimpunan } from '../services/jurusan';
import { getHimpunan } from '../services/himpunan';
import { getKarya } from '../services/karya';
import { getKontribusi } from '../services/kontribusi';
import { getLembaga } from '../services/lembaga';
import { getPrestasi } from '../services/prestasi';
import { getWisudawan } from '../services/wisudawan';
import HttpException from './middleware/HttpException';
import { getDataToShow }  from '../models/wisudawan';

const router = Router();

export default (app: Router): void => {
  app.use('/wisudawan', router);

  /**
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua karya yang dimiliki
   *    mahasiswa dengan nim tertentu
   * }
   */
  //   router.get('/getAll', async (req, res, next) => {
  //     try {
  //       const allWisudawan = await getWisudawan();
  //       console.log(allWisudawan);
  //       res.json({
  //         prestasi: allWisudawan,
  //       });
  //     } catch (e) {
  //       console.error(e);
  //       next(e);
  //     }
  //   });

  /**
   * Dapetin array string nama berdasarkan nama himpunan atau id himpunan.
   * Jika diberikan id dan nama, maka prioritas pencarian berdasarkan id.
   * Jika diberikan keduanya dan id salah, maka dicari berdasarkan nama.
   * Melemparkan HttpExecption
   * @returns JSON: {
   *    jurusan: array of (model) string berisi nama semua jurusan di ITB
   * }
   */
  router.get('/get', async (req, res, next) => {
    const a = getDataToShow('Himpunan Mahasiswa Matematika');
    console.log(a);
    res.status(400).json(a);
    // let idMahasiswa: string | undefined;
    // if (req.query.nim) {
    //   idMahasiswa = String(req.query.nim);
    // }

    // let wisudawan: Array<Wisudawan> = [];
    // let jurusan: Array<string> = [];
    // let kontribusi: Array<string> = [];
    // let prestasi: Array<string> = [];
    // let karya: Array<string> = [];
    // let lembaga: Array<string> = [];
    // let idHimpunan: Array<number> = [];
    // let himpunan: Array<string> = [];
    // try {
    //   // cek ID dulu
    //   if (idMahasiswa) {
    //     idHimpunan = await getIdHimpunan(wisudawan[0].idJurusan);
    //     wisudawan = await getWisudawan(idMahasiswa);
    //     jurusan = await getJurusan(wisudawan[0].idJurusan);
    //     kontribusi = await getKontribusi(idMahasiswa);
    //     prestasi = await getPrestasi(idMahasiswa);
    //     karya = await getKarya(idMahasiswa);
    //     lembaga = await getLembaga(idMahasiswa);
    //     himpunan = await getHimpunan(idHimpunan[0]);

    //     if (wisudawan.length == 0) {
    //       throw new HttpException(400, `nim ${idMahasiswa} tidak valid`);
    //     }
    //   }

    //   if (wisudawan.length == 0) {
    //     throw new HttpException(400, 'Nama atau id salah.');
    //   }
    //   const a = ({
    //     himpunan : himpunan,
    //     jurusan : jurusan[0],
    //     namaLengkap : wisudawan[0].namaLengkap,
    //     nim : wisudawan[0].nim,
    //     namaPanggilan : wisudawan[0].namaPanggilan,
    //     pasfoto : wisudawan[0].pasfoto,
    //     judulTA : wisudawan[0].judulTA,
    //     funFact : wisudawan[0].funFact,
    //     tipsSukses : wisudawan[0].tipsSukses,
    //     kontribusi : kontribusi,
    //     prestasi : prestasi,
    //     karya : karya,
    //     email : wisudawan[0].email,
    //     lembaga : lembaga,
    //     kotaAsal : wisudawan[0].kotaAsal,
    //     tanggalLahir : wisudawan[0].tanggalLahir,
    //     angkatan : wisudawan[0].angkatan,
    //   });
    //   console.log(a);
    //   res.status(400).json(a);
    // } catch (e) {
    //   console.error(e);
    //   next(e);
    // }
  }
)};
