let classifier;
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img = loadImage('./kitten.jpg');
}

function setup() {
  let width = img.width;
  let height = img.height;

  createCanvas(width / 4, height / 4);
  classifier.classify(img, gotResult);
  image(img, 0, 0, width / 4, height / 4);
}

function gotResult(results) {
  console.log(results);

  fill(255);
  stroke(0);
  textSize(10);
  const label = `Label: ${results[0].label}`;
  const confidence = `Confidence: ${nf(results[0].confidence, 0, 2)}`;
  text(label, 10, 20);
  text(confidence, 10, 50);
}
