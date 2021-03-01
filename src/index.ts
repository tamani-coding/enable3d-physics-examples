import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from 'enable3d';
import * as THREE from 'three'

export class ThreePhysicsComponent extends Scene3D {

  constructor() {
    super()
  }

  async init() {
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  async preload() {

  }

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    // position camera
    this.camera.position.set(13, 10, 23)

    //this.haveSomeFun()
    // enable physics debug
    if (this.physics.debug) {
      this.physics.debug.enable()
    }

    // add shape with physics
    let box1 = this.physics.add.box({}, { phong: { color: 'green' } })
    let sphere1 = this.physics.add.sphere({ y: 5, z: -3 }, { lambert: { color: 'yellow' } })
    let torus1 = this.physics.add.torus({ y: 1, z: 3, tube: 0.2, radialSegments: 16, tubularSegments: 16 }, { lambert: { color: 'orange' } })


    // apply physic stuff
    sphere1.body.setBounciness(0.4)
    sphere1.body.applyForceX(0.3)
    torus1.body.applyForceX(5)

    //gltf loader
    new GLTFLoader().loadAsync('/Duck.glb').then(gltf => {

      const duck: any = gltf.scene.children[0]
      duck.position.y -= 1
      const object = new ExtendedObject3D()
      object.add(duck)
      object.position.z = 6
      this.add.existing(object)
      this.physics.add.existing(object, { shape: 'box', width: 2, height: 2, depth: 2 })

      // duck.position.z = 6
      // this.scene.add(duck as any)
      // this.physics.add.existing(duck, { shape: 'convex'})
    })
    let box2 = this.physics.add.box({ x: -10, z: 6 }, { phong: { color: 'red' } })
    box2.body.applyForceX(15)

    // compound objects
    let group = new THREE.Group()
    group.position.z = 9
    group.position.y = 5
    group.rotation.z -= 1.5
    let c1 = this.add.box({ x: -1, y: -1 })
    let c2 = this.add.box({ x: -1, y: 0 })
    let c3 = this.add.box({ x: -1, y: 1 })
    let c4 = this.add.box({ y: 1 })
    let c5 = this.add.box({ x: 1, y: 1 })
    let c6 = this.add.box({ x: 2, y: 1 })
    this.add.existing(group)
    group.add(c1 as any)
    group.add(c2 as any)
    group.add(c3 as any)
    group.add(c4 as any)
    group.add(c5 as any)
    group.add(c6 as any)
    this.physics.add.existing(group as any)

    // const ball = this.physics.add.sphere({x: -200, y: 20, radius: 3, heightSegments: 16, widthSegments: 16}, {phong: {color: 'black'}})
    // ball.body.applyForceX(110)
    // wall
    // for (let y = 0; y <= 6; y += 2) {
    //   for (let z = -6; z <= 6; z += 2) {
    //     for (let x = 4; x <= 8; x += 2) {
    //       this.physics.add.box({ x, y, z, width: 1.95, height: 1.95, depth: 1.95, mass: 0.3 }, {phong: {color: 'orange'}})
    //     }
    //   }
    // }
  }

  update() {

  }

}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], antialias: true, gravity: { x: 0, y: -9.81, z: 0 } }
PhysicsLoader('/ammo', () => new Project(config))
