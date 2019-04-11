export class BehaviorSky extends THREE.Mesh {

	constructor(props={},blob=0) {

		let sky_vertex = `
			varying vec2 vUV;
			void main() {
			  vUV = uv;
			  vec4 pos = vec4(position, 1.0);
			  gl_Position = projectionMatrix * modelViewMatrix * pos;
			}
			`
		let sky_fragment = `
			uniform sampler2D texture;
			varying vec2 vUV;

			void main() {
			  vec4 sample = texture2D(texture, vUV);
			  gl_FragColor = vec4(sample.xyz, sample.w);
			}
			`
		var geometry = new THREE.SphereGeometry(-500, 60, 40);
		console.log('skybox', props.art);
		var skybox = props.art || '/art/eso0932a.jpg';
		var uniforms = {
		  texture: { type: 't', value: THREE.ImageUtils.loadTexture(skybox) }
		}
		var material = new THREE.ShaderMaterial( {
		  uniforms:       uniforms,
		  vertexShader:   sky_vertex,
		  fragmentShader: sky_fragment,
		})
		let skyBox = super(geometry, material)
		// skyBox.scale.set(-1, 1, 1) - flipped the above sphere instead
		skyBox.renderDepth = 1000.0
	}

	/// set or reset qualities of this mesh
	reset(props) {

		if(!props) return

		// save for future reference on changes
		this.props = props
	}
}
