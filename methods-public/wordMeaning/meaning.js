const descp=document.getElementById("descp");
let para=window.param1;
console.log(para);
const goBack=document.getElementById("button-goback");
const un_li=document.getElementById("ordered-list");
const name=document.getElementById("name");


const getword = async (wor) => { // use sxios.get to get all words
    
    try {
        let { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wor}`);
        data=data[0].meanings;

        let ll=0;
        const allwor = data.map((word) => {
            let i=0;
            let means='';
            for (i=0;i<word.definitions.length;i++){
                means+=`<li style="justify-content:flex-start;text-align: left;">
                <text style="">
                        ${word.definitions[i].definition}      
                        </text>
                        </li>`;
            }
                return `<li id="pos_${word.partOfSpeech}" 
                            justify-content: flex-start;
                            align-items: flex-start;"> 
                            <text style="
                                width:800px;
                                color:red;
                                font-size:30px;
                                font-weight:bold;
                                align-items:flex-start;
                                display:flex;
                                text-align:flex-start;
                                justify-content: flex-start;">When used as ${word.partOfSpeech}</text>
                            <ol style=" max-height: 500px; word-wrap:break-word;">
                                ${means}
                            </ol>
                    </li> `
        })
        un_li.innerHTML = allwor.join('');
    }
    catch (error) {
        un_li.innerHTML = `<div class="alert alert-danger">can't fetch data</div>`
        console.log(error);
    }
    name.innerHTML=`${wor}`;
    
}

goBack.addEventListener('click',()=>{
    console.log("clicked");
    window.open('/index.html',"_self");
})

function render() {
    getword(para);
}
/*
const li=document.creatElement("li");
li.textContent=words[i];
un_li.append(li);
*/
render(); // needs to be after the definition of render
