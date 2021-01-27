//Shit you can change dummy

//initial rotation incremenent will change later on, but this is the set speed of the scramble
var rotationIncriment = 30 - document.getElementById("speed").value;




//GLOBALS -----------------------------------------
//cube characteristics, change if the user changes input
var dimension;
var scrambleMoveSet;
var scrambleSliceSet;
var solverMoveSet;
var solverSliceSet;
var axis = [];

//Scene and threejs shit that is initialized in init()
var scene = new THREE.Scene();
var cube = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var container = document.getElementById("canvas");


//state vars
var rotatingLayer = false;
var rotatingFrontFace = false;
var rotatingSide = false;
var rotatingCubeX = false;
var rotatingCubeY = false;

var scrambling = false;
var solving = false;
var scrambled = false;

//used for chosing which slice is moving and which direction
var constSlice;
var constDirection;

//for counting in the algorithm
var index;
var counter;

function update() {
  // is cube moving at the moment
  if (rotatingLayer) {
    rotateLayer(constSlice, constDirection);
  } else if (rotatingSide) {
    rotateSide(constSlice, constDirection);
  } else if (rotatingFrontFace) {
    rotateFrontFace(constSlice, constDirection);
  } else if (rotatingCubeX) {
    rotateCubeClockCounter(constDirection);
  } else if (rotatingCubeY) {
    rotateCubeUpDown(constDirection);
  } else if (scrambling) {
    if (index >= scrambleMoveSet.length) {
      scrambling = false;
      solving = false;
      scrambled = true;
      index = 0;
      message = "Click on Cube to Solve";
      document.getElementById("info").innerHTML = message;
      document.getElementById("info").style.backgroundColor = "grey";
    } else {
      move(scrambleMoveSet[index], scrambleSliceSet[index]);
      index++;
    }
  } else if (solving) {
    if (index >= solverMoveSet.length) {
      scrambling = false;
      solving = false;
      scrambled = false;
      index = 0;
      message = "Click on Cube to Scramble";
      document.getElementById("info").style.backgroundColor = "gray";
    } else {
      move(solverMoveSet[index], solverSliceSet[index]);
      index++;
    }
  } else {
    renderer.domElement.addEventListener("click", changeState);
    renderer.domElement.addEventListener("touchstart", changeState);

  }
}

//used in the update function - listens to event and key pressed to change the state
var changeState = function (event) {
  if (!scrambling && !solving) {
    if (scrambled) {
      solving = true;
      scrambling = false;
      message = "Solving Cube";
      document.getElementById("info").innerHTML = message;
      document.getElementById("info").style.backgroundColor = "green";
    } else {
      scrambling = true;
      solving = false;
      message = "Scrambling Cube";
      document.getElementById("info").innerHTML = message;
      document.getElementById("info").style.backgroundColor = "red";
    }
  }
}


function init() {
  // scnene
  
   
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  renderer.setClearColor(0x585859, 1);
  container.appendChild(renderer.domElement);

  // camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 300000);
  camera.position.x = window.innerWidth * 1.5;
  camera.position.z = window.innerWidth * 1.5;
  camera.position.y = window.innerWidth * 1.5;
  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    onSubmitDim();
  }

  // mouse control
  var controls = new THREE.OrbitControls(camera, renderer.domElement);


  scene.add(cube);
  initCube(dimension);

}

function animate() {
  render();
  update();
  requestAnimationFrame(animate);

}
//render, controls camera and global rotation and shit, if you want to rotate the cube you do that here
function render() {
  // animate the group
  renderer.render(scene, camera);
  scene.rotation.y += 0.002;
  //scene.rotation.x += 0.002;
  //scene.rotation.z += 0.002;
}



var rotWorldMatrix;


init();
animate();


























//DON'T CHANGE THESE MOSTLY OK

//rotates a group of shit around the universal x y and z 
function rotateAroundWorldAxis(object, axis, radians) {
  rotWorldMatrix = new THREE.Matrix4();
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
  rotWorldMatrix.multiply(object.matrix); // pre-multiply
  object.matrix = rotWorldMatrix;
  object.rotation.setFromRotationMatrix(object.matrix);
}

