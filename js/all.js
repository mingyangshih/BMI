var result = document.querySelector(".result");
var img_click = document.querySelector('.img');
var DATA_store = JSON.parse(localStorage.getItem('listDATA')) || [];
// loading localstorage
loaddata(DATA_store);


result.addEventListener('click',function(e){
    e.stopPropagation();
    var nodename = e.target.nodeName;
    
    // ------------------------------count BMI------------------------------
    var h_value = parseInt(document.querySelector('.input-height').value);
    var w_value = parseInt(document.querySelector('.input-weight').value);
    var h_square = Math.pow(h_value/100,2);  //pow平方
    var BMI = w_value / h_square;
    BMI = Math.floor(BMI*100)/100;//顯示到小數點2位
    
    //-------------------------------------------------------
    BMI_switch(BMI,nodename,w_value,h_value);
})

//更新主畫面功能 
function loaddata(DATA_store){
    var allresult = document.querySelector('.all-result');
    allresult.innerHTML = "";
    // set h2 title
    var record_title = document.createElement('h2');
    record_title.setAttribute('class','bmirecord');
    record_title.textContent = "BMI 紀錄";
    allresult.appendChild(record_title);
    for(var i=0;i<=DATA_store.length-1; i++){
        var bmi_result = DATA_store[i].BMIRESULT;
        var BMI = DATA_store[i].BMIVALUE;
        var h_value = DATA_store[i].HVALUE;
        var w_value = DATA_store[i].WVALUE;
        var judge = DATA_store[i].JUDGE;
        var timestr = DATA_store[i].time;
        
        // set each DIV
        var eachrecord_div = document.createElement("DIV");
        eachrecord_div.setAttribute('class','eachrecord');
        allresult.appendChild(eachrecord_div);   
    }
    
    //選取每一個新增的DIV
    var eachrecord = document.querySelectorAll('.eachrecord');    
    for (var j=0;j<=eachrecord.length-1;j++){
        var bmi_result = DATA_store[j].BMIRESULT;
        var BMI = DATA_store[j].BMIVALUE;
        var h_value = DATA_store[j].HVALUE;
        var w_value = DATA_store[j].WVALUE;
        var timestr = DATA_store[j].time;
        //在div class中加 judge值到class內
        eachrecord[j].classList.add(DATA_store[j].JUDGE);
        // 輸入div 內容
        eachrecord[j].innerHTML = "<p>"+ bmi_result +"</p>"+"<p>BMI</p>"+"<p>"+ BMI +"</p>"+"<p>weight</p>"+"<p>"+ w_value +"</p>"+"<p>height</p>"+"<p>"+ h_value +"</p>"+timestr;
    }   
    
}

// header click 觸發事件
function BMI_switch(BMI,nodename,w_value,h_value){
    var bmi_result;
    var p_result = document.querySelector('.p-result');
    var judge;
    
    if (nodename == "P" && p_result.textContent == "result"){
        switch(true){
            case (BMI<18.5):
                bmi_result = '過輕';
                judge = "light";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break;
            case (BMI>18.5 && BMI<=25):
                bmi_result = '理想';
                judge = "good";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break;
            case (BMI>25 && BMI<=30):
                bmi_result = '過重';
                judge = "heavy";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break;
            case (BMI>30 && BMI<=35):
                bmi_result = '輕度肥胖';
                judge = "light-fat";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break;
            case (BMI>35 && BMI<=40):
                bmi_result = '中度肥胖';
                judge = "middle-fat";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break; 
            case (BMI>40):
                bmi_result = '重度肥胖';
                judge = "too-fat";
                result.classList.add(judge);//add class to button
                p_result.innerHTML = BMI+"<p>BMI</p>";
                store();
                break;       
            default:
                // bmi_result = 'error';
                alert("You should enter height and weight.")
                break;
            }
            // local storage
            function store(){
                var d = new Date();  //得到日期給變數d
                var month = d.getMonth()+1; //The getMonth() method returns the month (from 0 to 11) for the specified date, according to local time.
                var timestr = timestr = month+"-"+d.getDate()+"-"+d.getFullYear();
                var BMIDATA = {
                    BMIVALUE : BMI,
                    WVALUE : w_value,
                    HVALUE : h_value,
                    JUDGE : judge,
                    BMIRESULT : bmi_result,
                    time : timestr    
                }
                DATA_store.unshift(BMIDATA);//排到array第0個,DATA_store全域宣告過
                localStorage.setItem('listDATA',JSON.stringify(DATA_store));//轉成string存到local storage去
                document.querySelector('.input-height').value = "";
                document.querySelector('.input-weight').value = "";
            }
            

    }else if(nodename == "A"){
        result.classList.remove(result.classList[1]);
        p_result.innerHTML = "<p>result</p>";
        // remove class which add by myself
    }
    loaddata(DATA_store); //unshift新物件後馬上更新
}
