import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './body.html';
 
Tracker.autorun(function() {
  var routeName = FlowRouter.getRouteName();
  console.log("Current route name is: ", routeName);
});

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
  route() {
  	console.log(FlowRouter.getRouteName());
  	return FlowRouter.getRouteName();
  }
});

if (Meteor.isClient) {

	timer = new ReactiveVar();
	floorTimer = new ReactiveVar();

	inLoop = new ReactiveVar();
	active = new ReactiveVar();
	inLoop = false;
	active = false;

	// YouTube API will call onYouTubeIframeAPIReady() when API ready.
	// Make sure it's a global variable.
	onYouTubeIframeAPIReady = function () {

		// var player,
		//     time_update_interval = 0;
	
	    // New Video Player, the first argument is the id of the div.
	    // Make sure it's a global variable.
	    player = new YT.Player("video-placeholder", {
	
	        height: "400", 
	        width: "600", 
	        videoId: 'eb84Tx-ftUs',
	        playerVars: {
	            disablekb: '1',
	            fs:'0',
	            iv_load_policy:'3',
	            modestbranding:'1',
	            playsinline:'1',
	            rel:'0'
	        },
	  
	        // Events like ready, state change, 
	        events: {
	            // 'onReady': initialize,
	            'onStateChange': initialize,
	            // 'onStateChange': onPlayerStateChange
	        }
	
	    });
	};

	YT.load();

	function initialize(){

	    // Update the controls on load
	    // updateTimerDisplay();
	    // updateProgressBar();
	    
	    timer = player.getCurrentTime();
	    console.log(timer);
	    floorTimer = Math.floor(timer);

	    state = Tasks.find({}).fetch()[0];
	    Tasks.update(state._id, {
	      $set: { active: '0' },
	    });

	    // Clear any old interval.
	    clearInterval(time_update_interval);

	    // Start interval to update elapsed time display and
	    // the elapsed part of the progress bar every second.
    	var time_update_interval = setInterval(function () {
    	    // updateTimerDisplay();
    	    timer = player.getCurrentTime();
    	   	floorTimer = Math.floor(timer);

    	   	console.log(floorTimer);

    	    // updateProgressBar();

    	    // isBreakPoint();
    	    // updateVars();
    	    // testLoop();
    	    // updateVars();
    	    // playLoop();

    	    updateVars();
    	    changeTimer(4, 9, 20);

    	    // changeTimer(10, 15);
    	    // changeTimer(20, 25);

    	    autoUpdateImg(2, '/01-eyeliner.jpg');

    	    autoUpdateImg(4, '/02-eyeliner.jpg');

    	    autoUpdateImg(6, '/02bis-eyeliner.jpg');

    	    autoUpdateImg(8, '/03-eyeliner.jpg');

    	    autoUpdateImg(10, '/04-mascara.jpg');

    	    autoUpdateImg(12, '/05-mascara.jpg');

    	    autoUpdateImg(14, '/06-mascara.jpg');

    	    autoUpdateImg(16, '/07-rouge.jpg');

    	    autoUpdateImg(18, '/08-rouge.jpg');

    	    autoUpdateImg(20, '/09-rouge.jpg');

    	}, 100);

	    // var timeout = setTimeout(function(){
	    //   var interval = setInterval(function(){
	    //     if(player.getCurrentTime() === <you_set_time>){
	    //         clearInterval(interval);
	    //         // Your logic
	    //     }

	    //   },1000);
	    // },<your_set_time_in_millisecs>);
	}

	// function isBreakPoint() {
	// 	var floorTimer = Math.floor(timer);
	// 	if (floorTimer == 10 ||
	// 		floorTimer == 20 ||
	// 		floorTimer == 30 ) {
	// 		return true;
	// 	}
	// 	else { false; }
	// }

	function goTo(from, to) {
		state = Tasks.find({}).fetch()[0];

		if (floorTimer >= from && floorTimer < to) {
			player.seekTo(to);
		}
	}

	function changeTimer(start, end, to) {
		state = Tasks.find({}).fetch()[0];

		if (active && floorTimer >= start && floorTimer < end) {
			player.seekTo(to);
			
			active = false;
			Tasks.update(state._id, {
			  $set: { active: '1' },
			});
		}
	}

	function updateVars() {
		state = Tasks.find({}).fetch()[0];
		if (state.loop == '1') {
			inLoop = true;
		}
		else if (state.loop == 'O') {
			inLoop = false;
		}

		if (state.active == '1') {
			active = true;
		}
		else if (state.active == 'O') {
			active = false;
		}
		console.log('loop:' + inLoop);
		console.log('active:' + active);
	}

	function autoUpdateImg(time, imgSource) {
		if (floorTimer == time) {
			$('#bottom-band img').attr('src', imgSource);
		}
	}

	// function testLoop() {

	// 	console.log(floorTimer);

	// 	state = Tasks.find({}).fetch()[0];

	// 	if (floorTimer == 4) {
	// 		Tasks.update(state._id, {
	// 		  $set: { loop: '1' },
	// 		});
	// 	}
	// 	else if (floorTimer == 20) {
	// 		Tasks.update(state._id, {
	// 		  $set: { loop: '1' },
	// 		});
	// 	}
	// }

	// function playLoop() {

	// 	if ( !active && inLoop && 7 <= timer ) {
	// 		player.seekTo(4);
	// 	}
	// 	else if ( inLoop && 24 <= timer ) {
	// 		player.seekTo(20);
	// 	}
	// }


	// function onPlayerStateChange(){
	// 	console.log(YT.PlayerState.PLAYING)
	// 
	// 	clearInterval(time_update_interval);

	// 	var time_update_interval = setInterval(function () {
	// 	    // updateTimerDisplay();
	// 	    timer = player.getCurrentTime();
	// 	    console.log(timer);
	// 	    // updateProgressBar();
	// 	}, 500);
	// 	}
	// }

}

