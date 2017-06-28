var Blooms = function () {
    this.interval = Math.floor(Math.random() * 500);
    this.direction = true;
    this.saying = '';
    this.blooms = [];
};

$(document).ready(function() {

    var newBloomEvent = new Event('newBloom');
    // new blooms instance
    var session = new Blooms();
    // create saying fields to be populated by user input
    var $text = $('<p class="saying"></p>');

    // Web Audio stuff
    var audioCtx = new AudioContext();
    var notes = createNoteTable();
    var linearNotes = createLinearNoteTable();
    var mainOsc = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.2;
    mainOsc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    var isPlaying = false;
    var bloomHasBeenClicked = false;

    $('.bloomSubmit').on('click', function(e) {
        // check if osc is playing -- if so, stop and flip flag
        if (isPlaying) {
            mainOsc.stop();
            isPlaying = false;
        }
        // create main oscillator
        mainOsc = audioCtx.createOscillator();
        mainOsc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        session.saying = $('input').val();
        session.blooms.push(session.saying.toUpperCase().split(''));
        $text.text(session.saying);
        $('input').val('');
        $('.col-sm-4').append($text);
        responsiveVoice.speak(session.saying);

        // add element to footer, e.g., "ONE" --> when clicked, plays that bloom and it's spoken by the computer
        var $link = $('<a href="#"></a>');
        var $bloom = $('<li class="bloomSaying"></li>');
        $bloom.attr('id', session.blooms.length);
        // $link.attr('class', 'bloomSaying');
        $bloom.text('BLOOM ' + (session.blooms.length));
        $link.append($bloom);
        $('.plus').append($link);
        $('.plus').append('<hr/>');
        document.dispatchEvent(newBloomEvent);
    });

    var bloomRepeatsInterval;
    var bloomOsc = [];
    var orbalism;

    document.addEventListener('newBloom', function() {
        $('.bloomSaying').on('click', function(e) {
            var bloomID  = $(this).attr('id');
            console.log(bloomOsc);
            var letters = session.blooms[+bloomID - 1];
            if (letters && !bloomHasBeenClicked) {
                // if ((+bloomID === (bloomOsc.length + 1)) && !bloomHasBeenClicked) {
                    var newOsc = audioCtx.createOscillator();
                    newOsc.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    bloomOsc[+bloomID - 1] = newOsc;
                    bloomRepeatsInterval = wordArp(audioCtx, bloomOsc[+bloomID - 1], notes, letters, 3, 5000);
                // }
            }
            var directions = ["margin-left", "margin-right", "margin-bottom", "margin-top"];
            var flag = false;
            if (!bloomHasBeenClicked) {
                orbalism = setInterval(function() {
                    $('.orb').each(function() {
                        var whichDirectionIndex = Math.floor(Math.random() * 100) % 4;
                        var otherDirectionIndex = Math.floor(Math.random() * 100) % 4;
                        var amount = Math.floor(Math.random() * 100) + "px";
                        var direction = flag ? "+" : "-";
                        var movement = {};
                        movement[`${directions[whichDirectionIndex]}`] = `${direction}${amount}`;
                        movement[`${directions[otherDirectionIndex]}`] = `${direction}${amount}`;
                        $(this).animate(movement);
                        flag = !flag;
                    }, 100);
                });
            }
            bloomHasBeenClicked = true;
         });
    });

    // click on orb fades them out
    $('.orb').on('click', function(e) {

        $(this).css('background-color', getRandomColor());

        if (mainOsc === null) {
            mainOsc = audioCtx.createOscillator();
            mainOsc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
        }

        randomLinearArp(audioCtx, mainOsc, linearNotes, 3, 3);

        var noteIndex = numInRange(30, 58);
        // var gainNode = audioCtx.createGain();

        // var mainOsc = audioCtx.createmainOscillator();
        // mainOsc.frequency.setValueAtTime(linearNotes[noteIndex], audioCtx.currentTime);
        gainNode.gain.value = 0.2;
        // mainOsc.connect(gainNode);
        // gainNode.connect(audioCtx.destination);
        if (!isPlaying) {
            mainOsc.start();
            isPlaying = true;
        }

        // setTimeout(() => {
        //     if (linearNotes[noteIndex+1]) {
        //         mainOsc.frequency.setValueAtTime(linearNotes[noteIndex+1], audioCtx.currentTime);
        //     } else {
        //         mainOsc.frequency.setValueAtTime(linearNotes[noteIndex-1], audioCtx.currentTime);
        //     }
        // }, 1000);
        // setTimeout(() => {
        //     gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 8);
        // }, 5000)
        // setTimeout(() => {
        //     mainOsc.stop();
        // }, 8000);

        // randomize increment of movement
        var direction = '';
        if (session.direction) {
            direction = '+';
        } else {
            direction = '-';
        }

        $(this).animate({ 
            // affects size
            "width": session.interval,
            "height": session.interval,

            // affects movement
            "margin-left": direction + "=" + session.interval,
            // "margin-top": direction + "=" + session.interval
            // "left": "+=" + interval,
            // "right": "+=" + interval,
            // "bottom": "+=" + interval 
            },
        "slow")
        .after(        
            $(this).animate({
                opacity: 0.25,
                // width: "toggle"
            }, 1000)
        );


        $('.saying').animate({
            "margin-left": direction + "=" + "20px"
        });
    
        // appending 'p' element to parent of .orb div
        session.interval = Math.floor(Math.random() * 500);
        session.direction = !session.direction;
    });


    // keypress events

    // flag for toggling
    var bool = false;

    // pressing enter toggles background color
    $(this).on('keypress', function(event) {
        // if (event.which === 13) {
        //     if (!bool) {
        //         // delay function -->
        //         // setTimeout(function() {
        //             $('body').css('background-color', 'black');
        //             $('.plus, .minus').css('color', 'white');
        //             $('.orb').css('background-color', 'green');
        //             $('body').css('color', 'white');
        //             $('button').css('background-color', 'red');
        //         // }, 250);
        //         bool = !bool;
        //     } else {
        //         $('body').css('background-color', 'white');
        //         $('.plus, .minus').css('color', 'black');
        //         $('.orb').css('background-color', 'red');
        //         $('body').css('color', 'black');
        //         $('button').css('background-color', 'black');
        //         bool = !bool;
        //     }
        // }
    });

     // $('.plus').on('click', function(e) {
     //    $('.orb').animate({
     //        "width": "+=" + (session.interval / 2),
     //        "height": "+=" + (session.interval / 2)
     //    });
     // });

     $('.stop').on('click', function(e) {
        clearInterval(orbalism);
        $('.orb').each(function() {
            $(this).stop(true, true);
        });
        clearInterval(bloomRepeatsInterval);
        if (bloomOsc) {
            bloomOsc.forEach(osc => {
                osc.stop();
                osc = audioCtx.createOscillator();
            })
        }
        if (mainOsc && isPlaying) {
            mainOsc.stop();
            mainOsc = null;
        }
        isPlaying = false;
        bloomHasBeenClicked = false;

        // $('.orb').animate({
        //     "width": "-=" + session.interval,
        //     "height": "-=" + session.interval
        // });
     });

// $(document).ready closing brackets
});