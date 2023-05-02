console.log('YPA')

import {keyboardKeysEnglish, keyboardKeysRussian} from './keyboardRows.js'


let keyboardKeys = keyboardKeysEnglish

const title = document.createElement('h1')
title.textContent = 'Virtual keyboard'
title.className = "title"

let wrapperAreaForText = document.createElement('div')
wrapperAreaForText.className = 'wrapper-area-for-text'
let areaForText = document.createElement('textarea')
areaForText.className = 'areaForText'

let wrapperKeyBoardBlock = document.createElement('div')
wrapperKeyBoardBlock.className = 'wrapper-keyboard__block'
let KeyBoardBlock = document.createElement('div')
KeyBoardBlock.className = 'keyboard__block'
let rowOfKeyboard = ''

let wrapperForLanguageSwitching = document.createElement('div')
wrapperForLanguageSwitching.className = "wrapper-for-language-switching"
let textForLanguageSwitching = document.createElement('div')
textForLanguageSwitching.className = "text-for-language-switching"


let currentLanguage = "English"
localStorage.setItem("language", currentLanguage)

textForLanguageSwitching.textContent = `Your current language is ${localStorage.getItem("language")}. \n
If you want to change it press (Alt + Shift)\n
or the button below`
let buttonForLanguageSwitching = document.createElement("button")
buttonForLanguageSwitching.className = "button-for-language-switching"
buttonForLanguageSwitching.textContent = "Switch language"

const changeLanguage = () => {
    if (localStorage.getItem("language") === "English") {
        keyboardKeys = keyboardKeysRussian
        localStorage.setItem("language", "Russian")
        textForLanguageSwitching.textContent = `Your current language is ${localStorage.getItem("language")}. \n
            If you want to change it press (Alt + Shift)\n
            or the button below`
        createKeyboard()
        printOnClickInTextarea()
    } else {
        keyboardKeys = keyboardKeysEnglish
        localStorage.setItem("language", "English")
        textForLanguageSwitching.textContent = `Your current language is ${localStorage.getItem("language")}. \n
            If you want to change it press (Alt + Shift)\n
            or the button below`
        createKeyboard()
        printOnClickInTextarea()
    }
}

// runOnKeys( () => changeLanguage(), "ShiftLeft",  "AltLeft");
runOnKeys(  changeLanguage, "ShiftLeft",  "AltLeft");
buttonForLanguageSwitching.addEventListener("click", changeLanguage);


document.body.prepend(title, wrapperAreaForText, wrapperForLanguageSwitching, wrapperKeyBoardBlock)
wrapperAreaForText.append(areaForText)
wrapperForLanguageSwitching.append(textForLanguageSwitching, buttonForLanguageSwitching)
wrapperKeyBoardBlock.append(KeyBoardBlock)

const createKeyDiv = (obj) => {
    let temporaryDiv = document.createElement('div')
    temporaryDiv.className = 'key__block'
    let smallDiv = document.createElement('div')
    // smallDiv.textContent = obj.char
    smallDiv.innerHTML = obj.char
    smallDiv.className = 'key__small'
    let bigDiv = document.createElement('div')
    bigDiv.innerHTML = obj.shift
    bigDiv.className = 'key__shift'
    bigDiv.classList.add('hidden')
    temporaryDiv.dataset.keyToCompare = obj.keycode
    if (obj.specialButton) {
        temporaryDiv.dataset.specialButton = obj.specialButton
    }
    rowOfKeyboard.append(temporaryDiv)
    temporaryDiv.append(smallDiv)
    temporaryDiv.append(bigDiv)
}


const createKeyboard = () => {
    KeyBoardBlock.innerHTML = ''
    keyboardKeys.forEach( (row, index) => {
        rowOfKeyboard = document.createElement('div')
        rowOfKeyboard.className = 'rowOfKeyboard'
        rowOfKeyboard.dataset.rowNumber = index
        KeyBoardBlock.append(rowOfKeyboard)
        row.forEach(element => {
            createKeyDiv(element)
        })
    })
}
createKeyboard()

let KeyboardKeysOnBoard = document.querySelectorAll('.key__block')

