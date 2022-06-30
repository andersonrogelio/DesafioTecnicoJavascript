//  Funcion anonima que se ejecuta a si misma
 (function(){
     self.Board = function(width,height){
        // Esta es como si estuvieramos declarando una clase
        this.width = width;//ancho tablero
        this.height = height;//alto tablero
        this.playing = false;//saber si se esta jugando 
        this.game_over = false;//saber si el juego termino
        this.bars = [];
        this.ball = null;
    }
    self.Board.prototype = {
        //mi get para obtener mis elementos 
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            //nos devuelte las barras y el tablero
            return elements;
        }
    }
})();
//Nos permitira dibujar las barras
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);

        this.kind = "rectangle";
    }

    self.Bar.prototype = {
        down:function(){
            //funcion para bajar la barra
        },
        up:function(){
            //funcion para subir la barra
        }
    }

})();

//Funcion que nos ayuda a mostrar el canva
(function(){
    self.BoardView = function(canva,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

        self.BoardView.prototype = {
             draw: function(){
            console.log(this.board);
            for (var i = this.board.elements.length-1; i >= 0 ; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el);                
            };
        }
    }

    //Dibujara los 
    function draw(ctx,element){
        if (element !== null && element.hasOwnProperty("kind")) {
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            
                // default:
                //     break;
            }
        }

    }


})();

window.addEventListener("load",main);

function main(){
    var board = new Board(800,400);
     var bar = new Bar(20,100,40,100,board);
     var bar = new Bar(737,100,40,100,board);
    var canvas = document.getElementById('canva');
    var board_view = new BoardView(canvas,board);
    console.log(board);
     board_view.draw();
}