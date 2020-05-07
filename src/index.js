let leftTriggerDown = false;
let rightTriggerDown = false;
let triggerDown = false;
let recordButtonSelected = false;
let replayButtonSelected = false;
let playbackSelected = false;
let recording = false;
let replaying = false;
let savedRecordings = [];
let selectedRecording = 0;
let recordedPoses = [ [], [], [] ]; // Position & rotation
let recordedEvents = []; // Button presses
let tick = 0; // Counter for recording playback

function recordEntity(el, index) {
  var newPoint = {
    position: AFRAME.utils.clone(el.getAttribute('position')),
    rotation: AFRAME.utils.clone(el.getAttribute('rotation')),
    timestamp: Date.now()
  }
  newPoint.position.z += 5;
  recordedPoses[index].push(newPoint);
}

function buttonEvent(button, event) {
  if (event == 'int') {
    // change text color to yellow
    button.setAttribute('color', 'yellow')
  }
  if (event == 'noInt') {
    // change text color to white
    button.setAttribute('color', 'white')
  }
  if (event == 'toggle') {
    // toggle visiblity
    if (button.getAttribute('visible') == false) {
      button.setAttribute('visible', true)
    } else {
      button.setAttribute('visible', false)
    }
  }
}

// Draw planes representing each replay once recorded
function addReplay(poses, index) {
  savedRecordings.push(poses)
  var sceneEl = document.querySelector('a-scene');
  var entityEl = document.createElement('a-entity');
  var pos = (6 - index)
  entityEl.setAttribute('id', 'replay' + index)
  entityEl.setAttribute('geometry', 'primitive:plane; height:0.25; width:0.25;')
  entityEl.setAttribute('material', 'color:grey; transparent:true; opacity:0.5;')
  entityEl.setAttribute('position', pos + ' 1 5')
  entityEl.setAttribute('rotation', '0 -150 0')
  entityEl.setAttribute('text', 'color:white; align:center; width: 5; value:' + (index + 1))
  entityEl.setAttribute('class', 'links')
  entityEl.setAttribute('button-intersect', 'name:replay' + index)
  sceneEl.appendChild(entityEl);
}

AFRAME.registerComponent('mirror-movement', {
  tick: function () {
    var el = this.el; // `this.el` is the element.
    var headCube = document.getElementById("headCube");
    var leftCube = document.getElementById("leftCube");
    var rightCube = document.getElementById("rightCube");
    var camera = document.getElementById("camera");
    var leftHand = document.getElementById("leftHand");
    var rightHand = document.getElementById("rightHand");
    var replayButton = document.getElementById('replayButton');
    var recordButton = document.getElementById('recordButton');

    if (el.object3D == camera.object3D) {
      var cube = headCube;
      var index = 0;
    } else if (el.object3D == leftHand.object3D) {
      var cube = rightCube;
      var index = 1;
    } else if (el.object3D == rightHand.object3D) {
      var cube = leftCube;
      var index = 2;
    } else {
      console.log("Error: not arm or head.")
    }

    if (recording) {
      recordButton.setAttribute('material', 'color:green')
      recordButton.setAttribute('value', 'RECORDING')
      recordEntity(el, index);
    } else {
      recordButton.setAttribute('material', 'color:red')
      recordButton.setAttribute('value', 'START RECORDING')
    }

    if (!replaying) {
      // mirror current player actions
      cube.object3D.position.x = el.object3D.position.x;
      cube.object3D.position.y = el.object3D.position.y;
      cube.object3D.position.z = el.object3D.position.z + 5;
      cube.object3D.rotation.x = el.object3D.rotation.x;
      cube.object3D.rotation.y = el.object3D.rotation.y;
      cube.object3D.rotation.z = el.object3D.rotation.z;
    }
  }
});

AFRAME.registerComponent('triggered', {
  init: function () {
    var el = this.el; // The entity
    var replayButton = document.getElementById('replayButton');

    // Ensure support for all controllers
    el.addEventListener('triggerdown', function (evt) {
      //console.log("Trigger down")
      triggerDown = true

      if (replayButtonSelected) {
        replaying = true;
      } else if (recordButtonSelected) {
        if (!replaying) {
          recording = true;
          recordedPoses = [ [], [], [] ];
          tick = 0;
        }
      }
    });

    el.addEventListener('triggerup', function (evt) {
      //console.log("Trigger up")
      if (recording) {
        if (replayButton.getAttribute('visible') == false) {
          buttonEvent(replayButton, 'toggle')
        }
        addReplay(recordedPoses, savedRecordings.length)
      }
      recording = false;
      triggerDown = false
      //console.log(recordedPoses)
    });
  }
});

