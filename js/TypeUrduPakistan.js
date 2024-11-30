/*
Auto Type Urdu Pakistan
Version: 1.1
This module enables typing Urdu in web forms without changing system language settings.
The layout is based on the Official Urdu Keyboard Layout.
*/

let shiftIsPressed = false;
let ctrlIsPressed = false;

const urduKeyboard = {
    urduCodeMap: {
        'KeyA': 'م','shift+KeyA': 'ژ', 'KeyB': 'ش', 'shift+KeyB': 'ؤ', 'KeyC': 'ے', 'shift+KeyC': 'ۓ', 'KeyD': 'ر','shift+KeyD': 'ڑ', 
        'KeyE': 'ھ', 'shift+KeyE': 'ذ', 'KeyF': 'ن', 'shift+KeyF': 'ں','KeyG': 'ل', 'shift+KeyG': 'ۂ','KeyH': 'ہ', 'shift+KeyH': 'ء', 
        'KeyI': 'ب', 'shift+KeyI': 'ـ', 'KeyJ': 'ا', 'shift+KeyJ': 'آ', 'KeyK': 'ک','shift+KeyK': 'گ', 'KeyL': 'ی', 'shift+KeyL': 'ي', 
        'KeyM': 'ع', 'shift+KeyM': '', 'KeyN': 'غ', 'shift+KeyN': 'ئ','KeyO': 'ج', 'shift+KeyO': 'چ', 'KeyP': 'ح', 'shift+KeyP': 'خ', 
        'KeyQ': 'ط', 'shift+KeyQ': 'ظ', 'KeyR': 'د','shift+KeyR': 'ڈ','KeyS': 'و','shift+KeyS': 'ز','KeyT': 'ٹ','shift+KeyT': 'ث',
        'KeyU': 'ت','shift+KeyU': 'ۃ','KeyV': 'س','shift+KeyV': '','KeyW': 'ص','shift+KeyW': 'ض', 'KeyX': 'ف', 'shift+KeyX': '‌','KeyY': 'پ',
        'shift+KeyY': 'ّ', 'KeyZ': 'ق','shift+KeyZ': '‍', 'Semicolon': '؛', 'shift+Semicolon': '‍', 'Slash': '/', 'shift+Slash': '‍؟', 
        'Comma': '،', 'shift+Slash': '>',
    },

    init() {
        const elements = document.querySelectorAll('input[type="text"][lang="ur-pk"], textarea[lang="ur-pk"], div[contenteditable="true"][lang="ur-pk"]');
        elements.forEach((element) => this.bindUrduTyping(element));
    },

    bindUrduTyping(element) {
        element.style.textAlign = 'right';
        element.style.direction = 'rtl';

        element.addEventListener('keypress', (e) => this.handleKeyPress(e, element));
        element.addEventListener('keydown', this.handleKeyDown);
        element.addEventListener('keyup', this.handleKeyUp);
    },

    handleKeyDown(e) {
        if (e.key === 'Shift') shiftIsPressed = true;
        if (e.ctrlKey) ctrlIsPressed = true;
    },

    handleKeyUp(e) {
        if (e.key === 'Shift') shiftIsPressed = false;
        if (!e.ctrlKey) ctrlIsPressed = false;
    },

    handleKeyPress(e, element) {
        if (!ctrlIsPressed) {
            const keyCode = e.code || e.charCode || e.keyCode;
            const keyStr = shiftIsPressed ? 'shift+' + keyCode : keyCode.toString();
            const urduChar = this.urduCodeMap[keyStr];

            if (urduChar) {
                this.insertTextAtCaret(element, urduChar);
                e.preventDefault();
            }
        }
    },

    insertTextAtCaret(element, char) {
        if (!element.isContentEditable) {
            const { selectionStart, selectionEnd, value } = element;
            element.value = value.slice(0, selectionStart) + char + value.slice(selectionEnd);
            element.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else {
            const sel = window.getSelection();
            const { anchorOffset, focusOffset } = sel;
            const content = element.textContent;
            element.textContent = content.slice(0, anchorOffset) + char + content.slice(focusOffset);

            const range = document.createRange();
            range.setStart(element.firstChild, anchorOffset + 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
};

window.addEventListener('load', urduKeyboard.init.bind(urduKeyboard));
