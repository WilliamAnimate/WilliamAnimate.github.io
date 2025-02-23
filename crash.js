function dom() {
    for (let i = 0; i < 32768; i++) {
        let div = document.createElement("div");
        div.className = "lag";
        document.body.appendChild(div);
    }
    requestAnimationFrame(dom);
}

window.onload = function() {
    setTimeout(dom, 0);
}
