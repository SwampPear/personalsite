import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


document.addEventListener('DOMContentLoaded', () => {
  // setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

  const renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( 0x000000, 0 )

  const RENDER = document.querySelector( '.welcome__background' )
  RENDER.appendChild( renderer.domElement )


  //const geometry = new THREE.BoxGeometry( 1, 1, 1 )
  //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
  //const cube = new THREE.Mesh( geometry, material )
  //scene.add( cube )

  camera.position.z = 5

  const light = new THREE.PointLight()
  scene.add(light)

  var oLoader = new OBJLoader();
  oLoader.load('static/obj/pear.obj', function(object, materials) {

  // var material = new THREE.MeshFaceMaterial(materials);
  var material2 = new THREE.MeshLambertMaterial({ color: 0xa65e00 });

  object.traverse( function(child) {
  if (child instanceof THREE.Mesh) {

    // apply custom material
    child.material = material2;

    // enable casting shadows
    child.castShadow = true;
    child.receiveShadow = true;
    }
    });

    object.position.x = 0;
  object.position.y = 0;
  object.position.z = -5;
  object.scale.set(1, 1, 1);
  scene.add(object);
  });

  // animation
  const animate = () => {
    requestAnimationFrame( animate )
    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01
    renderer.render( scene, camera )
  }
  animate()
})