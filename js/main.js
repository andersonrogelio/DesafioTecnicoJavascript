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
            var elements = this.bars.map(function(bar){ return bar;});
            elements.push(this.ball);
            //nos devuelte las barras y el tablero
            return elements;
        }
    }
})();

// Funcion de la pelota
(function(){
    self.Ball = function(x,y,radio,board){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        board.ball = this;
        this.kind = "circle";
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
        this.speed = 10; //controlador de velocidad
    }

    self.Bar.prototype = {
        down:function(){
            //funcion para bajar la barra
            this.y += this.speed;
        },
        up:function(){
            //funcion para subir la barra
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
             draw: function(){
            console.log(this.board);
            for (var i = this.board.elements.length-1; i >= 0 ; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el);                
            };
        },
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        play: function (){
            this.clean();
            this.draw();
        }
    }

    //Dibujara los 
    function draw(ctx,element){
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x,element.y,element.radio,0,7);
                    ctx.fill();
                    ctx.closePath();
                    break;
            
            }

    }


})();

var canvas = document.getElementById('canvas');
var board = new Board(800,400);
var barI = new Bar(20,100,40,100,board);
var barD = new Bar(737,100,40,100,board);
var board_view = new BoardView(canvas,board);
var ball = new Ball(350,100,10,board);

 
 document.addEventListener("keydown",function(ev){
     ev.preventDefault();
     if (ev.keyCode == 38) {
         barD.up();
        }else if (ev.keyCode == 40) {
            barD.down();
        }else if (ev.keyCode == 87) {
            barI.up();
        }else if (ev.keyCode == 83) {
            barI.down();
        }
    });
    
    window.requestAnimationFrame(controller);
    
    
    function controller(){
        board_view.play();
        window.requestAnimationFrame(controller);
    }