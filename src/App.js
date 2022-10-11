import { useState } from 'react';


function App() {
  let [word, setWord] = useState(null);
  let [meanings, setMeaning] = useState([]);


  let displayMeaning = async (e) => {
    let data = new FormData(e.target);
    let searchWord = data.get('search');
    let loadingEl = document.querySelector('.text')
    loadingEl.innerText = "Loading..."

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then(response => response.json())
      .then(data => {
        setMeaning(data[0].meanings);
        setWord(data[0].word);
      })
      .catch((err) => console.log(err))
    document.querySelector('form').reset();
  }

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        displayMeaning(e)
      }}>
        <div className='section'>
          <input type="text" placeholder="Search for word" name="search" />
          <button type="submit"><img className='search-icon' src='/images/icons8-search.gif' /></button>
        </div>
      </form>
      {word !== null ?
        <div className='words'>
          <h3>Meanings of {word}:</h3>
          <hr></hr>
          {meanings.map((el, index) => {
            return <div key={index} className='word'>
              <p className='speech'>{el.partOfSpeech}</p>
              <p>{el.definitions[0].definition}</p>
            </div>
          })}
        </div> :
        <p className='text'></p>
      }
    </div>
  );
}

export default App;
