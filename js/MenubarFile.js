/**
 * @author mrdoob / http://mrdoob.com/
 */

import { getBoards, fmsDB } from './db.js';
import { UIPanel, UIRow } from './libs/ui.js';
import { Menubar } from './Menubar.js';


function MenubarFile( editor ) {

	var signals = editor.signals;

	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'File' );
	container.add( title );

	var options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// New

	var option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( 'New' );
	option.onClick( function () {

		if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

			editor.clear();

		}

	} );
	options.add( option );

	// import

	var option = new UIPanel();
	option.setClass( 'option' );
	option.setTextContent( 'Import' );
	option.onClick( Import );
	options.add( option );

	var fileInput = document.createElement( 'input' );
	fileInput.type = 'file';
	fileInput.addEventListener( 'change', function ( event ) {

		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {

			editor.clear();
			editor.fromJSON( JSON.parse( event.target.result ) );

		}, false );

		reader.readAsText( fileInput.files[ 0 ] );

	} );

	function Import () {

		if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) )
			fileInput.click();

	}

	// export

	var option = new UIPanel();
	option.setClass( 'option' );
	option.setTextContent( 'Save' );
	option.onClick( Save );
	options.add( option );

	signals.exportState.add( Save );

	function Save () {


		var filename = editor.getName();

		if (filename === null){
			filename = prompt("Enter a filename");
			filename = encodeURI(filename);
			editor.setName(filename);
		}
		var output = JSON.stringify( editor.toJSON(), null, '\t' );
		var file = {'key': filename, 'value': output}

		fmsDB.put(file).then(res=> {
			let menubar = document.getElementById("menubar");
			menubar.remove();
			menubar = new Menubar(editor);
			document.body.appendChild(menubar.dom);
		})

	}

	return container;

}

export { MenubarFile };
