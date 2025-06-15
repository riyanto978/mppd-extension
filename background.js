


(() => {
    chrome.action.onClicked.addListener(async (tab) => {

        if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

        chrome.tabs.sendMessage(tab.id, { type: "hello" })

        // console.log('sdjadnajn');
        // chrome.tabs.create({
        //     url: "https://www.google.com",
        //     active: false
        // }).then((e) => {
        //     console.log(e);
        // })

        // alert("hsshsh")


        // chrome.scripting.executeScript(
        //     {
        //         target: { tabId: tab.id },
        //         files: ['myscript.js'],
        //     });




    });


    chrome.runtime.onMessage.addListener((req, sender, response) => {


        console.log(req.message);

        if (req.message.type == "nama") {
            chrome.tabs.create({
                url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${req.message.value.replaceAll(" ", "+")}&status=all`,
                active: false
            })

            chrome.tabs.create({
                url: `https://admin.mppdigital.go.id/sim/permohonan?cari=${req.message.value.replaceAll(" ", "+")}&status=tolak`,
                active: false
            })
        }


        console.log('ada masuk dari content 1');

    })
})()