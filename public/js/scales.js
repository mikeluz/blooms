// helper function for selecting notes at indices
function numInRange(lower, upper) {
  var num = Math.floor(Math.random() * 100);
  while (num < lower || num > upper) {
    num = Math.floor(Math.random() * 100);
  } 
  return num;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createNoteTable() {
  let noteFreqs = [];
  for (let i=0; i< 6; i++) {
    noteFreqs[i] = [];
  }
  noteFreqs[0]["C"] = 65.406391325149658;
  noteFreqs[0]["C#"] = 69.295657744218024;
  noteFreqs[0]["D"] = 73.416191979351890;
  noteFreqs[0]["D#"] = 77.781745930520227;
  noteFreqs[0]["E"] = 82.406889228217482;
  noteFreqs[0]["F"] = 87.307057858250971;
  noteFreqs[0]["F#"] = 92.498605677908599;
  noteFreqs[0]["G"] = 97.998858995437323;
  noteFreqs[0]["G#"] = 103.826174394986284;
  noteFreqs[0]["A"] = 110.000000000000000;
  noteFreqs[0]["A#"] = 116.540940379522479;
  noteFreqs[0]["B"] = 123.470825314031027;

  noteFreqs[1]["C"] = 130.812782650299317;
  noteFreqs[1]["C#"] = 138.591315488436048;
  noteFreqs[1]["D"] = 146.832383958703780;
  noteFreqs[1]["D#"] = 155.563491861040455;
  noteFreqs[1]["E"] = 164.813778456434964;
  noteFreqs[1]["F"] = 174.614115716501942;
  noteFreqs[1]["F#"] = 184.997211355817199;
  noteFreqs[1]["G"] = 195.997717990874647;
  noteFreqs[1]["G#"] = 207.652348789972569;
  noteFreqs[1]["A"] = 220.000000000000000;
  noteFreqs[1]["A#"] = 233.081880759044958;
  noteFreqs[1]["B"] = 246.941650628062055;

  noteFreqs[2]["C"] = 261.625565300598634;
  noteFreqs[2]["C#"] = 277.182630976872096;
  noteFreqs[2]["D"] = 293.664767917407560;
  noteFreqs[2]["D#"] = 311.126983722080910;
  noteFreqs[2]["E"] = 329.627556912869929;
  noteFreqs[2]["F"] = 349.228231433003884;
  noteFreqs[2]["F#"] = 369.994422711634398;
  noteFreqs[2]["G"] = 391.995435981749294;
  noteFreqs[2]["G#"] = 415.304697579945138;
  noteFreqs[2]["A"] = 440.000000000000000;
  noteFreqs[2]["A#"] = 466.163761518089916;
  noteFreqs[2]["B"] = 493.883301256124111;

  noteFreqs[3]["C"] = 523.251130601197269;
  noteFreqs[3]["C#"] = 554.365261953744192;
  noteFreqs[3]["D"] = 587.329535834815120;
  noteFreqs[3]["D#"] = 622.253967444161821;
  noteFreqs[3]["E"] = 659.255113825739859;
  noteFreqs[3]["F"] = 698.456462866007768;
  noteFreqs[3]["F#"] = 739.988845423268797;
  noteFreqs[3]["G"] = 783.990871963498588;
  noteFreqs[3]["G#"] = 830.609395159890277;
  noteFreqs[3]["A"] = 880.000000000000000;
  noteFreqs[3]["A#"] = 932.327523036179832;
  noteFreqs[3]["B"] = 987.766602512248223;

  noteFreqs[4]["C"] = 1046.502261202394538;
  noteFreqs[4]["C#"] = 1108.730523907488384;
  noteFreqs[4]["D"] = 1174.659071669630241;
  noteFreqs[4]["D#"] = 1244.507934888323642;
  noteFreqs[4]["E"] = 1318.510227651479718;
  noteFreqs[4]["F"] = 1396.912925732015537;
  noteFreqs[4]["F#"] = 1479.977690846537595;
  noteFreqs[4]["G"] = 1567.981743926997176;
  noteFreqs[4]["G#"] = 1661.218790319780554;
  noteFreqs[4]["A"] = 1760.000000000000000;
  noteFreqs[4]["A#"] = 1864.655046072359665;
  noteFreqs[4]["B"] = 1975.533205024496447;
  noteFreqs[5]["C"] = 2093.004522404789077;
  return noteFreqs;
}

function createLinearNoteTable() {
  let noteFreqs = [];
  for (let i=0; i< 6; i++) {
    noteFreqs[i] = [];
  }
  noteFreqs[0] = 65.406391325149658; // C
  noteFreqs[1] = 69.295657744218024; // C# ...
  noteFreqs[2] = 73.416191979351890;
  noteFreqs[3] = 77.781745930520227;
  noteFreqs[4] = 82.406889228217482;
  noteFreqs[5] = 87.307057858250971;
  noteFreqs[6] = 92.498605677908599;
  noteFreqs[7] = 97.998858995437323;
  noteFreqs[8] = 103.826174394986284;
  noteFreqs[9] = 110.000000000000000;
  noteFreqs[10] = 116.540940379522479;
  noteFreqs[11] = 123.470825314031027;  // B

  noteFreqs[12] = 130.812782650299317;
  noteFreqs[13] = 138.591315488436048;
  noteFreqs[14] = 146.832383958703780;
  noteFreqs[15] = 155.563491861040455;
  noteFreqs[16] = 164.813778456434964;
  noteFreqs[17] = 174.614115716501942;
  noteFreqs[18] = 184.997211355817199;
  noteFreqs[19] = 195.997717990874647;
  noteFreqs[20] = 207.652348789972569;
  noteFreqs[21] = 220.000000000000000;
  noteFreqs[22] = 233.081880759044958;
  noteFreqs[23] = 246.941650628062055;

  noteFreqs[24] = 261.625565300598634;
  noteFreqs[25] = 277.182630976872096;
  noteFreqs[26] = 293.664767917407560;
  noteFreqs[27] = 311.126983722080910; // 2 ^
  noteFreqs[28] = 329.627556912869929;
  noteFreqs[29] = 349.228231433003884;
  noteFreqs[30] = 369.994422711634398;
  noteFreqs[31] = 391.995435981749294;
  noteFreqs[32] = 415.304697579945138;
  noteFreqs[33] = 440.000000000000000; // 2 ^ 
  noteFreqs[34] = 466.163761518089916;
  noteFreqs[35] = 493.883301256124111;

  noteFreqs[36] = 523.251130601197269;
  noteFreqs[37] = 554.365261953744192;
  noteFreqs[38] = 587.329535834815120;
  noteFreqs[39] = 622.253967444161821;
  noteFreqs[40] = 659.255113825739859;
  noteFreqs[41] = 698.456462866007768;
  noteFreqs[42] = 739.988845423268797;
  noteFreqs[43] = 783.990871963498588;
  noteFreqs[44] = 830.609395159890277;
  noteFreqs[45] = 880.000000000000000;
  noteFreqs[46] = 932.327523036179832;
  noteFreqs[47] = 987.766602512248223;

  noteFreqs[48] = 1046.502261202394538;
  noteFreqs[49] = 1108.730523907488384;
  noteFreqs[50] = 1174.659071669630241;
  noteFreqs[51] = 1244.507934888323642;
  noteFreqs[52] = 1318.510227651479718;
  noteFreqs[53] = 1396.912925732015537;
  noteFreqs[54] = 1479.977690846537595;
  noteFreqs[55] = 1567.981743926997176;
  noteFreqs[56] = 1661.218790319780554;
  noteFreqs[57] = 1760.000000000000000;
  noteFreqs[58] = 1864.655046072359665;
  noteFreqs[59] = 1975.533205024496447;
  noteFreqs[60] = 2093.004522404789077;
  return noteFreqs;
}