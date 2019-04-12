// Problem: This way of loading classes isn't available at the time of calling the Blob class:
// Import to make available to the bundle:
// Basic
import {BehaviorRenderer, BehaviorScene, BehaviorCamera} from './BehaviorRenderer.js'

import {BehaviorLight} from './BehaviorLight.js'
import {BehaviorMesh} from './BehaviorMesh.js'

// Some fancy objects
import {BehaviorSky} from './BehaviorSky.js'
import {BehaviorHeart} from './BehaviorHeart.js'
import {BehaviorText} from './BehaviorText.js'
import {BehaviorTextPanel} from './BehaviorTextPanel.js'

// Motion models for player
import {BehaviorOrbit} from './BehaviorOrbit.js'
import {BehaviorWalk} from './BehaviorWalk.js'

// Some simple behaviors
import {BehaviorLine, BehaviorBounce, BehaviorOscillate, BehaviorWander, BehaviorStare } from './BehaviorBounce.js'
import {BehaviorParticles} from './BehaviorParticles.js'
import {BehaviorProton} from './BehaviorProton.js'
import {BehaviorEmitter} from './BehaviorEmitter.js'

// Physics
import {BehaviorPhysics, BehaviorPhysical} from './BehaviorPhysics.js'

// Event handling
import {BehaviorEvent} from './BehaviorEvent.js'
import {BehaviorTick} from './BehaviorTick.js'
import {BehaviorCollide} from './BehaviorCollide.js'

///
/// BlobChildren - a behavior similar to the above but supports nested children
///

let UUID = 0

export class BehaviorChildren {
	constructor(props=0,blob=0) {
		this._load_children(props,blob)
	}
	_load_children(props,blob) {
		if(!props || !blob) {
			console.error("Children must be attached to a parent")
			return
		}
		blob.children = this // slight hack, this would normally be set when the constructor returns, set it early so that find() works earlier
		this.children = []
		for(let i = 0; i < props.length; i++) {
			this._load_child(props[i],blob)
		}
	}

	_load_child(details,blob) {
		let name = details.name || ++UUID
		let child = new Blob(details,blob)
		child.name = name
		console.log("BlobChildren: adding child named " + name )
		this.children.push(child)
		blob._speak({ name:"child_added", child:child, parent:blob })
	}

	find(name) {
		for(let i = 0; i < this.children.length; i++) {
			if(this.children[i].name == name) return this.children[i]
		}
		return 0
	}
	tick(interval=0.01) {
		for(let i = 0; i < this.children.length; i++) {
			let blob = this.children[i]
			blob._tick(interval)
		}
	}
}

///
/// Blob acts a bucket to hold a collection of named behaviors
///
/// Behaviors in a blob have a back reference to the blob
///
/// TODO it would be nice to allow multiple instances of a given Behavior in some cases
/// TODO interval for timing stability at various frame rates
/// TODO remove having to pass blobs in tick
///

