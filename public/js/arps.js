function randomLinearArp(audioCtx, osc, scale, length, speed, feel) {
	for (var i = 0; i < length; i++) {
		var random = feel ? Math.floor(Math.random() * feel) : 0;
		osc.frequency.setValueAtTime(scale[numInRange(30, 58)], audioCtx.currentTime + (i / speed) + random);
	}
}

function randomFreqArp(audioCtx, osc, length, speed, feel) {
	for (var i = 0; i < length; i++) {
		var random = feel ? Math.floor(Math.random() * feel) : 0;
		osc.frequency.setValueAtTime(numInRangeLarge(500, 550), audioCtx.currentTime + (i / speed) + random);
	}
}

function wordArp(audioCtx, osc, scale, arrayOfLetters, speed, repeatInterval, feel) {
	var charCode;
	var letters = [].slice.call(arrayOfLetters);
	var random = feel ? Math.floor(Math.random() * feel) : 0;

	// osc.start();
	vibrato(osc);

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
			osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + (i / speed) + random);
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
			osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + (i / speed) + random);
		}
	}, repeatInterval)

	return interval;
}

function vibrato(osc) {
	osc.start();
	var plusOrMinus = true;
	return setInterval(function() {
		if (plusOrMinus) {
			osc.frequency.value -= 10;
		} else {
			osc.frequency.value += 10;
		}
		plusOrMinus = !plusOrMinus;
	}, 100);
}