var result = document.querySelector(".result");
result.addEventListener('click',function(){
    // ------------------------------count BMI------------------------------
    var h_value = parseInt(document.querySelector('.input-height').value);
    var w_value = parseInt(document.querySelector('.input-weight').value);
    var h_square = Math.pow(h_value/100,2);  //pow平方
    var BMI = w_value / h_square;
    BMI = Math.floor(BMI*100)/100;//顯示到小數點2位
    //---------------------------------------------------------------------- 
    var bmi_result;
    var p_result = document.querySelector('.p-result');
    var eachrecord = document.querySelector('.eachrecord');
    switch(true){
        case (BMI<18.5):
            bmi_result = '過輕';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break;
        case (BMI>18.5 && BMI<=25):
            bmi_result = '理想';
            appendallresult(bmi_result,BMI,w_value,h_value);
            result.classList.add("green");//add class
            eachrecord.classList.add("green");
            p_result.innerHTML = BMI+"<p>BMI</p>";
            break;
        case (BMI>25 && BMI<=30):
            bmi_result = '過重';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break;
        case (BMI>30 && BMI<=35):
            bmi_result = '輕度肥胖';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break;
        case (BMI>35 && BMI<=40):
            bmi_result = '中度肥胖';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break; 
        case (BMI>40):
            bmi_result = '重度肥胖';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break;       
        default:
            bmi_result = 'error';
            appendallresult(bmi_result,BMI,w_value,h_value);
            break;
    }
    console.log(h_value,w_value,BMI,bmi_result);
    
})

function appendallresult(bmi_result,BMI,w_value,h_value){
    var bmirecord = document.querySelector('.bmirecord');
    bmirecord.innerHTML = "";  
    var record_title = document.createElement('h2');
    record_title.setAttribute('class','bmirecord');
    record_title.textContent = "BMI 紀錄";
    bmirecord.appendChild(record_title);
    
    // result setting
    var eachrecord = document.querySelector('.eachrecord');
    var d = new Date();
    var month = d.getMonth()+1;
    var timestr = "<p>"+month+"-"+d.getDate()+"-"+d.getFullYear()+"</p>";
    eachrecord.innerHTML = "<p>"+ bmi_result +"</p>"+"<p>BMI</p>"+"<p>"+ BMI +"</p>"+"<p>weight</p>"+"<p>"+ w_value +"</p>"+"<p>height</p>"+"<p>"+ h_value +"</p>"+timestr;
    console.log(bmi_result);
}

function changecolor(){

}