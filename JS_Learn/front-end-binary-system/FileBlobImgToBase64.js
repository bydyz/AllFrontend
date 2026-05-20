// File、Blob、img转Base64

        // Blob转Base64
        const blob = new Blob(["hello", "randy", "what is the fuck"], { type: "text/plain" });
        console.log(blob)
        console.log('')

        const fileReader1 = new FileReader();
        console.log(fileReader1)
        console.log('')

        fileReader1.readAsDataURL(blob);
        console.log(fileReader1)
        console.log('')

        fileReader1.onload = () => {
          console.log(fileReader1.result); // "data:text/plain;base64,aGVsbG9yYW5keQ=="
        };
        console.log('')
        console.log('')
        console.log('')



        // File转Base64
        const file3 = new File(["文件对象"], "test", { type: "text/plain" });
        console.log(file3)
        console.log('')

        const fileReader2 = new FileReader();
        console.log(fileReader2)
        console.log('')

        fileReader2.readAsDataURL(file3);
        console.log(fileReader2)
        console.log('')

        fileReader2.onload = () => {
          console.log(fileReader2); // "data:text/plain;base64,5paH5Lu25a+56LGh"
        };
        console.log('')
        console.log('')
        console.log('')



        // 本地图片转base64，注意链接是本地链接不能是网络地址。
        const img2base64 = (imgUrl) => {
          let image = new Image();
          image.src = imgUrl;
          return new Promise((resolve) => {
            image.onload = () => {
              let canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              var context = canvas.getContext("2d");
              context.drawImage(image, 0, 0, image.width, image.height);
              let dataUrl = canvas.toDataURL("image/png");
              resolve(dataUrl);
            };
          });
        };
        img2base64("./logo.jpg").then((res) => {
          console.log(res);
        });
