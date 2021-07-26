import axios from "axios";
import { useEffect } from "react";
import "./DataLoader.scss";

const DataLoader = ({word, setWord, category, definitions, setDefinitions, synonyms, setSynonyms, dictionaryUrl, thesaurusUrl, eventClicked, setEventClicked, handleEventClick}) => {

    function handleWordClick(event) {
        setWord(event.target.innerText);
        handleEventClick(event.target.innerText);
    }

    function checkTypes(arr) {
        if(Array.isArray(arr)) {
            return arr.every(i => (typeof i === "string"));
        }
    }

    useEffect(() => {

        const dictApiCall = async () => {
            try {
              const data = await axios.get(dictionaryUrl);
              setDefinitions(data.data);
              console.log(data.data);
            } catch(err) {
              console.log(err);
            } 
        }

        const thesaurusApiCall = async () => {
            try {
                const data = await axios.get(thesaurusUrl);
                setSynonyms(data.data);
            } catch (err) {
                console.log(err);
            }
        }

        if(eventClicked){
            setEventClicked(false);
            if(category === "defi") {
                dictApiCall();
                setSynonyms([]);
            } else if (category === "syno") {
                thesaurusApiCall();
                setDefinitions([]);
            } else {
                dictApiCall();
                thesaurusApiCall();
            }
        }
    }, [dictionaryUrl, thesaurusUrl, eventClicked, setEventClicked, setDefinitions, setSynonyms, category]);

    return (
        <div className="data-wrapper">

            { definitions && !!definitions.length && !checkTypes(definitions) && word && (
                <div className="data-container">
                    { definitions[0].fl && (
                        <span className="data-pos">({definitions[0].fl})</span>
                    )}
                    { definitions[0].hwi.prs && (
                        <span className="data-pronunciation">{definitions[0].hwi.prs[0].mw}</span>
                    )}
                    { definitions[0].shortdef && (
                        <span className="data-definition">{definitions[0].shortdef[0]}</span>
                    )}
                </div>
            )}

            { synonyms && !!synonyms.length && !checkTypes(synonyms) && word && (
                <div className="data-container">
                    <span className="data-synonym-text">Synonyms.</span>
                    { synonyms[0].meta.syns && (
                        synonyms[0].meta.syns.map((subArr) => (
                            subArr.map((element, index) => (
                                <span className="data-synonym" key={index} onClick={handleWordClick}>{element}</span>
                            ))
                        ))
                    )}
                </div>
            )}
            
            { definitions && !!definitions.length && checkTypes(definitions) && word && (
                <div className="data-container">
                    <span className='data-helper-text'>Did you mean...</span>
                    { definitions.map((element, index) => (
                        <span className="data-suggestion" key={index} onClick={handleWordClick} >{element}</span>
                    ))}  
                </div>
            )}
            
            { synonyms && !!synonyms.length && checkTypes(synonyms) && !checkTypes(definitions) && word && (
                <div className="data-container">
                    <span className='data-helper-text'>Did you mean...</span>
                    { synonyms.map((element, index) => (
                        <span className="data-suggestion" key={index} onClick={handleWordClick} >{element}</span>
                    ))}  
                </div>
            )}
            
        </div>
    );
};

export default DataLoader;