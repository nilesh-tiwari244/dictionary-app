let merr = "https://www.merriam-webster.com/dictionary/";
let words = [];
let pp = localStorage.getItem("str_words");
pp = JSON.parse(pp); //make stringified json element back to json
let temp = "";
const inputel = document.getElementById("input-el");
const submitbtn = document.getElementById("button-submit");
const removebtn = document.getElementById("button-remove");
const extractbtn = document.getElementById("button-extract");
const removeallbtn = document.getElementById("button-removeall");
const savetabbtn = document.getElementById("button-savetab");
const un_li = document.querySelector("#unordered-list");

render2();
inputel.focus();

/*
extractbtn.addEventListener("click",function(){
   // inputel.value=JSON.stringify(pp);
    inputel.value=pp;
})
*/

submitbtn.addEventListener("click", function () {
    let tex = inputel.value;
    if (pp != null) {
        pp.push(tex);
    }
    else {
        words.push(tex);
        pp = words;
        words = [];
    }
    inputel.value = "";
    localStorage.setItem("str_words", JSON.stringify(pp));
    render2();
    inputel.focus();
})
inputel.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let tempwo = inputel.value;
        submitbtn.click();
        document.getElementById(`word_${tempwo}`).click();
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
function render2() {
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

const fetchPeople = async () => {
    try {
        let { data } = await axios.get('/api/v1/words');
        const people = data.data.map((word) => {
            return `<li> 
                    <a href="${merr}${word.name}" target="_blank"> ${word.name} </a> 
                    </li>`
        })
        result.innerHTML = people.join('');
    }
    catch (error) {
        result.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
    }
}
fetchPeople();
postRequest.addEventListener("click", async (e)=>{
    console.log("button clicked");
    e.preventDefault();
    let val = inputel.value;
    try {
        const { data } = await axios.post('/api/v1/newword', { name: val }); // when we perform an http request with axios we receive a giant object and here we only required our data one
        console.log(data.data[0]);
        result.innerHTML+=` <li> 
        <a href="${merr}${val}" target="_blank"> ${val} </a> 
        </li>`;
    }
    catch (er) {
        errblock.textContent = er.response.data.msg;
    }
    inputel.value = '';
})