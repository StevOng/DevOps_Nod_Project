const container = document.getElementById("container");
const feat1 = document.getElementById("feat1");
feat1.onclick = () => {
  container.innerHTML = `
    <div class="d-inline-flex">
          <div class="position-absolute top-50 start-50 translate-middle">
              <video id="webcam" autoplay playsinline></video>
          </div>
          <div class="position-absolute bottom-0 start-50 translate-middle">
              <span></span>
              <span></span>
              <a class="btn" id="off">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Close
              </a>
          </div>
      </div>`;
  let video = document.getElementById("webcam");
  let canvas = document.body.appendChild(document.createElement("canvas"));
  let ctx = canvas.getContext("2d");
  let displaySize;

  let width = 720;
  let height = 470;

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {},
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      });
  };

  console.log(faceapi.nets);

  Promise.all([
    faceapi.nets.ageGenderNet.loadFromUri("js/model"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("js/model"),
    faceapi.nets.tinyFaceDetector.loadFromUri("js/model"),
    faceapi.nets.faceLandmark68Net.loadFromUri("js/model"),
    faceapi.nets.faceRecognitionNet.loadFromUri("js/model"),
    faceapi.nets.faceExpressionNet.loadFromUri("js/model"),
  ]).then(startVideo);

  async function detect() {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    console.log(detections);

    ctx.clearRect(0, 0, width, height);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    console.log(resizedDetections);
    resizedDetections.forEach((result) => {
      const { age, gender, genderProbability } = result;
      new faceapi.draw.DrawTextField(
        [
          `${Math.round(age, 0)} Tahun`,
          `${gender} ${Math.round(genderProbability)}`,
        ],
        result.detection.box.bottomRight
      ).draw(canvas);
    });
  }

  video.addEventListener("play", () => {
    displaySize = { width, height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(detect, 100);
  });

  document.getElementById("off").onclick = () => {
    window.location.reload();
  };
};
