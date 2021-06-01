/**
 * Contoh service buat buka konesi ke database
 */

import c from '../connections';

export default async (): Promise<number> => {
  const conn =  c.db;

  try {
    const test = await conn.authenticate();
    console.log(test);
    return 0;
  } catch (error) {
    // throw new error('Gagal membuat koneksi ke database');
    return -1;
  }
}