
function getCookieValue(a) {
	var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)')
	return b ? b.pop() : ''
}

const PROJECT_KEY = getCookieValue("pk");

export const fmsDB = window.Deta(PROJECT_KEY).Base('frames');

export async function getBoards(){
    const boardGen = fmsDB.fetch();
    var boards = [];
    for await (const storedBoards of boardGen) {
      for (const board of storedBoards) {
        boards.push(board);
      }
    }
    return boards;    
}

 