function dashState(){
  // console.log(this.create)

  // function preload(){
  //   console.log('preload')
  // }
  var game, game_scale, background,
      table, mixer, dj,
      leftSpotlight, middleSpotlight, rightSpotlight, 
      crowdThirdLeft, crowdThirdRight, crowdSecond, crowdFirst,
      mixerAnim;
      
  var playAnimTweens = {};
  
      
  function create(){
    game = this.game;
    
    background = game.add.sprite(game.width/2,game.height/2,'background');
    game_scale = game.height / background.height;
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(game_scale, game_scale);

    var emitter = game.add.emitter(0, 0, 50);
    emitter.height = game.height;
    console.log(emitter.height)
    emitter.makeParticles('star');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.2;
    // emitter.maxParticleScale = 0;
    emitter.minParticleSpeed.set(200, 100);
    emitter.maxParticleSpeed.set(300, 100);
    emitter.gravity = 0;
    // emitter.setRotation(0, 0);
    // emitter.setAlpha(0.3, 0.8);
    // emitter.setScale(0.1, 0.1, 0.5, 1);
    // emitter.setScale(0.1,0.1)

    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
    // emitter.flow(10,1000,2)
    emitter.start(false, 5000, 100);

    // game_scale = game.height / background.height;

    console.log('creating dashState');
    leftSpotlight = game.add.sprite(0,0,'left-spotlight');
    leftSpotlight.scale.setTo(game_scale, game_scale);
    leftSpotlight.angle = -90;
    playAnimTweens['leftSpotlight'] = game.add.tween(leftSpotlight).to({angle : 0},800, 'Cubic.easeOut');

    middleSpotlight = game.add.sprite(game.width/2,0,'middle-spotlight');
    middleSpotlight.anchor.setTo(0.5,0);
    middleSpotlight.scale.setTo(game_scale, -game_scale);
    playAnimTweens['middleSpotlight'] = game.add.tween(middleSpotlight.scale).to({y : game_scale},800, 'Cubic.easeOut');

    rightSpotlight = game.add.sprite(game.width,0,'right-spotlight');
    rightSpotlight.anchor.setTo(1,0);
    rightSpotlight.scale.setTo(game_scale, game_scale);
    rightSpotlight.angle = 90;
    playAnimTweens['rightSpotlight'] = game.add.tween(rightSpotlight).to({angle : 0},800, 'Cubic.easeOut');

    crowdThirdLeft = game.add.sprite(-1,game.height,'crowd-third-left');
    crowdThirdLeft.scale.setTo(game_scale, game_scale);
    playAnimTweens['crowdThirdLeft'] = game.add.tween(crowdThirdLeft).to({y : 200*game_scale},800, Phaser.Easing.Back.Out,false,400);
    


    crowdThirdRight = game.add.sprite(game.width,game.height,'crowd-third-right');
    crowdThirdRight.anchor.setTo(1,0);
    crowdThirdRight.scale.setTo(game_scale, game_scale);
    playAnimTweens['crowdThirdRight'] = game.add.tween(crowdThirdRight).to({y : 200*game_scale},800, Phaser.Easing.Back.Out,false,400);
    // this.add.tween(crowdThirdRight).to({ y: [250*game_scale,200*game_scale]},800, 'Cubic.easeOut', true, 0).loop(true);

    crowdSecond = game.add.sprite(game.width/2,game.height,'crowd-second');
    crowdSecond.anchor.setTo(0.5,0);
    crowdSecond.scale.setTo(game_scale, game_scale);
    playAnimTweens['crowdSecond'] = game.add.tween(crowdSecond).to({y : 200*game_scale},800, Phaser.Easing.Back.Out,false,200);
    // this.add.tween(crowdSecond).to({ y: [250*game_scale,200*game_scale]},1000, 'Cubic.easeOut', true, 0).loop(true);

    crowdFirst = game.add.sprite(game.width/2,game.height,'crowd-first');
    crowdFirst.anchor.setTo(0.5,0);
    crowdFirst.scale.setTo(game_scale, game_scale);
    playAnimTweens['crowdFirst'] = game.add.tween(crowdFirst).to({y : 330*game_scale},800, Phaser.Easing.Back.Out);
    // this.add.tween(crowdFirst).to({ y: [380*game_scale,330*game_scale]},850, 'Cubic.easeOut', true, 0).loop(true);
    
    table = game.add.sprite(game.width/2,game.height+300*game_scale,'table');
    table.anchor.setTo(0.5,1);
    table.scale.setTo(game_scale,game_scale);
    playAnimTweens['table'] = game.add.tween(table).to({y : game.height+100*game_scale},800, Phaser.Easing.Cubic.Out);

    dj = game.add.sprite(game.width/2+150*game_scale,game.height+400*game_scale,'dj');
    dj.anchor.setTo(0.5,0.5);
    dj.scale.setTo(2.5*game_scale)
    playAnimTweens['dj'] = game.add.tween(dj).to({y : game.height-400*game_scale},800, Phaser.Easing.Cubic.Out);


    mixer = game.add.sprite(game.width/2,game.height/2,'mixer');
    mixer.anchor.setTo(0.5,0.5)
    mixer.scale.setTo(game_scale*1.2,game_scale*1.2);
    // this.mixerAnim = ;
    mixer.inputEnabled = true;
    mixer.events.onInputDown.add(onMixerClick);
    
    mixer.animations.add('mixerShake');
    mixerAnim = mixer.animations.play('mixerShake',5, true);
    mixerAnim.onComplete.add(function(){
      mixer.frame = 0;
    })

    playText = game.add.text(game.width/2,game.height-180*game_scale,"pap to play",{ font: "40px Boogaloo", fill: "#FFD700", align: "center"});
    playText.anchor.setTo(0.5)

    // animateMixer();

    playAnimTweens['mixer1'] = game.add.tween(mixer).to({x : game.width/2-250*game_scale,y : game.height},800, Phaser.Easing.Cubic.Out);
    playAnimTweens['mixer2'] = game.add.tween(mixer.scale).to({x : 0.9*game_scale, y : 0.9*game_scale},800, Phaser.Easing.Cubic.Out);
    playAnimTweens['mixer3'] = game.add.tween(mixer.anchor).to({x : 0.5, y : 1},800, Phaser.Easing.Cubic.Out);
    

  }

  function onMixerClick(mixer){
    mixer.inputEnabled = false;
    mixer.animations.stop(null,true);
    for(key in playAnimTweens){
      playAnimTweens[key].start();
    }
    setTimeout(function(){
      phaserGame.state.start('playState');
    },900)
  }

  function update(){
    // console.log('update')
  }
  
  return {
    create : create,
    // preload : preload,
    update : update
  }
}

