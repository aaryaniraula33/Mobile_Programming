function calculateResult() {

    let math = Number(document.getElementById("math").value) || 0;
    let science = Number(document.getElementById("science").value) || 0;
    let english = Number(document.getElementById("english").value) || 0;
    let social = Number(document.getElementById("social").value) || 0;
    let economics = Number(document.getElementById("economics").value) || 0;
    let businessMath = Number(document.getElementById("businessMath").value) || 0;
    let accounts = Number(document.getElementById("accounts").value) || 0;
    let nepali = Number(document.getElementById("nepali").value) || 0;

    let total = math + science + english + social + economics + businessMath + accounts + nepali;

    let percentage = (total / 800) * 100;

    document.getElementById("total").innerHTML = "Total Marks: " + total + "/800";
    document.getElementById("percentage").innerHTML = "Percentage: " + percentage.toFixed(2) + "%";

    let resultText = "";
    let color = "";

    if (percentage >= 80) {
        resultText = "Distinction";
        color = "green";
    } else if (percentage >= 60) {
        resultText = "First Division";
        color = "blue";
    } else if (percentage >= 50) {
        resultText = "Second Division";
        color = "orange";
    } else if (percentage >= 40) {
        resultText = "Third Division";
        color = "brown";
    } else {
        resultText = "Fail";
        color = "red";
    }

    document.getElementById("result").innerHTML = resultText;
    document.getElementById("result").style.color = color;
}