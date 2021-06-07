/**
 * Contoh service buat buka konesi ke database
 */

import conn from '../connections/db';

export default async (): Promise<number> => {
  try {
    const test = await conn.authenticate();
    console.log(test);
    return 0;
  } catch (error) {
    // throw new error('Gagal membuat koneksi ke database');
    return -1;
  }
};