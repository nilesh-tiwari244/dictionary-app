let merr = "https://www.merriam-webster.com/dictionary/";
let words = [];
let pp = [];
let temp = "";
const goBack = document.getElementById("button-goback");
const deletebtn = document.getElementById("button-delete");
const editbtn = document.getElementById("button-edit");
const inpblock = document.getElementById("input-el");
const err = document.getElementById("error-space");

//inpblock.placeholder = para[1].charAt().toUpperCase()+para[1].slice(1).toLowerCase();
const urlParams = new URL(window.location.href).searchParams;
let wordName=urlParams.get('nam');
let wordId=urlParams.get('id');
console.log(wordName,wordId);

inpblock.placeholder = wordName.charAt().toUpperCase()+wordName.slice(1).toLowerCase();

const logError = (error) => { // logs error below the input box
    err.innerHTML = `<h2 style="color:red;text-align:center;font-size:20px;font-weight:bold;margin-top:30px">${error}</h2>`;
    setTimeout(() => { err.innerHTML = '<h2 style="color:rgb(33, 40, 33);text-align:center;font-size:20px;font-weight:bold;margin-top:30px">Hello</h2>' }, 5000);
}

editbtn.addEventListener('click', async () => {
    let newWor=inpblock.value;

    try {
        const { data } = await axios.patch(`/api/v1/words/id/${wordId}`,{reminder:true,name:newWor} )
    goBack.click();
    }
    catch (error) {
        logError(error.response.data);
    }
    
    //window.open('/index.html', "_self");
})

deletebtn.addEventListener('click', async () => {
    // console.log()
    let pp = await axios.delete(`/api/v1/words/id/${wordId}`);
    goBack.click();
    //window.close();
})

goBack.addEventListener('click', () => {
     //console.log(para[2].location)
     //console.log(window.parent.location,window.opener.location,window.top.location);
    //window.parent.location.reload(true);
   let pp=window.open('/index.html', "_self");
   //window.opener.postMessage({ ref: true }, '*');
}
)

/*
const li=document.creatElement("li");
li.textContent=words[i];
un_li.append(li);
*/
// needs to be after the definition of render