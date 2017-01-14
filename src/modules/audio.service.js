function audio(){
  var audio = this;

  // var bgAudio = new Audio('assets/sounds/bg.ogg');
  //     bgAudio.addEventListener('ended', function() {
  //       this.currentTime = 0;
  //       this.play();
  //     }, false);
  //     bgAudio.play();

  //     window.addEventListener("beforeunload", function(e){
  //       _this.bgAudio.stop();
  //     });

  return {
    play : play
  }
}