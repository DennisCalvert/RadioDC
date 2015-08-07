var animate = {
	zoomFade: function(el) {
	'use strict';
	    var lastEvent = Date.now(),
	  		x = 0;
	    el.style.opacity = 0;
	    function step() {
	        x += (Date.now() - lastEvent) / 200;
	        x = (x < 1) ? x : 1;
	        el.style.opacity = x;
	        el.style.transform = 'scale(' + x + ')';
	        lastEvent = Date.now();
	        if (x < 1) { 
	        	requestAnimationFrame(step);
	        }
	    }
	    step();
	}
};

(function(SC, animate) {
'use strict';
    var audio = document.getElementById('auidoPlayer'),
    	playList = undefined,
    	playListIndex = 0,
		ScClientID = "9eeea9ea6c011d7ce72495df6ebf6dac";

//Player Functionality
	function formatPlayTime(seconds){
		var minutes = Math.floor(seconds / 60);
		var seconds = seconds - minutes * 60;
		return minutes + ':' + seconds;
	}

    function togglePlay () {
        (audio.paused) ? audio.play() : audio.pause();

        document.getElementById('btnPlayIcon').classList.toggle('paused');
    	animate.zoomFade(document.getElementById('btnPlayIcon'));    	
    }

    function updateStatus(){
        var currentTime = audio.currentTime,
			duration = audio.duration;        

        document.getElementById('trackDuration').innerHTML = formatPlayTime(Math.floor(duration));
        document.getElementById('currentTime').innerHTML = formatPlayTime(Math.floor(currentTime));
        document.getElementById('positionIndicator').style.width = ((100 / duration) * currentTime) + '%';
    }

    function startNextTrack(){
    	if(playListIndex >= playList.length) playListIndex = 0;
    	var track = playList[playListIndex];
    	audio.src = track.uri + '/stream/?client_id=' + ScClientID;     	
    	document.getElementById('track_title').innerHTML = track.title;
    	animate.zoomFade(document.getElementById('currentSong'));
    	document.getElementById('currentSong').style.backgroundImage = "url('"+ track.artwork_url +"')"
    	document.getElementById('artist_name').innerHTML = track.user.username;    	    	
    	playListIndex++;
    }    

//Initialize Sound Cloud
	 SC.initialize({
	    client_id: ScClientID	    
	});

	SC.get("https://api.soundcloud.com/users/9962102/tracks", function (tracks)
	{
		playList = tracks;
		console.log(playList);
		startNextTrack();
	});

    audio.ontimeupdate = updateStatus;
    audio.onended = startNextTrack;
    document.getElementById('btnSkipTrack').addEventListener('click', startNextTrack);
    document.getElementById('btnPlay').addEventListener('click', togglePlay);
}(SC, animate));