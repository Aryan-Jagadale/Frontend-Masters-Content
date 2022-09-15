import React, { useState, useEffect,useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

//import dummyData from './dummy-data';
import endpoint from './endpoint';

import './styles.scss';


const initailSatae = {
  result: null,
  loading: true,
  error: null
}

const fetchReducer = (state, action) => {

  if (action.type === 'LOADING') {
    return {
      ...state,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      ...state,
      result: action.payload.response,
      loading: false
    };
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      error: action.payload.error,
      loading: false
    };
  }


  return state;

}


const useFetch = url => {
  /*const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);*/

  const [state, dispatch] = useReducer(fetchReducer, initailSatae);

  useEffect(() => {
    dispatch({ type: 'LOADING' });

    //console.log('Fetching');

    /*setLoading(true);
    setError(null);
    setResponse(null);*/

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        //setResponse(data);
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });

      } catch (error) {
        //setError(error);
        dispatch({ type: 'ERROR', payload: { error } });
      } 
      /*finally {
        setLoading(false);
      }*/

    }

    fetchUrl();

    /*fetch(url)
      .then(response => response.json())
      .then(response => {
        setResponse(response);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });*/
  }, [url]);

  return [state.result, state.loading, state.error];
};


const Application = () => {
  const [response,loading,error ] = useFetch(endpoint+'/characters');
  console.log(response);
  const characters = (response && response.characters) || []

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
        {
          loading ? <p>Loading...</p> :
          <CharacterList characters={characters} />
        }
        {
          error && <p>{error.message}</p>
        }
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
