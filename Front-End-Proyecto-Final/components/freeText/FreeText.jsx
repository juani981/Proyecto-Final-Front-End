import React, { useState, useEffect } from 'react';
import {FreeTextInput} from './FreeTextInput';

export const FreeText = () => {
 const [listado, setlistado] = useState([]);

 useEffect(() => {
    console.log(listado);
 }, [listado]);

 return (
    <>
    <div className="row row-cols-1 form-floating">
        <div className="">
          {listado.map((value, index) => (
            <textarea key={index} value={value} className="row"/>
          ))}
        </div>
        </div>
      <FreeTextInput listado={listado} setlistado={setlistado} />
    </>
 );
};
