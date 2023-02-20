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
const trialBtn = document.getElementById("button-trial");


const logError = (error) => { // logs error below the input box
    err.innerHTML = `<h2 style="color:red;text-align:center;font-size:20px;font-weight:bold;">${error}</h2>`;
    setTimeout(() => { err.innerHTML = '' }, 5000);
}

const crossClicked = async (id) => {// completed
    console.log(id.id);
    let pp = await axios.delete(`/api/v1/words/id/${id.id}`);
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
    const { data } = await axios.patch(`/api/v1/words/name/${wor.name}`, wor)
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
                            <div style="display:flex; justify-content:flex-start;align-items:flex-start;">
                                <button style="padding: 0px;background-color: rgb(33, 40, 33);margin-leftt:0px; width:80px;margin:0px;align-self:flex-start;font-size:25px" onclick="wordClicked({name:'${word.name}'})"><text style="margin-left:0px;padding:0px;color:${col};align-self:flex-start;justify-content:flex-start;align-items:flex-start;">${word.name.charAt().toUpperCase()+word.name.slice(1).toLowerCase()}</text></button>
                            </div>
                            <div style="display:flex; justify-content:space-between; width:120px">
                                <button style="margin-right:0px; color:#ffa500;width:15px; background-color: rgb(33, 40, 33);font-size:25px" onclick="crossClicked({id:'${word._id}'})">X</button>
                                <input style="width:20px;height:20px; background-color: rgb(33, 40, 33);display:flex; justify-content:flex-end; " type="checkbox" id="checkbox_${word.name}" ${pp} onclick="boxChecked({name:'${word.name}',reminder:${word.reminder}})">
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
        if (error.response.status == 400) {
            logError(error.response.data.msg);
        }
        else if (error.response.status == 500) {
            logError(error.response.data.msg.errors.name.message);
        }
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
            window.open(`${merr}${tempwo}`)
            inputel.focus();
            /*
            let zx = document.getElementById(`word_${wor}`);
            zx.click();
            */
        }
        catch (error) {
            if (error.response.status == 400) {
                logError(error.response.data.msg);
            }
            else if (error.response.status == 500) {
                logError(error.response.data.msg.errors.name.message);
            }
        }
    }
})

removebtn.addEventListener("click", async function () {// this is complete
    let tex = inputel.value;
    if (tex != '') {
        try {
            let pp = await axios.delete(`/api/v1/words/name/${tex}`);
            console.log(pp.data.msg);
        }
        catch (e) {
            logError(e.response.data.msg);
            console.log(e.response.data.msg);
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
})

trialBtn.addEventListener("click", async function () {// done
    console.log("registered");
    let wor = inputel.value;
    //wor="boy";
    inputel.value = "";
    var newWindow = window.open('/wordMeaning/meaning.html');
    newWindow.param1 = wor;
    render();
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