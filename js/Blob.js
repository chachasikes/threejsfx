
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

import * as animatic from './../examples/animatic.js';
import * as bouncing_scene from './../examples/bouncing_scene.js';
import * as cherry_blossoms from './../examples/cherry_blossoms.js';
import * as example_tick from './../examples/example_tick.js';
import * as example_walking from './../examples/example_walking.js';
import * as floating_text from './../examples/floating_text.js';
import * as hello_world from './../examples/hello_world.js';
import * as physics_button from './../examples/physics_button.js';
import * as proton_particles from './../examples/proton_particles.js';
import * as proximity_events from './../examples/proximity_events.js';
import * as quill_scenes from './../examples/quill_scenes.js';

///
/// BlobChildren - a behavior similar to the above but supports nested children
///

let UUID = 0

export class BehaviorChildren {
	constructor(props=0,blob=0,element="body") {
		console.log('bc',element)
		this._load_children(props,blob,element)
	}
	_load_children(props,blob,element) {
		if(!props || !blob) {
			console.error("Children must be attached to a parent")
			return
		}
		blob.children = this // slight hack, this would normally be set when the constructor returns, set it early so that find() works earlier
		this.children = []
		console.log('children',element)
		for(let i = 0; i < props.length; i++) {
			this._load_child(props[i],blob,element)
		}
	}

	_load_child(details,blob,element) {
		let name = details.name || ++UUID
		let child = new Blob(details,blob,element)
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
	constructor(details=0,parent=0,element="body") {
		console.log("Loading Blob", details, element)
		console.log('b1',element)
		this._details = details // save this so I can regenerate a blob from scratch if desired
		this.parent = parent // parent is reserved - I wonder if I should switch this to use an _ to avoid polluting userland? TODO
		this.element = element
		try {
			if(!details) details = {}
			if(typeof details == 'string') {
				// load from a file

				this._load_module(details,element)
			} else {
				// attach behaviors - behaviors are hashed directly into the blob class not as a .behaviors property
				this._attach_behaviors(details,element)
			}
		} catch(e){
			console.error(e)
		}
	}
	_attach_behaviors(_behaviors={},element="body") {
		console.log('attach',element)
		Object.entries(_behaviors).forEach(([key,value,])=>{
			// evaluate each keypair - a keypair is either a name+class behavior, or a name + literal value
			console.log("behaviors", key, value, element)
			this._attach_behavior(key,value,element)
		})
	}
	_attach_behavior(name,props,element) {
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
				let className = "Behavior"+name.charAt(0).toUpperCase() + name.slice(1)
				// find the class
				let classRef = eval(className)
				// instance a behavior passing it the bucket itself and the properties for the field
				let behavior = new classRef(props,blob,element)
				// in each new behavior - keep a reference to this bucket
				behavior.blob = blob
				// in this instance - append new behavior to list of behaviors associated with this bucket
				blob[savename] = behavior
				console.log("Blob: added new instance of behavior " + savename + " " + className )
				blob._speak({name:"behavior_added",behavior:behavior,parent:blob})
			}
		} catch(e) {
			if(name == "name" || name=="parent") { // TODO mark out reserved by a search instead
				//console.error("Blob: hit a reserved term : " + key + "=" + props)
			} else {
				console.error(e)
				// console.error("Blob::load: did not find " + className + " for " + name)
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
				if(!value || !value.tick) return
				value.tick(interval,this)
			})
		} catch(e) {
			console.error(e)
		}
	}

	_load_module(example,element) {
		let scope = this
		let exampleModule = eval(example)
		let keys = Object.keys(exampleModule)
		let json = exampleModule[keys[0]]
		scope._attach_behaviors(json, element)
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
			let blob = new Blob(this._details,this.parent,this.element)
			return blob
		} else {
			let blob = this.parent.children._load_child(this._details,this.parent, this.element)
		}
	}
}
