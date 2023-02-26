let merr = "https://www.merriam-webster.com/dictionary/";
let words = [];
let pp = [];

let temp = "";
const goBack = document.getElementById("button-goback");
const un_li = document.querySelector("#unordered-list");
const count = document.getElementById("count");

const crossClicked = async ({ name }) => {// completed
    console.log(name);
    let pp = await axios.delete(`/api/v1/words/name/${name}`);
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

const getword = async () => { // use sxios.get to get all words
    try {
        let { data } = await axios.get('/api/v1/words');
        console.log(data.data.length);
        let ll = 0;
        const allwor = data.data.map((word) => {
            let pp = "checked";
            let col = "green";

            if (word.reminder === true) {
                pp = "";
                col = "red";
            }
            if (word.reminder === false) {
                ll = ll + 1;
                return `<li>
                <div style="display:flex; justify-content:space-between; margin-right:00px;">
                    <div style="display:flex; justify-content:flex-start;align-items:flex-start;">
                        <button style="padding: 0px;background-color: rgb(33, 40, 33);margin-leftt:0px; width:80px;margin:0px;align-self:flex-start;font-size:25px" onclick="wordClicked({name:'${word.name}'})"><text style="margin-left:0px;padding:0px;color:${col};align-self:flex-start;justify-content:flex-start;align-items:flex-start;">${word.name.charAt().toUpperCase() + word.name.slice(1).toLowerCase()}</text></button>
                    </div>
                    <div style="display:flex; justify-content:space-between; width:120px">
                        <button style="margin-right:0px; color:#ffa500;width:15px; background-color: rgb(33, 40, 33);font-size:25px" onclick="crossClicked({id:'${word._id}'})">X</button>
                        <input style="width:20px;height:20px; background-color: rgb(33, 40, 33);display:flex; justify-content:flex-end; " type="checkbox" id="checkbox_${word.name}" ${pp} onclick="boxChecked({id:'${word._id}',reminder:${word.reminder},name:'${word.name}'})">
                    </div>
                </div>
            </li> `
            }
        })
        count.innerHTML = `${ll}`;
        un_li.innerHTML = allwor.join('');
    }
    catch (error) {
        un_li.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
        console.log(error);
    }
}

goBack.addEventListener('click', () => {
    // console.log()
    window.open('/index.html', "_self");
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