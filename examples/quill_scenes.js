
// Based off proximity_events.js


///
/// A json graph with some objects in it.
/// In this example I exported it as a module
///
/// The root is an object, and it will be instanced as decorated with a couple of behaviors, notably a renderer and a scene
/// Then it also has children with other behaviors such as 3d objects
///

// This will get instanced as the root of the scene
export let mything = {

	// a scene behavior - has a listener that watches for any children being attached
	scene: 0,

	// a collection of children (itself a behavior)
	children: [

		// a skybox
		{
			name:"sky",
			sky:{
				art:"./art/quillustrations/skyboxes/handpainted/jungle_trees_equirectangular.png"
			}
		},

		// a camera blob with a camera behavior and an orbit control behavior
		{
			name:"camera",
			camera:{
        position:{x:20,y:5,z:50},
				lookat:{x:0,y:0,z:0},
			},
			orbit:{
				lookat:{x:10,y:10,z:10},
			}
		},

		// a light
		{
			name:"mylight",
			// a behavior on the blob; in this case a 3js light - maps to a class named BehaviorLight
			light:{
				// a property of the behavior - simply used by the behavior at will or thrown away
				position:{x:-50,y:-50,z:-50},
				color:0xFFFFFF,
        castShadow: false
			}
		},

		// some ground
		// {
		// 	name:"ground",
		// 	mesh:{
		// 		art:"sphere",
		// 		position:{x:0,y:-8,z:0},
		// 		scale:{x:300,y:1,z:300},
		// 		color:0x270212,
		// 	}
		// },

		// art
		{
			name:"scene_1",
			mesh:{
				art:"../art/quillustrations/forest_rough_sketch",
				position:{x:0,y:0,z:0},
				scale:{x:10,y:10,z:10},
				color:0x27ff12,
			}
		},

		// art
		// {
		// 	name:"scene_2",
		// 	mesh:{
		// 		art:"../art/quillustrations/red_animated_sketch",
		// 		position:{x:-2,y:2,z:-2},
		// 		scale:{x:1000,y:1000,z:1000},
		// 		color:0xff0212,
		// 	}
		// },

	]
}
