let merr = "https://www.merriam-webster.com/dictionary/";
let words = [];
let pp = [];

const getword = async () => {
    try {
        let { data } = await axios.get('/api/v1/words');
        const allwor = data.data.map((word) => {
            return `<li> <nobr>
                    <a id="word_${word.name}" href="${merr}${word.name}" target="_blank"> ${word.name} </a> <nobr>
                    <input type="checkbox" id="checkbox_${word.name}" >
                    </li> `
        })
        un_li.innerHTML = allwor.join('');
    }
    catch (error) {
        un_li.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
    }
}
let temp = "";
const inputel = document.getElementById("input-el");
const submitbtn = document.getElementById("button-submit");
const removebtn = document.getElementById("button-remove");
const extractbtn = document.getElementById("button-extract");
const removeallbtn = document.getElementById("button-removeall");
const savetabbtn = document.getElementById("button-savetab");
const un_li = document.querySelector("#unordered-list");
const err=document.getElementById("error-space");

render2();
inputel.focus();

/*
extractbtn.addEventListener("click",function(){
   // inputel.value=JSON.stringify(pp);
    inputel.value=pp;
})
*/

submitbtn.addEventListener("click", async () => {
    let tex = inputel.value;
    inputel.value = "";
    try {
        const { data } = await axios.post('/api/v1/words/', { name: tex,reminder:false })
        render2();
        inputel.focus();
    }
    catch(error){
       // err.innerHTML=`<h3>${e.response.data.msg}</h3>`;
       console.log(e);
}})

inputel.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        let tempwo = inputel.value;
        inputel.value = "";
        try {
            const { data } = await axios.post('/api/v1/words/', { name: tempwo })
            /*
            const zp = ` <li> 
                    <a id="word_${tempwo}" href="${merr}${tempwo}" target="_blank"> ${tempwo} </a> 
                    </li>`;
            un_li.innerHTML += zp;
            */
           render2();
           window.open(`${merr}${tempwo}`)
            inputel.focus();
            /*
            let zx = document.getElementById(`word_${wor}`);
            zx.click();
            */
        }
        catch (e) {
            console.log(e);
        }
    }
})

removebtn.addEventListener("click", function () {
    let tex = inputel.value;
    if (pp != null) {
        for (let i = 0; i < pp.length; i++) {
            if (pp[i] == tex) {
                for (let j = i; j < pp.length - 1; j++) {
                    pp[j] = pp[j + 1];
                }
                pp.pop();
                i = pp.length;
            }
        }
    }
    inputel.value = "";
    localStorage.setItem("str_words", JSON.stringify(pp));
    render2();

})

removeallbtn.addEventListener("dblclick", function () {
    localStorage.clear();
    pp = [];
    render2();
})
/*
savetabbtn.addEventListener("click",function(){
        let tex=null;
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        tex = tabs[0].url;
        if (pp != null) {
            pp.push(tex);
        }
        else{
            words.push(tex);
            pp=words;
            words=[];
        }
    });

    inputel.value = "";
    localStorage.setItem("str_words",JSON.stringify(pp));
    render2();
})
*/
function render2 (){
getword();
    /*
    temp = "";
    if (pp != null) {
        for (let i = pp.length - 1; i >= 0; i--) {
            // temp+="<li> <a href='"+ words[i]+"' target='_blank'> " + words[i] + "</a> </li>";
            temp += `<li>
                     <a id="word_${pp[i]}" href="${merr}${pp[i]}" target="_blank">
                         ${pp[i]}
                     </a>
                 </li>
         `;
        }
        un_li.innerHTML = temp;
    }
    */
}
/*
const li=document.creatElement("li");
li.textContent=words[i];
un_li.append(li);
*/



extractbtn.addEventListener("click", function () {
    inputel.value = pp;
})

const result = document.querySelector('.result')
const postRequest = document.querySelector("#button-server")

postRequest.addEventListener("click", async (e) => {
    console.log("button clicked");
    e.preventDefault();
    let val = inputel.value;
    try {
        const { data } = await axios.post('/api/v1/newword', { name: val }); // when we perform an http request with axios we receive a giant object and here we only required our data one
        console.log(data.data[0]);
        result.innerHTML += ` <li> 
        <a href="${merr}${val}" target="_blank"> ${val} </a> 
        </li>`;
    }
    catch (er) {
        errblock.textContent = er.response.data.msg;
    }
    inputel.value = '';
})