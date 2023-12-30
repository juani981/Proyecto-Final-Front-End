import React, { useState } from 'react';

export const FreeTextInput = ({ listado, setlistado }) => {
 const [inputvalue, setinputvalue] = useState('');

 const onInputFill = (event) => {
    setinputvalue(event.target.value);
 };

 const onAddInput = (event) => {
    event.preventDefault();
    setlistado([...listado, inputvalue]);
    setinputvalue('');
 };

 return (
    <form className="row row-cols-1 form-floating" onSubmit={onAddInput}>
      <div className="">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Name"
          value={inputvalue}
          onChange={onInputFill}
        />
        <label htmlFor="floatingInput">Free Text</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
 );
};
