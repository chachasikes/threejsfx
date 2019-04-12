import {Blob} from "./js/Blob.js";

window.onload = (blarg) => {
	let blob = 0
	function gotohash() {
		if(blob && blob.renderer) document.body.removeChild(blob.renderer.domElement) // HACK
		let hash = window.location.hash.substr(1).replace('.js', '');
		if(!hash || !hash.length) return
    console.log( hash, examples);
    if (examples[hash] !== undefined) blob = new Blob(examples[hash]);
	}
	window.addEventListener("hashchange", gotohash)
	gotohash()
}
