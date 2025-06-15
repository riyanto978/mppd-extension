
(() => {
    chrome.runtime.onMessage.addListener((ob, send, res) => {

        document.getElementById("btn_perbarui").click()

        let list_td = document.querySelectorAll("td");

        for (let td_index = 0; td_index < list_td.length; td_index++) {
            const element = list_td[td_index];

            if (element.innerText == "Nama") {
                const nama = list_td[td_index + 2].innerText

                chrome.runtime.sendMessage({
                    message: { type: "nama", value: nama }
                })
            }

            if (element.innerText == "NIK") {
                const nik = list_td[td_index + 2].innerText




                chrome.runtime.sendMessage({
                    message: { type: "nik", value: nik }
                })

            }

            if (element.innerText.toLowerCase() == "alamat fasyankes") {
                const alamat_fasyankes = list_td[td_index + 2].innerText

                if (alamat_fasyankes == "" || alamat_fasyankes == "-") {
                    // alert("Tolak Alamat Fasyankes tidak ada")
                    Swal.fire({
                        title: 'Tolak!',
                        text: 'Alamat Fasyankes Tidak Ada',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }

            if (element.innerText.toLowerCase() == "nama fasyankes") {
                const nama_fasyankes = list_td[td_index + 2].innerText

                if (nama_fasyankes == "" || nama_fasyankes == "-") {
                    // alert("Tolak Nama Fasyankes tidak ada")
                    Swal.fire({
                        title: 'Tolak!',
                        text: 'Nama Fasyankes Tidak Ada',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }




            if (element.innerText.toLowerCase() == "periode sip") {
                let periode_sip = list_td[td_index + 2].innerText

                let periode_sips = periode_sip.split(" s/d ")

                let tanggal1Dates = periode_sips[0].split(" ")
                let hari1 = tanggal1Dates[0];
                let bulan1 = months[tanggal1Dates[1]]
                let tahun1 = tanggal1Dates[2]
                // let tanggal1 = new Date(tahun1, bulan1, hari1)

                let tanggal2Dates = periode_sips[1].split(" ")
                let hari2 = tanggal2Dates[0];
                let bulan2 = months[tanggal2Dates[1]]
                let tahun2 = tanggal2Dates[2]
                // let tanggal2 = new Date(tahun2, bulan2, hari2)


                if (!(hari2 - hari1 == 0 && bulan2 - bulan1 == 0 && tahun2 - tahun1 == 5)) {


                    Swal.fire({
                        title: 'Info',
                        text: 'Check Sip Pertama',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                }

            }
        }

    })
})()


const months = {
    "Januari": 0,
    "Februari": 1,
    "Maret": 2,
    "April": 3,
    "Mei": 4,
    "Juni": 5,
    "Juli": 6,
    "Agustus": 7,
    "September": 8,
    "Oktober": 9,
    "November": 10,
    "Desember": 11
}