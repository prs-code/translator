const array = [
    "midst",
    "different",
    "writing",
    "first",
    "massive",
    "right",
    "sharp",
    "years",
    "constantly",
    "Medium",
    "constantly",
    "thinking",
    "deterministic",
    "believe",
    "realistic",
    "human",
    "ChatGPT",
    "Digitizing",
    "young",
];


const toUpperLetters = function (arr) {// تبدیل آرایه به رشته
    arr.map((str, index) => {
        const firstLetter = str.charAt(0).toLocaleUpperCase(); 
        const anotherLetter = str.slice(1);
        arr[index] = firstLetter + anotherLetter;
    });
    
    const arrayTostr = (arr.splice(0, 5)).toString(); 

    return arrayTostr.replaceAll(",", "");
};

const res = toUpperLetters(array);

//جای گذاری رشته کلید در توابع
const js = document.getElementById('inpt-js');
js.value = `translate(${res})`;


const cshtml = document.getElementById('inpt-cshtml');
//چک باکس مربوط به @
function changeHandler(e) {
    (e.checked ? 
        cshtml.value = `@BPMS.LanguageResources.LanguageService.GetTranslate(${res})` : 
        cshtml.value = `BPMS.LanguageResources.LanguageService.GetTranslate(${res})`)
};

//کپی داخل کلیپ بورد
function jsCopy(e) {
    navigator.clipboard.writeText(js.value);
};

function csCopy(e) {
    navigator.clipboard.writeText(cshtml.value);
};