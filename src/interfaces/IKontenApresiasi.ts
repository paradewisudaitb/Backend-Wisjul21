/**
 * Atribut yang ada di model kontenApresiasi (Apresiasi dari HMJ)
 */

export type tipeApresiasi =
  |'poster'
  |'website'
  |'video'
  |'lagu'
  |'puisi'
  |'other';

export interface kontenApresiasiAttributes {
  idApresiasi: number;
  idHimpunan: number;
  linkKonten: string;
  linkThumbnail: string;
  tipeKonten: tipeApresiasi;
}