class Keyboard {
    constructor() {
      this.elements = {
        main: null,
        text: null,
        textarea: null,
        keysContainer: null,
        keys: [],
      };
  
      this.properties = {
        value: '',
        capsLock: false,
        shiftOn: false,
        isRrussian: false,
      }
  
      this.keyLayout = [
        ['`', 'ё', 'Backquote'], ['1', '1', 'Digit1'], ['2', '2', 'Digit2'], ['3', '3', 'Digit3'], ['4', '4', 'Digit4'], ['5', '5', 'Digit5'], ['6', '6', 'Digit6'], ['7', '7', 'Digit7'], ['8', '8', 'Digit8'], ['9', '9', 'Digit9'], ['0', '0', 'Digit0'], ['-', '-', 'Minus'], ['=', '=', 'Equal'], ['Backspace', 'Backspace', 'Backspace'],
        ['Tab', 'Tab', 'Tab'], ['q', 'й', 'KeyQ'], ['w', 'ц', 'KeyW'], ['e', 'у', 'KeyE'], ['r', 'к', 'KeyR'], ['t', 'е', 'KeyT'], ['y', 'н', 'KeyY'], ['u', 'г', 'KeyU'], ['i', 'ш', 'KeyI'], ['o', 'щ', 'KeyO'], ['p', 'з', 'KeyP'], ['[', 'х', 'BracketLeft'], [']', 'ъ', 'BracketRight'], ['\\', '|', 'Backslash'], ['Del', 'Del', 'Delete'],
        ['CapsLock', 'CapsLock', 'CapsLock'], ['a', 'ф', 'KeyA'], ['s', 'ы', 'KeyS'], ['d', 'в', 'KeyD'], ['f', 'а', 'KeyF'], ['g', 'п', 'KeyG'], ['h', 'р', 'KeyH'], ['j', 'о', 'KeyJ'], ['k', 'л', 'KeyK'], ['l', 'д', 'KeyL'], [';', 'ж', 'Semicolon'], ["'", 'э', 'Quote'], ['Enter', 'Enter', 'Enter'],
        ['ShiftLeft', 'ShiftLeft', 'ShiftLeft'], ['/', '/', 'Slash'], ['z', 'я', 'KeyZ'], ['x', 'ч', 'KeyX'], ['c', 'с', 'KeyC'], ['v', 'и', 'KeyV'], ['b', 'и', 'KeyB'], ['n', 'т', 'KeyN'], ['m', 'ь', 'KeyM'], [',', 'б', 'Comma'], ['.', 'ю', 'Period'], ['/', '.', 'Slash'], ['ArrowUp', 'ArrowUp', 'ArrowUp'], ['ShiftRight', 'ShiftRight', 'ShiftRight'],
        ['Ctrl', 'Ctrl', 'ControlLeft'], ['Win', 'Win', 'MetaLeft'], ['Alt', 'Alt', 'AltLeft'], ['Space', 'Space', 'Space'], ['Alt', 'Alt', 'AltRight'], ['Ctrl', 'Ctrl', 'ControlRight'], ['ArrowLeft', 'ArrowLeft', 'ArrowLeft'], ['ArrowDown', 'ArrowDown', 'ArrowDown'], ['ArrowRight', 'ArrowRight', 'ArrowRight'],
        ];

      this.shiftKeys = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
    }

    InitNoteText() {
      this.elements.text = document.createElement('div');
      this.elements.text.classList.add('text_note');
      document.body.appendChild(this.elements.text);
      this.elements.text.innerHTML = 'NOTE: Press Ctrl + Shift to change language. This keyboard was created for Windows OS.';
    }
  
    initTextarea() {
      this.elements.textarea = document.createElement('textarea');
      this.elements.textarea.classList.add('keyboard_input');
      document.body.appendChild(this.elements.textarea);
    }
  
    initVirtual() {
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');
  
      this.elements.main.classList.add('keyboard');
      this.elements.keysContainer.classList.add('keyboard_keys');

      this.elements.keysContainer.appendChild(this.createKeys());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard_key');
  
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      if (this.properties.isRrussian === false) {
        localStorage.setItem('lang', 'false');
      }
      if (this.properties.isRrussian === true) {
        localStorage.setItem('lang', 'true');
      }
    }
  
