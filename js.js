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


const toUpperLetters = function (arr) {
    arr.map((str, index) => {
        const firstLetter = str.charAt(0).toLocaleUpperCase(); 
        const anotherLetter = str.slice(1);
        arr[index] = firstLetter + anotherLetter;
    });
    
    const arrayTostr = (arr.splice(0, 5)).toString(); 

    return arrayTostr.replaceAll(",", "");
};

const res = toUpperLetters(array);



// @BPMS.LanguageResources.LanguageService.GetTranslate("Value") 