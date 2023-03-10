let merr = "https://www.merriam-webster.com/dictionary/";
let dictApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let words = [];
let pp = [];

let temp = "";
const inputel = document.getElementById("input-el");
const submitbtn = document.getElementById("button-submit");
const removebtn = document.getElementById("button-remove");
const completebtn = document.getElementById("button-completed");
const removeallbtn = document.getElementById("button-removeall");
const savetabbtn = document.getElementById("button-savetab");
const un_li = document.querySelector("#unordered-list");
const result = document.querySelector('.result')
const err = document.getElementById("error-space");
const count = document.getElementById("count");
const importBtn = document.getElementById("button-import");
const exportBtn = document.getElementById("button-export");

let wid=screen.availWidth;
let hei=screen.availHeight;
//console.log(wid,hei);

const logError = (error) => { // logs error below the input box
    err.innerHTML = `<h2 style="color:red;text-align:center;font-size:20px;font-weight:bold;margin-top:30px">${error}</h2>`;
    setTimeout(() => { err.innerHTML = '<h2 style="color:rgb(33, 40, 33);text-align:center;font-size:20px;font-weight:bold;margin-top:30px">Hello</h2>' }, 5000);
}

const crossClicked = async (id) => {// completed
    var newWindow = window.open(`./popups/deleteWord/deleteWord.html?nam=${id.name}&id=${id.id}`,"_self","toolbar=no,scrollbars=no,resizable=yes,top=425,left=500,width=550,height=250");
    render();
    inputel.focus();
}

const boxChecked = async (wor) => {// completed
    if (wor.reminder === true) {
        wor.reminder = false;
    }
    else {
        wor.reminder = true;
    }
   
    const { data } = await axios.patch(`/api/v1/words/id/${wor.id}`, wor)
    render();
}

const wordClicked = async (wor) => {
    console.log("registered");
    //wor="boy";
    var newWindow = window.open('/wordMeaning/meaning.html');
    newWindow.param1 = wor.name;
    render();
}

const getword = async () => { // use axios.get to get all words
    try {
        let { data } = await axios.get('/api/v1/words');
        count.innerHTML = ` ${data.data.length} `;
        const allwor = data.data.map((word) => {
            let pp = "checked";
            let col = "green";
            if (word.reminder === true) {
                pp = "";
                col = "red";
            }
            //  <a style="color:${col};" id="word_${word.name}" href="./completedWords/completed.html" target="_blank"> ${word.name.charAt().toUpperCase()+word.name.slice(1).toLowerCase()} </a>
            //  <a style="color:${col};" id="word_${word.name}" href="${merr}${word.name}" target="_blank"> ${word.name.charAt().toUpperCase() + word.name.slice(1).toLowerCase()} </a> 
            //  <a style="color:${col};" id="word_${word.name}" href="${merr}${word.name}" target="_blank"> ${word.name.charAt().toUpperCase()+word.name.slice(1).toLowerCase()} </a> 
            return `<li>
                        <div style="display:flex; justify-content:space-between; margin-right:00px;">
                            <div style="display:flex; justify-content:flex-start;align-items:flex-start;width:70%;text-align: left">
                                <button style="padding: 0px;background-color: rgb(33, 40, 33);margin-left:0px; width:100%;margin:0px;align-self:flex-start;font-size:90%;text-align:left" onclick="wordClicked({name:'${word.name}'})"><text style="margin-left:0px;padding:0px;color:${col};align-self:flex-start;justify-content:flex-start;align-items:flex-start;">${word.name.charAt().toUpperCase()+word.name.slice(1).toLowerCase()}</text></button>
                            </div>
                            <div style="display:flex; justify-content:space-between; width:20%">
                                <button style="margin-right:0px; color:#ffa500;width:50%; background-color: rgb(33, 40, 33);font-size:90%" onclick="crossClicked({id:'${word._id}',name:'${word.name}'})">X</button>
                                <input style="width:50%;height:20px; background-color: rgb(33, 40, 33);display:flex; justify-content:flex-end; " type="checkbox" id="checkbox_${word.name}" ${pp} onclick="boxChecked({id:'${word._id}',reminder:${word.reminder},name:'${word.name}'})">
                            </div>
                        </div>
                    </li> `
        })
        un_li.innerHTML = allwor.join('');
    }
    catch (error) {
        un_li.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
        console.log(error);
    }
}

submitbtn.addEventListener("click", async () => { // done
    let tex = inputel.value;
    inputel.value = "";
    try {
        const { data } = await axios.post('/api/v1/words', { name: tex, reminder: false })
        render();
        inputel.focus();
    }
    catch (error) {
        logError(error.response.data);
    }
})

inputel.addEventListener("keypress", async (event) => { // done
    if (event.key === "Enter") {
        let tempwo = inputel.value;
        inputel.value = "";
        try {
            const { data } = await axios.post('/api/v1/words', { name: tempwo })
            /*
            const zp = ` <li> 
                    <a id="word_${tempwo}" href="${merr}${tempwo}" target="_blank"> ${tempwo} </a> 
                    </li>`;
            un_li.innerHTML += zp;
            */
            render();
            /* uncomment this to see meaning in merriam webster
            window.open(`${merr}${tempwo}`)
            */
           wordClicked({name:tempwo})
            inputel.focus();
            /*
            let zx = document.getElementById(`word_${wor}`);
            zx.click();
            */
        }
        catch (error) {
            logError(error.response.data);
        }
    }
})

removebtn.addEventListener("click", async function () {// this is complete
    let tex = inputel.value;
    if (tex != '') {
        try {
            let pp = await axios.delete(`/api/v1/words/name/${tex}`);
        }
        catch (e) {
            logError(e.response.data);
        }
    }
    else {
        logError("No word enterd");
    }
    inputel.value = "";
    render();
})

completebtn.addEventListener("click", function () {// routes to an html page with list of completed words
    window.open('/completedWords/completed.html', "_self")
    inputel.value = pp;
})

removeallbtn.addEventListener("dblclick", async function () {// done
    logError("Currently Left Docile");
    /*
    console.log("registered");
    try {
        let { data } = await axios.get('/api/v1/words');
        data = data.data;
        if (data.length > 0) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                let pp = await axios.delete(`/api/v1/words/name/${data[i].name}`);
            }
        }
    }
    catch (error) {
        un_li.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
        console.log(error);
    }
    render();
    */
})

importBtn.addEventListener("click", async function () {// done
    logError("Currently Left Docile");
    /*
const {data}=await axios.get('/import')
const importedWords=data.data;
if (importedWords.length>0){
    let i=0;
    for(i=0;i<importedWords.length;i++){
        try {
            const { data } = await axios.post('/api/v1/words', { name: importedWords[i], reminder: true })
            render();
            inputel.focus();
        }
        catch (error) {
            logError(error.response.data);
        }
    }
}
*/
})

exportBtn.addEventListener("click", async function () {// done
    logError("Check console for the list of words");
    const {data}=await axios.get('/api/v1/words');
    let allwords=data.data;
    allwords=allwords.map((wor)=>{
        return wor.name;
    })
    allwords=allwords.join(',');
    console.log(allwords);
})

function render() {
    getword();
}
/*
const li=document.creatElement("li");
li.textContent=words[i];
un_li.append(li);
*/

render(); // needs to be after the definition of render
inputel.focus();