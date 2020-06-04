<a href="https://elocnat.itch.io/off-killter"><img src="https://i.imgur.com/Sl0Du6Al.png" title="Play Off-Killter now at elocnat.itch.io!" alt="Off-Killter Thumbnail">

# Off-Killter

> A WebVR game built with A-Frame.

## Gameplay Synopsis

Playing as a QA tester at Killter Innovations, your job is to spot defects in newly manufactured robots. You have to make three recordings that the new robots will playback to verify their functionality as they roll off the assembly line. Once you start the factory you can observe the assembly line from the control panel. If you see a defective robot you must move the crane over it and press the big red button to select it.

<br/>

#### Controls

* Use the left motion controller and touchpad to teleport.
* Use the right motion controller touchpad to rotate the camera.
  * Try to keep facing forward and rotate by only using hand controls
* Use the right trigger to select UI buttons.

#### Tips and Known Issues

* Currently only tested in Firefox using the HTC Vive.
* Currently the game works best if you are always facing forward (with the exception of recording) and use the motion controllers for camera rotation and navigation.
* Manual physics are a little funky.
* If you're not standing in the middle of your play space while recording, the crane might not recognize the avatar you have selected.
* Poor optimization might = bad FPS which might = fast forwarded/slowed down replays/recordings.
* I am actively working on optimizing the scene and refactoring the code.

<br/>

### Connect
---

<a href="https://elocnat.itch.io"><img src="https://i.imgur.com/s5iagnG.png" title="Play my games on https://elocnat.itch.io" alt="elocnat logo" width="48" height="48"></a> **Connect with me** to keep up with my current projects. **Help me out by following me and starring/sharing my work!**

- **Follow me** and **play my games** at <a href="https://elocnat.itch.io" target="_blank">`elocnat.itch.io`</a>
  - **Play** `Off-Killter` live at <a href="https://elocnat.itch.io/off-killter" target="_blank">`elocnat.itch.io/off-killter`</a>!
- **Follow me** on Twitter at <a href="https://twitter.com/elocnat" target="_blank">`@elocnat`</a>
  - **Tweet** <a href="https://twitter.com/elocnat" target="_blank">`@elocnat`</a> with the hashtag <a href="https://twitter.com/hashtag/OffKillter?f=live" target="_blank">#OffKillter</a> if you have feedback on the project!
- **Follow me** on GitHub at <a href="https://github.com/elocnatsirt" target="_blank">`@elocnatsirt`</a>
  - **Star** <a href="https://github.com/elocnatsirt/off-killter" target="_blank">this project</a>!

### Libraries
---

Built with A-Frame: https://aframe.io/ (a magical VR web framework built on top of [three.js](https://threejs.org/))
* Teleportation locomotion via [aframe-teleport-controls](https://github.com/fernandojsg/aframe-teleport-controls)
* Physics via [aframe-physics-system](https://github.com/donmccurdy/aframe-physics-system)
* Object interaction provided by [aframe-extras](https://github.com/donmccurdy/aframe-extras)
* Random replay head colors generated by [aframe-randomizer-component](https://github.com/supermedium/superframe/tree/master/components/randomizer)
* Scene render order sorted by [aframe-render-order-component](https://github.com/supermedium/superframe/tree/master/components/render-order)
* Vibration feedback provided by [aframe-haptics-component](https://github.com/supermedium/superframe/tree/master/components/haptics)
* Inspiration gleaned from [aframe-motion-capture-components](https://github.com/dmarcos/aframe-motion-capture-components/)

### License
---

<a href="http://www.wtfpl.net/"><img src="http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png" width="80" height="15" alt="WTFPL" /></a>

- **[WTFPL license](http://www.wtfpl.net/txt/copying/)**

As the license says you are free to do whatever you want with the code. Credit is always appreciated.
