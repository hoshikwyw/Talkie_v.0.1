import { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { signInWithEmail, signInWithGoogle } from '@/services/authService'
import { useUserStore } from '@/stores/userStore'
import { Button, TextField } from '@/shared/ui'
import { collectErrors, validateEmail } from '@/shared/lib/validation'
import AuthCard, { AuthDivider } from '../components/AuthCard'
import GoogleButton from '../components/GoogleButton'
import PasswordField from '../components/PasswordField'
import { useAuthSubmit } from '../hooks/useAuthSubmit'

const LoginPage = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const { pending, submit } = useAuthSubmit()

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  if (currentUser) return <Navigate to="/" replace />

  const setField = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: null }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // The form used to submit empty strings straight to Firebase.
    const found = collectErrors({
      email: validateEmail(values.email),
      password: values.password ? null : 'Password is required',
    })
    setErrors(found)
    if (Object.keys(found).length > 0) return

    submit('email', () => signInWithEmail(values.email.trim(), values.password))
  }

  return (
    <AuthCard
      subtitle="Welcome back!"
      footer={
        <>
          New here?{' '}
          <NavLink to="/register" className="text-primary underline hover:brightness-110">
            Register
          </NavLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={values.email}
          error={errors.email}
          onChange={setField('email')}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          onChange={setField('password')}
        />

        <Button type="submit" size="lg" fullWidth className="mt-2" loading={pending === 'email'}>
          Login
        </Button>
      </form>

      <AuthDivider />

      <GoogleButton
        loading={pending === 'google'}
        onClick={() => submit('google', signInWithGoogle)}
      >
        Google Login
      </GoogleButton>
    </AuthCard>
  )
}

export default LoginPage
