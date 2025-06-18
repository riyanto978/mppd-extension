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
        }


        if (req.message.type == "nik") {

            let nik = req.message.value

            if (siimutTabsId == 0) {
                chrome.tabs.create({
                    url: `https://siimut.semarangkota.go.id/index.php?r=laporan%2Flistdatabynik&nik=${nik}`,
                    active: false
                }, (tab) => {
                    siimutTabsId = tab.id

                    chrome.storage.local.set({ siimutTabsId: tab.id })
                })


            } else {
                chrome.tabs.update(siimutTabsId, {
                    url: `https://siimut.semarangkota.go.id/index.php?r=laporan%2Flistdatabynik&nik=${nik}`,
                    active: false
                })
            }

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