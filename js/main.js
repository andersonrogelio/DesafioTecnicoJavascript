//  Funcion anonima que se ejecuta a si misma
 (function(){
     self.Board = function(width,height){
        // Esta es como si estuvieramos declarando una clase
        this.width = width;//ancho tablero
        this.height = height;//alto tablero
        this.playing = false;//saber si se esta jugando 
        this.game_over = false;//saber si el juego termino
    }
    self.Board.prototype = {
        //mi get para obtener mis elementos 
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            //nos devuelte las barras y el tablero
            return elements;
        }
    }
})();

(function(){
    self.BoardView = function(canva,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");
    }
})();

window.addEventListener("load",main);

function main(){
    var board = new Board(800,400);
    var canvas = document.getElementById('canva');
    var board_view = new BoardView(canvas,board);
}