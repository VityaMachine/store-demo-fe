import { formSend } from "./request.js";

// Функція валідація полів форм.
function validate(patern,input){
    return patern.test(input)
}

// Функція очищення полів форм.
export function clearFormFields() {
    const modalFiends = document.querySelectorAll('input');
    modalFiends.forEach( field => { 
        field.value = ''
    });
}

// Патерн Email.
const paternEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

// Патерн Ім'я;
const paternName = /^([A-Za-z][A-Za-z\-\']{1,50})|([А-ЯЁIЇҐЄа-яёіїґє][А-ЯЁIЇҐЄа-яёіїґє\-\']{1,50})$/;

// Патерн Телефону.
const paternTel = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

// Функція обробник форми футер.
export function formFooterHandler(){
    const footerForm = document.querySelector('.footer-form');
    const footerFormEmail = document.querySelector('.footer-form-email');

    footerFormEmail.addEventListener('click',(el)=>{
        footerFormEmail.classList.remove('error')
    })

    footerForm.addEventListener('submit', e => {
    e.preventDefault();

    footerFormEmail.classList.remove('error')

    if(validate(paternEmail, footerFormEmail.value)){
        formSend(footerForm);
        footerForm.classList.add('scale')  
        setTimeout(()=>{
            footerForm.innerHTML ='<div class="footer-form-send"><div>Thanks for subscribing!</div><div><svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0 0 13.5l7.67 2.84L19.5 5.25l-8.998 12.14.007.002-.009-.002V24l4.301-5.018L20.251 21 24 0Z" fill="#fcf8f8"/></div></svg></div>'
            footerForm.classList.remove('scale')
        },1000)
    }
    else {
        footerFormEmail.classList.add('error')
        return
    }
    });
}

// Функція валідації даних з форми.
export function formModalValidate(form){
    let error = 0;
    let str = []

    let formReq = document.querySelectorAll('._req')
    formRemoveError()
    for(let i = 0 ; i < formReq.length; i++){
        const input = formReq[i] 
        if(input.classList.contains('form-name-input')){
            if(!validate(paternName,input.value)){
                formAddError(input)
                error++;
            }
            else str.push(`Name: ${input.value}`)
        }
        else if(input.classList.contains('form-email-input')){
            if(!validate(paternEmail,input.value)){
                formAddError(input)
                error++;
            }
            else str.push(`Email: ${input.value}`);
        }
        else if(input.getAttribute('type') === 'checkbox' && input.checked === false){   
            formAddError(input)
            error++;
        }
        else if(input.classList.contains('form-tel-input')){
            if(!validate(paternTel,input.value)){
                formAddError(input)
                error++;
            }
            else str.push(`Phone number: ${input.value}`);
        }
        else if(input.classList.contains('form-message-input')){
            if(input.value !== ""){
                str.push(`Message: ${input.value}`);
            }
        }

    }
    // console.log(str.join(', '))
    return error;
}

export function formAddError(input){
    input.classList.add('_error')
}

export function formRemoveError(){
    let [...formReq] = document.querySelectorAll('._req')
    formReq.forEach(el=>{
        el.classList.remove('_error')
    })
}