// Template.state.onRendered(function () {
//   this.InLoop = new ReactiveVar();
//   this.InLoop = inLoop;
// });

// Template.state.helpers({
//   inLoop() {
//     return Template.instance().tempInLoop.get();
//   },
// });

Template.body.onCreated(function() {
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
    
    if (scrollTop < 100) {
    	$('#video-placeholder').removeClass('video-fixed');
    	$('#video-placeholder').css('border-bottom', '0px solid #eee'); 
    	$('#bottom-band').css('margin-top', 0);
      	$('#video-placeholder').css('height', 440 - scrollTop * 2 );
      	$('#video-placeholder').css('margin-top', scrollTop ); 
    } 
    else {
    	$('#video-placeholder').css('margin-top', 0 ); 
    	$('#video-placeholder').addClass('video-fixed');
    	$('#bottom-band').css('margin-top', 340);
    	$('#video-placeholder').css('border-bottom', '1px solid #eee'); 
    }
  }); 
});

// $(document).ready(function(){
//   var scrollTop = 0;
//   $(window).scroll(function(){
//     scrollTop = $(window).scrollTop();
    
//     if (scrollTop >= 100) {
//       $('#global-nav').addClass('scrolled-nav');
//     } else if (scrollTop < 100) {
//       $('#global-nav').removeClass('scrolled-nav');
//     } 
    
//   }); 
  
// });


Template.task.events({
	'click #play'(event, instance) {
		player.playVideo();
	},

	'click #pause'(event, instance) {
		player.pauseVideo();
	},

	'click #delete'(event, instance){
		Tasks.remove(this._id);
	},

  	'click button'(event, instance) {
  	    var timer = player.getCurrentTime()
  	    state = Tasks.find({}).fetch()[0];

  	    if ( 4 <= timer < 7 ) {
  	        Tasks.update(state._id, {
  	          $set: { loop: '0' },
  	        });

  	        Tasks.update(state._id, {
  	          $set: { active: '1' },
  	        });
  	    }
  	    // else if (10 <= timer && timer < 20) {
  	    //     player.seekTo(120);
  	    // }
  	    // else {
  	    //     player.seekTo(180);
  	    // }
  	},
});