    createKeys() {
      const fragment = document.createDocumentFragment();
      
      const funcKeys = {
        Backspace: (keyElement) => {
          keyElement.classList.add('backspace', 'button_dark');
          keyElement.innerHTML = '<span>Backspace</span>';
                
          keyElement.addEventListener('click', () => {
          this.handleBackspace();
          });
        },
        Del: (keyElement) => {
          keyElement.classList.add('del', 'button_dark');
          keyElement.innerHTML = '<span>Del</span>';
      
          keyElement.addEventListener('click', () => {
          this.handleDelete();
          });
        },
        Tab: (keyElement) => {
          keyElement.classList.add('tab', 'button_dark');
          keyElement.innerHTML = '<span>Tab</span>';
    
          keyElement.addEventListener('click', () => {
          this.handleTab();
          });
        },
        CapsLock: (keyElement) => {
          keyElement.classList.add('capslock', 'button_dark');
          keyElement.innerHTML = '<span>CapsLock</span>';
      
          keyElement.addEventListener('click', () => {
          this.toggleCapsLock();
          keyElement.classList.toggle('capslock__activated', this.properties.capsLock);
          });
        },
        Enter: (keyElement) => {
          keyElement.classList.add('enter', 'button_dark');
          keyElement.innerHTML = '<span>Enter</span>';
      
          keyElement.addEventListener('click', () => {
            this.handleEnter();
          });
        },
        ShiftLeft: (keyElement) => {
          keyElement.classList.add('shift_left', 'button_dark');
          keyElement.innerHTML = '<span>Shift</span>';

          keyElement.addEventListener('click', () => {
            this.toggleShift();
            keyElement.classList.toggle('shift__activated', this.properties.shiftOn);
          });
        },
        ShiftRight: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>Shift</span>';

          keyElement.addEventListener('click', () => {
            this.toggleShift();
            keyElement.classList.toggle('shift__activated', this.properties.shiftOn);
          });
        },
        Ctrl: (keyElement) => {
          keyElement.classList.add('ctrl', 'button_dark');
          keyElement.innerHTML = '<span>Ctrl</span>';
        },
        Alt: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>Alt</span>';
        },
        Win: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>Win</span>';
          
