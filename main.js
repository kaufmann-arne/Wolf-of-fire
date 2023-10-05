import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';


	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1000;
	canvas.height = 500;

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.groundMargin = 40;
			this.speed = 0;
			this.maxSpeed = 3;
			this.background = new Background(this);
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.UI = new UI(this),
			this.enemies = [];
			this.particles = [];
			this.collisions = [];
			this.floatingMessages = [];
			this.maxParticles = 50;
			this.enemyTimer = 0;
			this.enemyInterval = 1000;
			this.debug = false;
			this.score = 0;
			this.fontColor = 'black';
			this.time = 0;
			this.maxTime = 50000000000;
			this.gameOver = false;
			this.started = false;
			this.paused = false;
			this.lives = 3;
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter()
		}
		update(deltaTime) {
			this.time += deltaTime;
			console.log(this.time)
			console.log(deltaTime)
			if(this.time > this.maxTime){
				this.gameOver = true;
			} 
			this.background.update();
			this.player.update(this.input.keys, deltaTime);
			if(this.enemyTimer > this.enemyInterval){
				this.addEnemy();
				this.enemyTimer = 0;
			}else{
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach(enemy => {
				enemy.update(deltaTime);
			})
			this.floatingMessages.forEach((message) => {
				message.update();
			})
			this.particles.forEach((particle, index) => {
				particle.update();
			})
			if(this.particles.length > this.maxParticles){
				this.particles.length = this.maxParticles;
			}
			this.collisions.forEach((collision, index) => {
				collision.update(deltaTime);
			})
			this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
			this.particles = this.particles.filter(particle => !particle.markedForDeletion)
			this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
			this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context);
			this.enemies.forEach(enemy => {
				enemy.draw(context);
			})
			this.particles.forEach(particle => {
				particle.draw(context);
			})
			this.collisions.forEach(collision => {
				collision.draw(context);
			})
			this.floatingMessages.forEach((message) => {
				message.draw(context);
			})
			this.UI.draw(context);
		}
		addEnemy(){
			if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
			else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
			this.enemies.push(new FlyingEnemy(this))
		}
	}

	const game = new Game(canvas.width, canvas.height);
	
	let lastTime = 0;
	
	
	
	function animate(timeStamp) {
		console.log(timeStamp)
		// const deltaTime = timeStamp - lastTime;		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// timeStamp = 0;
		// lastTime = 0;
		// game.time = 0;
		game.update(timeStamp - lastTime)
		lastTime = timeStamp;
		game.draw(ctx);
		if(!game.gameOver && game.started && !game.paused) requestAnimationFrame(animate);
	}
	function animate1() {
		// const deltaTime = timeStamp - lastTime;		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.draw(ctx);
	}
	animate1()
	 
	window.addEventListener('keydown', e => {
		if(e.key === ' ' && !game.started && !game.gameOver){
			console.log("A")
			game.time = 0
			lastTime = 0;
			console.log(lastTime)
			console.log(game.time)
			game.started = true;
			animate(0)
		}else if(e.key === ' ' && game.started && !game.paused && !game.gameOver){
			console.log("B")
			game.paused = true;
			animate(lastTime)
		}else if(e.key === ' ' && game.started && game.paused && !game.gameOver){
			console.log("C")
			game.paused = false; 
			animate(lastTime)
		}
		else if(e.key === ' ' && game.gameOver){
			console.log("D")
			game.lives = 3;
			game.gameOver = false;
			game.started = false;
			game.score = 0;	
			game.player.x = 0;
			game.player.y = game.height - game.player.height - game.groundMargin;;
			game.enemies = [];
			game.player.setState(0,0)
			animate1() 
		}
	});

	
// });
