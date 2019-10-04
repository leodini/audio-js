import audios from './data.js';
import { path } from './utils.js';
import elements from './playerElements.js';
export default {
    
    audioData: audios,
    currentAudio: {},
    currentTrack: 0,
    isPlaying: false,
    start(){
        elements.get.call(this);
        elements.action.call(this);
        this.update();
        this.audio.onended = () => this.next();
    },
    play(){
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = 'pause';
    },
    pause(){
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = 'play_arrow';
    },
    togglePlayPause(){
        if(this.isPlaying){
            this.pause();
        } else {
            this.play();
        }
    },
    next(){
        this.currentTrack++
        if(this.currentTrack == this.audioData.lenght){
            this.restart();
        }
        this.update();
    },
    update(){
        this.currentAudio = this.audioData[this.currentTrack];
        this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudioElement.call(this, path(this.currentAudio.file));
        this.audio.src = path(this.currentAudio.file);
    },
    restart(){
        this.currentTrack = 0;
        this.update();
    }
    
};