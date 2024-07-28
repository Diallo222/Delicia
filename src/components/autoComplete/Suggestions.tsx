import React from 'react'

interface SuggestionsProps {
    children?: React.ReactNode;
  }
 const Suggestions: React.FC<SuggestionsProps> = ({ children, ...props }) => {
  return (
    <ul {...props} className=' bg-zinc-700' >
      {children}
    </ul>
  )
}

export default Suggestions