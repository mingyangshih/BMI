var result = document.querySelector(".result");
var img_click = document.querySelector('.img');
var DATA_store = JSON.parse(localStorage.getItem('listDATA')) || [];
result.addEventListener('click',function(e){
    e.stopPropagation();
    // ------------------------------count BMI------------------------------
    var h_value = parseInt(document.querySelector('.input-height').value);
    var w_value = parseInt(document.querySelector('.input-weight').value);
    var h_square = Math.pow(h_value/100,2);  //pow平方
    var BMI = w_value / h_square;
    BMI = Math.floor(BMI*100)/100;//顯示到小數點2位
    
    //-------------------------------------------------------
    
    var bmi_result;
    var p_result = document.querySelector('.p-result');
    var judge;
    if (e.target.nodeName !== "A"){
        switch(true){
            case (BMI<18.5):
                bmi_result = '過輕';
                judge = "light";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break;
            case (BMI>18.5 && BMI<=25):
                bmi_result = '理想';
                judge = "good";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                // eachrecord.classList.add("good");
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break;
            case (BMI>25 && BMI<=30):
                bmi_result = '過重';
                judge = "heavy";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                //eachrecord.classList.add("heavy");
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break;
            case (BMI>30 && BMI<=35):
                bmi_result = '輕度肥胖';
                judge = "light-fat";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                //eachrecord.classList.add("light-fat");
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break;
            case (BMI>35 && BMI<=40):
                bmi_result = '中度肥胖';
                judge = "middle-fat";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                //eachrecord.classList.add("middle-fat");
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break; 
            case (BMI>40):
                bmi_result = '重度肥胖';
                judge = "too-fat";
                appendallresult(bmi_result,BMI,w_value,h_value,judge);
                result.classList.add(judge);//add class to button
                //eachrecord.classList.add("too-fat");
                p_result.innerHTML = BMI+"<p>BMI</p>";
                break;       
            default:
                // bmi_result = 'error';
                // appendallresult(bmi_result,BMI,w_value,h_value);
                alert("You should enter height and weight.")
                break;
            }
            var BMIDATA = {
                BMIVALUE : BMI,
                WVALUE : w_value,
                HVALUE : h_value
            }
            DATA_store.push(BMIDATA);
            localStorage.setItem('listDATA',JSON.stringify(DATA_store));
            document.querySelector('.input-height').value = "";
            document.querySelector('.input-weight').value = "";

    }else if(e.target.nodeName == "A"){
        result.classList.remove(result.classList[1]);
        p_result.innerHTML = "<p>result</p>";
        // remove class which add by myself
    }
    console.log(e.target.nodeName);
    console.log(h_value,w_value,BMI,bmi_result);
})

function appendallresult(bmi_result,BMI,w_value,h_value,judge){
    
    
    var bmirecord = document.querySelector('.bmirecord');
    bmirecord.innerHTML = "";  
    var record_title = document.createElement('h2');
    record_title.setAttribute('class','bmirecord');
    record_title.textContent = "BMI 紀錄";
    bmirecord.appendChild(record_title);
    // add  eachrecord div
    
    var eachrecord_div = document.createElement("DIV");
    var allresult = document.querySelector('.all-result');
    eachrecord_div.setAttribute('class','eachrecord');
    console.log("div test");
    allresult.appendChild(eachrecord_div);
    var eachrecord = document.querySelector('.eachrecord');
    eachrecord.classList.add(judge);

    // result setting
    var eachrecord = document.querySelector('.eachrecord');
    var d = new Date();
    var month = d.getMonth()+1;
    var timestr = "<p>"+month+"-"+d.getDate()+"-"+d.getFullYear()+"</p>";
    eachrecord.innerHTML = "<p>"+ bmi_result +"</p>"+"<p>BMI</p>"+"<p>"+ BMI +"</p>"+"<p>weight</p>"+"<p>"+ w_value +"</p>"+"<p>height</p>"+"<p>"+ h_value +"</p>"+timestr;
    console.log(bmi_result);
    return eachrecord_div;
}