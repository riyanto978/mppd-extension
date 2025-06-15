


(() => {
    chrome.action.onClicked.addListener(async (tab) => {

        if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

        chrome.tabs.sendMessage(tab.id, { type: "hello" })
    });

    chrome.commands.onCommand.addListener(async (command) => {
        if (command !== "do-script") return;

        let [tab] = await chrome.tabs.query({ active: true })

        if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

        chrome.tabs.sendMessage(tab.id, { type: "hello" })
    });


    chrome.runtime.onMessage.addListener((req, sender, response) => {

        if (req.message.type == "nama") {

            let nama = req.message.value.replaceAll(" ", "+")

            chrome.tabs.create({
                url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=all`,
                active: false
            })

            chrome.tabs.create({
                url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=tolak`,
                active: false
            })

            chrome.tabs.create({
                url: `https://izin.semarangkota.go.id:7777/index.php?LaporanSearch%5Bno_agenda%5D=&LaporanSearch%5Bstatus_sip%5D=&LaporanSearch%5Btgl_daftar%5D=&LaporanSearch%5Batas_nama%5D=${nama}&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bnama_sarana%5D=&LaporanSearch%5Blokasi%5D=&LaporanSearch%5Bpemohon_nama%5D=&LaporanSearch%5Bpemohon_alamat%5D=&LaporanSearch%5Bkelurahan%5D=&LaporanSearch%5Bnama_kantor%5D=&LaporanSearch%5Bproses_tahapan%5D=&LaporanSearch%5Bno_sk%5D=&LaporanSearch%5Btgl_sk%5D=&LaporanSearch%5Bspm%5D=&LaporanSearch%5Busername%5D=&r=laporan%2Findex`,
                active: false
            })
        }


        if (req.message.type == "nik") {

            let sisdmkTabId = 0
            let nik = req.message.value

            setTimeout(() => {

                chrome.tabs.create({
                    url: `https://sisdmk.kemkes.go.id/pencarian/nik_cek`,
                    active: false
                }, (e) => {
                    sisdmkTabId = e.id;
                })
            }, 1000);


            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: sisdmkTabId },
                        func: changeValue,
                        args: [nik]
                    });
            }, 5000);
        }
    })
})()


const changeValue = (value) => {
    document.getElementById("nik").value = value

    document.getElementById("cek_nik").click()
}