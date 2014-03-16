( function ( config ) {

	var camera = new THREE.PerspectiveCamera( 60, config.width / config.height, 1, 1500 );
	camera.up.y = 0.5;
	camera.up.z = -0.5;
	camera.up.normalize();

	var scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xff0000, 5, 300 );
	scene.add( light );
	
	var light1 = new THREE.PointLight( 0x8844ff, 2, 600 );
	scene.add( light1 );
	
	// tunnel

	var tunnel = new THREE.Object3D();
	scene.add( tunnel );
	
	var plane = new THREE.PlaneGeometry( 5, 5 );
	var material = new THREE.MeshLambertMaterial( {
		color: 0x606060,
		shading: THREE.FlatShading,
		side: THREE.DoubleSide
	} );

	for ( var i = 0; i < 500; i ++ ) {

		var radius = 50 + ( Math.random() * 150 );

		var object = new THREE.Mesh( plane, material );
		object.position.x = Math.random() * 1000 - 500;
		object.position.y = Math.random() * 1000 - 500;
		object.position.z = ( i * 5 ) - 500;
		object.rotation.y = Math.random();
		
		tunnel.add( object );

	}
	
	var tunnel2 = new THREE.Object3D();
	scene.add( tunnel2 );
	
	var material = new THREE.MeshLambertMaterial( {
		color: 0x606060,
		shading: THREE.FlatShading,
		side: THREE.DoubleSide,
		wireframe: true
	} );
	
	for ( var i = 0; i < 500; i ++ ) {

		var radius = 50 + ( Math.random() * 150 );

		var object = new THREE.Mesh( plane, material );
		object.position.x = Math.random() * 1000 - 500;
		object.position.y = Math.random() * 1000 - 500;
		object.position.z = ( i * 5 ) - 500;
		object.rotation.y = Math.random();
		
		tunnel2.add( object );

	}
	
	//
	
	var group = new THREE.Object3D();
	scene.add( group );
	
	var geometry =  new THREE.TetrahedronGeometry( 20, 0 );
	var material = new THREE.MeshLambertMaterial( {
		emissive: 0xf00000,
		shading: THREE.FlatShading
	} );

	for ( var i = 0; i < 500; i ++ ) {

		var radius = 10 + ( Math.random() * 50 );

		var object = new THREE.Mesh( geometry, material );
		object.position.x = Math.random() - 0.5;
		object.position.y = Math.random() - 0.5;
		object.position.normalize();
		object.position.multiplyScalar( radius );
		object.position.z = - i * 10;
		group.add( object );

	}
	
	var sphere = new THREE.Object3D();
	sphere.scale.multiplyScalar( 3 );
	scene.add( sphere );
	
	sphere.add( new THREE.Mesh( new THREE.SphereGeometry( 20, 2, 2 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 0 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.CubeGeometry( 20, 20, 20 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.OctahedronGeometry( 20, 0 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 1 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.TetrahedronGeometry( 20, 0 ), material ) );
	sphere.add( new THREE.Mesh( new THREE.TetrahedronGeometry( 20, 1 ), material ) );

	var renderer = config.renderer;
	
	//
		
	var startPosition = new THREE.Vector3();
	var endPosition = new THREE.Vector3();
	var deltaPosition = new THREE.Vector3();

	var prevShape = 0;

	//

	return new FRAME.Module( {

		parameters: {

			startPosition: new FRAME.Parameter.Vector3( 'Camera Start', [ 0, 0, 0 ] ),
			endPosition:   new FRAME.Parameter.Vector3( 'Camera End', [ 0, 0, 0 ] )

		},

		start: function ( parameters ) {
		
			startPosition.fromArray( parameters.startPosition );
			endPosition.fromArray( parameters.endPosition );
			deltaPosition.subVectors( endPosition, startPosition );
		
		},

		update: function ( parameters, t ) {
		
			var t2000 = t * 2000;
			
			sphere.position.z = t2000;
			light.position.z = sphere.position.z;
			light1.position.z = sphere.position.z - 50;
			
			var shape = Math.floor( t * 125 ) % sphere.children.length;
			
			if ( shape !== prevShape ) {
				
				for ( var i = 0, l = sphere.children.length; i < l; i ++ ) {
					
					var object = sphere.children[ i ];
					object.visible = i === shape;
					
				}
				
				prevShape = shape;
				
			}

			camera.position.copy( deltaPosition );
			camera.position.multiplyScalar( t );
			camera.position.add( startPosition );
			camera.lookAt( sphere.position );
			
			group.position.z = sphere.position.z;
			group.rotation.z = t * 4;
			
			for ( var i = 0, l = group.children.length; i < l; i ++ ) {

				var mesh = group.children[ i ];
				mesh.rotation.x = i + t * 24;
				mesh.rotation.z = i + t * 12;
				
			}
			
			for ( var i = 0, l = tunnel.children.length; i < l; i ++ ) {

				var mesh = tunnel.children[ i ];
				var scale = Math.abs( t2000 - mesh.position.z ) * 0.05;
				mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
				mesh.rotation.x = scale * 0.2;
				mesh.rotation.z = scale * 0.1;
				
				var mesh = tunnel2.children[ i ];
				var scale = Math.abs( t2000 - mesh.position.z ) * 0.05;
				mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
				mesh.rotation.x = scale * 0.2;
				mesh.rotation.z = scale * 0.1;

			}
			
			renderer.render( scene, camera );

		}

	} );

} )