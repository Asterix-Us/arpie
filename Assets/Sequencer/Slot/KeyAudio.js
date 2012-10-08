#pragma strict

static var baseNote = 53;
static var intervals = [0, 2, 4, 7, 9];
static var clipLength = 0.3;

var degree = 0;

function Start() {
	var osc = Oscillator();
	var env = Envelope();
	var bit = Bitcrusher();

	osc.SetNote(baseNote + intervals[degree % intervals.Length] + degree / intervals.Length * 12);
	env.KeyOn();

	audio.clip = AudioClip.Create("note", SynthConfig.kSampleRate * clipLength, 1, SynthConfig.kSampleRate, false, false);
	var samples = new float[SynthConfig.kSampleRate * clipLength];
	for (var i = 0; i < samples.Length; i++) {
		samples[i] = bit.Run(osc.Run()) * env.current;
		env.Update();
	}
	audio.clip.SetData(samples, 0);
}

function KeyOn() {
	audio.Play();
}