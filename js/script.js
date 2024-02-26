if (window.location.hash.substring(1) != "force_disable_redirect") {
	try {
		redirectAddEventlisteners();
	} catch (e) {
		console.error(`failed to register redirect (<a>) eventlisteners. maybe this page has none. ${e}`);
		// so scripts keep executing. this error is non fatal.
	}
}

/**
 * adds eventlisteners to the anchor element. when clicked, this will trigger the redirect animation.
 * however, if the first hash of the window is "force_disable_redirect" then it will not redirect.
 */
function redirectAddEventlisteners() {
	const anchorElements = document.querySelectorAll("a");

	anchorElements.forEach(ae => {
		if (!ae.classList.contains("js-no-smooth-redirect")) {
			ae.addEventListener("click", function(e) {
				e.preventDefault();

				// FIXME: somehow change this to a switch? it isn't working for some reason.
				if (ae.classList.contains("js-redirect-animate-id-links")) {
					console.log("a");
				} else if (ae.classList.contains("b")) {
					console.log("should never get here");
				} else {
					console.log("default");
				}
				// switch (ae.classList.contains) {
				// 	case "js-redirect-animate-id-links":
				// 		console.log("a");
				// 		break;
				// 	default:
				// 		console.log("default");
				// 		break;
				// }
				redirectLoadContent(this.getAttribute("href"));
			});
		}
	});
}

/**
 * this will fade out the webpage and then fade it back in.
 * @param {string} url the url to load content from
 */
function redirectLoadContent(url) {
	document.body.style.opacity = 0;

	let next;
	fetch(url)
		.then(response => response.text())
		.then(html => next = html)
		.catch(error => {
			console.error("Can't get webpage, guess i'll force redirect now. ", error)
			window.location = `${url}#force_disable_redirect`;
		});

	setTimeout(() => {
		if (next) {
			document.body.innerHTML = next; // TODO: replace the entire thing, instead of just the body.
			document.body.style.opacity = 1; // TODO: css on document.body
			redirectAddEventlisteners();
		} else {
			// TODO: implement edge case.
			console.warn("not enough time was given to load the next navigation, redirecting manually.");
			window.location = url;
		}

		window.history.pushState({}, "", url);
	}, 200);
}
