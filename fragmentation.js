function showFragment() {
    let fragmentation = window.location.hash.substring(1);

    if (fragmentation) {
        console.log(`y\n${fragmentation}`);
        try {
            document.getElementById(fragmentation).classList.add("showAtOnce");
            console.log("done!");
        } catch (e) {
            console.warn(`link fragment seems to be invalid: ${e} (fragment: ${fragmentation})`);
        }
    } else {
        console.log("n");

        hideFragment(); // FIXME: this is stupid.
    }
}

function hideFragment() {
    document.querySelectorAll(".contentbox-container").forEach(function(element) {
        element.classList.remove("showAtOnce");
    });
}

window.addEventListener("hashchange", showFragment);

showFragment();
