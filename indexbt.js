//Noi dung cau hoi cho tung bai----------------------
const originalLists = {
    __Select__:[],
    BL1_Q_page_1: [
        "What's your name?", 
        "How are you?",
        "What's your e-mail address?",
        "Hello, Kyle.",
        "Nice to meet you.",
        "How do you spell your name?",
        "What's your phone number?",
        "Good morning, Kate."],
    BL1_A_page_1: [
        "It's kylejonesi@tmail.com.",
        "Good marning.",
        "It's Kyle Jones.",
        "It's 555299.",
        "I'm fine, thanks.",
        "Hi,Sara.",
        "Kyle.",
        "Nice to meet you, too."],
    L1_Epage_1: [ 
        "I don't think we've met.",
        "Hi! I haven't seen you for a long time!",
        "Hello. My name's Kate.",
        "Hi, nice to see you again.",
        "Hi. I'm Don. I just started working here.",
        "Betsy! How are you doing?",
        "Hey, aren't you in my class? I'm Tom Crane."],
    L2_Epage_3: [
        "I don't think we've met.",
        "Hi! I haven't seen you for a long time!",
        "Hello. My name's Kate."],
};

//lay list tde bt dem vao menu------------------
const listExercises = Object.keys(originalLists);

function updateVoices(elmts) {
    //let optn = '--Select Excersise--';

    for (let i = 0; i < elmts.length; i++) {
      let optn = elmts[i];
      let el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      selectexerciseEl.appendChild(el);
    }
};
updateVoices(listExercises);

//lua bt, lay ngau nhien cau hoi. lam moi ch neu het, giup do-------------------
let currentList = [];
let selectedListName = selectexerciseEl.value;
let cauhoiN=0;
let socauhoi=0;
let cauQ='';

let chTenBt='';
let chCauSo='';
let chYcGpt='';
let chGptReply='';
let chListBt='';


document.getElementById("selectexercise").addEventListener("change", function() {
    selectedListName = this.value;
    cauhoiN=0;
    //socauhoi=selectedListName.length;
    resetList();

});

function resetList() {
    currentList = [...originalLists[selectedListName]];
    socauhoi=currentList.length;
    //alert(socauhoi);
    document.getElementById("questionOutput").textContent = "[Chưa có câu hỏi]";
    //socauhoi=currentList.length;
    //document.getElementById("questionOutput").classList.remove("fade-in", "shake");
    //document.getElementById("getQuestionBtn").classList.remove("glow");
    cauhoinEl.textContent = '';
    cauhoiN=0;

}

function getRandomQuestion() {
    if (selectedListName==="__Select__"){
        alert('No excercise!');
        return;
    }  
    if (cauhoiN===socauhoi){
        htTBfresh();
        
        return;
    }
    if (cauhoiN<socauhoi){

    //alert(resultsdichEl.innerText);
    resultsdichEl.innerText ='';

    //let output = document.getElementById("questionOutput");
    //let btn = document.getElementById("getQuestionBtn");
    //alert(currentList.length);    
    if (currentList.length === 0) {

        //output.textContent = "🎯 Hết câu hỏi! Nhấn 'Làm mới' để chơi lại.";
        //Neu het cau bai tap thi hien TB co muon reset lai khong? roi thoat ra
        htTBfresh();
        //output.textContent ='';

    
        //output.classList.add("shake"); // Hiệu ứng rung khi hết câu hỏi
        return;
    }

    let randomIndex = Math.floor(Math.random() * currentList.length);
    let question = currentList.splice(randomIndex, 1)[0];

    cauhoiN = cauhoiN + 1;

    //alert(cauhoiN);
    cauhoinEl.textContent = cauhoiN.toString()+"/"+socauhoi.toString();
    cauQ = 'Write an English sentence that would make me answer like this : \n' + '"'+question+'"';
    sendMessage(cauQ); // Gửi yêu cầu tiếp theo sau 1 giây
        


    //infoBEl.innerText=cauhoiN;
    //output.textContent =  cauQ;
    //alert(resultsdichEl.innerText);
    
}

}


