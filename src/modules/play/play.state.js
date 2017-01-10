function playState(){


  var rightSpotlight, leftSpotlight, middleSpotlight;
  var bubblePoints, bubbles, bubbleText,mixer,table;
  var scoreText, multiplerText;
  var game, game_scale;
  var style = { font: "48px Quenda", fill: "#2C264E", align: "center"};
  var	crowdFirst, crowdSecond, crowdThirdLeft, crowdThirdRight;
  
  // module['playState'] = playState;
  return {
    preload: function(){
      this.alphaJuice = new gameLogic('data/letter-frequency.json','data/wordlist.json');
      this.alphaJuice.init();
      this.load.image('background','../assets/images/background.png');

      //Light
      this.load.image('left-spotlight','../assets/images/left-spotlight.png');
      this.load.image('middle-spotlight','../assets/images/middle-spotlight.png');
      this.load.image('right-spotlight','../assets/images/right-spotlight.png');

      //Crowd
      this.load.image('crowd-first','../assets/images/crowd_first.png');
      // this.load.image('crowd-first-right','../assets/images/crowd_first_right.png');
      // this.load.image('crowd-first-middle','../assets/images/crowd_first_middle.png');
      this.load.image('crowd-second','../assets/images/crowd_second.png');
      this.load.image('crowd-third-left','../assets/images/crowd_third_left.png');
      this.load.image('crowd-third-right','../assets/images/crowd_third_right.png');
      this.load.image('rod','../assets/images/rod.png');

      //Bubble
      this.load.image('bubbles','../assets/images/bubble.png');

      //Mixer
      this.load.image('mixer','../assets/images/mixer.png');
      this.load.spritesheet('mixer_animation', '../assets/images/mixer_animation.png', 271, 423);

      //Table
      this.load.image('table','../assets/images/table.png');
    },
    create: function(){
      console.log('start game')
    this.alphaJuice.startRequest();

      var _this = this
      game = this.game;
      var background = game.add.sprite(game.width/2,game.height/2,'background');
      game_scale = game.world.height / background.height;
      background.anchor.setTo(0.5,0.5);
      background.scale.setTo(game_scale, game_scale);

      this.game.world.setBounds(0, 0, game.width, game.height);

      var rod_points = [
        {
          "x": 0,
          "y": 0,
          "anchor_x": 0,
          "anchor_y": 0,
          "mirror" : 0
        },
        {
          "x": game.width,
          "y": 0,
          "anchor_x": 0,
          "anchor_y": 0,
          "mirror" : 1
        }
      ];

      leftSpotlight = game.add.sprite(0,0,'left-spotlight');
      leftSpotlight.scale.setTo(game_scale, game_scale);

      middleSpotlight = game.add.sprite(game.width/2,0,'middle-spotlight');
      middleSpotlight.anchor.setTo(0.5,0);
      middleSpotlight.scale.setTo(game_scale, game_scale);

      rightSpotlight = game.add.sprite(game.width,0,'right-spotlight');
      rightSpotlight.anchor.setTo(1,0);
      rightSpotlight.scale.setTo(game_scale, game_scale);

      crowdThirdLeft = game.add.sprite(-1,200*game_scale,'crowd-third-left');
      crowdThirdLeft.scale.setTo(game_scale, game_scale);
      this.add.tween(crowdThirdLeft).to({ y: [250*game_scale,200*game_scale]},800, 'Cubic.easeOut', true, 0).loop(true);


      crowdThirdRight = game.add.sprite(game.width,200*game_scale,'crowd-third-right');
      crowdThirdRight.anchor.setTo(1,0);
      crowdThirdRight.scale.setTo(game_scale, game_scale);
      this.add.tween(crowdThirdRight).to({ y: [250*game_scale,200*game_scale]},800, 'Cubic.easeOut', true, 0).loop(true);

      crowdSecond = game.add.sprite(game.width/2,200*game_scale,'crowd-second');
      crowdSecond.anchor.setTo(0.5,0);
      crowdSecond.scale.setTo(game_scale, game_scale);
      this.add.tween(crowdSecond).to({ y: [250*game_scale,200*game_scale]},1000, 'Cubic.easeOut', true, 0).loop(true);

      crowdFirst = game.add.sprite(game.width/2,330*game_scale,'crowd-first');
      crowdFirst.anchor.setTo(0.5,0);
      crowdFirst.scale.setTo(game_scale, game_scale);
      this.add.tween(crowdFirst).to({ y: [380*game_scale,330*game_scale]},850, 'Cubic.easeOut', true, 0).loop(true);

      for (var i = 0; i < rod_points.length; i++) {
        var rod = game.add.sprite(rod_points[i].x, rod_points[i].y,'rod');
        rod.anchor.setTo(rod_points[i].anchor_x,rod_points[i].anchor_y);
        if (rod_points[i].mirror == 1) {
          rod.scale.setTo(-game_scale, game_scale);
        }else {
          rod.scale.setTo(game_scale, game_scale);
        }
      }

      

      bubblePoints = {
        'x' : [165,275,514,638,824,1091,1281,1501,1610,1710],
        'y' : [545,701,572,761,694,644,588,660,400,547]
      }
      // var style = { font: "32px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };

      // for (var i = 0; i < bubblePoints.x.length; i++) {
      // 	var bubbles = game.add.sprite(bubblePoints.x[i],bubblePoints.y[i],'bubbles');
      // 	bubbles.scale.setTo(game_scale * 0.6, game_scale * 0.6);


      // }
      setInterval(function(){
        leftSpotlight.tint = Math.random() * 0xffffff;
        rightSpotlight.tint = Math.random() * 0xffffff;
        middleSpotlight.tint = Math.random() * 0xffffff;
        
      },400);
      //Score
      var multiplerstyle = { font: "20px Quenda", fill: "#FFD700", align: "center"};
      multiplerText = game.add.text(0,0,this.alphaJuice.multipler+" X ",multiplerstyle);
      multiplerText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

      var scorestyle =  { font: "50px Quenda", fill: "#FFD700", align: "center" };
      scoreText = game.add.text(multiplerText.width,0,this.alphaJuice.score,scorestyle);
      scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

      multiplerText.position.y = scoreText.height - multiplerText.height - 9;

      //Bottom word text
      var wordStyle = { font: "30px Quenda", fill: "#28B463", backgroundColor: "#FCF3CF" ,align: "center" };
      wordText = game.add.text(0,0,"g",wordStyle);
      wordText.position.y=game.height - wordText.height;
      wordText.setText("");

      //table
      table = game.add.sprite(0,0,'table');
      table.scale.setTo(game_scale,game_scale);
      table.position.x = (game.width/2)- (table.width/2);
      table.position.y = game.height - table.height;

      var mixer, mixerAnimate, mixerShake;

      function animateMixer(){
        mixer.destroy();
        mixerAnimate = game.add.sprite(0,0,'mixer_animation');
      mixerShake = mixerAnimate.animations.add('mixerShake');
      mixerAnimate.scale.setTo(game_scale, game_scale);
      mixerAnimate.anchor.setTo(0.5,1);
      mixerAnimate.position.x = 2*game.width/5;
      mixerAnimate.position.y = game.height;
          mixerAnimate.animations.play('mixerShake', 36, false);
          mixerShake.onComplete.add(function(){
            mixerAnimate.destroy();
            staticMixer();
          }, this);
      }
      
    function staticMixer(){
      mixer = game.add.sprite(0,0,'mixer');
        mixer.scale.setTo(game_scale, game_scale);
        mixer.position.x = 2*game.width/5 - 1;
        mixer.position.y = game.height-63;
      mixer.inputEnabled = true;
      mixer.anchor.setTo(0.5,1);
        mixer.events.onInputDown.add(function(mixer){
          _this.alphaJuice.mixerClickListener(scoreText,multiplerText);
          animateMixer();
        });
    }
      //mixer
      staticMixer();

    //Background Music
      var bgAudio = new Audio('../assets/sounds/bg.ogg');
      bgAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      bgAudio.play();

      window.addEventListener("beforeunload", function(e){
        _this.bgAudio.stop();
      });

    //bubble gen
      this.alphaJuice.on("request", function(event,data){

      var bubbles = game.add.sprite(bubblePoints.x[data.key]*game_scale*0.8,game.height-bubblePoints.y[data.key]*game_scale*0.8,'bubbles');
        bubbles.scale.setTo(game_scale * 0.7, game_scale * 0.7);
        bubbles.anchor.setTo(0.5,0.5);
        bubbles.inputEnabled=true;
      bubbles.name = data.key;
        // console.log(this.alphaJuice.audience.request[i]);
      var bubbleText = game.add.text(bubblePoints.x[data.key]*game_scale*0.8,game.height-(bubblePoints.y[data.key]*game_scale*0.825), data.value, style);
        bubbleText.anchor.setTo(0.5,0.5);
        bubbles.events.onInputDown.add(function(bubble){
          _this.alphaJuice.bubbleClickListener(bubble,bubbleText,_this.game);
      });

      });

  },
    update: function(){




    }


  }

}
