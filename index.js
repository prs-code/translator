// Selected html tags
const raw_translation_input = $("#RawTranslation")
const translated_key_input = $("#TranslatedKey")

// #region functions and methods
const translate = async (txt) => {
    if(! typeof txt == 'string') {
        alert('ورودی شما باید از نوع متن باشد')
        return false
    }
    var txte = txt;
    var sourceLang = 'fa';
    var targetLang = 'en';

    var url =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
        sourceLang +
        '&tl=' +
        targetLang +
        '&dt=t&q=' +
        encodeURI(txte);
    //console.log(url);

    const response = await fetch(url);
    const resText = await response.json();
    raw_translation_input.val(resText[0][0][0])
    return resText[0][0][0];
};

const convertStringToArr = async (pureString) => {
    const translatedText = await translate(pureString);
    if (typeof translatedText != 'string') return false;
    const x = translatedText.split(' ');
    return x;
};

const toUpperLetters = function (arr) {
    if(!Array.isArray(arr)) {
        alert('ورودی تابع کلید ساز آرایه نیست لطفا بررسی شود')
        return false
    }
    // تبدیل آرایه به رشته
    arr.map((str, index) => {
        const firstLetter = str.charAt(0).toLocaleUpperCase();
        const anotherLetter = str.slice(1);
        arr[index] = firstLetter + anotherLetter;
    });

    const arrayTostr = arr.splice(0, 5).toString();

    translated_key_input.val(arrayTostr.replaceAll(',', ''))
    return arrayTostr.replaceAll(',', '');
};

const InsertTextToMethod = function() {
    
    //جای گذاری رشته کلید در توابع
    const js = document.getElementById('inpt-js');
    js.value = `translate("${res}")`;


    const cshtml = document.getElementById('inpt-cshtml');
    //چک باکس مربوط به @
    function changeHandler(e) {
        e.checked
            ? (cshtml.value = `@BPMS.LanguageResources.LanguageService.GetTranslate("${res}")`)
            : (cshtml.value = `BPMS.LanguageResources.LanguageService.GetTranslate("${res}")`);
    }
}

//کپی داخل کلیپ بورد
function jsCopy(e) {
    navigator.clipboard.writeText(js.value);
}

function csCopy(e) {
    navigator.clipboard.writeText(cshtml.value);
}
// #endregion

$('#translate-btn').on('click',async () => {
    if ($('#persianTextarea').val().length < 2) {
        alert('طول مقدار برای ساخت کلید باید بیشتر از 2 کاراکتر باشد');
        return false;
    }
    const keyValue = await convertStringToArr($('#persianTextarea').val());
    const res = toUpperLetters(keyValue)


    debugger


   
});
