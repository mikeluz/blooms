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
        var $bloom = $('<li class="bloomSaying"></li>');
        $bloom.attr('id', session.blooms.length);
        var $link = $('<a href="#"></a>');
        // $link.attr('class', 'bloomSaying');
        $link.text('BLOOM ' + (session.blooms.length));
        $bloom.append($link);
        $('.plus').append($bloom);
        document.dispatchEvent(newBloomEvent);
    });

    var bloomRepeatsInterval;
    var bloomOsc = [];

    document.addEventListener('newBloom', function() {
        $('.bloomSaying').on('click', function(e) {
            var newOsc = audioCtx.createOscillator();
            newOsc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            bloomOsc.push(newOsc);
            var bloomID  = $(this).attr('id');
            var letters = session.blooms[+bloomID - 1];
            console.log(bloomID);
            if (letters) {
                bloomRepeatsInterval = wordArp(audioCtx, bloomOsc[bloomOsc.length - 1], notes, letters, 3, 5000);
                // isPlaying = true;
            }
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

        clearInterval(bloomRepeatsInterval);
        if (bloomOsc) {
            console.log(bloomOsc);
            bloomOsc.forEach(osc => {
                osc.stop();
                osc = null;
            })
        }
        if (mainOsc && isPlaying) {
            mainOsc.stop();
            mainOsc = null;
        }
        isPlaying = false;

        // $('.orb').animate({
        //     "width": "-=" + session.interval,
        //     "height": "-=" + session.interval
        // });
     });

// $(document).ready closing brackets
});