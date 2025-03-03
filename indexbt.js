//Noi dung cau hoi cho tung bai----------------------
const originalLists = {
    __Select__:[],
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
    document.getElementById("questionOutput").classList.remove("fade-in", "shake");
    document.getElementById("getQuestionBtn").classList.remove("glow");
    cauhoinEl.textContent = '';

}

function getRandomQuestion() {
    resultsdichEl.innerText ='';

    let output = document.getElementById("questionOutput");
    let btn = document.getElementById("getQuestionBtn");

    if (currentList.length === 0) {

        output.textContent = "🎯 Hết câu hỏi! Nhấn 'Làm mới' để chơi lại.";
        htTBfresh();
        output.textContent ='';

        cauhoiN=0;
        output.classList.add("shake"); // Hiệu ứng rung khi hết câu hỏi
        return;
    }

    let randomIndex = Math.floor(Math.random() * currentList.length);
    let question = currentList.splice(randomIndex, 1)[0];
    cauhoiN = cauhoiN + 1;
    //alert(cauhoiN);
    cauhoinEl.textContent = cauhoiN.toString()+"/"+socauhoi.toString();
    let cauQ = "Say an English sentence that would make me answer like this : " + question;
    sendMessage(cauQ);

    //infoBEl.innerText=cauhoiN;
    output.textContent =  cauQ;
    output.classList.remove("fade-in"); // Reset hiệu ứng
    void output.offsetWidth; // Trick để reset animation
    output.classList.add("fade-in"); // Hiệu ứng hiện dần

    btn.classList.add("glow"); // Nút phát sáng khi rút câu hỏi
    setTimeout(() => btn.classList.remove("glow"), 1000); // Tắt sáng sau 1 giây

}


//----------------------------------------------------------------------------
function htTBfresh(){
    if (cauhoiN===0){return;}
    let ndTB='Bạn đã làm xong Bài Tập '+selectedListName;
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
    if (cauhoiN===0 || resultsdichEl.innerText===''){return;}
    let ndTB='Bạn đang làm Bài Tập : '+selectedListName;
    let ndTB2='Gpt vừa nói rằng :';
    let ndTB3 = resultsdichEl.innerText ;

    let textl = "";
    currentList = [...originalLists[selectedListName]];

    //const fruits = ["apple", "orange", "cherry"];
    currentList.forEach(myFunction);

    //document.getElementById("demo").innerHTML = text;
    
    function myFunction(item, index) {
        textl += index+1 + ": " + item + "<br>"; 
    }

    Swal.fire({
        title: "<span style='color:darkgreen;'>Thông Báo</span>",
        html:   `<p>`+ndTB+`</p>`+
                `<p>`+ndTB2+`</p>`+
                `<p style="color:orange;">`+ndTB3+`</p>`+
                `<p>`+`Để phúc đáp, bạn phải chọn tương tự như một trong các phát biểu sau: `+`</p>`+
                `<p style="color:blue;">`+textl+`</p>`,
        confirmButtonText: "OK",
    })

}