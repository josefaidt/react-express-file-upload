import React from 'react'

const FormStateContext = React.createContext()
const FormDispatchContext = React.createContext()

const FormReducer = (state, action) => {
  console.log('NEW STATE', action.payload)
  switch (action.type) {
    case 'upload':
      return { ...state, ...action.payload }
    default:
      throw new Error('No action taken')
  }
}

const FormContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(FormReducer, null)
  return (
    <FormStateContext.Provider value={state}><FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider></FormStateContext.Provider>
  )
}

export const useFormState = () => {
  const context = React.useContext(FormStateContext)
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormContextProvider')
  }
  return context
}

export const useFormDispatch = () => {
  const context = React.useContext(FormDispatchContext)
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormContextProvider')
  }
  return context
}

export default FormContextProvider