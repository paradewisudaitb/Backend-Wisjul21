import { WisudawanInput } from '../interfaces/IWisudawan';
import { getJurusanFromNama } from '../models/jurusan';
import Wisudawan, { create as createWisudawan } from '../models/wisudawan';
import HttpException from '../routes/middleware/HttpException';

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
  } catch (e) {
    throw new HttpException(400, `Wisudawan dengan NIM ${wisudawanInput.nim} sudah ada`);
  }
};
