/**
 * Atribut yang ada di model lembaga
 */
export interface PesanAttributes {
  idPesan: number,
  nim: string,
  namaPengirim: string|undefined,
  pesan: string,
}

export interface PesanInput {
  nim: string,
  namaPengirim: string | undefined,
  pesan: string,
}