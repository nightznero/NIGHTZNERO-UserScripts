// ==UserScript==
// @name         LocalCDN by NIGHTZNERO
// @namespace    https://github.com/NIGHTZNERO
// @author       NIGHTZNERO
// @description  UserScript that emulates Content Delivery Networks to improve your online privacy. It intercepts traffic, finds supported resources locally, and injects them into the environment
// @version      1.0
// @updateURL    https://github.com/NIGHTZNERO/NIGHTZNERO-UserScripts/raw/main/LocalCDN/LocalCDN.js
// @downloadURL  https://github.com/NIGHTZNERO/NIGHTZNERO-UserScripts/raw/main/LocalCDN/LocalCDN.js
// @icon         https://i.ibb.co/t2z13Dq/Local-CDN-NIGHTZNERO.png
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const cdnMapping = {
        "https://ajax.aspnetcdn.com": "https://your-local-server/aspnetcdn",
        "https://ajax.cloudflare.com": "https://your-local-server/cloudflare",
        "https://ajax.googleapis.com": "https://your-local-server/googleapis",
        "https://ajax.loli.net": "https://your-local-server/loli",
        "https://ajax.loli.net.cdn.cloudflare.net": "https://your-local-server/loli.cloudflare",
        "https://ajax.microsoft.com": "https://your-local-server/microsoft",
        "https://ajax.proxy.ustclug.org": "https://your-local-server/ustclug",
        "https://akamai-webcdn.kgstatic.net": "https://your-local-server/kgstatic",
        "https://akamai-webcdn.kgstatic.net.edgesuite.net": "https://your-local-server/kgstatic.edgesuite",
        "https://apps.bdimg.com": "https://your-local-server/bdimg",
        "https://apps.bdimg.jomodns.com": "https://your-local-server/bdimg.jomodns",
        "https://cdn.bootcdn.net": "https://your-local-server/bootcdn",
        "https://cdn.bootcdn.net.maoyundns.com": "https://your-local-server/bootcdn.maoyundns",
        "https://cdn.bootcss.com": "https://your-local-server/bootcss",
        "https://cdn.bootcss.com.maoyundns.com": "https://your-local-server/bootcss.maoyundns",
        "https://cdn.datatables.net": "https://your-local-server/datatables",
        "https://cdn.embed.ly": "https://your-local-server/embed",
        "https://cdn.embed.ly.cdn.cloudflare.net": "https://your-local-server/embed.cloudflare",
        "https://cdnjs.cloudflare.com": "https://your-local-server/cloudflare",
        "https://cdn.jsdelivr.net": "https://your-local-server/jsdelivr",
        "https://cdn.jsdelivr.net.cdn.cloudflare.net": "https://your-local-server/jsdelivr.cloudflare",
        "https://cdnjs.loli.net": "https://your-local-server/loli",
        "https://cdnjs.loli.net.cdn.cloudflare.net": "https://your-local-server/loli.cloudflare",
        "https://cdn.materialdesignicons.com": "https://your-local-server/materialdesignicons",
        "https://cdn.mathjax.org": "https://your-local-server/mathjax",
        "https://cdn.plyr.io": "https://your-local-server/plyr",
        "https://cdn.ravenjs.com": "https://your-local-server/ravenjs",
        "https://cdn.staticfile.org": "https://your-local-server/staticfile",
        "https://cds.s5x3j6q5.hwcdn.net": "https://your-local-server/s5x3j6q5",
        "https://code.jquery.com": "https://your-local-server/jquery",
        "https://developer.n.shifen.com": "https://your-local-server/shifen",
        "https://dualstack.osff.map.fastly.net": "https://your-local-server/fastly",
        "https://fonts.googleapis.com": "https://your-local-server/google-fonts",
        "https://fonts.gstatic.com": "https://your-local-server/gstatic",
        "https://fonts.loli.net": "https://your-local-server/fonts.loli",
        "https://fonts.loli.net.cdn.cloudflare.net": "https://your-local-server/fonts.loli.cloudflare",
        "https://gateway.cname.ustclug.org": "https://your-local-server/ustclug",
        "https://gitcdn.github.io": "https://your-local-server/gitcdn",
        "https://gstaticadssl.l.google.com": "https://your-local-server/gstaticadssl",
        "https://iduwdjf.qiniudns.com": "https://your-local-server/qiniudns",
        "https://js.appboycdn.com": "https://your-local-server/appboycdn",
        "https://lb.sae.sina.com.cn": "https://your-local-server/sina",
        "https://lib.baomitu.com": "https://your-local-server/baomitu",
        "https://lib.baomitu.com.qh-cdn.com": "https://your-local-server/baomitu.qh",
        "https://libs.baidu.com": "https://your-local-server/baidu",
        "https://lib.sinaapp.com": "https://your-local-server/sinaapp",
        "https://mat1.gtimg.com": "https://your-local-server/gtimg",
        "https://mat1.gtimg.com.tegsea.tc.qq.com": "https://your-local-server/gtimg.tegsea",
        "https://materialdesignicons.b-cdn.net": "https://your-local-server/materialdesignicons.b-cdn",
        "https://mathjax.rstudio.com": "https://your-local-server/mathjax.rstudio",
        "https://maxcdn.bootstrapcdn.com": "https://your-local-server/bootstrap",
        "https://mscomajax.vo.msecnd.net": "https://your-local-server/mscomajax",
        "https://netdna.bootstrapcdn.com": "https://your-local-server/bootstrap.netdna",
        "https://pagecdn.io": "https://your-local-server/pagecdn",
        "https://sdn.geekzu.org": "https://your-local-server/geekzu",
        "https://sdn.inbond.gslb.geekzu.org": "https://your-local-server/geekzu.inbond",
        "https://stackpath.bootstrapcdn.com": "https://your-local-server/stackpath",
        "https://unpkg.com": "https://your-local-server/unpkg",
        "https://upcdn.b0.upaiyun.com": "https://your-local-server/upaiyun",
        "https://use.fontawesome.com": "https://your-local-server/fontawesome",
        "https://use.fontawesome.com.cdn.cloudflare.net": "https://your-local-server/fontawesome.cloudflare",
        "https://vjs.zencdn.net": "https://your-local-server/zencdn",
        "https://vo.aicdn.com": "https://your-local-server/aicdn",
        "https://yandex.st": "https://your-local-server/yandex",
        "https://yastatic.net": "https://your-local-server/yastatic"
    };

    const replaceResource = (node, newSrc) => {
        const newNode = document.createElement(node.tagName);
        newNode.src = newSrc;
        newNode.onload = function() {
            console.log(`Loaded: ${newSrc}`);
        };
        newNode.onerror = function() {
            console.error(`Failed to load: ${newSrc}`);
        };
        node.parentNode.replaceChild(newNode, node);
    };

    const observeMutations = (mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'SCRIPT' || node.tagName === 'LINK') {
                        const src = node.src || node.href;
                        if (cdnMapping[src]) {
                            replaceResource(node, cdnMapping[src]);
                        }
                    }
                });
            }
        });
    };

    const observer = new MutationObserver(observeMutations);
    observer.observe(document, {
        childList: true,
        subtree: true
    });

    // Check existing scripts and styles
    document.querySelectorAll('script, link').forEach(node => {
        const src = node.src || node.href;
        if (cdnMapping[src]) {
            replaceResource(node, cdnMapping[src]);
        }
    });

})();
