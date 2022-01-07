var player;
var buffering = {};
var config = {
    "source": {
        "h5live": {
            "server": {
                "websocket": "wss://bintu-h5live-secure.nanocosmos.de:443/h5live/authstream/stream.mp4",
                "hls": "https://bintu-h5live-secure.nanocosmos.de:443/h5live/authhttp/playlist.m3u8"
            },
            "rtmp": {
                "url": "rtmp://bintu-splay.nanocosmos.de:1935/splay",
                "streamname": "9iWRI-LxpcY"
            },
            "security": {
                "token": "c6ce4dbc04bab4e38fd354a31f6315ec",
                "options": "8",
                "tag": "ab20"
            }
        }
    },
/*  "metrics": {
        accountId: 'bo1herz2eqs61523',  // do not change
        accountKey: 'bo1zfjwher6182a1',  // do not change
        userId: 'viewer1',   // value can be changed per viewer
        eventId: 'event1',   // value can be changed per event
        statsInterval: 10,   // statistics interval in seconds
        customField1: 'CustomInfo1'   // value can be changed
    },*/
    "playback": {
        "autoplay": true,
        "automute": true,
        "muted": false,
        "flashplayer": "//demo.nanocosmos.de/nanoplayer/nano.player.swf"
    },
    "style": {
        width: '100%',
        height: "100%",
        aspectratio: '16/9',
        controls: false,
        scaling: 'letterbox'
    },
    events: {
        onReady: function (e) {
            //console.log('ready');
        },
        onPlay: function (e) {
            //console.log('playing');
            //console.log('play stats: ' + JSON.stringify(e.data));
            
        },
        onPause: function (e) {
            var reason = (e.data.reason !== 'normal') ? ' (%reason%)'.replace('%reason%', e.data.reason) : '';
            //console.log('pause' + reason);
        },
        onLoading: function (e) {
            //console.log('loading');
        },
        onStartBuffering: function (e) {
            buffering.start = new Date();
            setTimeout(function () {
                if (buffering.start) {
                    //console.log('buffering');
                }
            }, 2000);
        },
        onStopBuffering: function (e) {
            buffering.stop = new Date();
            if (buffering.start) {
                var duration = Math.abs(buffering.stop - buffering.start);
                if (duration > 1000) {
                    //console.log('buffering ' + duration + 'ms');
                }
                buffering.stop = buffering.start = 0;
            }
            //console.log("Playing")
        },
        onWarning: function (e) {
            //console.log(e);
        },
        onError: function (e) {
            try {
                var err = JSON.stringify(e);
                if (err === '{}') {
                    err = e.message;
                }
                e = err;
            } catch (err) { }
            console.log('Error = ' + e);
            //document.getElementById('error').innerText = e;
            //document.getElementById('error-container').style.display = 'block';
            setTimeout(function(){ startPlayer(); }, 2000);
        },
        onDestroy: function (e) {
           // console.log('destroy');
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    player = new NanoPlayer("playerDiv");
    startPlayer();
});
function startPlayer(){
    player.setup(config).then(function (config) {
      //  console.log("setup success");
       // console.log("config: " + JSON.stringify(config, undefined, 4));
    }, function (error) {
       // alert(error.message);
    });
}
function destroyPlayer() {
    if (player) {
        player.destroy();
    }
}