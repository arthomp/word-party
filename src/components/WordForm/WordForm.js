import {
  Button,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./WordForm.scss";

const WordForm = ({ category, setCategory, word, setWord, handleEventClick }) => {

  const [btnDisabled, setBtnDisabled] = useState(false);

  const generateRandomWord = require('random-words');

  const categories = [
    { value: "Definitions", label: "defi" },
    { value: "Synonyms", label: "syno" },
    { value: "Both", label: "both" },
  ];

  const randomEvent = () => {
    const randomWord = generateRandomWord();
    setWord(randomWord);
    handleEventClick(randomWord);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#FFF",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    word.length > 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [word]);

  return (
    <div className="form-container">
      <ThemeProvider theme={darkTheme}>
        <div className="input-container">
          <TextField
            className="search"
            label="Enter a Word"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <TextField
            className="ddselect"
            select
            label=" "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            helperText="What would you like to search?"
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="button-container">
          <Button 
            variant="contained" 
            className="search-button" 
            size="large" 
            disabled={btnDisabled}
            onClick={() =>  {handleEventClick(word) }}
          > Search </Button>
          <Button 
            variant="contained" 
            className="random-button" 
            size="large" 
            onClick={() => randomEvent() }
          > Random </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default WordForm;