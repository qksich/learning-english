import { words } from "./db-words.js"

class Words {
    selectors = {
        root: '[data-js-main]',
        wordBlock: '[data-js-word]',
        translateBlock: '[data-js-translate]',
        writeBlock: '[data-js-write-block]',
        checkInput: '[data-js-check-input]',
        checkButton: '[data-js-check-button]',
        showButton: '[data-js-show-button]',
        openCheckButton: '[data-js-open-check-button]',
        nextWordButton: '[data-js-next-word-button]',
    }
    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.wordBlockElement = document.querySelector(this.selectors.wordBlock)
        this.translateBlockElement = document.querySelector(this.selectors.translateBlock)
        this.writeBlockElement = document.querySelector(this.selectors.writeBlock)
        this.checkInputElement = document.querySelector(this.selectors.checkInput)
        this.checkButtonElement = document.querySelector(this.selectors.checkButton)
        this.showButtonElement = document.querySelector(this.selectors.showButton)
        this.openCheckButtonElement = document.querySelector(this.selectors.openCheckButton)
        this.nextWordButtonElement = document.querySelector(this.selectors.nextWordButton)

        this.currentWord = []
        this.attemptsLeft = 3
        
        this.isRevealed = false
        this.writeBlockRevealed = false
        this.bindEvents()
        this.wordsLenght = words.length - 1
        
    }
    nextWord() {
        this.currentWord = Math.floor(Math.random() * (this.wordsLenght + 1))
        console.log(this.currentWord);
        
        this.attemptsLeft = 3
        if (this.isRevealed){
            this.translateBlockElement.classList.add('invisible')
            this.isRevealed = false
        } 
        if (this.writeBlockRevealed) {
            this.writeBlockElement.style.display = 'none'
            this.writeBlockRevealed = false
        }
        const wordArr = words[this.currentWord]
        const wordObj = wordArr[1]
        const wordResult = Object.keys(wordObj)[0]
        const translateResult = Object.values(wordObj)[0]
        setTimeout(() => {
            this.wordBlockElement.innerHTML = `<span>${wordResult}</span>`
            this.translateBlockElement.innerHTML = `<span>${translateResult}</span>`
        }, 1000);
    }
    showWord() {
        if (this.isRevealed) {
            return
        } else {
            this.translateBlockElement.classList.remove('invisible')
            this.isRevealed = true
        }
    }
    checkBlock() {
        if (this.writeBlockRevealed) {
            return
        } else {
            this.writeBlockElement.style.display = 'flex'
            this.writeBlockRevealed = true
        }
    }
    checkWord() {
        const userWord = this.checkInputElement.value
        const formatted = userWord.trim().toLowerCase()
        const wordArr = words[this.currentWord]
        const wordObj = wordArr[1]
        const wordResult = Object.keys(wordObj)[0]
        const translateResult = Object.values(wordObj)[0]
        if (formatted === translateResult) {
            this.translateBlockElement.classList.remove('invisible')
            this.isRevealed = true
            this.writeBlockElement.style.display = 'none'
            this.writeBlockRevealed = false
        } else {
            if (this.attemptsLeft >= 2) {
                this.attemptsLeft = this.attemptsLeft - 1
                this.checkButtonElement.innerHTML = `
                <span>Проверить (${this.attemptsLeft})</span>
                `
                if (!this.checkInputElement.classList.contains('error')) {
                    this.checkInputElement.classList.add('error')
                }
            } else {
                this.writeBlockElement.style.display = 'none'
                this.writeBlockRevealed = false
                this.attemptsLeft = 3
                this.translateBlockElement.classList.remove('invisible')
                this.isRevealed = true
            }
        }
    }
    bindEvents() {
        this.nextWordButtonElement.addEventListener('click', () => this.nextWord())
        this.showButtonElement.addEventListener('click', () => this.showWord())
        this.openCheckButtonElement.addEventListener('click', () => this.checkBlock())
        this.checkButtonElement.addEventListener('click', () => this.checkWord())
    }


}



new Words()