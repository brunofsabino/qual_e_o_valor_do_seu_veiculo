let items = document.querySelectorAll('.form-select-1 option')
let array = [...items]

function mostraAlerta(elemento){   
    
    let form = document.querySelector('form');
    form.submit();
    
    let selectOptions = document.querySelectorAll('.form-select-1 option')
   
    
}

array.forEach( (item, indice) => {
    let select2 = document.querySelector('.form-select-1')
    let selectValue = select2.options[select2.selectedIndex].value
    let selectValue2 = select2.options
    if(item.value == selectValue) {
        item.setAttribute("selected", selectValue)
    }

    
})

let options = document.querySelectorAll('[data-option]')
let optionsArray = [...options]
optionsArray.forEach( item => {
    console.log(item)
    item.addEventListener("change", ()=> {
        alert(this.value)
    })
})