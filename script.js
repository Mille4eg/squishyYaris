
let player;
let isPlaying = false;

const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const volumeSlider = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "200",
        width: "200",
        videoId: "hSN6-AMdDOo",
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: "hSN6-AMdDOo",
            playsinline: 1,
            controls: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(Number(volumeSlider.value));
    updateVolumeIcon();
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playIcon.className = "fa-solid fa-pause";
        playButton.setAttribute("aria-label", "Pause music");
    }

    if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED ||
        event.data === YT.PlayerState.CUED
    ) {
        isPlaying = false;
        playIcon.className = "fa-solid fa-play";
        playButton.setAttribute("aria-label", "Play music");
    }
}

function onPlayerError(event) {
    console.error("YouTube player error:", event.data);

    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
    playButton.setAttribute("aria-label", "Play music");
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

    updateVolumeIcon();
});

function updateVolumeIcon() {
    const volume = Number(volumeSlider.value);

    if (volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (volume < 50) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}
