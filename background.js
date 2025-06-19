(() => {


    let allMppdTabsId = 0
    let tolakmppdTabsId = 0
    let siimutTabsId = 0
    let sisdmkTabsId = 0

    chrome.action.onClicked.addListener(async (tab) => {

        if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

        chrome.tabs.sendMessage(tab.id, { type: "hello" })
    });

    chrome.tabs.onRemoved.addListener(
        (tab) => {
            if (allMppdTabsId == tab) {
                allMppdTabsId = 0
                chrome.storage.local.set({ allMppdTabsId: 0 })

            }

            if (tolakmppdTabsId == tab) {
                tolakmppdTabsId = 0
                chrome.storage.local.set({ tolakmppdTabsId: 0 })
            }

            if (siimutTabsId == tab) {
                siimutTabsId = 0
                chrome.storage.local.set({ siimutTabsId: 0 })
            }

            if (sisdmkTabsId == tab) {
                sisdmkTabsId = 0
                chrome.storage.local.set({ sisdmkTabsId: 0 })
            }
        }
    )

    chrome.tabs.onUpdated.addListener(async (tabsId) => {


        try {
            let allMppdTabsIdObj = await chrome.storage.local.get(["allMppdTabsId"])
            allMppdTabsId = Object.keys(allMppdTabsIdObj).length == 0 ? 0 : allMppdTabsIdObj.allMppdTabsId
            let tolakmppdTabsIdObj = await chrome.storage.local.get(["tolakmppdTabsId"])
            tolakmppdTabsId = Object.keys(tolakmppdTabsIdObj).length == 0 ? 0 : tolakmppdTabsIdObj.tolakmppdTabsId
            let siimutTabsIdObj = await chrome.storage.local.get(["siimutTabsId"])
            siimutTabsId = Object.keys(siimutTabsIdObj).length == 0 ? 0 : siimutTabsIdObj.siimutTabsId
            let sisdmkTabsIdObj = await chrome.storage.local.get(["sisdmkTabsId"])
            sisdmkTabsId = Object.keys(sisdmkTabsIdObj).length == 0 ? 0 : sisdmkTabsIdObj.sisdmkTabsId
        } catch (error) {

        }

    })






    chrome.commands.onCommand.addListener(async (command) => {
        if (command !== "do-script") return;

        let [tab] = await chrome.tabs.query({ active: true })

        if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

        chrome.tabs.sendMessage(tab.id, { type: "hello" })
    });


    chrome.runtime.onMessage.addListener(async (req, sender, response) => {

        if (req.message.type == "generate") {
            let [tab] = await chrome.tabs.query({ active: true })

            chrome.tabs.sendMessage(tab.id, { type: "hello" })
        }

        if (req.message.type == "nama") {

            let nama = req.message.value.replaceAll(" ", "+")

            if (allMppdTabsId == 0) {

                chrome.tabs.create({
                    url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=all`,
                    active: false
                }, (tab) => {

                    allMppdTabsId = tab.id
                    chrome.storage.local.set({ allMppdTabsId: tab.id })
                })
            } else {
                chrome.tabs.update(allMppdTabsId, {
                    url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=all`,
                    active: false
                })
            }

            if (tolakmppdTabsId == 0) {
                chrome.tabs.create({
                    url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=tolak`,
                    active: false
                }, (tab) => {

                    tolakmppdTabsId = tab.id
                    chrome.storage.local.set({ tolakmppdTabsId: tab.id })
                })
            } else {
                chrome.tabs.update(tolakmppdTabsId, {
                    url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${nama}&status=tolak`,
                    active: false
                })
            }


            try {

                let res = await chrome.storage.local.get(["role"])
                let role = res.role ?? "ip"
                if (siimutTabsId == 0) {
                    chrome.tabs.create({
                        url: `https://izin.semarangkota.go.id:7777/index.php?LaporanSearch%5Bno_agenda%5D=&LaporanSearch%5Bstatus_sip%5D=&LaporanSearch%5Btgl_daftar%5D=&LaporanSearch%5Batas_nama%5D=${nama}&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bnama_sarana%5D=&LaporanSearch%5Blokasi%5D=&LaporanSearch%5Bpemohon_nama%5D=&LaporanSearch%5Bpemohon_alamat%5D=&LaporanSearch%5Bkelurahan%5D=&LaporanSearch%5Bproses_tahapan%5D=&LaporanSearch%5Bno_sk%5D=&LaporanSearch%5Btgl_sk%5D=&LaporanSearch%5Bspm%5D=&LaporanSearch%5Busername%5D=&r=laporan&ijin=${role}`,
                        active: false
                    }, (tab) => {
                        siimutTabsId = tab.id

                        chrome.storage.local.set({ siimutTabsId: tab.id })
                    })


                } else {
                    chrome.tabs.update(siimutTabsId, {
                        url: `https://izin.semarangkota.go.id:7777/index.php?LaporanSearch%5Bno_agenda%5D=&LaporanSearch%5Bstatus_sip%5D=&LaporanSearch%5Btgl_daftar%5D=&LaporanSearch%5Batas_nama%5D=${nama}&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bpemohon_telp%5D=&LaporanSearch%5Bnama_sarana%5D=&LaporanSearch%5Blokasi%5D=&LaporanSearch%5Bpemohon_nama%5D=&LaporanSearch%5Bpemohon_alamat%5D=&LaporanSearch%5Bkelurahan%5D=&LaporanSearch%5Bproses_tahapan%5D=&LaporanSearch%5Bno_sk%5D=&LaporanSearch%5Btgl_sk%5D=&LaporanSearch%5Bspm%5D=&LaporanSearch%5Busername%5D=&r=laporan&ijin=${role}`,
                        active: false
                    })
                }
            } catch (error) {

            }
        }


        if (req.message.type == "nik") {

            let nik = req.message.value


            if (sisdmkTabsId == 0) {
                setTimeout(() => {
                    chrome.tabs.create({
                        url: `https://sisdmk.kemkes.go.id/pencarian/nik_cek`,
                        active: false
                    }, (tab) => {
                        sisdmkTabsId = tab.id;
                        chrome.storage.local.set({ sisdmkTabsId: tab.id })

                        setTimeout(() => {
                            chrome.scripting.executeScript(
                                {
                                    target: { tabId: sisdmkTabsId },
                                    func: changeValue,
                                    args: [nik]
                                });
                        }, 5000);
                    })
                }, 1000);
            } else {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: sisdmkTabsId },
                        func: changeValue,
                        args: [nik]
                    });
            }



        }
    })
})()


const changeValue = (value) => {
    document.getElementById("nik").value = value

    document.getElementById("cek_nik").click()
}