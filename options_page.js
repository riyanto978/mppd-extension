document.getElementById("input-role").addEventListener("change", (ev) => {
    chrome.storage.local.set({ role: ev.target.value })
})



document.addEventListener("DOMContentLoaded", function (event) {
    chrome.storage.local.get(["role"]).then((result) => {
        document.getElementById("input-role").value = result.role ?? "ip"
    });



    // document.getElementById("generate").addEventListener("click", async (e) => {
    //     let [tab] = await chrome.tabs.query({ active: true })

    //     window.close()

    //     if (!tab.url.startsWith("https://admin.mppdigital.go.id/")) return

    //     chrome.runtime.sendMessage({
    //         message: { type: "generate", value: tab.id }
    //     })
    // })

});

