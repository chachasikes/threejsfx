
///
/// A mesh manager
///
/// TODO support active or inactive
/// TODO should material properties be more detailed?
///

export class BehaviorMesh extends THREE.Mesh {

	constructor(props={},blox=0) {

		// TODO I would prefer to instance and set properties in one step rather than deleting and resetting properties
		super()

		// reset physics
		this.physicsReset()

		// set or reset various properties from params
		this.on_reset({description:props,blox:blox})

	}

	/// set or reset qualities of this mesh
	on_reset(args) {

		let props = args.description
		if(!props) return

		// set or reset material from params if changed
		// - do this before the geom in case I later want to try scavenge material into gltf
		if(!this.description || props.color != this.description.color || !this.material) {
			let c = props.color || 0xff00ff
			let s = props.doublesided ? THREE.DoubleSide : 0
			let t = props.transparent ? 0 : 0
			let m = new THREE.MeshPhongMaterial( {color: c, transparent: t, side: s } )
			if(this.material) this.material.dispose()
			this.material = m
		}

		// set or reset geometry if changed
		if(!this.madeGeometry || (this.description && props.art && this.description.art != props.art)) {
			if(props.hasOwnProperty("art"))
				this.geometry = this.setGeometryFromString(props.art)
		}

		let mesh = this

		if(props.scale) {
			mesh.scale.set(props.scale.x,props.scale.y,props.scale.z)
		}

		if(props.position) {
			mesh.position.set(props.position.x,props.position.y,props.position.z)
		}

		if(props.orientation) {
			mesh.rotation.x = props.orientation.x * Math.PI/180.0
			mesh.rotation.y = props.orientation.y * Math.PI/180.0
			mesh.rotation.z = props.orientation.z * Math.PI/180.0
		}

		if(typeof props.visible !== 'undefined') {
			mesh.visible = props.visible ? true : false
		}

	}

	/// set or reset geometry from a string description with special rules
	setGeometryFromString(str) {

		this.madeGeometry = true

		// TODO must write remove if already exists in scene

		let is_gltf = 0
		let geometry = 0

		switch(str) {
			case undefined:
			case 0:
			case null:
			case "ignore":
				// TODO the semantics here could use thought - perhaps a default shape is best if nothing is supplied
				geometry = this.setCustomGeometry()
				break
			case "group":
				geometry = null
				break
			case "box":
				geometry = new THREE.BoxBufferGeometry(1,1,1,16,16,16)
				break
			case "sphere":
				geometry = new THREE.SphereGeometry(1,16,16)
				break
			default:
				is_gltf = 1
				geometry = new THREE.SphereGeometry(1,16,16)
				break
		}

		if(this.geometry) this.geometry.dispose()
		this.geometry = geometry

		// was a simple geometry
		if(!is_gltf) {
			return this.geometry
		}

		// actually i don't want to see it
		if(this.material) this.material.visible = false

		// load the gltf
		let url = str + "/scene.gltf"
		let loader = new THREE.GLTFLoader()
	    let mesh = this

		loader.load(url, (gltf) => {

			if(!gltf || !gltf.scene) {
				return // oh well it tried - doesn't matter if fails
			}

			// start animations
	        if(gltf.animations && gltf.animations.length){
	            let mixer = new THREE.AnimationMixer(gltf.scene)
	            for(let animation of gltf.animations){
	                mixer.clipAction(animation).play()
	            }
	        }

			// center on self
			let bbox = new THREE.Box3().setFromObject(gltf.scene)
			let size = mesh.scale.length()
		    let resize = size / bbox.getSize(new THREE.Vector3()).length() * 2
		    let offset = bbox.getCenter(new THREE.Vector3()).multiplyScalar(resize)
		    gltf.scene.scale.set(resize,resize,resize)
		    gltf.scene.position.sub(offset)

		    // add to parent
			mesh.add(gltf.scene)

			// turn the top level material invisible to reveal the gltf only
			// TODO later use the top level material here
			if(this.material) this.material.visible = false
		})

		return this.geometry
	}

	///
	/// may be subclassed
	///
	setCustomGeometry() {
		console.error(this)
		throw new Error('You have to implement the method setCustomGeometry!')
	}

	///
	/// notice when any children blox show up and add to 3js
	///

	on_add(args) {
		let mesh = this
		let children = args.blox.query({instance:THREE.Object3D,all:true})
		children.forEach((child) => { mesh.add(child) })
	}


	///
	/// notice tick event and update kinetic physics
	///

	on_tick(args) {
		this.physicsTick()
	}

	/// TODO may move kinetic physics elsewhere
	physicsTick() {
		if(!this.physical) return

		// dampen linear movement by friction
		this.linear.x = this.linear.x * this.friction
		this.linear.y = this.linear.y * this.friction
		this.linear.z = this.linear.z * this.friction

		// apply force to object
		this.position.add(this.linear)
	}

	physicsReset() {
		this.physical = 0
		this.friction = 0.9
		this.linear = new THREE.Vector3()
	}

	///
	/// Apply a linear force to an object, or an angular force, which dampen over time
	/// TODO use time interval TODO parameterize

	physicsForce(linear=0,angular=0) {
		this.physical = 1
		if(linear) {
			// rotate force to current heading and apply it to forces on object
			//let scratch = new THREE.Vector3(this.linear.x,this.linear.y,this.linear.z)
			let scratch = new THREE.Vector3(linear.x,linear.y,linear.z) //this.linear.x,this.linear.y,this.linear.z)
			scratch.applyQuaternion( this.quaternion )
			this.linear.add(scratch)
		}
		if(angular) {
			// get angular force as a quaternion
			let q = new THREE.Quaternion() ; q.setFromEuler(angular)
			// apply to current orientation immediately
			this.quaternion.multiply(q)
			// debug
			let e = new THREE.Euler()
			e.setFromQuaternion(this.quaternion)
			let x = e.x * 180 / Math.PI
			let y = e.y * 180 / Math.PI
			let z = e.z * 180 / Math.PI
		}
	}
}


