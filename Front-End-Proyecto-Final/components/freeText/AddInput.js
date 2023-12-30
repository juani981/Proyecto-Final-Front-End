import React, { useState } from 'react'

export const AddInput = ({initialValue}) => {
    const [inputvalue, setinputvalue] = useState({initialValue})
    const [listado, setlistado] = useState([])
  
    const onInputFill = (event) => {
      console.log("Escribiendo")
      setinputvalue(event.target.value)
    }
    const onAddInput = (event) => {
      event.preventDefault()
      console.log("Submiteado")
      console.log(inputvalue)
  
      setlistado([...listado, inputvalue])
      setinputvalue('')
      console.log(listado)
    }
  return (
    listado,
    inputvalue
  )
}
 