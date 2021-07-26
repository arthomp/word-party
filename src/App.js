import { Container } from '@material-ui/core';
import { useState } from 'react';
import './App.scss';
import DataLoader from './components/DataLoader/DataLoader';
import Header from './components/Header/Header';
import WordForm from './components/WordForm/WordForm';

function App() {

  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [category, setCategory] = useState("defi");
  const [dictionaryUrl, setDictionaryUrl] = useState("");
  const [thesaurusUrl, setThesaurusUrl] = useState("");
  const [eventClicked, setEventClicked] = useState(false);

  // replace ??? with API key for dictionaryapi.com
  const dictionaryApiKey = "???";
  const thesaurusApiKey =  "???";
  
  const handleEventClick = (keyword) => {
    if(keyword !== "") {
      setEventClicked(true);
      switch(category) {
        case 'defi':
          setDictionaryUrl(`https://dictionaryapi.com/api/v3/references/collegiate/json/${keyword}?key=${dictionaryApiKey}`);
          break;
        case 'syno':
          setThesaurusUrl(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${keyword}?key=${thesaurusApiKey}`);
          break;
        case 'both':
          setDictionaryUrl(`https://dictionaryapi.com/api/v3/references/collegiate/json/${keyword}?key=${dictionaryApiKey}`);
          setThesaurusUrl(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${keyword}?key=${thesaurusApiKey}`);
          break;
        default:
          console.log("Error: unrecognized category - expected (defi/syno/both) actual: " + category);
      }
    }
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Header word={word}/>
        <WordForm 
          setDefinitions={setDefinitions}
          setSynonyms={setSynonyms}
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          handleEventClick={handleEventClick}
          eventClicked={eventClicked}
          setEventClicked={setEventClicked}
        />
        <DataLoader 
          word={word}
          setWord={setWord}
          category={category}
          definitions={definitions}
          setDefinitions={setDefinitions}
          synonyms={synonyms}
          setSynonyms={setSynonyms}
          dictionaryUrl={dictionaryUrl}
          thesaurusUrl={thesaurusUrl}
          eventClicked={eventClicked}
          setEventClicked={setEventClicked}
          handleEventClick={handleEventClick}
        />
      </Container>
    </div>
  );
}

export default App;