import { ValidationError } from 'sequelize/types';
import { WisudawanInput } from '../interfaces/IWisudawan';
import { getJurusanFromNama } from '../models/jurusan';
import Wisudawan, { create as createWisudawan } from '../models/wisudawan';
import HttpException from '../routes/middleware/HttpException';

/**
 * "Layanan" (bukan layanan beneran, cuman fungsi antara) untuk membuat
 * wisudawan baru. Akan melemparkan HttpException 400 jika:
 * - data jurusan tidak valid, atau
 * - data unik sudah ada yang menggunakan
 * Dapat juga melemparkan HttpExcception 500.
 * @param wisudawanInput Data wisudawan
 * @returns Object Wisudawan yang dibuat
 * @throws HttpException
 * @async
 */
export const newWisudawan = async (wisudawanInput: WisudawanInput): Promise<Wisudawan> => {
  if (!wisudawanInput.jurusan) {
    throw new HttpException(400, `Jurusan: ${wisudawanInput.jurusan} invalid`);
  }
  const jurusan = await getJurusanFromNama(wisudawanInput.jurusan);
  if (!jurusan) {
    throw new HttpException(400, `Jurusan: ${wisudawanInput.jurusan} invalid`);
  }

  try {
    return await createWisudawan(
      wisudawanInput.nim,
      jurusan.idJurusan,
      wisudawanInput.namaLengkap,
      wisudawanInput.namaPanggilan,
      wisudawanInput.linkPasFoto,
      wisudawanInput.judulTA,
      wisudawanInput.funFact,
      wisudawanInput.tipsSukses,
      wisudawanInput.email,
      wisudawanInput.kotaAsal,
      wisudawanInput.tanggalLahir,
      wisudawanInput.angkatan,
      wisudawanInput.karya,
      wisudawanInput.kontribusi,
      wisudawanInput.lembaga,
      wisudawanInput.pretasi,
    );
  } catch (_) {
    const e: ValidationError = _;
    if (e.errors) {
      // e adalah UniqueConstraintError
      console.error(e.errors);
      let str = '';
      for (const eDetail of e.errors) {
        str += eDetail.message;
        str += '\n';
      }
      str += 'Jika ingin mengupdate data harap hubungi divisi Website/divis Relasi.';
      throw new HttpException(400, str);
    } else {
      // unknown error
      console.error(_);
      throw new HttpException(500, 'Something bad happened. Call the admins at jspmarcello@live.com');
    }
  }
};
