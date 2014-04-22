function powerOn() {
	document.getElementById("boot").style.display = 'block';
	document.getElementById("pwr").style.background = 'red';
	document.getElementById('bing').play();
}

function powerOff() {
	document.getElementById("boot").style.display = 'none';
	document.getElementById("pwr").style.background = '#444';
	document.getElementById('bing').stop();
}