//checks pos, cause I'm dealing with pi's and stuff, I don't want to be comparing doubles to closely
function nearlyEqual(a, b, d) {
  d = d || 0.001;
  return Math.abs(a - b) <= d;
}

//do each incriment rotationincrementtimes

//rotateSide (akgiruthm gets Y-/+)
function rotateSide(slice, direction) {
  rotatingSide = true;
  var layer = axis[slice];
  var tempVector = new THREE.Vector3();
  var active = [];
  var groupTemp = new THREE.Object3D();

  if (slice == 0) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.x, -cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  } else if (slice == dimension - 1) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.x, cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  }

  for (var i = 0; i < cube.children.length; i++) {
    if (nearlyEqual(cube.children[i].position.x, layer)) {
      active.push(cube.children[i]);
    }
  }
  rotateAroundWorldAxis(groupTemp, new THREE.Vector3(1, 0, 0), -direction * Math.PI / (2 * rotationIncriment));
  //groupTemp.rotation.set(-direction * Math.PI / (2 * rotationIncriment), 0, 0);
  groupTemp.updateMatrixWorld();
  /*
                                if (direction == 1) {
                                  groupTemp.position.y += cubeSize * window.innerWidth;
                                } else {
                                  groupTemp.position.z += cubeSize * window.innerWidth;
                                }
                                */

  for (var i in active) {
    groupTemp.add(active[i]);
  }

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    THREE.SceneUtils.detach(active[i], groupTemp, cube);
  }

  for (var i = 0; i < cube.children.length; i++) {
    cube.children[i].position = cube.children[i].getWorldPosition(tempVector);
  }

  cube.updateMatrixWorld();
  if (counter == rotationIncriment - 1) {
    rotatingSide = false;
    counter = 0;
  } else {
    counter++;
  }
}

//rotateLeyer (algorithm gets Z -/+)
function rotateLayer(slice, direction) {
  rotatingLayer = true;

  var layer = axis[dimension - 1 - slice];
  var tempVector = new THREE.Vector3();
  var active = [];
  var groupTemp = new THREE.Object3D();

  if (slice == 0) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.y, cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  } else if (slice == dimension - 1) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.y, -cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  }

  for (var i = 0; i < cube.children.length; i++) {
    if (nearlyEqual(cube.children[i].position.y, layer)) {
      active.push(cube.children[i]);
    }
  }
  groupTemp.rotation.set(0, -direction * Math.PI / (2 * rotationIncriment), 0);

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    groupTemp.add(active[i]);
  }
  groupTemp.updateMatrixWorld();

  for (var i in active) {
    THREE.SceneUtils.detach(active[i], groupTemp, cube);
  }
  for (var i = 0; i < cube.children.length; i++) {
    cube.children[i].position = cube.children[i].getWorldPosition(tempVector);
  }

  cube.updateMatrixWorld();

  if (counter == rotationIncriment - 1) {
    rotatingLayer = false;
    counter = 0;
  } else {
    counter++;
  }
}

//rotateFront (algorithm gets X -/+)
function rotateFrontFace(slice, direction) {
  rotatingFrontFace = true;
  var layer = axis[slice];
  var tempVector = new THREE.Vector3();
  var active = [];
  var groupTemp = new THREE.Object3D();

  if (slice == 0) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.z, -cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  } else if (slice == dimension - 1) {
    for (var i = 0; i < cube.children.length; i++) {
      if (nearlyEqual(cube.children[i].position.z, cubeSize * (window.innerWidth /2) / 2)) {
        active.push(cube.children[i]);
      }
    }
  }

  for (var i = 0; i < cube.children.length; i++) {
    if (nearlyEqual(cube.children[i].position.z, layer)) {
      active.push(cube.children[i]);
    }
  }
  groupTemp.rotation.set(0, 0, -direction * Math.PI / (2 * rotationIncriment));

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    groupTemp.add(active[i]);
  }
  groupTemp.updateMatrixWorld();

  for (var i in active) {
    THREE.SceneUtils.detach(active[i], groupTemp, cube);
  }
  for (var i = 0; i < cube.children.length; i++) {
    cube.children[i].position = cube.children[i].getWorldPosition(tempVector);
  }

  cube.updateMatrixWorld();

  if (counter == rotationIncriment - 1) {
    rotatingFrontFace = false;
    counter = 0;
  } else {
    counter++;
  }
}

