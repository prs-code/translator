// Selected html tags
const raw_translation_input = $("#RawTranslation")
const translated_key_input = $("#TranslatedKey")
const inJsMethod_input = $("#inpt-js")
const inChtmlMethod_input = $("#inpt-cshtml")
const checkBox_Chtml_with_addsign = $("#gridCheck1")

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

const chtmlChangeHandler = (key) => {
    checkBox_Chtml_with_addsign.is(":checked") ?
        (inChtmlMethod_input.val(`@BPMS.LanguageResources.LanguageService.GetTranslate("${key}")`))
        :
        (inChtmlMethod_input.val(`BPMS.LanguageResources.LanguageService.GetTranslate("${key}")`));
}

const InsertTextToMethod = function(res) {
    
    // جای گذاری در متد جاوااسکریپت 
    inJsMethod_input.val(`translate("${res}")`) 

    // جای گذاری در متد chtml 
    chtmlChangeHandler(res)
    checkBox_Chtml_with_addsign.on('click',()=>{
        chtmlChangeHandler(res)
    })
}

//کپی داخل کلیپ بورد
function jsCopy(e) {
    navigator.clipboard.writeText(inJsMethod_input.val());
}

function csCopy(e) {
    navigator.clipboard.writeText(inChtmlMethod_input.val());
}
// #endregion

$('#translate-btn').on('click',async () => {
    if ($('#persianTextarea').val().length < 2) {
        alert('طول مقدار برای ساخت کلید باید بیشتر از 2 کاراکتر باشد');
        return false;
    }
    const keyValue = await convertStringToArr($('#persianTextarea').val());
    const res = toUpperLetters(keyValue)
    InsertTextToMethod(res)
});
