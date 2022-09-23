import { Howl, Howler } from 'howler';

const soundPlay = {
    soundPlay(sound, volume, loop=false, autoplay=false) {
        const sounds = new Howl({
          src: sound,
          volume: volume,
          loop: loop,
          autoplay: autoplay
        })
        sounds.play()
    }
}

export default soundPlay