// Template.state.created = function() {
//   var tpl = this;
//   debugger;
//   tpl.name = new ReactiveVar();
//   tpl.watch("name", function(value) {
//     console.log("The value of 'name' changed! It is now: " + value);
//   });
// }

// Template.state.onRendered(function () {

// 	var player,
// 	    time_update_interval = 0;

// 	function onYouTubeIframeAPIReady() {
// 	    player = new YT.Player('video-placeholder', {
// 	        width: 600,
// 	        height: 400,
// 	        videoId: 'Xa0Q0J5tOP0',
// 	        playerVars: {
// 	            color: 'white',
// 	            playlist: 'taJ60kskkns,FG0fTKAqZ5g',
// 	            controls: '0',
// 	            disablekb: '1',
// 	            fs:'0',
// 	            iv_load_policy:'3',
// 	            modestbranding:'1',
// 	            playsinline:'1',
// 	            rel:'0'
// 	        },
// 	        // events: {
// 	        //     onReady: initialize
// 	        // }
// 	    });
// 	}

// 	// function initialize(){

// 	//     // Update the controls on load
// 	//     updateTimerDisplay();
// 	//     updateProgressBar();

// 	//     // Clear any old interval.
// 	//     clearInterval(time_update_interval);

// 	//     // Start interval to update elapsed time display and
// 	//     // the elapsed part of the progress bar every second.
// 	//     time_update_interval = setInterval(function () {
// 	//         updateTimerDisplay();
// 	//         updateProgressBar();
// 	//     }, 1000);


// 	//     $('#volume-input').val(Math.round(player.getVolume()));
// 	// }


// 	// This function is called by initialize()
// 	// function updateTimerDisplay(){
// 	//     // Update current time text display.
// 	//     $('#current-time').text(formatTime( player.getCurrentTime() ));
// 	//     $('#duration').text(formatTime( player.getDuration() ));
// 	// }


// 	// // This function is called by initialize()
// 	// function updateProgressBar(){
// 	//     // Update the value of our progress bar accordingly.
// 	//     $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
// 	// }

// });



// Playback

// $('#play').on('click', function () {
//     player.playVideo();
// });


// $('#pause').on('click', function () {
//     player.pauseVideo();
// });

// $('#action').on('click', function () {
//     var timer = player.getCurrentTime()

//     if (timer < 10 ) {
//         player.seekTo(60);
//     }
//     else if (10 <= timer && timer < 20) {
//         player.seekTo(120);
//     }
//     else {
//         player.seekTo(180);
//     }
// });


// Helper Functions

// function formatTime(time){
//     time = Math.round(time);

//     var minutes = Math.floor(time / 60),
//         seconds = time - minutes * 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     return minutes + ":" + seconds;
// }

// Progress bar

// $('#progress-bar').on('mouseup touchend', function (e) {

//     // Calculate the new time for the video.
//     // new time in seconds = total duration in seconds * ( value of range input / 100 )
//     var newTime = player.getDuration() * (e.target.value / 100);

//     // Skip video to new time.
//     player.seekTo(newTime);

// });


// Sound volume


// $('#mute-toggle').on('click', function() {
//     var mute_toggle = $(this);

//     if(player.isMuted()){
//         player.unMute();
//         mute_toggle.text('volume_up');
//     }
//     else{
//         player.mute();
//         mute_toggle.text('volume_off');
//     }
// });

// $('#volume-input').on('change', function () {
//     player.setVolume($(this).val());
// });


// Other options


// $('#speed').on('change', function () {
//     player.setPlaybackRate($(this).val());
// });

// $('#quality').on('change', function () {
//     player.setPlaybackQuality($(this).val());
// });


// Playlist

// $('#next').on('click', function () {
//     player.nextVideo()
// });

// $('#prev').on('click', function () {
//     player.previousVideo()
// });


// Load video

// $('.thumbnail').on('click', function () {

//     var url = $(this).attr('data-video-id');

//     player.cueVideoById(url);

// });





// $('pre code').each(function(i, block) {
//     hljs.highlightBlock(block);
// });