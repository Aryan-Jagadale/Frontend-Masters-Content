import React, { useState, useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE'; //In reducer function you won't get error,
//if ypu got messed up, try to write it in const , like one in above

const reducer = (state, action) => {
  console.log(action);
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    })
  }

  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(({ person, reason }) => {
    /*grudge.id = id();
    grudge.forgiven = false;*/
    //setGrudges([grudge, ...grudges]);
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id()
      }
    });
  },[dispatch]);

  const toggleForgiveness = useCallback((id) => {
    /*setGrudges(
      grudges.map(grudge => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );*/

    dispatch({
      type: GRUDGE_FORGIVE,
      payload: {
        id
      }
    })
  },[dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
