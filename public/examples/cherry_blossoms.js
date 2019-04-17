
///
/// This artist created scene demonstrates high level declarations of simple behaviors with 'packages' and particle effects.
///
/// A cherry tree is defined in a separate package that is stored in a blox folder as blox/cherry_tree.js.
/// That description loads up a gltf of a Cherry Tree from SketchFab.
/// [ from the artist https://sketchfab.com/3d-models/cherry-tree-2dc7230267bd4de781db5f22c35d5876 ].
/// There is also a simple particle effects engine attached.
///

export let cherry_blossoms = {

	scene: 0,

	group: [

		{
			name:"camera",
			camera:{
				position:{x:20,y:5,z:50},
				lookat:{x:0,y:10,z:0},
			},
			orbit:{
				lookat:{x:0,y:10,z:0},
			}
		},

		// a light
		{
			name:"mylight",
			light:{
				position:{x:-30,y:40,z:-50},
				color:0xFFFFFF,
			}
		},

		// a skybox
		{
			name:"sky",
			sky:{
				art:"../art/eso0932a.jpg"
			}
		},

		// some ground
		{
			name:"ground",
			mesh:{
				art:"sphere",
				position:{x:0,y:-8,z:0},
				scale:{x:300,y:1,z:300},
				color:0x270212,
			}
		},


	]
}
