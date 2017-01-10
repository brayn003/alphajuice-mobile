function phaserGame() {
  return {
    init : init,
    addState : addState,
    startState : startState
  }

  var phaserGame;

  function init(){
    phaserGame = new Phaser.Game("100","100",Phaser.AUTO,'');
    // phaserGame.state.add('playState',playState);
    // phaserGame.state.start('playState');
  }

  function addState(stateName,state){
    phaserGame.state.add(stateName,state);
  }

  function startState(stateName){
    phaserGame.state.start(stateName);
  }

}

var gamePlay = new phaserGame();
gamePlay.init();
gamePlay.addState('playState',playState());
gamePlay.startState('playState')