//----------------------------------------------------------------------------
function htTBfresh(){
    if (cauhoiN===0){return;}
    ndTB='Bạn đã làm xong Bài Tập '+selectedListName;
    let ndTB2='Nếu bạn muốn làm lại thì bấm OK, nếu không thì bấm HỦY.';
    Swal.fire({
        title: "<span style='color:darkgreen;'>Thông Báo</span>",
        html: `
        <p>`+ndTB+`</p>`+
        `<p>`+ndTB2+`</p>
        `,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Hủy",
    }).then((result) => {
    if (result.isConfirmed) {
        resetList();
    
    }
    });

} 
function htTBhelp(){
    //let chTenBt='';
    //let chCauSo='';
    //let chYcGpt='';
    //let chGptReply='';
    //let chListBt='';

    if (cauhoiN===0){return;}

    chTenBt='Bài tập nghe và nói : '+selectedListName;
    chCauSo='<span style="color:red;">'+ 'Câu số : '+cauhoinEl.textContent+'</span>';
    chYcGpt='Đã yêu cầu GPT rằng : '+'<br>'+'<span style="color:darkgreen;">'+cauQ+'</span>';

    chListBt='';
    currentList = [...originalLists[selectedListName]];
    currentList.forEach(myFunction);
    function myFunction(item, index) {
        let nn=(index+1).toString();
        chListBt += '<span style="color:red;">'+ nn + ': </span>' + item + '<br>'; 
    }
    
    if (resultsdichEl.textContent===''){
        chGptReply='Gpt không hồi đáp!';
    }else{    
        chGptReply = 'Gpt vừa nói rằng :'+ '<br>' + '<span style="color:red;">' + resultsdichEl.textContent+'</span>' +
        '<p>'+'Để phúc đáp, bạn phải chọn tương tự như một trong các phát biểu sau: '+'</p>'+
        '<p style="color:blue;text-align:left;">' + chListBt +'</p>';
    }


    Swal.fire({
        title: '<span style="color:darkgreen;">'+chTenBt+'</span>',
        html:   `<p>`+chCauSo+`</p>`+
                `<p>`+chYcGpt+`</p>`+
                chGptReply,

        confirmButtonText: "OK",
    })

}
//---tham khao
function rutTextTuAnh(){
    let heso=0;
    let modheso;

    //---------
    Swal.fire({
        html:   `
    <h2>📷 Tải ảnh lên và chọn vùng để nhận diện văn bản</h2>
    <input type="file" id="imageInput" accept="image/*">
    <br><br>
    <canvas id="canvas" style="border: 2px solid black;cursor: crosshair;margin-top: 10px;"></canvas>
    <br>
    <button id="extractText" >📜 Trích xuất văn bản</button>
    <p id="output" style="color:darkgreen;">Văn bản nhận diện sẽ hiển thị ở đây...</p>
        `,
    showCancelButton: true,
    confirmButtonText: "OK gửi đi",
    cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            //alert(document.getElementById("output").innerText);
            sendMessage(document.getElementById("output").innerText);
        }    
    });  
        
    // Chờ SweetAlert2 render xong rồi mới gán sự kiện

    setTimeout(() => {
        let img = new Image();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let startX, startY, endX, endY;
        let isSelecting = false;

        document.getElementById("imageInput").addEventListener("change", function (event) {
            let file = event.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        img.onload = function () {
            canvas.width = img.width * 1 ; // Giảm kích thước ảnh để vừa màn hình
            canvas.height = img.height * 1 ;
            resetCanvas();
        };
        function resetCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }


        // Xử lý chọn vùng trên ảnh
        canvas.addEventListener("mousedown", function (e) {
            startX = e.offsetX;
            startY = e.offsetY;
            isSelecting = true;
        });

        canvas.addEventListener("mousemove", function (e) {
            if (!isSelecting) return;
            endX = e.offsetX;
            endY = e.offsetY;
            redrawCanvas();
        });

        canvas.addEventListener("mouseup", function (e) {
            endX = e.offsetX;
            endY = e.offsetY;
            isSelecting = false;
        });

        function redrawCanvas() {
            resetCanvas();
            if (startX !== undefined && startY !== undefined && endX !== undefined && endY !== undefined) {
                let width = endX - startX;
                let height = endY - startY;
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(startX, startY, width, height);
            }
        }
        document.getElementById("extractText").addEventListener("click", function () {
            if (startX === undefined || startY === undefined || endX === undefined || endY === undefined) {
                document.getElementById("output").innerText = "⚠️ Hãy chọn một vùng trước!";
                return;
            }

            let width = endX - startX;
            let height = endY - startY;

            if (width <= 0 || height <= 0) {
                document.getElementById("output").innerText = "⚠️ Vùng chọn không hợp lệ!";
                return;
            }

            // Tạo canvas mới chứa phần cắt từ ảnh
            let croppedCanvas = document.createElement("canvas");
            croppedCanvas.width = width;
            croppedCanvas.height = height;
            let croppedCtx = croppedCanvas.getContext("2d");

            croppedCtx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);
            let imageDataURL = croppedCanvas.toDataURL("image/png");

            // Xử lý ảnh (phóng to + tăng tương phản) trước khi OCR
            preprocessImage(imageDataURL, function (processedImage) {
                document.getElementById("output").innerText = "🔄 Đang nhận diện văn bản...";
                
                Tesseract.recognize(processedImage, "eng+vie", {
                    logger: (m) => console.log(m),
                }).then(({ data: { text } }) => {
                    document.getElementById("output").innerText = text.trim();
                }).catch(error => {
                    document.getElementById("output").innerText = "❌ Lỗi OCR!";
                    console.error("Lỗi OCR:", error);
                });
            });
        });

        // 🛠 Chuyển ảnh sang grayscale + phóng to + tăng độ tương phản
        function preprocessImage(imgDataURL, callback) {
            let img = new Image();
            img.src = imgDataURL;
            img.onload = function () {
                let tempCanvas = document.createElement("canvas");
                let ctx = tempCanvas.getContext("2d");

                // 🔹 **Phóng to ảnh 2 lần để OCR dễ đọc hơn**
                let scale = 2;
                tempCanvas.width = img.width * scale;
                tempCanvas.height = img.height * scale;

                ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                let imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                let data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    // 🔹 **Chuyển sang grayscale**
                    let gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];

                    // 🔹 **Tăng độ tương phản** (Nếu pixel sáng, làm sáng hơn; pixel tối, làm tối hơn)
                    let contrastFactor = 1.5; // Điều chỉnh độ tương phản (1.5 là vừa phải)
                    gray = (gray - 128) * contrastFactor + 128;
                    gray = Math.max(0, Math.min(255, gray)); // Giữ trong khoảng hợp lệ

                    data[i] = data[i + 1] = data[i + 2] = gray;
                }

                ctx.putImageData(imageData, 0, 0);
                callback(tempCanvas.toDataURL("image/png"));
            };
        }

        
    }, 100);
    //.then((result) => {
    if (result.isConfirmed) {
            console.log(document.getElementById("ouput").innerText);
    }
    

        

}
