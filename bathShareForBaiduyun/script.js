(function () {
    let div = document.createElement("div");
    // div.setAttribute("id", "shareWindow");
    // div.setAttribute("style", "position: fixed;z-index: 999;right: 0;");
    let html = "<div id='shareWindow' style='position: fixed;z-index: 999;right: 0;'><button id='batchShare'>批量单独分享</button><button id='toggleResult' style=''>显示/关闭结果</button></div><div id='shareResult' style='display: none;position: relative;background-color: wheat;margin: auto;padding-top: .5rem;font-size: 16px;scroll-behavior: auto;text-align: center;max-width: 50%;z-index: 900;' contenteditable='true'>空空</div>";
    div.innerHTML = html;
    let result = [];
    document.getElementsByTagName("body")[0].append(div);
    document.getElementById("batchShare").onclick = function () {
        let list = [];
        result = [];
        document.querySelectorAll('.vdAfKMb dd.icP4Eo').forEach(function (e, index) {
            e.classList.remove("icP4Eo");
            list.push(e.attributes._position.value);
        });
        console.log(list);
        if (!list.length > 0) {
            alert('请选择要分享的文件');
        }
        loop(list);
    };

    document.getElementById("toggleResult").onclick = function () {
        console.log(result);
        if ("block" === document.getElementById("shareResult").style.display) {
            document.getElementById("shareResult").style.display = "none";
            return;
        }
        let str = "";
        for (let k in result) {
            str += k + ": " + result[k][0] + " ; 提取码:" + result[k][1] + "\r\n";
        }
        document.getElementById("shareResult").innerText = str;
        document.getElementById("shareResult").style.display = "block";
    };

    function loop(list) {
        let n = list.shift();
        if (!n) {
            return;
        }
        let t = document.querySelector("dd[_position='" + n + "']");
        triggerEvent(t, "click");
        document.querySelector("[data-button-id='b41']").click();

        let i1 = setInterval(function () {
            let forever = document.querySelector(".choose-list li");
            if (forever) {
                clearInterval(i1);
                triggerEvent(forever, "mousedown");
                document.querySelector("[class='g-button g-button-large g-button-blue-large sbtn create']").click();
                let i2 = setInterval(function () {
                    let pw = document.querySelector("input.share-password").value;
                    let href = document.querySelector("input.share-url").value;
                    let file = document.querySelector("#share .select-text").innerText.replace("分享文件(夹):", '');
                    if (pw.length > 0 && href.length > 0) {
                        clearInterval(i2);
                        console.log(file, href, pw);
                        let r = [];
                        result[file] = [href, pw];
                        if (!(list.length > 0)) {
                            document.querySelector("[class='g-button g-button-large g-button-large-gray abtn close']").click();
                            document.querySelector("#toggleResult").click();
                            alert('done');
                        }
                        loop(list);
                    }
                }, 100);
            }
        }, 100);
    }

    function triggerEvent(el, eventName) {
        try {
            var evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
            el.dispatchEvent(evt);
        } catch (e) {
            console.log(e)
        }
    }
})();

