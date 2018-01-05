var camera, scene, renderer;
var geometry, material, mesh;
var cloud, earth;
var controls;
var cooperStation2;
var mixer;
var clock = new THREE.Clock();
var currentStep = 1;
var canMove = true;

$(document).ready(function() {
  setTimeout(function() {
    $("#intro, #intro2").fadeIn(4000);
    $("#intro, #intro2").fadeOut(4000);
    $("#intro3").fadeIn(4000);
  });
});

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  //camera.position.z = (-15, 10, 10);
  camera.position.set(0, 0, Math.max(700 * 3, 700 * 3, 700 * 3));

  //LIGHT
  var light = new THREE.DirectionalLight(0xffffff, 2);
  scene.add(light);

  //SOUND
  var audioLoader = new THREE.AudioLoader();
  var listener = new THREE.AudioListener();
  var audio = new THREE.Audio(listener);
  audioLoader.load("./assets/INTERSTELLAR.mp3", function(buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.play();
  });

  //EARTHPLANETS
  earth = createEarth(0.5, 32);
  scene.add(earth);

  cloud = createCloud(0.503, 32);
  earth.add(cloud);

  //COOPERSTATION;
  var cooperStation = new THREE.CylinderGeometry(10, 10, 130, 32, 1, true);
  var frontMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("./assets/images/cooper2.jpg"),
    side: THREE.FrontSide
  });
  var backMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("./assets/images/cooper3.jp2"),
    side: THREE.BackSide
  });
  var materials = [frontMaterial, backMaterial];
  cooperStation2 = THREE.SceneUtils.createMultiMaterialObject(
    cooperStation,
    materials
  );
  cooperStation2.position.x = -0.7;
  cooperStation2.position.z = 500;
  cooperStation2.rotation.x = 4.8;
  cooperStation2.rotation.z = -0.05;
  scene.add(cooperStation2);

  //GALAXY
  var stars = createStars(90, 64);
  stars.position.z = -100;
  scene.add(stars);

  var string1 = [
    "Edmond's Planet^10\n `13,378,187 Light Years` ^1000\n `Fetching from source...`"
  ];

  var typed6 = new Typed("#EdmondsPrompt", {
    strings: string1,
    typeSpeed: 50,
    backSpeed: 40,
    loop: true
  });
  var typed66 = new Typed("#CooperPrompt", {
    strings: ["ljmhmoj ijùjjjùjj"],
    typeSpeed: 50,
    backSpeed: 40,
    loop: true
  });

  // var typed6 = new Typed("#CooperTyped", {
  //   strings: ["Cooper Station^1000\n `Our Galaxy` ^1000\n `Near Saturn`"],
  //   typeSpeed: 20,
  //   backSpeed: 0,
  //   loop: false
  // });

  //LOADER FBX
  // mixers = [];
  // var manager = new THREE.LoadingManager();
  // var onProgress = function(xhr) {
  //   if (xhr.lengthComputable) {
  //     var percentComplete = xhr.loaded / xhr.total * 100;
  //     console.log(Math.round(percentComplete, 2) + "% downloaded");
  //   }
  // };
  // var onError = function(xhr) {
  //   console.error(xhr);
  // };

  // var loader = new THREE.FBXLoader(manager);
  // loader.load(
  //   "./assets/fbx/black-hole/source/f4f6765107c64d0bb4c474a92a72bdc9.fbx",
  //   function(object) {
  //     object.mixer = new THREE.AnimationMixer(object);
  //     mixers.push(object.mixer);
  //     var action = object.mixer.clipAction(object.animations[0]);
  //     action.play();
  //     scene.add(object);
  //   },
  //   onProgress,
  //   onError
  // );

  //controls = new THREE.TrackballControls(camera);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function createCloud(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/fair_clouds_8k.jpg"),
      side: THREE.DoubleSide,
      opacity: 0.3,
      transparent: true,
      depthWrite: false
    })
  );
}

function createEarth(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/earthmap1k.jpg"),
      bumpMap: THREE.ImageUtils.loadTexture(
        "./assets/images/elev_bump_16k.jpg"
      ),
      bumpScale: 0.005,
      specularMap: THREE.ImageUtils.loadTexture(
        "./assets/images/water_16k.png"
      ),
      specular: new THREE.Color("#2b2b2b")
    })
  );
}

function createEdmonds(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/edmonds.png"),
      bumpMap: THREE.ImageUtils.loadTexture(
        "./assets/images/elev_bump_16k.jpg"
      ),
      bumpScale: 0.005,
      specularMap: THREE.ImageUtils.loadTexture(
        "./assets/images/water_16k.png"
      ),
      specular: new THREE.Color("#2b2b2b")
    })
  );
}

function createStars(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/Milky.jpg"),
      side: THREE.BackSide
    })
  );
}

function animate() {
  //controls.update();
  // if (mixers.length > 0) {
  //   for (var i = 0; i < mixers.length; i++) {
  //     mixers[i].update(clock.getDelta());
  //   }
  // }

  if (camera.position.z <= 20.0 && camera.position.z >= 4.0)
    $("#Edmonds").fadeIn(500);
  else $("#Edmonds").fadeOut(500);
  if (camera.position.z <= 1040.0 && camera.position.z >= 614.0)
    $("#CooperStation").fadeIn(500);
  else $("#CooperStation").fadeOut(500);

  cloud.rotation.y += 0.00035;
  earth.rotation.y += 0.0003;
  cooperStation2.rotation.y += 0.0002;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

var step = [
  { position: 20, name: "Edmunds" },
  { position: 1040, name: "Cooper" },
  { position: 2040, name: "Cooper" }
];

function nextStep() {
  if (currentStep > 0 && canMove) currentStep--;
  canMove = false;
  while (camera.position.z != step[currentStep].position) camera.translateZ(-1);
  canMove = true;
}

function previousStep() {
  if (currentStep < step.length - 1 && canMove) currentStep++;
  canMove = false;
  while (camera.position.z != step[currentStep].position) camera.translateZ(1);
  canMove = true;
}

function mousewheel(event) {
  if (canMove) {
    if (event.wheelDelta > 0) nextStep();
    else previousStep();
  }
}

document.addEventListener("mousewheel", mousewheel, false);
document.addEventListener("DOMMouseScroll", mousewheel, false); // firefox