//rotateCubeUpor Down (YY)
function rotateCubeUpDown(direction) {
  rotatingCubeY = true;
  var tempVector = new THREE.Vector3();
  var active = [];
  var groupTemp = new THREE.Object3D();
  for (var i = 0; i < cube.children.length; i++) {
    active.push(cube.children[i]);
  }

  groupTemp.rotation.set(-direction * Math.PI / (2 * rotationIncriment), 0, 0);

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    groupTemp.add(active[i]);
  }

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    THREE.SceneUtils.detach(active[i], groupTemp, cube);
  }

  for (var i = 0; i < cube.children.length; i++) {
    cube.children[i].position = cube.children[i].getWorldPosition(tempVector);
  }

  cube.updateMatrixWorld();

  if (counter == rotationIncriment - 1) {
    rotatingCubeY = false;
    counter = 0;
  } else {
    counter++;
  }
}

//rotateCube clock or counter clockwise (XX)
function rotateCubeClockCounter(direction) {
  rotatingCubeX = true;

  var tempVector = new THREE.Vector3();
  var active = [];
  var groupTemp = new THREE.Object3D();
  for (var i = 0; i < cube.children.length; i++) {
    active.push(cube.children[i]);
  }

  groupTemp.rotation.set(0, -direction * Math.PI / (2 * rotationIncriment), 0);

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    groupTemp.add(active[i]);
  }

  groupTemp.updateMatrixWorld();

  for (var i in active) {
    THREE.SceneUtils.detach(active[i], groupTemp, cube);
  }

  for (var i = 0; i < cube.children.length; i++) {
    cube.children[i].position = cube.children[i].getWorldPosition(tempVector);
  }

  cube.updateMatrixWorld();

  if (counter == rotationIncriment - 1) {
    rotatingCubeX = false;
    counter = 0;
  } else {
    counter++;
  }
}


//takes input from algorithm and tells program what is happening
function move(axisStr, slice) {
  if (axisStr === "XX") {
    constDirection = slice;
    rotatingCubeX = true;
    return;
  } else if (axisStr === "YY") {
    constDirection = slice;
    rotatingCubeY = true;
    return;
  }
  if (axisStr.substring(1, 2) === "+") {
    constDirection = 1;
  } else {
    constDirection = -1;
  }
  var axis_Val = axisStr.substring(0, 1);
  if (axis_Val === "X") {
    rotatingLayer = true;
  } else if (axis_Val === "Y") {
    rotatingSide = true;
  } else if (axis_Val === "Z") {
    rotatingFrontFace = true;
  }
  constSlice = slice;
}

//Init functions
//Init the sides (wanted squares so this is only edges)
function initLeft(dimension) {
  var color = colors[1];
  var cubieSize = cubeSize * (window.innerWidth / 2) * bufferCubiePercentage / dimension;
  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});

  var x = -(window.innerWidth /2) * cubeSize / 2;
  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);

      planeTemp.rotateY(-Math.PI / 2);

      planeTemp.position.x = x;
      planeTemp.position.y = axis[j];
      planeTemp.position.z = axis[i];

      cube.add(planeTemp);
    }
  }
}

function initRight(dimension) {
  var color = colors[3];
  var cubieSize = cubeSize * (window.innerWidth /2) * bufferCubiePercentage / dimension;

  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});

  var x = cubeSize * (window.innerWidth /2) / 2;
  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);
      planeTemp.rotateY(Math.PI / 2);

      planeTemp.position.x = x;
      planeTemp.position.y = axis[j];
      planeTemp.position.z = axis[i];

      cube.add(planeTemp);
    }
  }
}

function initFront(dimension) {
  var color = colors[5];
  var cubieSize = cubeSize * (window.innerWidth /2) * bufferCubiePercentage / dimension;

  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});

  var z = cubeSize * (window.innerWidth /2) / 2;
  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);

      planeTemp.position.z = z;
      planeTemp.position.y = axis[j];
      planeTemp.position.x = axis[i];

      cube.add(planeTemp);
    }
  }
}

