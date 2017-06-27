function randomLinearArp(audioCtx, osc, scale, length, speed) {
	for (var i = 0; i < length; i++) {
		osc.frequency.setValueAtTime(scale[numInRange(30, 58)], audioCtx.currentTime + (i / speed));
	}
}

function wordArp(audioCtx, osc, scale, arrayOfLetters, speed, repeatInterval, isPlaying) {
	console.log(osc);
	var charCode;
	var letters = [].slice.call(arrayOfLetters);

	// if not playing already, start
	// if (!isPlaying) {
		osc.start();
	// }

	// filter out anything that isn't a letter
	letters = letters.filter(function(letter) {
		var code = letter.charCodeAt(0);
		return code > 65 && code < 90;
	})

	for (var i = 0; i < letters.length; i++) {
			charCode = (+letters[i].charCodeAt(0));
			if (charCode > 71) {
				charCode = 65 + (charCode % 7);
			}
			// pick octave range
			var octave = numInRange(2, 3);
			// pick frequency
			var frequency = scale[octave][String.fromCharCode(charCode)];
			// schedule arpeggiation
			osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + (i / speed));
	}

	// loop through and assign arpeggiation
	var interval = setInterval(() => {
		for (var i = 0; i < letters.length; i++) {
			charCode = (+letters[i].charCodeAt(0));
			if (charCode > 71) {
				charCode = 65 + (charCode % 7);
			}
			// pick octave range
			var octave = numInRange(2, 3);
			// pick frequency
			var frequency = scale[octave][String.fromCharCode(charCode)];
			// schedule arpeggiation
			osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + (i / speed));
		}
	}, repeatInterval)

	return interval;
}