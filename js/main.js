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
            // elements.push(this.ball);
            //nos devuelte las barras y el tablero
            return elements;
        }
    }
})();

//Funcion de la pelota

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
        this.speed = 10; //controlador de velocidad
    }

    self.Bar.prototype = {
        down:function(){
            //funcion para bajar la barra
            this.y += this.speed;
        },
        up:function(){
            //funcion para subir la barra
            // this.y = this.y - this.speed;
            this.y -= this.speed;
        },

        toString: function(){
            return "x: "+this.x +" y: "+ this.y;
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
            clean: function(){
                console.log(":3");
                this.ctx.clearRect(0,0,this.board.width,this.board.height);
            },
             draw: function(){
            // console.log(this.board);
            for (var i = this.board.elements.length-1; i >= 0 ; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el);                
            };
        },
        play: function (){
            this.clean();
            this.draw();
        }
    }

    //Dibujara los 
    function draw(ctx,element){
        // if (element !== null && element.hasOwnProperty("kind")) {
        // if (element !== null ) {
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            
                // default:
                //     break;
            }
        // }

    }


})();

var canvas = document.getElementById('canvas');
var board = new Board(800,400);
var board_view = new BoardView(canvas,board);
 var barI = new Bar(20,100,40,100,board);
 var barD = new Bar(737,100,40,100,board);

 
 document.addEventListener("keydown",function(ev){
     ev.preventDefault();
     if (ev.keyCode == 38) {
         barD.up();
         console.log(barD.toString());
        }else if (ev.keyCode == 40) {
            barD.down();
            console.log(barD.toString());
        }else if (ev.keyCode == 87) {
            barI.up();
            console.log(barI.toString());
        }else if (ev.keyCode == 83) {
            barI.down();
            console.log(barI.toString());
        }
    });
    
    // window.addEventListener("load",controller);
    window.requestAnimationFrame(controller);
    
    
    function controller(){
        board_view.play();
        window.requestAnimationFrame(controller);
    }