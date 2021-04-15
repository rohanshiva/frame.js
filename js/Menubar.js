/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel } from './libs/ui.js';

import { MenubarFile } from './MenubarFile.js';
import { MenubarEdit } from './MenubarEdit.js';
import { MenubarExamples } from './MenubarExamples.js';
import { MenubarHelp } from './MenubarHelp.js';
import { MenubarOpen } from './MenubarOpen.js';

import { fmsDB, getBoards } from './db.js';




function Menubar(editor) {

	var container = new UIPanel();
	container.setId('menubar');
	container.add(new MenubarFile(editor));
	container.add(new MenubarEdit(editor));
	container.add(new MenubarExamples(editor));
	container.add(new MenubarHelp(editor));
	getBoards().then(res => {
		return container.add(new MenubarOpen(editor, res));
	})

	return container;

}

export { Menubar };
