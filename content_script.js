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


            if (element.innerText.toLowerCase() == "periode sip") {
                let periode_sip = list_td[td_index + 2].innerText

                let periode_sips = periode_sip.split(" s/d ")

                let tanggal1Dates = periode_sips[0].split(" ")

                let tanggal1 = new Date(tanggal1Dates[2],)
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