export class Blob {
	constructor(details=0,parent=0) {
		console.log('building Blob', details, parent, typeof details)
		this._details = details // save this so I can regenerate a blob from scratch if desired
		this.parent = parent // parent is reserved - I wonder if I should switch this to use an _ to avoid polluting userland? TODO
		this.behaviorRegistry = {
			'BehaviorRenderer': 'BehaviorRenderer.js',
			'BehaviorScene': 'BehaviorRenderer.js',
			'BehaviorCamera': 'BehaviorRenderer.js',
			'BehaviorLight': 'BehaviorLight.js',
			'BehaviorMesh': 'BehaviorMesh.js',
			// Some fancy objects
			'BehaviorSky': 'BehaviorSky.js',
			'BehaviorHeart': 'BehaviorHeart.js',
			'BehaviorText': 'BehaviorText.js',
			'BehaviorTextPanel': 'BehaviorTextPanel.js',
			// Motion models for player
			'BehaviorOrbit': 'BehaviorOrbit.js',
			'BehaviorWalk': 'BehaviorWalk.js',
			// Some simple behaviors
			'BehaviorLine': 'BehaviorBounce.js',
			'BehaviorBounce': 'BehaviorBounce.js',
			'BehaviorOscillate': 'BehaviorBounce.js',
			'BehaviorWander': 'BehaviorBounce.js',
			'BehaviorStare': 'BehaviorBounce.js',
			'BehaviorParticles': 'BehaviorParticles.js',
			'BehaviorProton': 'BehaviorProton.js',
			'BehaviorEmitter': 'BehaviorEmitter.js',
			// Physics
			'BehaviorPhysics': 'BehaviorPhysics.js',
			'BehaviorPhysical': 'BehaviorPhysics.js',
			// Event handling
			'BehaviorEvent': 'BehaviorEvent.js',
			'BehaviorTick': 'BehaviorTick.js',
			'BehaviorCollide': 'BehaviorCollide.js'
		};
		try {
			if(!details) details = {}
			if(typeof details == 'string') {
				// load from a file
				this._load_module(details)
			} else {
				// attach behaviors - behaviors are hashed directly into the blob class not as a .behaviors property
				this._attach_behaviors(details)
			}
		} catch(e){
			console.error(e)
		}
	}
	_attach_behaviors(_behaviors={}) {
		console.log('b', _behaviors);
		Object.entries(_behaviors).forEach(([key,value])=>{
			// evaluate each keypair - a keypair is either a name+class behavior, or a name + literal value
			this._attach_behavior(key,value)
		})
	}
	_attach_behavior(name,props) {
		let blob = this
		try {
			// skip past existing instances of behavior on object
			let behavior = null
			let savename = name
			for(let count = 0;;count++) {
				savename = name + (count ? count : "")
				behavior = blob[savename]
				if(!behavior) break
			}
			// instance behavior
			if(true) {
				let className = "Behavior"+name.charAt(0).toUpperCase() + name.slice(1);
				let fileName = this.behaviorRegistry[className];
				// find the class
				let scope = this
				console.log('fn', fileName);
				if (fileName !== undefined ) {
					import('./' + fileName).then((module) => {
						let keys = Object.keys(module)
						let json = module[keys[0]]
						console.log(module);

						// let classRef = eval(className)
						// // instance a behavior passing it the bucket itself and the properties for the field
						let behavior = new module[className](props,blob)
						console.log(behavior);
						scope._attach_behaviors(json)

					})
				}


			}
		} catch(e) {
			if(name == "name" || name=="parent") { // TODO mark out reserved by a search instead
				console.error("Blob: hit a reserved term")
			} else {
				console.error(e)
				console.error("Blob::load: did not find class")
				// store the value as a literal if no class contructor found
				blob[name] = props
			}
		}
	}
	/// listen for events on this blob with a filter - filter is ignored right now, no percolation of events
	_listen(filter,listener) {
		if(!this._listeners) this._listeners = []
		this._listeners.push(listener)
	}
	/// send event to all listeners - no filtering right now
	_speak(args) {
		for(let i = 0; this._listeners && i < this._listeners.length;i++) {
			let listener = this._listeners[i]
			listener(args)
		}
	}
	_tick(interval) {
		// a blob has a collection of properties, some of which may be behaviors
		try {
			Object.entries(this).forEach(([key,value])=>{
				if(!value.tick) return
				value.tick(interval,this)
			})
		} catch(e) {
			console.error(e)
		}
	}
	_load_module(filename) {
		console.log('filename', filename);
		let scope = this
		import(filename).then((module) => {
			let keys = Object.keys(module)
			let json = module[keys[0]]
			scope._attach_behaviors(json)
		})
	}
	/// find a child in children - only searches first collection of children - and only if user named it
	/// TODO may want a flat global namespace
	/// TODO may want to call this _findGlobalByName or something
	_findChildByName(name) {
		if(!this.parent || !this.parent.children) return 0
		return this.parent.children.find(name)
	}
	/// look at children properties and find first one that has a certain attribute
	_findByProperty(field) {
		let keys = Object.keys(this)
		for(let i = 0 ; i < keys.length; i++) {
			let value = this[keys[i]]
			if(typeof value  === "object" && value[field]) {
				return value
			}
		}
		return 0
	}
	_copy() {
		if(!this.parent.children) {
			console.error("Warning: There's no children in this area to attach your new blob to")
			let blob = new Blob(this._details,this.parent)
			return blob
		} else {
			let blob = this.parent.children._load_child(this._details,this.parent)
		}
	}
}
