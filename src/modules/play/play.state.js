function playState(){


  var rightSpotlight, leftSpotlight, middleSpotlight;
  var bubblePoints, bubbleText,mixer,table;
  var scoreText, multiplierText;
  var game, game_scale;
  var style = { font: "20px Boogaloo", fill: "#2C264E", align: "center"};
  var	crowdFirst, crowdSecond, crowdThirdLeft, crowdThirdRight;
  var bubbles ={}
  var alphaJuice;
  // module['playState'] = playState;
  return {
    preload: function(){
    alphaJuice = new gameLogic('data/letter-frequency.json','data/wordlist.json');

    },
    create: function(){
      console.log('boom',alphaJuice)
      console.log('start game')
      alphaJuice.init().then(function(){
        alphaJuice.startRequest();
      });
      var letterGenArray = [];
      var letterClicked = {};
      var bubbleClicked = {};
      var letterClickCount = 0;
      var lastValidWord = '';


      var _this = this
      game = this.game;
      var background = game.add.sprite(game.width/2,game.height/2,'background');
      game_scale = game.world.height / background.height;
      background.anchor.setTo(0.5,0.5);
      background.scale.setTo(game_scale, game_scale);
      var bubblesBg = {};
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

      // for (var i = 0; i < rod_points.length; i++) {
      //   var rod = game.add.sprite(rod_points[i].x, rod_points[i].y,'rod');
      //   rod.anchor.setTo(rod_points[i].anchor_x,rod_points[i].anchor_y);
      //   if (rod_points[i].mirror == 1) {
      //     rod.scale.setTo(-game_scale, game_scale);
      //   }else {
      //     rod.scale.setTo(game_scale, game_scale);
      //   }
      // }

      

      bubblePoints = {
        'x' : [165,275,514,638,824,1091,1281,1501,1610,1710],
        'y' : [545,701,572,761,694,644,588,660,400,547]
      }
      // var style = { font: "32px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };

      // for (var i = 0; i < bubblePoints.x.length; i++) {
      // 	var bubblesBg = game.add.sprite(bubblePoints.x[i],bubblePoints.y[i],'bubblesBg');
      // 	bubblesBg.scale.setTo(game_scale * 0.6, game_scale * 0.6);


      // }
      setInterval(function(){
        leftSpotlight.tint = Math.random() * 0xffffff;
        rightSpotlight.tint = Math.random() * 0xffffff;
        middleSpotlight.tint = Math.random() * 0xffffff;
        
      },400);
      //Score
      // var multiplerstyle = { font: "20px Boogaloo", fill: "#FFD700", align: "center"};
      var scoreTextStyle = { font: "20px Boogaloo", fill: "#FFD700", align: "center"};

      setTimeout(function(){
        multiplierText = game.add.text(60*game_scale,150*game_scale,alphaJuice.multiplier+' x ',scoreTextStyle);
        multiplierText.anchor.setTo(0,1)
        scoreTextStyle.font = "50px Boogaloo";
        scoreText = game.add.text(multiplierText.x+multiplierText.width, 165*game_scale, alphaJuice.score, scoreTextStyle);
        scoreText.anchor.setTo(0,1)
      },3000)
      // multiplierText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

      // var scorestyle =  { font: "50px Boogaloo", fill: "#FFD700", align: "center" };
      // scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

      // multiplierText.position.y = scoreText.height - multiplierText.height - 9;

      //Bottom word text
      // var wordStyle = { font: "30px Boogaloo", fill: "#28B463", backgroundColor: "#FCF3CF" ,align: "center" };
      // wordText = game.add.text(0,0,"g",wordStyle);
      // wordText.position.y=game.height - wordText.height;
      // wordText.setText("");

      //table
      table = game.add.sprite(game.width/2,game.height+100*game_scale,'table');
      table.anchor.setTo(0.5,1);
      table.scale.setTo(game_scale,game_scale);
      // table.position.x = (game.width/2)- (table.width/2);
      // table.position.y = game.height - table.height;

      // var mixer, mixerAnimate, mixerShake;

      // function animateMixer(){
      //   mixer.destroy();
      //   mixerAnimate = game.add.sprite(0,0,'mixer_animation');
      // mixerShake = mixerAnimate.animations.add('mixerShake');
      // mixerAnimate.scale.setTo(game_scale, game_scale);
      // mixerAnimate.anchor.setTo(0.5,1);
      // mixerAnimate.position.x = 2*game.width/5;
      // mixerAnimate.position.y = game.height;
      //     mixerAnimate.animations.play('mixerShake', 36, false);
      //     mixerShake.onComplete.add(function(){
      //       mixerAnimate.destroy();
      //       staticMixer();
      //     }, this);
      // }
      
      function staticMixer(){
        var mixer = game.add.sprite(game.width/2-250*game_scale,game.height-60*game_scale,'mixer');
        mixer.scale.setTo(0.8*game_scale,0.8* game_scale);
        // mixer.position.x = 2*game.width/5 - 1;
        // mixer.position.y = game.height-63;
        mixer.inputEnabled = true;
        mixer.anchor.setTo(0.5,1);
        mixer.animations.add('mixerShake',[1]);
        mixer.events.onInputDown.add(onMixerClick);
      }

      function onMixerClick(mixer){
        // function(){
          // console.log('clicked on mixer');
          // alphaJuice.mixerClickListener(scoreText,multiplierText);
        if(!jQuery.isEmptyObject(bubbleClicked)){
          mixer.animations.play('mixerShake',30, false);
          var tempWordArray = [],
              tempWord = '',
              i = 0;
          for(key in bubbleClicked){
            // console.log(tempWord,bubbleClicked[key].data.value,i)
            tempWordArray[bubbleClicked[key].data.sequence] = bubbleClicked[key].data.value;
          }
          tempWord = tempWordArray.join("")
          if(alphaJuice.isWordVaild(tempWord)){
            console.log('word valid');
            scoreText.text = alphaJuice.updateScore(tempWord);
            multiplierText.text = alphaJuice.incrementMultiplier()+' X ';
            acceptWord();
            alphaJuice.startRequest();
          }else{
            console.log('not valid')
            resetClickedBubble();
          }
            // console.log('clicked on mixer',tempWord.join(''),'hello');
          // }
        }
      }

      function acceptWord(){
        for(key in bubbleClicked){
          alphaJuice.removeLetterByIndex(bubbleClicked[key].data.key);
          bubbleClicked[key].group.removeAll()
          delete letterGenArray[bubbleClicked[key].data.key];
          delete bubbleClicked[key];
          letterClickCount = 0;
        }
      }

      // function removeClickBubble(bubbleGroup){
      // }

      function resetClickedBubble(){
        for (key in bubbleClicked){
          game.add.tween(bubbleClicked[key].group).to({ x: bubbleClicked[key].origPosition.x, y: bubbleClicked[key].origPosition.y },400, Phaser.Easing.Cubic.Out, true, 0);
          delete bubbleClicked[key];
          letterClickCount = 0;
        }
      }
      //mixer
      staticMixer();

    //Background Music
      var bgAudio = new Audio('assets/sounds/bg.ogg');
      bgAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      bgAudio.play();

      window.addEventListener("beforeunload", function(e){
        _this.bgAudio.stop();
      });

    //bubble gen
      function generateBubble(event, data){
        letterGenArray[data.key]=data.value;

        var bubble = game.add.group();


        //creating bubble background
        // alphaJuice.generateLetter(1,5);
        var bubblesBg = bubble.create(0,0,'bubble-'+alphaJuice.generateNumber(1,5));
        bubblesBg.scale.setTo(game_scale, game_scale);
        // bubblesBg.anchor.setTo(0.5,0.5);
        bubblesBg.inputEnabled=true;
        // bubblesBg.name = data.key;
        
        //creating bubble text        
        // bubbleText.anchor.setTo(0.5,0.5);
        bubble.x = bubblePoints.x[data.key]*game_scale*0.8;
        bubble.y = game.height-bubblePoints.y[data.key]*game_scale*0.8;
        data['id'] = data.key + data.value;
        
        var bubbleText = game.add.text(bubblesBg.width/2,bubblesBg.height/2, data.value, style);
        bubbleText.anchor.setTo(0.5,0.5)
        
        //on click bubble add
        bubble.add(bubbleText)
        bubblesBg.events.onInputDown.add(onBubbleClick,{data : data, group : bubble});
        return bubble;
      }


      function onBubbleClick(bubbleBg){
          var bubble = this;

          console.log(this)
          if(bubbleClicked[bubble.data.id] != undefined){
            // console.log('already clicked')
            game.add.tween(bubble.group).to({ x: bubble.origPosition.x, y: bubble.origPosition.y},400, Phaser.Easing.Cubic.Out, true, 0);
            // game.add.tween(bubbleText).to({ x: bubble.origPosition.x, y: bubble.origPosition.y},400, Phaser.Easing.Cubic.Out, true, 0);
            delete bubble.origPosition;
            delete bubbleClicked[bubble.data.id];
            console.log(bubble.data.sequence);
            for(var id in bubbleClicked){
              // console.log('yahoo');
              console.log('bubbleClicked',bubbleClicked[id].data.sequence,bubble.data.sequence)
              if(bubbleClicked[id].data.sequence > bubble.data.sequence){
              console.log('rearranging ...',bubbleClicked[id].data.sequence,bubble.data.sequence);
                bubbleClicked[id].data.sequence -= 1;
                game.add.tween(bubbleClicked[id].group).to({ x: "-"+bubbleBg.width },400, Phaser.Easing.Cubic.Out, true, 0);
              }
            }
            letterClickCount--;
          }else{
            // console.log('not clikced')
            bubble['origPosition'] = {
              x : bubble.group.x,
              y : bubble.group.y
            };


            bubbleClicked[bubble.data.id] = bubble;
            bubbleClicked[bubble.data.id].data['sequence'] = letterClickCount;
            // console.log('CLICKED',wordGenArray,letterCliked);
            game.add.tween(bubble.group).to({ x: 100+ (letterClickCount * bubbleBg.width), y: (game.height - bubbleBg.height)},400, Phaser.Easing.Cubic.Out, true, 0);
            // game.add.tween(bubbleText).to({ x: 100+ (letterClickCount * bubble.width), y: (game.height - bubble.height)},400, Phaser.Easing.Cubic.Out, true, 0);
            letterClickCount++;  
          }
          console.log('click',bubbleClicked);
      }
          // console.log('WORD',wordGenArray,bubbleClicked);


        // function sortbubbleClicked(sequence){
        // }

      alphaJuice.on("request", generateBubble);

  },
    update: function(){




    }


  }

}
