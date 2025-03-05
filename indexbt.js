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
