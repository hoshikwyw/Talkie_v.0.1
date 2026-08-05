import { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { IconButton, TextField } from '@/shared/ui'

/** Password input with a reveal toggle — typos in a masked field are costly. */
const PasswordField = (props) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <TextField
      {...props}
      type={revealed ? 'text' : 'password'}
      trailing={
        <IconButton
          label={revealed ? 'Hide password' : 'Show password'}
          aria-pressed={revealed}
          onClick={() => setRevealed((value) => !value)}
        >
          {revealed ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
        </IconButton>
      }
    />
  )
}

export default PasswordField
