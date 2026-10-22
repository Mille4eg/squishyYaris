
let player;
let isPlaying = false;

const playButton = document.getElementById("play-button");
const volumeSlider = document.getElementById("volume");

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "200",
        width: "320",
        videoId: "hSN6-AMdDOo",
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: "hSN6-AMdDOo",
            playsinline: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playButton.textContent = "⏸";
    }

    if (event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        playButton.textContent = "▶";
    }
}

playButton.addEventListener("click", () => {
    if (!player || typeof player.getPlayerState !== "function") {
        return;
    }

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

volumeSlider.addEventListener("input", () => {
    if (player && typeof player.setVolume === "function") {
        player.setVolume(Number(volumeSlider.value));
    }
});
