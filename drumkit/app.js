const KeyToSound = {
    'r': document.querySelector('#s1'),
    't': document.querySelector('#s2'),
    'y': document.querySelector('#s3'),
    'u': document.querySelector('#s4')
}

class Channel {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        
        const track = [];
        
        let recordStatus = false;
        
        document.addEventListener('keypress', onKeyPress);
        
        a.addEventListener('click', play);
        b.addEventListener('click', record);

        function onKeyPress(event) {
            const sound = KeyToSound[event.key];
            playSound(sound);
            if(recordStatus){
                 track.push(sound);
            }
        }

        function play() {
            recordStatus=false;
            b.innerHTML="record";
            track.forEach((e, id) => {
                setTimeout(() => {
                    playSound(track[id]);
                }, id * 200);
            });
        }
        
        function record(){
            console.log(b);
            if(!recordStatus){
                track.length=0;
                recordStatus = true;
                b.innerHTML="stop record";
            }else{
                recordStatus = false;
                b.innerHTML="record";
            }  
        }

        function playSound(sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

};


const chanel1 = new Channel(
    document.querySelector("#play1"),
    document.querySelector("#record1")
);
const chanel2 = new Channel(
    document.querySelector("#play2"),
    document.querySelector("#record2")
);
const chanel3 = new Channel(
    document.querySelector("#play3"),
    document.querySelector("#record3")
);
const chanel4 = new Channel(
    document.querySelector("#play4"),
    document.querySelector("#record4")
);






