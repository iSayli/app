
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const gameVideo = document.getElementById('game-video');
    const smallTextElement = document.getElementById('a-small-text');

    const socket = io.connect('https://app-production-6364.up.railway.app/');

    socket.on('updateState', (gameState) => {
    if (gameState.scene === 2) {
        // Change the video source for scene 2
        gameVideo.src = 'https://www.dropbox.com/scl/fi/xdxlmsgjenoxlx4q6rsao/takeoff.mp4?rlkey=1g9k8jq9zdbto7wbvhvd8u1a0&raw=1';
        smallTextElement.textContent = '';
        // Trigger the video to start playing
        gameVideo.play();
    } else if (gameState.scene === 2.5) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/7g5wjft8qqs9pxs3ky5ds/PathOption.mp4?rlkey=zqfypl80kbh83oh2td95ugx2j&raw=1';
        smallTextElement.textContent = 'you can either take asteroid route or long route. Hunter spence will help you with this decision';
        gameVideo.play();
        gameVideo.loop = "true";
        // Trigger the video to start playing
    } else if (gameState.scene === 3) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/u8ae7acut1fi6q5ye50a0/asteroid.mp4?rlkey=p72tc8cvdlm7jnq8hx5k9rkh7&raw=1';
        smallTextElement.textContent = '';
        gameVideo.play();
        // Trigger the video to start playing
    } else if (gameState.scene === 3.5) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/nq1i6hckv835yvm7n85hi/attackOption.mp4?rlkey=rtt9u407l9al2ebcysw76eyq1&raw=1';
        smallTextElement.textContent = 'you can either hide in clouds or attack enemies. Go to this place and this place in this building to help you with this decision';
        gameVideo.play();

        // Trigger the video to start playing
    } else if (gameState.scene === 4) {
        // Change the video source for scene 4
        gameVideo.src = 'https://www.dropbox.com/scl/fi/zrd0bu3cvtdl98xak2w1l/attack.mp4?rlkey=siu3zp1faix0psw3ki9ribvk6&raw=1';
        smallTextElement.textContent = ''
        gameVideo.play();
        ;
    } else if (gameState.scene === 4.5) {
        // Change the video source for scene 4
        gameVideo.src = 'https://www.dropbox.com/scl/fi/42oy4ynmympqv9gy91fmw/codeOption.mp4?rlkey=jqpryz123f1hzlvx81q01zifi&raw=1';
        smallTextElement.textContent = 'You need to launch an attack! Select the code which will be hidden in other team’s project ..... '
        gameVideo.play();
        ;
    } else if (gameState.scene === 5) {
        // Change the video source for scene 5
        gameVideo.src = 'https://www.dropbox.com/scl/fi/7hmewseguu1w4a3t4nqkl/getout.mp4?rlkey=wg7js3dw7c156155sph0fnxgv&raw=1';
        smallTextElement.textContent = 'Congratulations you have gotten rid of all the dangers you can safely deliver cargo ..... '
        gameVideo.play();
        ;
    }else if (gameState.scene === 5.5) {
        // Change the video source for scene 5
        gameVideo.src = 'https://www.dropbox.com/scl/fi/2jt2x3e5ou77zghuls134/startgame.mp4?rlkey=uqbxblrnzae2cmis3u05v9vm7&raw=1';
        smallTextElement.textContent = 'Do you want to start again?'
        gameVideo.play();
        ;
    } else if (gameState.scene === 6) {
        // Change the video source for scene 6
        gameVideo.src = 'https://www.dropbox.com/scl/fi/6n14vu3kvo55zuobx788o/gameover.mp4?rlkey=insjfvbhy9i1ksddqvirsylb4&raw=1';
        smallTextElement.textContent = 'Oh no you have lost...'
        gameVideo.play();
        ;
    }
    });

    socket.on('resetGame', () => {
        gameVideo.src = 'https://www.dropbox.com/scl/fi/2jt2x3e5ou77zghuls134/startgame.mp4?rlkey=uqbxblrnzae2cmis3u05v9vm7&raw=1'; // Set the initial video source
        smallTextElement.textContent = 'Dare to start your adventure now....';
        gameVideo.play();
      });
    
});

  