AFRAME.registerComponent('replayer', {
  tick: function () {
    var headCube = document.getElementById("headCube");
    var leftCube = document.getElementById("leftCube");
    var rightCube = document.getElementById("rightCube");
    var currReplay = savedRecordings[selectedRecording]
    
    if (replaying) {
      console.log('playing ' + selectedRecording)
      console.log(currReplay)
      if (tick < currReplay[0].length) {
        document.getElementById('replayButton').setAttribute('material', 'color:green')
        document.getElementById('replayButton').setAttribute('value', 'REPLAYING')
        
        headCube.object3D.position.x = currReplay[0][tick].position.x;
        headCube.object3D.position.y = currReplay[0][tick].position.y;
        headCube.object3D.position.z = currReplay[0][tick].position.z;
        headCube.object3D.rotation.x = THREE.Math.degToRad(currReplay[0][tick].rotation.x);
        headCube.object3D.rotation.y = THREE.Math.degToRad(currReplay[0][tick].rotation.y);
        headCube.object3D.rotation.z = THREE.Math.degToRad(currReplay[0][tick].rotation.z);

        rightCube.object3D.position.x = currReplay[1][tick].position.x;
        rightCube.object3D.position.y = currReplay[1][tick].position.y;
        rightCube.object3D.position.z = currReplay[1][tick].position.z;
        rightCube.object3D.rotation.x = THREE.Math.degToRad(currReplay[1][tick].rotation.x);
        rightCube.object3D.rotation.y = THREE.Math.degToRad(currReplay[1][tick].rotation.y);
        rightCube.object3D.rotation.z = THREE.Math.degToRad(currReplay[1][tick].rotation.z);
      
        leftCube.object3D.position.x = currReplay[2][tick].position.x;
        leftCube.object3D.position.y = currReplay[2][tick].position.y;
        leftCube.object3D.position.z = currReplay[2][tick].position.z;
        leftCube.object3D.rotation.x = THREE.Math.degToRad(currReplay[2][tick].rotation.x);
        leftCube.object3D.rotation.y = THREE.Math.degToRad(currReplay[2][tick].rotation.y);
        leftCube.object3D.rotation.z = THREE.Math.degToRad(currReplay[2][tick].rotation.z);

        tick += 1;
      } else {
        replaying = false;
        document.getElementById('replayButton').setAttribute('material', 'color:blue')
        document.getElementById('replayButton').setAttribute('value', 'REPLAY RECORDING')
        tick = 0;
      }
    }
  }
});

AFRAME.registerComponent('button-intersect', {
  schema: {
    name: {type: 'string', default: ''}
  },
  init: function () {
    var buttonName = this.data.name;
    var el = this.el; // The entity
    var recordButton = document.getElementById("recordButton");
    var replayButton = document.getElementById("replayButton");

    this.el.addEventListener('raycaster-intersected', function () {
      //console.log('intersecting button')
      if (el.object3D == recordButton.object3D) {
        if (!recording) {
          buttonEvent(recordButton, 'int')
          recordButtonSelected = true;
        }
      } else if (el.object3D == replayButton.object3D) {
        if (!recording) {
          buttonEvent(replayButton, 'int')
          replayButtonSelected = true;
        }
      } else {
        var button = document.getElementById(buttonName);
        console.log(button)
        buttonEvent(button, 'int')
        playbackSelected = true;
        console.log('hello mr replay down there')
        console.log(buttonName.slice(6))
        selectedRecording = parseInt(buttonName.slice(6), 10);
      }
    });

    this.el.addEventListener('raycaster-intersected-cleared', function () {
      //console.log('stopped intersecting button')
      if (el.object3D == recordButton.object3D) {
        buttonEvent(recordButton, 'noInt')
        recordButtonSelected = false;
      } else if (el.object3D == replayButton.object3D) {
        buttonEvent(replayButton, 'noInt')
        replayButtonSelected = false;
      } else {
        var button = document.getElementById(buttonName);
        buttonEvent(button, 'noInt')
        playbackSelected = false;
      }
    });
  }
});

// AFRAME.registerComponent('raycaster-listen', {
//   dependencies: ['raycaster'],
//   init: function () {
//     this.el.addEventListener('raycaster-intersection', function () {
//       console.log('Intersecting something');
//     });
//     this.el.addEventListener('raycaster-intersection-cleared', function () {
//       console.log('Intersecting nothing');
//     });
//   }
// });
