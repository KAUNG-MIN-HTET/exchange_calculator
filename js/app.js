window.onload = function(){
    document.querySelector("input").value = "";
}

let from = document.getElementById("from");
let to = document.getElementById("to");
let input = document.getElementById("input");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(x,y,z) {
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z))
    o.appendChild(t);
    x.appendChild(o);

}

function toNum(x) {
    return Number(x.replace(",",""));
}

for(let x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
    // console.log(x , data.rates[x]);
}

function createTable(x){
    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }

    let tr = document.createElement("tr");

    x.map(function (el) {
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
    historyList.appendChild(tr);
}

function saveLog(){
    localStorage.setItem("record",historyList.innerHTML);
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();

    // get state
    let x = input.value;
    let y = from.value;
    let z = to.value;

    // console.log(x,y,z);


    // process
    let fromText = x + " " + from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    let first = x * y;
    // console.log(first);

    let second = first / z;
    let answer = second.toFixed(2);
    let date = new Date().toLocaleString();
    let arr = [date,fromText,toText,answer];
    // console.log(answer);
    // console.log(from.options[from.selectedIndex].innerHTML);
    // console.log(to.options[to.selectedIndex].innerHTML);

    // set state
    result.innerHTML = answer;
    input.value = "";
    from.value = "0";
    to.value = "1";
    input.focus();

    createTable(arr);
    saveLog();
});

(function () {
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = "<tr id='rowSpacer'><td class='row-spacer' colspan='4'>There is no Record</td></tr>";
    }
})();

function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("sun").classList.toggle("fa-sun");
}

function clearHistory() {
    localStorage.clear();
    // historyList.innerHTML = "";
    location.reload();
}