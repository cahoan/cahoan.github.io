//Noi dung cau hoi cho tung bai----------------------
const originalLists = {
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

document.getElementById("selectexercise").addEventListener("change", function() {
    selectedListName = this.value;
    resetList();
});

function resetList() {
    currentList = [...originalLists[selectedListName]];
    document.getElementById("questionOutput").textContent = "[Chưa có câu hỏi]";
    document.getElementById("questionOutput").classList.remove("fade-in", "shake");
    document.getElementById("getQuestionBtn").classList.remove("glow");
}

function getRandomQuestion() {
    let output = document.getElementById("questionOutput");
    let btn = document.getElementById("getQuestionBtn");

    if (currentList.length === 0) {
        output.textContent = "🎯 Hết câu hỏi! Nhấn 'Làm mới' để chơi lại.";
        output.classList.add("shake"); // Hiệu ứng rung khi hết câu hỏi
        return;
    }

    let randomIndex = Math.floor(Math.random() * currentList.length);
    let question = currentList.splice(randomIndex, 1)[0];

    let cauQ = "Say an English sentence that would make me answer like this : " + question;
    sendMessage(cauQ);


    output.textContent = cauQ;
    output.classList.remove("fade-in"); // Reset hiệu ứng
    void output.offsetWidth; // Trick để reset animation
    output.classList.add("fade-in"); // Hiệu ứng hiện dần

    btn.classList.add("glow"); // Nút phát sáng khi rút câu hỏi
    setTimeout(() => btn.classList.remove("glow"), 1000); // Tắt sáng sau 1 giây
}

resetList();

//----------------------------------------------------------------------------