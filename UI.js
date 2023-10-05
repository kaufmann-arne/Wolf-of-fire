export class UI{
	constructor(game){
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = 'Creepster';
		this.livesImage = lives;
	}
	draw(context){
		context.save()
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowColor = 'white';
		context.shadowBlur = 0;
		context.font = this.fontSize + 'px ' + this.fontFamily;
		context.textAlign = 'left';
		context.fillStyle = this.game.fontColor;
		context.fillText('Score: ' + this.game.score, 20, 50)

		// context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
		// context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80)

		for(let i = 0; i < this.game.lives; i++){
			context.drawImage(this.livesImage, 25 * i + 20, 70, 25, 25)
		}
		if(this.game.paused ){
			context.textAlign = 'center';
			context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
			context.fillText('Press Space to continue', this.game.width * 0.5, this.game.height * 0.5 - 20);
			context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
		}

		if(!this.game.started){
			context.textAlign = 'center';
			context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
			context.fillText('Press Space to start and pause ', this.game.width * 0.5, this.game.height * 0.5 - 20);
			context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
		}
		

		if(this.game.gameOver){
			context.textAlign = 'center';
			context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
			if(this.game.score >= 30){
				context.fillText('Monster Hunter', this.game.width * 0.5, this.game.height * 0.5 - 20);
				context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
				context.fillText('Press Space to restart', this.game.width * 0.5, this.game.height * 0.5 + 20);
			}else{
				context.fillText('Afraid of the dark?', this.game.width * 0.5, this.game.height * 0.5 - 20);
				context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
				context.fillText('Press Space to restart', this.game.width * 0.5, this.game.height * 0.5 + 20);
			}
			
		}
		context.restore()
	}
}