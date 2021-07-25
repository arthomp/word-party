import { Container } from '@material-ui/core';
import { useState } from 'react';
import './App.scss';
import DataLoader from './components/DataLoader/DataLoader';
import Header from './components/Header/Header';
import WordForm from './components/WordForm/WordForm';

function App() {

  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [category, setCategory] = useState("defi");
  const [dictUrl, setDictUrl] = useState("");
  const [eventClicked, setEventClicked] = useState(false);

  const handleEventClick = (keyword) => {
    if(keyword !== "") {
      setEventClicked(true);
      // replace ??? with your API key if you are trying to run this locally
      const dictionaryApi = `https://dictionaryapi.com/api/v3/references/collegiate/json/${keyword}?key=???`;
      setDictUrl(dictionaryApi);
    }
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Header word={word}/>
        <WordForm 
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
          definitions={definitions}
          setDefinitions={setDefinitions}
          dictUrl={dictUrl}
          eventClicked={eventClicked}
          setEventClicked={setEventClicked}
          handleEventClick={handleEventClick}
        />
      </Container>
    </div>
  );
}

export default App;