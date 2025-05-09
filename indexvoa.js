const selectvoa = document.getElementById("unit_chon_voa");

//cai nay de them vao menu option da co : "VOA LEARNING ENGLISH", menu co 4 dong
let elmtsvoa = ["Let's Learn English with Anna!", 
    "Let's Learn English 1", 
    "Let's Learn English 2",
    "Intermediate Level",
    "Advanced Level",
    "U.S. History",
    "Video"];
    
// Main function
function GFG_Fun_Voa() {
    for (let i = 0; i < elmtsvoa.length; i++) {
        let optn = elmtsvoa[i];
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        selectvoa.appendChild(el);
    }
}

GFG_Fun_Voa();

//lay link vao <a></a> tuong ung voi menu elmtsvoa'; list co 4 pt
    
let lahtml = ["",
    "https://learningenglish.voanews.com/p/8322.html",
    "https://learningenglish.voanews.com/p/5644.html",
    "https://learningenglish.voanews.com/p/6765.html",
    "https://learningenglish.voanews.com/p/5610.html",
    "https://learningenglish.voanews.com/p/5611.html",
    "https://learningenglish.voanews.com/p/6353.html",
    "https://learningenglish.voanews.com/p/5631.html"];

function chonUnitVoa(){ //chon unit khac va update iframe
    if (selectvoa.selectedIndex > 0){
        moVOA(event, lahtml[selectvoa.selectedIndex]);    
    }
}


let popupWindow = null;

function moVOA(event, url) {
    event.preventDefault(); // Ngăn trình duyệt mở thẳng link

    const width = window.innerWidth;
    const height = window.innerHeight;
    const left = window.screenX;
    const top = window.screenY;

    // Gọi trực tiếp window.open trong sự kiện click để tránh bị chặn
    popupWindow = window.open(url, "voaPopup", `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`);

    return false;
}

// Theo dõi khi popup đóng thì hiển thị trạng thái quay lại
setInterval(() => {
    if (popupWindow && popupWindow.closed) {
        //document.getElementById("status").textContent = "✅ Bạn đã quay lại ứng dụng. Hãy tiếp tục học bài khác.";
        console.log("✅ Bạn đã quay lại ứng dụng. Hãy tiếp tục học bài khác.")
        popupWindow = null;
    }
}, 1000);


