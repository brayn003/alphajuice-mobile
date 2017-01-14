function loaderState(){
  // console.log(this.create)
  return {
    create : create,
    preload : preload,
    update : update
  }

  function preload(){
    // console.log('preload')
    this.load.image('background','assets/images/background.png');

    //Light
    this.load.image('left-spotlight','assets/images/left-spotlight.png');
    this.load.image('middle-spotlight','assets/images/middle-spotlight.png');
    this.load.image('right-spotlight','assets/images/right-spotlight.png');

    //Crowd
    this.load.image('crowd-first','assets/images/crowd_first.png');
    // this.load.image('crowd-first-right','assets/images/crowd_first_right.png');
    // this.load.image('crowd-first-middle','assets/images/crowd_first_middle.png');
    this.load.image('crowd-second','assets/images/crowd_second.png');
    this.load.image('crowd-third-left','assets/images/crowd_third_left.png');
    this.load.image('crowd-third-right','assets/images/crowd_third_right.png');
    this.load.image('rod','assets/images/rod.png');

    //Bubble
    this.load.image('bubble-1','assets/images/bubble1.png');
    this.load.image('bubble-2','assets/images/bubble2.png');
    this.load.image('bubble-3','assets/images/bubble3.png');
    this.load.image('bubble-4','assets/images/bubble4.png');
    this.load.image('star','assets/images/star.png');
    // this.load.image('bubble-5','assets/images/bubble5.png');
    // this.load.image('bubble-6','assets/images/bubble6.png');

    //Mixer
    // this.load.image('mixer','assets/images/mixer.png');

    this.load.spritesheet('mixer', 'assets/images/mixer.png', 360, 580);

    //Table
    this.load.image('table','assets/images/table.png');

    //dj
    this.load.spritesheet('dj','assets/images/dj.png', 210, 460);

    this.load.audio('bgAudio', ['assets/sounds/bg.ogg']);
  }

  function create(){
    // console.log('create2');
    phaserGame.state.start('playState')
  }

  function update(){
    // console.log('update')
  }
}

