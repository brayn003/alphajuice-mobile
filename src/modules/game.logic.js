(function(jQuery) {

  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };

}(jQuery));

function gameLogic(letterFrequencyJson,wordlistJson){
	this.letterFrequencyJson = letterFrequencyJson;
	this.wordlistJson = wordlistJson;
	this.letterFrequency;
	this.wordlist;
	this.score = 0;
	this.multipler = 0;
	this.currentWordX = 50;
	this.userText = {};

	// this.requestInterval;
	var generating = 0;
	var _this = this;

	this.audience = {
		'request' : []
	};

	this.blender = {
		'word' : ''
	};
	
	this.init = function() {
		$.get( letterFrequencyJson, function(data) {
			_this.letterFrequency = data.letterFrequency;
		}, "json" );
		$.get( wordlistJson, function(data) {
			_this.wordlist = data.words;
		}, "json" );
	};

	this.generateLetter = function() {
	    var	cumilativeFrequency = 0,
    		randomSeed = (Math.random() * 100),
    		i = 0;
	    for (i = 0; i < _this.letterFrequency.length; i++) {
	    	cumilativeFrequency += _this.letterFrequency[i].frequency;
    		// letterFrequency[i]["cumilativeFrequency"] = round(cumilativeFrequency,2);
    		if (cumilativeFrequency > randomSeed) {
    			// alert(letterFrequency[i].letter);
    			// console.log(JSON.stringify(_this.letterFrequency));
	    		// console.log("randomSeed : " + randomSeed + ", letter : " + _this.letterFrequency[i].letter);
    			return _this.letterFrequency[i].letter
    		}
	    }

	};

	this.generateNumber = function(){
		return 1 + Math.floor(Math.random() * 9);
	};

	this.startRequest = function(){
		if(generating == 1){
			return;
		}
		generating = 1;
		_this.requestInterval = setInterval(_this.generateRequestArray, 300);
		generating = 0;
							// .then(function(){
							// 	requestInterval = undefined;
							// });
	};

	this.generateRequestArray = function(){
		console.log("Generate random letter")
		var key = _this.generateNumber();
		var value = _this.generateLetter();
		var limit = 10;
		// console.log(key+" : "+value);
		// $log.log(audience.request.filter(function(x){ return true }).length);

		if(_this.audience.request.filter(function(x){ return true }).length > limit-1) {
			console.log('Stopping');
			clearInterval(_this.requestInterval);
		}else{
			if( _this.audience.request[key] === null || _this.audience.request[key] === undefined){
				_this.audience.request[key]= value;

				// _this.emit("request",{"key": key, "value": value});
			}
		}


		// else {
		// 	// generateRequestArray();
		// }
		// alert(JSON.stringify(req));
	};

	this.indexof = function(){
		if(isWordVaild(_this.blender.word)){
			for (var i = 0; i < _this.blender.word.length; i++) {
				delete _this.audience.request[_this.audience.request.indexOf(_this.blender.word[i])];
			}
			_this.startRequest();
		}else{
			alert('Not a vaild english word')
		}
	};

	this.isWordVaild = function(word){
		if(_this.wordlist.indexOf(word) == -1)
			return false
		return true
	};


	this.getUserInput = function(){
		var word = "";
		for(var key in _this.userText){
			word = word.concat(_this.userText[key]);
		}
		return word;
	}

//*******************SCORE****************************

	this.getFrequencyOfLetter = function(letter){
		var alpha = letter.toLowerCase();
		for(var i=0;i<_this.letterFrequency.length;i++){
			if(_this.letterFrequency[i].letter == alpha ){
				return _this.letterFrequency[i].frequency;
			}
		}
		return 0;
	}

	this.updateScore = function(word){
		_this.multipler +=1;
		//Make Score rarity of alphabate
		var tmp = 0;
		for(var i=0; i <word.length;i++){
			tmp += (1/_this.getFrequencyOfLetter(word[i]));
		}
		tmp *= word.length;
		_this.score += Math.floor(tmp);
	}

	//***************************Listener********************

	this.mixerClickListener = function(scoreText, multiplerText){
		if(_this.getUserInput() != ""){
			var word = _this.getUserInput();
			if(_this.isWordVaild(word)){
				_this.updateScore(word);
				scoreText.setText(""+_this.score);
				multiplerText.setText(_this.multipler+ " X ");
				_this.userText = {};
			}else{
				alert("Not a valid word");
			}
		}
	}

	this.bubbleClickListener = function(bubble,bubbleText,game){


		if((typeof(bubble.is_Clicked) == 'undefined') || (bubble.is_Clicked == false)){

			bubble.is_Clicked = true;
			bubble.lastX = bubble.position.x;
			bubble.lastY = bubble.position.y;
			bubbleText.lastX = bubbleText.position.x;
			bubbleText.lastY = bubbleText.position.y;
			bubble.arrayItemIndex = bubble.position.x;

			_this.userText[bubble.arrayItemIndex] = bubbleText.text;

			var tween = game.add.tween(bubble)
			tween.onStart.add(function(){
				game.add.tween(bubble.scale).to({x:0.3,y:0.3},500,"Cubic.easeOut",true);
			});
			tween.to( { x: this.currentWordX, y:game.height - bubble.height }, 500,"Cubic.easeOut", true);

			var tween1 = game.add.tween(bubbleText)
			tween.onStart.add(function(){
				game.add.tween(bubbleText.scale).to({x:0.5,y:0.5},500,"Cubic.easeOut",true);
			});
			tween1.to( { x: this.currentWordX, y:game.height - bubble.height *1.11  }, 500,"Cubic.easeOut", true);

			this.currentWordX += (bubble.width*0.3+15);

		}else{

			bubble.is_Clicked = false;

			var tween = game.add.tween(bubble)
			tween.onStart.add(function(){
				game.add.tween(bubble.scale).to({x:0.6,y:0.6},500,"Cubic.easeOut",true);
			});
			tween.to( { x: bubble.lastX, y: bubble.lastY }, 500,"Cubic.easeOut", true);

			var tween1 = game.add.tween(bubbleText)
			tween.onStart.add(function(){
				game.add.tween(bubbleText.scale).to({x:1,y:1},500,"Cubic.easeOut",true);
			});
			tween1.to( { x: bubbleText.lastX, y:bubbleText.lastY  }, 500,"Cubic.easeOut", true);


			delete _this.userText[bubble.arrayItemIndex];
			if(jQuery.isEmptyObject(_this.userText)){
				_this.currentWordX = 50;
			}

		}

	}


}

jQuery.extend(gameLogic.prototype, jQuery.eventEmitter);


// var alphaJuice = new game('letter-frequency.json','wordlist.json');
// alphaJuice.init();
// alphaJuice.startRequest();
