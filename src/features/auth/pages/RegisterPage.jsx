import { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { registerWithEmail, signInWithGoogle } from '@/services/authService'
import { useUserStore } from '@/stores/userStore'
import { Button, TextField } from '@/shared/ui'
import {
  PASSWORD_MIN,
  collectErrors,
  validateConfirmation,
  validateEmail,
  validatePassword,
  validateUsername,
} from '@/shared/lib/validation'
import AuthCard, { AuthDivider } from '../components/AuthCard'
import GoogleButton from '../components/GoogleButton'
import PasswordField from '../components/PasswordField'
import { useAuthSubmit } from '../hooks/useAuthSubmit'

const EMPTY_FORM = { username: '', email: '', password: '', confirmPassword: '' }

const RegisterPage = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const { pending, submit } = useAuthSubmit()

  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  if (currentUser) return <Navigate to="/" replace />

  const setField = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: null }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const found = collectErrors({
      username: validateUsername(values.username),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmation(values.password, values.confirmPassword),
    })
    setErrors(found)
    if (Object.keys(found).length > 0) return

    submit(
      'email',
      () =>
        registerWithEmail({
          username: values.username.trim(),
          email: values.email.trim(),
          password: values.password,
        }),
      { successMessage: 'Welcome to Talkie!' }
    )
  }

  return (
    <AuthCard
      subtitle="Create your account!"
      footer={
        <>
          Already have an account?{' '}
          <NavLink to="/login" className="text-primary underline hover:brightness-110">
            Login here
          </NavLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="Username"
          name="username"
          autoComplete="nickname"
          placeholder="CoolPlayer99"
          value={values.username}
          error={errors.username}
          onChange={setField('username')}
        />

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
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          hint={`At least ${PASSWORD_MIN} characters`}
          onChange={setField('password')}
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={setField('confirmPassword')}
        />

        <Button type="submit" size="lg" fullWidth className="mt-2" loading={pending === 'email'}>
          Register
        </Button>
      </form>

      <AuthDivider />

      <GoogleButton
        loading={pending === 'google'}
        onClick={() =>
          submit('google', signInWithGoogle, { successMessage: 'Welcome to Talkie!' })
        }
      >
        Google Register
      </GoogleButton>
    </AuthCard>
  )
}

export default RegisterPage
