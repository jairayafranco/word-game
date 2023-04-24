import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [concatWord, setConcatWord] = useState('');
  const words = ["playa", "manos", "cebra", "salud", "nubes", "llave"];

  useEffect(() => {
    if (words.includes(concatWord)) {
      alert('You win');
      document.querySelectorAll('input').forEach(input => input.setAttribute('disabled', true));
    }
  }, [concatWord]);

  const handleInput = (e, letter) => {
    const target = e.target;
    const nextInput = target.nextElementSibling;
    const isLetter = /^[a-zA-Z]$/.test(target.value);
    const targetWord = letter;

    if (!isLetter) {
      target.value = '';
      return;
    }

    if (target.value.length === 1) {
      setConcatWord(concatWord + target.value);
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (targetWord === target.value) {
      target.classList.add('right-word');
    } else {
      target.classList.remove('right-word');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      const target = e.target;
      const prevInput = target.previousElementSibling;
      if (prevInput && target.value === '') {
        prevInput.focus();
        target.classList.remove('right-word');
      }
    }
  }

  return (
    <main>
      <h1>Word Game</h1>
      <div className="inputs-container">
        {
          words.map(word => (
            word.split('').map((letter, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                onInput={(e) => handleInput(e, letter)}
                onKeyDown={handleKeyDown}
              />
            ))
          ))
        }
      </div>
    </main>
  );
}

export default App;