let KeyboardKeysOnBoardSmall = document.querySelectorAll('.key__small')
let KeyboardKeysOnBoardShift = document.querySelectorAll('.key__shift')

const paintKeyOnKeydown = () => {
    document.addEventListener('keydown', (event) => {
        KeyboardKeysOnBoard = document.querySelectorAll('.key__block')
        KeyboardKeysOnBoard.forEach(element => {
            if (  (event.code == element.dataset.keyToCompare) && (!element.dataset.specialButton)  ) {
                element.classList.add('colored')
                if (event.shiftKey) {
                    areaForText.textContent += `${element.lastChild.textContent}`
                } else {
                    areaForText.textContent += `${element.firstChild.textContent}`
                }
            } else if (  (event.code == element.dataset.keyToCompare) && 
                                (element.dataset.keyToCompare == "ShiftLeft")  ) {
                                    element.classList.add('colored')
            } else if (  (event.code == element.dataset.keyToCompare) && 
                                (element.dataset.keyToCompare == "CapsLock")  ) {
                                    element.classList.add('colored')
                                    // KeyboardKeysOnBoardSmall.forEach( el => el.classList.add('hidden') )
                                    // KeyboardKeysOnBoardShift.forEach( el => el.classList.remove('hidden') )
                                    KeyboardKeysOnBoardSmall.forEach( el => el.classList.toggle('hidden') )
                                    KeyboardKeysOnBoardShift.forEach( el => el.classList.toggle('hidden') )
            }
        })
    })
    document.addEventListener('keyup', (event) => {
        KeyboardKeysOnBoard = document.querySelectorAll('.key__block')
        KeyboardKeysOnBoard.forEach(element => {
            if (event.code == element.dataset.keyToCompare) {
                element.classList.remove('colored')
            }
        })
    })
}
paintKeyOnKeydown()

document.addEventListener('keydown', (event) => {
    console.log("event.code", event.code)
    if (event.code === "ShiftLeft") {
        KeyboardKeysOnBoardSmall.forEach( el => el.classList.add('hidden') )
        KeyboardKeysOnBoardShift.forEach( el => el.classList.remove('hidden') )
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === "ShiftLeft") {
        KeyboardKeysOnBoardSmall.forEach( el => el.classList.remove('hidden') )
        KeyboardKeysOnBoardShift.forEach( el => el.classList.add('hidden') )
    }
})

function runOnKeys(func, ...codes) {
    let pressed = new Set();
    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);
      for (let code of codes) { 
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();
      func();
    });
    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });
}



// const shiftPushed = () => {

//         console.log('ShiftLeft pushed')
//         KeyboardKeysOnBoardSmall = document.querySelectorAll('.key__small')
//         KeyboardKeysOnBoardShift = document.querySelectorAll('.key__shift')
//         KeyboardKeysOnBoardSmall.forEach( el => el.classList.add('hidden') )
//         KeyboardKeysOnBoardShift.forEach( el => el.classList.remove('hidden') )
// }
// runOnKeys( () => shiftPushed(), "ShiftLeft");


let printOnClickInTextarea = () => {

    KeyboardKeysOnBoard = document.querySelectorAll('.key__block')
    KeyboardKeysOnBoard.forEach(keyOnBoard => {

        keyOnBoard.addEventListener('click', (event) => {
            console.log('event.target', event.target)
            if (event.target.closest(".key__block").dataset.specialButton) {
                
                if (event.target.closest(".key__block").dataset.keyToCompare === "Enter") {
                    areaForText.textContent = areaForText.textContent + "\n"
                }
                if (event.target.closest(".key__block").dataset.keyToCompare === "Tab") {
                    areaForText.textContent = areaForText.textContent + "\t"
                }
                if (event.target.closest(".key__block").dataset.keyToCompare === "Backspace") {
                    // console.log('areaForText.textContent', areaForText.textContent)
                    areaForText.textContent = areaForText.textContent.slice(0, -1)
                }
                // if (event.target.closest(".key__block").dataset.keyToCompare === "CapsLock") {
                //     areaForText.textContent = areaForText.textContent + "\t"
                // }
            } else {
                areaForText.textContent = areaForText.textContent + `${event.target.textContent}`
            }
            
            
        })
    })
} 
printOnClickInTextarea()


