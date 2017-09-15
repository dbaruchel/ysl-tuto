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
	onYouTubeIframeAPIReady = function () {

		// var player,
		//     time_update_interval = 0;
	
	    // New Video Player, the first argument is the id of the div.
	    player = new YT.Player("video-placeholder", {
	
	        height: "400", 
	        width: "600", 
	        videoId: '6PYPgZr7xz0',
	        playerVars: {
	            disablekb: '1',
	            fs:'0',
	            // showinfo:'0',
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
	    player.unMute();
	    timer = player.getCurrentTime();
	    floorTimer = Math.floor(timer);

	    setActive(0);
	    setLoop(0);

	    // Clear any old interval.
	    clearInterval(time_update_interval);

	    // Start interval to update elapsed time display and
	    // the elapsed part of the progress bar every second.
    	var time_update_interval = setInterval(function () {
    	    // updateTimerDisplay();
    	    timer = player.getCurrentTime();
    	   	floorTimer = Math.floor(timer);

    	   	console.log(floorTimer);


    	    //Auto Update of Bottom Image
			autoUpdateImg();   	   

    	    //Interations

    	    //Play
    	    updateVars();
    	    changeTimer(13, 15, 16, 16);

    	    //Loop
    	    updateVars();
    	    changeTimer(97, 100, 102, 152);

    	    //Focus
    	    updateVars();
    	    changeTimer(184, 188, 190, 203);

    	    //Tips
    	    updateVars();
    	    changeTimer(230, 234, 236.5, 251);

    	    //Replay
    	    updateVars();
    	    changeTimer(265, 270, 16, 271);

    	    //

    	}, 100);
	}


	function changeTimer(start, end, to, skip) {
		if (active && start <= floorTimer && floorTimer < end) {
			player.seekTo(to);
			setActive(0);
		}
		if (floorTimer == end) {
			player.seekTo(skip);
		}
	}

	function setActive(num) {
		state = Tasks.find({}).fetch()[0];
		if (num == 0) {
			active = false;
			Tasks.update(state._id, {
			  $set: { active: '0' },
			});
		}
		else if (num == 1) {
			active = true;
			Tasks.update(state._id, {
			  $set: { active: '1' },
			});
		}
	} 

	function setLoop(num) {
		state = Tasks.find({}).fetch()[0];
		if (num == 0) {
			inLoop = false;
			Tasks.update(state._id, {
			  $set: { loop: '0' },
			});
		}
		else if (num == 1) {
			inLoop = true;
			Tasks.update(state._id, {
			  $set: { loop: '1' },
			});
		}
	} 

	function goTo(from, to) {
		// state = Tasks.find({}).fetch()[0];

		if (floorTimer >= from && floorTimer < to) {
			player.seekTo(to);
		}
	}

	function updateVars() {
		state = Tasks.find({}).fetch()[0];
		if (state.loop == '1') {
			inLoop = true;
		}
		else if (state.loop == '0') {
			inLoop = false;
		}

		if (state.active == '1') {
			active = true;
		}
		else if (state.active == '0') {
			active = false;
		}
		// console.log('loop:' + inLoop);
		console.log('active:' + active);
	}

	function autoUpdateImg() {

		if (0 <= floorTimer && floorTimer < 16) {
			$('#bottom-band img').attr('src', '/00-produit.jpg');
		}
		else if (16 <= floorTimer && floorTimer < 20) {
			$('#bottom-band img').attr('src', '/01-eyeliner.jpg');
		}
		else if (20 <= floorTimer && floorTimer < 102) {
			$('#bottom-band img').attr('src', '/02-eyeliner.jpg');
		}
		else if (102 <= floorTimer && floorTimer < 151) {
			$('#bottom-band img').attr('src', '/02bis-eyeliner.jpg');
		}
		else if (151 <= floorTimer && floorTimer < 157) {
			$('#bottom-band img').attr('src', '/03-eyeliner.jpg');
		}
		else if (157 <= floorTimer && floorTimer < 160) {
			$('#bottom-band img').attr('src', '/04-mascara.jpg');
		}
		else if (160 <= floorTimer && floorTimer < 188) {
			$('#bottom-band img').attr('src', '/05-mascara.jpg');
		}
		else if (188 <= floorTimer && floorTimer < 202) {
			$('#bottom-band img').attr('src', '/06-mascara.jpg');
		}
		else if (202 <= floorTimer && floorTimer < 206) {
			$('#bottom-band img').attr('src', '/07-rouge.jpg');
		}
		else if (206 <= floorTimer && floorTimer < 235) {
			$('#bottom-band img').attr('src', '/08-rouge.jpg');
		}
		else if (235 <= floorTimer && floorTimer < 256) {
			$('#bottom-band img').attr('src', '/09-rouge.jpg');
		}
		else if (256 <= floorTimer && floorTimer < 270) {
			$('#bottom-band img').attr('src', '/08-rouge.jpg');
		}
	}

	function UpdateImg(imgSource) {
		$('#bottom-band img').attr('src', imgSource);
	}


	function playLoop(begin, end, out) {

		if (begin <= floorTimer && floorTimer <= end) {
			setLoop(1);
			inLoop = true;
		
			if (active) {
				player.seekTo(out);
				setActive(0);
			}

			else {
				if (end == floorTimer ) {
					player.seekTo(begin);
				}
			}
		}

	}

}

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


Template.task.events({

  	'click #action'(event, instance) {
  	    state = Tasks.find({}).fetch()[0];

  	    Tasks.update(state._id, {
  	      $set: { active: '1' },
  	    });
  	},

  	'click #cancel'(event, instance) {
  		console.log('cancel was clicked');
  	    state = Tasks.find({}).fetch()[0];

        Tasks.update(state._id, {
          $set: { active: '0' },
        });

        console.log('active state: ' + state.active);
  	},

  	// 'click #play'(event, instance) {
  	// 	player.playVideo();
  	// },

  	// 'click #pause'(event, instance) {
  	// 	player.pauseVideo();
  	// },

  	// 'click #delete'(event, instance){
  	// 	Tasks.remove(this._id);
  	// },
});


// Template.state.created = function() {
//   var tpl = this;
//   debugger;
//   tpl.name = new ReactiveVar();
//   tpl.watch("name", function(value) {
//     console.log("The value of 'name' changed! It is now: " + value);
//   });
// }


// Helper Functions

// function formatTime(time){
//     time = Math.round(time);

//     var minutes = Math.floor(time / 60),
//         seconds = time - minutes * 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     return minutes + ":" + seconds;
// }