function initBack(dimension) {
  var color = colors[0];
  var cubieSize = cubeSize * (window.innerWidth /2) * bufferCubiePercentage / dimension;

  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});

  var z = -cubeSize * (window.innerWidth /2) / 2;
  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);
      planeTemp.rotateY(Math.PI);

      planeTemp.position.z = z;
      planeTemp.position.y = axis[j];
      planeTemp.position.x = axis[i];

      cube.add(planeTemp);
    }
  }
}

function initTop(dimension) {
  var color = colors[2];
  var cubieSize = cubeSize * (window.innerWidth /2) * bufferCubiePercentage / dimension;

  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});
  var y = cubeSize * (window.innerWidth /2) / 2;

  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);
      planeTemp.rotateX(-Math.PI / 2);
      planeTemp.position.y = y;
      planeTemp.position.x = axis[i];
      planeTemp.position.z = axis[j];
      cube.add(planeTemp);
    }
  }
}

function initBottom(dimension) {
  var color = colors[4];
  var cubieSize = cubeSize * (window.innerWidth /2) * bufferCubiePercentage / dimension;

  var geometry = new THREE.PlaneBufferGeometry(cubieSize, cubieSize);
  var material = new THREE.MeshBasicMaterial({color: color, side: THREE.Singleside});
  var y = -cubeSize * (window.innerWidth /2) / 2;

  for (var i = 0; i < axis.length; i++) {
    for (var j = 0; j < axis.length; j++) {
      var planeTemp = new THREE.Mesh(geometry, material);
      planeTemp.rotateX(Math.PI / 2);
      planeTemp.position.y = y;
      planeTemp.position.x = axis[i];
      planeTemp.position.z = axis[j];
      cube.add(planeTemp);
    }
  }
}


//might have to change this
function initCube() {
  var cube412 = cubeArray[3];
  if(dimension == undefined){
    dimension = 3;
  }else if(dimension == 40){
    cube412 = cubeArray[31];

  }else if(dimension == 50){
    cube412 = cubeArray[32];

  }else if(dimension == 60){
    cube412 = cubeArray[33];

  }else if(dimension == 70){
    cube412 = cubeArray[34];

  }else if(dimension == 80){
    cube412 = cubeArray[35];

  }else if(dimension == 90){
    cube412 = cubeArray[36];

  }else if(dimension == 100){
    cube412 = cubeArray[37];

  }else if(dimension <= 30 && dimension >= 3){
    cube412 = cubeArray[dimension];
  }else{
    cube412 = cubeArray[3];
  }


  index = 0;
  counter = 0;

  var message = "Click on Cube to Scramble";

  scrambleMoveSet = cube412.scrambleMoves;
  scrambleSliceSet = cube412.scrambleSlices;
  solverMoveSet = cube412.solverMoves;
  solverSliceSet = cube412.solverSlices;

  var edgeLength = cubeSize * (window.innerWidth /2);

  cube.remove.apply(cube, cube.children);
  cube.updateMatrixWorld();


  while(axis.length > 0){
    axis.shift();
  }


  for (var i = edgeLength / (2 * dimension); i < edgeLength; i += edgeLength / dimension) {
    axis.push(i - edgeLength / 2);
  }

  initBack(dimension);
  initLeft(dimension);
  initTop(dimension);
  initRight(dimension);
  initBottom(dimension);
  initFront(dimension);


  index = 0;
  counter =0;
  document.getElementById("info").innerHTML = message;
  document.getElementById("info").style.backgroundColor = "gray";

}


function onSubmitDim(){

  solving = false;
  scrambling = false;
  scrambled = false;
  rotatingCubeX = false;
  rotatingCubeY = false;
  rotatingFrontFace = false;
  rotatingLayer = false;
  rotatingSide = false;
  
  dimension = document.getElementById("scale").value;
  if(dimension)
  initCube();
}

function onSubmitSpeed(){
  if(solving || scrambling){
    rotationIncriment = 30 - document.getElementById("speed").value;
    onSubmitDim();
  }else{
    rotationIncriment = 30 - document.getElementById("speed").value;
  }
  
}

