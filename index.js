import './index.css';

function func1() {

    let ref = document.querySelector("div#ref").innerText;
    document.querySelector("#output").innerText = ref;

}

function func2() {

    document.querySelector("#output").style.fontSize = "30px";
    document.querySelector("#output").style.fontWeight = "bold";
    document.querySelector("#output").style.border = "4px solid #f80";

}