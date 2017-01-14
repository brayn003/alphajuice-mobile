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
	this.multiplier = 1;
	this.currentWordX = 50;
	this.userText = {};
	this.generating = 0;

	// this.requestInterval;
	var scoreGroupLimit = {
		// 'rare' : 
	}

	var scoreGroup ={

	}
	var generating = 0;
	var _this = this;

	this.audience = {
		'request' : []
	};

	this.blender = {
		'word' : ''
	};
	
	this.init = function() {
		return Promise.all([
			$.get( letterFrequencyJson, function(data) {
				_this.letterFrequency = data.letterFrequency;
				Promise.resolve(true);
			}, "json" ),
			$.get( wordlistJson, function(data) {
				_this.wordlist = data.words;
				Promise.resolve(true);
			}, "json" )])
	};

	this.generateLetter = function() {
      // console.log('random letter')
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

	this.generateNumber = function(min,max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	this.startRequest = function(){
		// if(generating == 1){
		// 	return;
		// }
		console.log('request recieved')
		if(this.generating == 0){
			console.log('request recieved 2')
			this.generating = 1;
			_this.requestInterval = setInterval(_this.generateRequestArray, 1000);
		}
		// generating = 0;
							// .then(function(){
							// 	requestInterval = undefined;
							// });
	};

	this.generateRequestArray = function(){

		var key = _this.generateNumber(0,9);
		var value = _this.generateLetter();
		var limit = 8;
		// console.log(key+" : "+value);
		// console.log("CHECK",_this.audience.request.filter(function(x){ return true }).length > limit-1);

		if(_this.audience.request.filter(function(x){ return true }).length > limit-1) {
			console.log(clearInterval(_this.requestInterval),"hello");
			_this.generating = 0;
			// console.log("CANNED", isCanned)
			console.log('Stopping');
			return;
		}
		// }else{
		if( _this.audience.request[key] === null || _this.audience.request[key] === undefined){
				_this.audience.request[key]= value;
				_this.emit("request",{"key": key, "value": value});
			// console.log(_this.audience.request);
			// console.log(key,value,_this.audience.request.filter(function(x){ return true }).length,limit-1)
		} 
		// else {
		// 	console.log('Conflict! space already occupied');
		// 	generateRequestArray();
		// }
		// alert(JSON.stringify(req));
		console.log(_this.audience.request)
	};

	// this.indexof = function(){
	// 	if(isWordVaild(_this.blender.word)){
	// 		for (var i = 0; i < _this.blender.word.length; i++) {
	// 			delete _this.audience.request[_this.audience.request.indexOf(_this.blender.word[i])];
	// 		}
	// 		_this.startRequest();
	// 	}else{
	// 		alert('Not a vaild english word')
	// 	}
	// };

	// this.isWordVaild = function(word){
	// 	if(_this.wordlist.indexOf(word) == -1)
	// 		return false
	// 	return true
	// };

	this.removeLetterByIndex = function(index){
		delete _this.audience.request[index]
	}

	this.isWordVaild = function(word){
		// console.log('hello')
		return _this.wordlist.indexOf(word) != -1
	}


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



	this.setMultiplier = function(multiplier){
		this.multiplier = multiplier;
		return this.multiplier;
	}

	this.incrementMultiplier = function(){
		this.multiplier += 1;
		return this.multiplier;
	}

	this.resetMultiplier = function(){
		this.multiplier = 1;
		return this.multiplier;
	}



	this.getScoreOfLetter = function(letter){
		var score = 0,
				freq = Math.round(_this.getFrequencyOfLetter(letter));
				// console.log('frequency',freq)
		if(freq > 3){
			return 10;
		}else if(freq > 0 && freq <= 3){
			return 25;
		}else{
			return 50;
		}
	}

	this.addScore = function(score){
		_this.score += score;
		return _this.score;
	}

	this.getScoreOfWord = function(word){
		var tempScore = 0;
		for(var i = 0; i < word.length; i++){
			tempScore += _this.getScoreOfLetter(word[i]);
		}
		// _this.addScore(tempScore);
		return tempScore;
	}

	this.updateScore = function(word){
		// console.log(_this.multiplier,_this.getScoreOfWord(word),_this.multiplier*_this.getScoreOfWord(word));
		_this.score += (_this.multiplier*_this.getScoreOfWord(word));
		return _this.score;
	}

	this.getScoreChart = function(){
		_this.multiplier = 1;
		var tempWord = 'abcdefghijklmnopqrstuvwxyz';
		for(var i = 0; i < tempWord.length; i++){
			// console.log(tempWord[i],_this.getFrequencyOfLetter(tempWord[i]),1/_this.getFrequencyOfLetter(tempWord[i]),_this.getScoreOfLetter(tempWord[i]));
		}
	}
	// this.getScoreChart()
	//***************************Listener********************

	// this.mixerClickListener = function(scoreText, multiplierText){
	// 	if(_this.getUserInput() != ""){
	// 		var word = _this.getUserInput();
	// 		if(_this.isWordVaild(word)){
	// 			_this.updateScore(word);
	// 			scoreText.setText(""+_this.score);
	// 			multiplierText.setText(_this.multiplier+ " X ");
	// 			_this.userText = {};
	// 		}else{
	// 			alert("Not a valid word");
	// 		}
	// 	}
	// }

	// this.bubbleClickListener = function(bubble,bubbleText,game){


	// 	if((typeof(bubble.is_Clicked) == 'undefined') || (bubble.is_Clicked == false)){

	// 		bubble.is_Clicked = true;
	// 		bubble.lastX = bubble.position.x;
	// 		bubble.lastY = bubble.position.y;
	// 		bubbleText.lastX = bubbleText.position.x;
	// 		bubbleText.lastY = bubbleText.position.y;
	// 		bubble.arrayItemIndex = bubble.position.x;

	// 		_this.userText[bubble.arrayItemIndex] = bubbleText.text;

	// 		var tween = game.add.tween(bubble)
	// 		tween.onStart.add(function(){
	// 			game.add.tween(bubble.scale).to({x:0.3,y:0.3},500,"Cubic.easeOut",true);
	// 		});
	// 		tween.to( { x: this.currentWordX, y:game.height - bubble.height }, 500,"Cubic.easeOut", true);

	// 		var tween1 = game.add.tween(bubbleText)
	// 		tween.onStart.add(function(){
	// 			game.add.tween(bubbleText.scale).to({x:0.5,y:0.5},500,"Cubic.easeOut",true);
	// 		});
	// 		tween1.to( { x: this.currentWordX, y:game.height - bubble.height *1.11  }, 500,"Cubic.easeOut", true);

	// 		this.currentWordX += (bubble.width*0.3+15);

	// 	}else{

	// 		bubble.is_Clicked = false;

	// 		var tween = game.add.tween(bubble)
	// 		tween.onStart.add(function(){
	// 			game.add.tween(bubble.scale).to({x:0.6,y:0.6},500,"Cubic.easeOut",true);
	// 		});
	// 		tween.to( { x: bubble.lastX, y: bubble.lastY }, 500,"Cubic.easeOut", true);

	// 		var tween1 = game.add.tween(bubbleText)
	// 		tween.onStart.add(function(){
	// 			game.add.tween(bubbleText.scale).to({x:1,y:1},500,"Cubic.easeOut",true);
	// 		});
	// 		tween1.to( { x: bubbleText.lastX, y:bubbleText.lastY  }, 500,"Cubic.easeOut", true);


	// 		delete _this.userText[bubble.arrayItemIndex];
	// 		if(jQuery.isEmptyObject(_this.userText)){
	// 			_this.currentWordX = 50;
	// 		}

	// 	}

	// }


}

jQuery.extend(gameLogic.prototype, jQuery.eventEmitter);


// var alphaJuice = new game('letter-frequency.json','wordlist.json');
// alphaJuice.init();
// alphaJuice.startRequest();