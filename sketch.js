let N = 100;
let model = {};

function setup() {
  noCanvas();
  loadMarkovModel();
  generate();
}

function generate(minLen = 50, maxLen = 200) {

  // pick a random starting seq
  let result = random(Object.keys(model)
    .filter(k => /^[A-Z]/.test(k)));

  // loop until we have our length
  while (result.length < maxLen) {

    // get the last N-1 chars
    let seq = result.slice(-(N - 1));

    // look it up the model
    let options = model[seq];

    // pick a random next char
    let next = random(options);
    result += next; // add it to our string

    if (result.length >= minLen && result.endsWith('.')) break;
  }

  let span = document.getElementById('content');
  span.innerText += ' ' + result;
}


function loadMarkovModel() {
  let text = sentenceData.data.join(" ");
  for (let i = 0; i < text.length; i++) {
    let key = text.substring(i, i + (N - 1));
    let next = text[i + (N - 1)];
    if (!model[key]) model[key] = [];
    model[key].push(next);
  }
}