          keyElement.addEventListener('click', () => {
            alert('Win pressed!');
          });
        },
        ArrowUp: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>˄</span>';
      
          keyElement.addEventListener('click', () => {
            this.handleArrowUp();
          });
        },
        ArrowLeft: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>˂</span>';
                
          keyElement.addEventListener('click', () => {
            this.handleArrowLeft();
          });
        },
        ArrowDown: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>˅</span>';
                
          keyElement.addEventListener('click', () => {
            this.handleArrowDown();
          });
        },
        ArrowRight: (keyElement) => {
          keyElement.classList.add('button_dark');
          keyElement.innerHTML = '<span>˃</span>';
      
          keyElement.addEventListener('click', () => {
            this.handleArrowRight();
          });
        },
        Space: (keyElement) => {
          keyElement.classList.add('space');
          keyElement.innerHTML = '<span> </span>';
      
          keyElement.addEventListener('click', () => {
            this.handleSpace();
          });
        },
        default: (keyElement, key) => {
          let [, languageLetter] = key;
          if (!this.properties.isRrussian) {
            [languageLetter] = key;
          }
          keyElement.textContent = languageLetter.toLowerCase();
      
          keyElement.addEventListener('click', () => {
            if (this.properties.capsLock || this.properties.shiftOn) {
              this.properties.value = document.querySelector('.keyboard_input').value;
              this.properties.value += languageLetter.toUpperCase();
            } 
            else {
              this.properties.value = document.querySelector('.keyboard_input').value;
              this.properties.value += languageLetter.toLowerCase();
            }
            document.querySelector('.keyboard_input').value = this.properties.value;
          });
        }
      }
      
      this.keyLayout.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['Backspace', 'Del', 'Enter', 'ShiftRight'].indexOf(key[0]) !== -1;
       
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard_key');
        keyElement.setAttribute('data-key', `${key[2]}`);

        if (funcKeys[key[0]]) {
          funcKeys[key[0]](keyElement);
        } 
        else {
          funcKeys.default(keyElement, key);
        }

        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
      });

      return fragment;
    }


  
    handleBackspace() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      this.properties.value = this.properties.value.substring(0, cursorPos - 1) +
        this.properties.value.substring(cursorPos);
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos - 1);
    }

    handleDelete() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      this.properties.value = this.properties.value.substring(0, cursorPos) +
      this.properties.value.substring(cursorPos + 1);
        document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos);
    }

    handleTab() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      this.properties.value = this.properties.value.substring(0, cursorPos) + '\t' + 
        this.properties.value.substring(cursorPos);
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos + 1);
    }

    handleEnter() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      this.properties.value = this.properties.value.substring(0, cursorPos) + '\n' + 
        this.properties.value.substring(cursorPos);
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos + 1);
    }

    handleSpace() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      this.properties.value = this.properties.value.substring(0, cursorPos) + ' ' + 
        this.properties.value.substring(cursorPos);
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos + 1);
    }

    handleArrowRight() {
      let cursorPos = this.getCursorPosition();
      this.setCursorPosition(cursorPos + 1);
    }

    handleArrowLeft() {
      let cursorPos = this.getCursorPosition();
      this.setCursorPosition(cursorPos - 1);
    }

    handleArrowUp() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      const positionFromLeft = this.properties.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g);
      cursorPos -= positionFromLeft[0].length;
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos);
    }

    handleArrowDown() {
      let cursorPos = this.getCursorPosition();
      this.properties.value = document.querySelector('.keyboard_input').value;
      const positionFromLeft = this.properties.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/);
      cursorPos += positionFromLeft[0].length;
      document.querySelector('.keyboard_input').value = this.properties.value;
      this.setCursorPosition(cursorPos);
    }

    changeShiftKeyOn() {
      this.elements.keys.forEach((key, index) => {
        const myKey = key;
        if (index < this.shiftKeys.length) {
          myKey.textContent = this.shiftKeys[index]; 
        }
        if (myKey.childElementCount === 0) {
        myKey.textContent = myKey.textContent.toUpperCase();
        }
      });
    } 

    changeShiftKeyOff() {
      this.elements.keys.forEach((key, index) => {
        const myKey = key;
       if (index < this.shiftKeys.length) {
          myKey.textContent = this.keyLayout[index][0]; 
        }
        if (myKey.childElementCount === 0) {
        myKey.textContent = myKey.textContent.toLowerCase();
        }
      });
    }

    toggleShift() {
      this.properties.shiftOn = !this.properties.shiftOn;  
        if (this.properties.shiftOn) {
         this.changeShiftKeyOn();
        } 
        else {
        this.changeShiftKeyOff();
        }
    }

    toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
  
      this.elements.keys.forEach((key) => {
        const myKey = key;
        if (myKey.childElementCount === 0) {
          if (this.properties.capsLock) {
            myKey.textContent = myKey.textContent.toUpperCase();
          } 
          else {
            myKey.textContent = myKey.textContent.toLowerCase();
          }
        }
      });
    }

    getCursorPosition() {
      let textElement = document.querySelector('.keyboard_input');
      let caretPos;
      if (document.selection) {
        textElement.focus();
        let Sel = document.selection.createRange();
        Sel.moveStart ('character', -textElement.value.length);
        caretPos = Sel.text.length;
      } 
      else if (textElement.selectionStart || textElement.selectionStart == '0') {
        caretPos = textElement.selectionStart;
      }
      return caretPos;
    }

    setCursorPosition(caretPos) {
      let textElement = document.querySelector('.keyboard_input');
      if (textElement != null) {
        if (textElement.createTextRange) {
          let range = textElement.createTextRange();
          range.move('character', caretPos);
          range.select();
        }
        else if (textElement.selectionStart) {
          textElement.focus();
          textElement.setSelectionRange(caretPos, caretPos);
        }
        else {
              textElement.focus();
        }
      }
    }
  
    //Work with real keyboard
    initReal() {
      document.addEventListener('keydown', (event) => {
        const key = document.querySelector(`button[data-key='${event.code}']`);

        event.preventDefault();
        switch (event.code) {
          case 'Backspace':
            this.handleBackspace();
            break;
          
          case 'Delete':
            this.handleDelete();
            break;
  
          case 'Tab':
            this.handleTab();
            break;
  
          case 'CapsLock':
            this.toggleCapsLock();
            key.classList.toggle('capslock__activated', this.properties.capsLock);
            break;
  
          case 'Enter':
            this.handleEnter();
            break;
  
          case 'ShiftLeft':
          case 'ShiftRight':
            this.toggleShift();
            key.classList.toggle(this.properties.shiftOn);
            break;
  
          case 'ArrowRight':
            this.handleArrowRight();
            break;

          case 'ArrowLeft':
            this.handleArrowLeft();
            break;

          case 'ArrowUp':
            this.handleArrowUp();
            break;
          
          case 'ArrowDown':
            this.handleArrowDown();
            break;

          case 'ControlLeft':
          case 'ControlRight':
          case 'AltLeft':
          case 'AltRight':
          case 'MetaLeft':
            key.classList.add('keyboard_key__activated');
            break;
  
          case 'Space':
            this.handleSpace();
            break;
  
          default:
            this.keyLayout.forEach((item) => {
              if (item[2] === event.code) {
                // english
                if (!this.properties.isRrussian) {
                  if (!this.properties.capsLock && !this.properties.shiftOn) {
                    document.querySelector('.keyboard_input').value += item[0].toLowerCase();
                  }
                  if (this.properties.capsLock || this.properties.shiftOn) {
                    document.querySelector('.keyboard_input').value += item[0].toUpperCase();
                  }
                  // russian
                } else {
                  if (!this.properties.capsLock && !this.properties.shiftOn) {
                    document.querySelector('.keyboard_input').value += item[1].toLowerCase();
                  }
                  if (this.properties.capsLock || this.properties.shiftOn) {
                    document.querySelector('.keyboard_input').value += item[1].toUpperCase();
                  }
                }
              }
            });
        }
        key.classList.add('keyboard_key__activated');
        console.clear();
      });
  
      document.addEventListener('keyup', (event) => {
        const key = document.querySelector(`button[data-key='${event.code}']`);
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.toggleShift();
        }
        key.classList.remove('keyboard_key__activated');
      });
  
      function runOnKeys(func, ...codes) {
        const pressed = new Set();
  
        document.addEventListener('keydown', (event) => {
          pressed.add(event.code);
          for (let i = 0; i < codes.length; i += 1) {
            if (!pressed.has(codes[i])) {
              return;
            }
          }
  
          pressed.clear();
          func();
        });
  
        document.addEventListener('keyup', (event) => {
          pressed.delete(event.code);
        });
      }
  
      runOnKeys(
        () => {
          setTimeout(() => {
            this.properties.isRrussian = !this.properties.isRrussian;
            document.querySelector('.keyboard').remove();
            this.initVirtual();
          }, 100);
        },
        'ShiftLeft',
        'ControlLeft',
      );

      runOnKeys(
        () => {
          setTimeout(() => {
            this.properties.isRrussian = !this.properties.isRrussian;
            document.querySelector('.keyboard').remove();
            this.initVirtual();
          }, 100);
        },
        'ShiftRight',
        'ControlRight',
      );
    }
}
  
const keyboard = new Keyboard();
  
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lang') === 'false') {
    keyboard.properties.isRrussian = false;
  }
  if (localStorage.getItem('lang') === 'true') {
    keyboard.properties.isRrussian = true;
  }
  keyboard.InitNoteText();
  keyboard.initTextarea();
  keyboard.initVirtual();
  keyboard.initReal();
});