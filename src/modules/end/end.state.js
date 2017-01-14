function endState(){
  
  var game, background, game_scale,
      score, bgAudio,
      scoreText, endText;
  
  function init(params) {
    score = params.score;
    bgAudio = params.bgAudioHandler;
  }

  function create() {
    game = this.game;
    
    background = game.add.sprite(game.width/2,game.height/2,'background');
    game_scale = game.height / background.height;
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(game_scale, game_scale);
    decreaseMusicVolume(0.5);

    scoreText = game.add.text(game.width/2,game.height/2 - 200*game_scale,score,{ font: "100px Boogaloo", fill: "#FFD700", align: "center"});
    scoreText.anchor.setTo(0.5);

    endText = game.add.text(game.width/2,game.height/2+ 100*game_scale,"Tap to play again",{ font: "40px Boogaloo", fill: "#FFD700", align: "center"});
    endText.anchor.setTo(0.5);
    endText.inputEnabled = true;
    endText.events.onInputDown.addOnce(function(){
      changeState('playState');
      // stopMusic();
    })

    
  }

  function changeState(state){
    // var slideIn = Phaser.Plugin.StateTransition.In,        
    var slideOut = Phaser.Plugin.StateTransition.Out.SlideLeft;        
    var slideIn = Phaser.Plugin.StateTransition.In.SlideRight;
    slideIn.duration = 300;
    slideOut.duration = 300;
    phaserGame.state.start(state,slideOut,slideIn,true,false,{bgAudioHandler : bgAudio});
    // phaserGame.game.state.start()        
  }

  function decreaseMusicVolume(vol){
    bgAudio.volume = vol;
  }

  function stopMusic(){
    bgAudio.destroy();
    // game.cache.removeSound('wizball');
  }

  return {
    init : init,
    create : create
  }
}