# Endpoints yang Tersedia dan dapat Digunakan
## Wisudawan-related
### Create
- Endpoint: `/form/create`
- Method: POST
- Request body:
Content-Type: application/json
```ts
{
  nim: string,
  jurusan: string,
  namaLengkap: string,
  namaPanggilan: string,
  linkPasFoto: string,
  judulTA: string,
  funFact: string,
  tipsSukses: string,
  email: string,
  kotaAsal: string,
  tanggalLahir: Date,
  angkatan: number,
  /// comma delimited string
  pretasi?: string,
  /// comma delimited string
  karya?: string,
  /// comma delimited string
  kontribusi?: string,
  /// comma delimited string
  lembaga?: string
}
```
- Response: JSON, code: 201
```ts
{
  nim: string,
  nama: string
}
```

### Upload Foto Wisudawan
- Endpoint: `/form/uploadFoto`
- Method: POST
- Request Body:
Content-Type: Mixed (kalau pake fetch, diemin aja). Buat bikin request body,
pake class `FormData` dengan nama 'foto'.
- Contoh penggunaan:
```ts
const fd = new FormData();
fd.append('foto', data.foto[0]);
await fetch(`${API_URL}/form/uploadFoto`, {
  method: 'POST',
  headers: {
    'X-Content-Type-Options': 'nosniff',
  },
  body: fd,
})
  .then(res => res.json())
  .then(res => {
    window.alert(`${res.filname} has been uploaded.`);
  })
  .catch(err => {
    succ = false;
    console.error(err);
    window.alert(errMsg);
  });
```
- Response: JSON, code: 201
```ts
{
  filename: string
}
```

### Dapetin Semua Wisudawan Suatu Himpunan
- Endpoint: `/wisudawan/get?namaHimpunan=...` (bagian `...` diisi sama nama
lengkap himpunan)
> nama himpunan bisa diliat di [sini](./src/sql/himpunan.sql)
- Method: GET
- Request query: `namaHimpunan` (diisi nama himpunan)
- Response: Array of JSON, code: 200
```ts
[
  {
      nim: string,
      namaJurusan: string,
      namaLengkap: string,
      pasfoto: string,
      lembagaNonHMJ: array of string
  },
]
```
    - ada `,` artinya bukan cmn 1 elemen

### Dapetin Data Lengkap Seorang Wisudawan
- Endpoint: `/wisudawan/get?nim=...` (bagian `...` diisi NIM wisudawan)
- Method: GET
- Request query: `nama` (diisi NIM wisudawan)
- Response: Array of JSON (cuman 1 elemen), code: 200
```ts
[
  {
      nim: string,
      namaJurusan: string,
      namaLengkap: string,
      namaPanggilan: string,
      namaHimpunan: string,
      email: string,
      angkatan: number,
      tipsSukses: string,
      kotaAsal: string,
      tanggalLahir: date,
      judulTA: string,
      funFact: string,
      pasfoto: string
      karya: array of string,
      kontribusi: array of string,
      lembaga: array of string,
      prestasi: array of string
  }
]
```
    - **Konversi ke number dan tanggalLahir harus manual**
    - Untuk karya, prestasi, kontribusi, dan lembaga minimal ada 1 elemen

## Jurusan-related
### Dapetin Semua Jurusan
- Endpoint: `/jurusan/getAll`
- Method: GET
- Request query: none
- Response: JSON, code 200
```ts
{
  jurusan: array of string
}
```

### Dapetin jurusan sebuah himpunan
- Endpoint: `jurusan/get?nama=...` (bagian `...` diisi nama himpunan)
- Method: GET
- Request query: `nama` (diisi nama himpunan, nama himpunan bisa dilihat di
[sini](./src/sql/himpunan.sql))
- Response: JSON, code 200
```ts
{
  jurusan: array of string
}
```

## Pesan-related
### Create
- Endpoint: `/pesan/new`
- Method: POST
- Request body:
Content-Type: application/json
namaPengirim boleh dikosongin, kalau kosog otomatis jadi 'Anonymous'
```ts
{
  nim: string,
  pesan: string,
  namaPengirim?: string
}
```
- Response: JSON, code 201
```ts
{
  penerima: string,
  isi: string,
  pengirim: string
}
```

### Dapetin Pesan Untuk Seorang Wisudawan
- Endpoint: `/pesan/get?nim=...` (bagian `...` diisi NIM wisudawan)
- Method: GET
- Request query: `nim` (diisi NIM wisudawan)
- Response: Array of JSON, code 200
```ts
[
  {
    idPesan: string,
    nim: string,
    namaPengirim: string,
    pesan: string
  },
]
```
    - Array bisa >= 0 elemen
    - nama pengirim ga mungkin kosong; either yang "beneran" atau "anonymous"