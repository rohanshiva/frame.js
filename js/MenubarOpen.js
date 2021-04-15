/**
 * @author mrdoob / http://mrdoob.com/
 */

 import { UIPanel, UIRow } from './libs/ui.js';
 import { fmsDB, getBoards } from './db.js';



 function MenubarOpen( editor, res) {
    
     var container = new UIPanel();
     container.setClass( 'menu' );
 
     var title = new UIPanel();
     title.setClass( 'title' );
     title.setTextContent( 'Open' );
     container.add( title );
 
     var options = new UIPanel();
     options.setClass( 'options' );
     container.add( options );
 
     // Examples
     var items = [];
     for (const blob of res){
         items.push({title: blob.key});
     }

     
     for ( var i = 0; i < items.length; i ++ ) {
 
         ( function ( i ) {
 
             var item = items[ i ];
 
             var option = new UIRow();
             option.setClass( 'option' );
             option.setTextContent( item.title );
             option.onClick( async function () {
 
                 if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {
 
                     editor.clear();
                     let response = await fmsDB.get(item.title);
                     response = JSON.parse(response.value);
                     await editor.fromJSON( response );
                 }
 
             } );
             options.add( option );
 
         } )( i )
 
     }
 
     return container;
 
 }
 
 export { MenubarOpen };
 