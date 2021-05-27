import Link from 'next/link'
import CenteredForm from '../layouts/centered-form'
import LockScreen from '../components/sample-forms/login'

const Index = () => {
  return (
    <CenteredForm
      title="Lock screen"
      subtitle="Please enter your username and password to login">
      <div className="flex flex-col w-full items-center justify-center mb-4">
        <img
          src="/images/faces/m1.png"
          alt="media"
          className="rounded-full h-20 w-20 ring my-2"
        />
      </div>

      <LockScreen />

      <div className="flex flex-row w-full mt-4">
        <span className="text-secondary mr-1">New user?</span>
        <span>
          <Link href="/create-account">
            <a className="link">Create account here</a>
          </Link>
        </span>
      </div>
      <div className="w-full">
        <span>
          <Link href="/forgot-password">
            <a className="link">Forgot password?</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  )
}

export default Index
