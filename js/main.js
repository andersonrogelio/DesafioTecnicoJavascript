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
        this.direction = 1;
        this.brounce_angle = 0;
        this.max_brounce_angle = Math.PI / 12;
        this.speed = 3;
        board.ball = this;
        this.kind = "circle";
    }

    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y * this.direction);
        },
        get width(){
            return this.radio * 2;
        },
        get height(){
            return this.radio * 2;
        },
        restablecer: function(direcion,board){
            this.direcion = direcion;
            this.x = 350;
            this.y = 100;
            board.playing = true;
        },
        collision: function(bar){
            

            //Reacciona a la colicion con una barra que recibe como parametro
            var relative_intersect_y = (bar.y + (bar.height / 2) ) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
            this.bounce_angle = normalized_intersect_y * this.max_brounce_angle;

            this.speed_y = this.speed * -Math.sin(this.brounce_angle);
            this.speed_x = this.speed * Math.cos(this.brounce_angle);

            if (this.x > (this.board.width / 2)) this.direction = -1; 
            else this.direction = 1;
                
            
        }
    }

})();

//Nos permitira dibujar las barras
(function(){
    self.Bar = function(x,y,width,height,board,gamer){
        //las dos primera declaraciones serviran para saber el nombre y los puntos del jugador
        this.gamer = gamer;
        this.puntos = 0;
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
            if (this.y < 300) {
                this.y += this.speed;
            }
        },
        up:function(){
            //funcion para subir la barra
            if (this.y > 0) {
                this.y -= this.speed;
            }
        },
        juegoNuevo: function (){
            this.puntos = 0;
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
            for (var i = this.board.elements.length-1; i >= 0 ; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el);                
            };
        },
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        check_collisions: function(){
            for (let i = this.board.bars.length - 1; i >= 0; i--) {
                var bar = this.board.bars[i];
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collision(bar);
                }else if (hit(bar, this.board.ball) == false ) {
                    this.board.playing = false;
                    mensajeAGamer(bar);
                    setTimeout(()=> {
                        this.board.ball.restablecer(this.board.ball.direcion,board);
                    },1500);
                }
            };
        },
        play: function (){
            if (this.board.playing) {
                this.clean();
                this.draw();
                this.check_collisions();
                this.board.ball.move();
            }
        }
    }

    function hit(a,b) {

        //revisa si el elemento a coliciona con b
        var hit = false;
        //colisiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height) {
                hit = true;
            }
        }
            //Colision de b con a
            if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
                if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
                    hit = true;
                }
            }
                //Colision de b con a
                if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
                    if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
                        hit = true;
                    }              
                    return hit;
                }
    }
//funcion que muestra y luego de un tiempo oculta el modal de mensajes
    function mostrarHTML(mensaje,donde,modal,tiempo){
        donde.innerHTML = mensaje;
        modal.classList.add('show');
        setTimeout(()=> {
            modal.classList.remove('show');
        },tiempo);

    }
//funcion que me servira para mostrar los mensajes además de contar puntos 
    function mensajeAGamer(bar){
        bar.puntos += 1 ;
        let mensaje;
        //capturo objetos del html para poder mostrar mi mensaje con un PopUp
        let modal = document.getElementById("modal_contenedor");
        let mostrarEn = document.getElementById("mensajes");
        //condicional que cambia el mensaje en función de si ya se gano el juego
        if (bar.puntos < 5) {
            mensaje = "Felicidades jugador "+bar.gamer+ " has hecho un punto, total de puntos: "+ bar.puntos;
            mostrarHTML(mensaje,mostrarEn,modal,1500);
        }else{
            mensaje = "Felicidades jugador "+bar.gamer+ " has ganado esta partida";
            mostrarHTML(mensaje,mostrarEn,modal,1500);
            this.board.ball.restablecer(this.board.ball.direcion,board);
            barI.juegoNuevo();
            barD.juegoNuevo();
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
var barI = new Bar(20,100,20,100,board,"A");
var barD = new Bar(737,100,20,100,board,"B");
var board_view = new BoardView(canvas,board);
var ball = new Ball(350,100,10,board);

 
 document.addEventListener("keydown",function(ev){
     if (ev.keyCode == 38) {
         ev.preventDefault();
         barD.up();
        }else if (ev.keyCode == 40) {
            barD.down();
        }else if (ev.keyCode == 87) {
            barI.up();
        }else if (ev.keyCode == 83) {
            barI.down();
        }else if (ev.keyCode === 32) {
            ev.preventDefault();
            board.playing = !board.playing;
        }
    });
    
    board_view.draw();
    window.requestAnimationFrame(controller);
    
    
    function controller(){
        board_view.play();
        window.requestAnimationFrame(controller);
    }