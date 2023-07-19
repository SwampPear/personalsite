import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { BufferGeometryUtils } from 'three/addons/utils/BufferGeometryUtils.js';
import pearVertexShader from 'shaders/pearVertexShader.js'
import fragmentShader from 'shaders/fragmentShader.js'


document.addEventListener('DOMContentLoaded', () => {
  // scene setup
  const scene = new THREE.Scene()

  // camera setup
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.y = 2
  camera.lookAt(0, 0, 0)

  // renderer setup
  const renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( 0x000000, 0 )
  renderer.setPixelRatio( window.devicePixelRatio )

  // orbit setup
  /*
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.listenToKeyEvents( window ); // optional

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 2;
  controls.maxDistance = 10;

  controls.maxPolarAngle = Math.PI / 2;*/

  // attach renderer to DOM
  document.querySelector( '.welcome__background' ).appendChild( renderer.domElement )

  // define material
  const pearMaterial = new THREE.ShaderMaterial( {
    uniforms: {
      time: { // float initialized to 0
        value: 0.0
      },
      mouseY: {
        value: 0.0
      },
      uColor1: { 
        value: new THREE.Color(0x8FCF55) 
      },
      uColor2: { 
        value: new THREE.Color(0xC2BC5A) 
      },
      uLightPos: {
        value: new THREE.Vector3(0, 0, 5) // position of spotlight
      },
      uLightColor: {
        value: new THREE.Color(0xffffff) // default light color
      },
      uLightIntensity: {
        value: 0.7 // light intensity
      }
    },
    vertexShader: pearVertexShader,
    fragmentShader: fragmentShader
  })

// define geometry and add to scene
let pearFound = false
const meshes = []

let loader = new OBJLoader();

loader.load('static/obj/pear.obj', function(object, materials) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (!pearFound) {
        //const merged = THREE.BufferGeometryUtils.mergeVertices(child.geometry)

        const mesh = new THREE.Mesh(
          child.geometry.toNonIndexed(),
          pearMaterial
        )

        scene.add(mesh)
        meshes.push(mesh)

        pearFound = true
      }
    }
  });
});


// animation
let start = Date.now()

const animate = () => {
    requestAnimationFrame(animate)

    pearMaterial.uniforms['time'].value = .000125 * ( Date.now() - start )
    
    renderer.render( scene, camera )
}

animate()

addEventListener('mousemove', (event) => {
  pearMaterial.uniforms['mouseY'].value = event.screenY * 0.05
})
})