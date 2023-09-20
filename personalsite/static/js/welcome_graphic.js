import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import vertexShader from 'shaders/vertexShader.js'
import fragmentShader from 'shaders/fragmentShader.js'


document.addEventListener('DOMContentLoaded', () => {
    // scene setup
    const scene = new THREE.Scene()

     // camera setup
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.y = 2
    camera.lookAt( 0, 0, 0 )

    // renderer setup
    const renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor( 0x000000, 0 )
    renderer.setPixelRatio( window.devicePixelRatio )

    // attach renderer to DOM
    document.querySelector( '.welcome__background' ).appendChild( renderer.domElement )

  // define material
    const material = new THREE.ShaderMaterial( {
        uniforms: {
            time: { // float initialized to 0
                value: 0.0
            },
            mouseY: {
                value: 0.0
            },
            uColor1: { 
                value: new THREE.Color(0xC2D959) 
            },
            uColor2: { 
                value: new THREE.Color(0xc2bc5a) 
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
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })

    // define geometry and add to scene
    let pearFound = false

    let loader = new OBJLoader();

    loader.load('static/obj/pear.obj', function(object, materials) {
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (!pearFound) {
                    const mesh = new THREE.Mesh(
                        child.geometry.toNonIndexed(),
                        material
                    )

                    scene.add(mesh)

                    pearFound = true

                    // fade in DOM
                    document.querySelector( '.welcome__background' ).classList.add( 'welcome__background__fade-in' )
                }
            }
        })
    })

    // animation
    let start = Date.now()

    const animate = () => {
        requestAnimationFrame(animate)

        material.uniforms['time'].value = .000125 * ( Date.now() - start )
      
        renderer.render( scene, camera )
    }

    animate()

    // event based rendering
    addEventListener('mousemove', (event) => {
        material.uniforms['mouseY'].value = event.screenY * 0.05
    })
})