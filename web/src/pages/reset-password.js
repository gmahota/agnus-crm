import Link from 'next/link'
import CenteredForm from '../layouts/centered-form'
import ResetPassword from '../components/sample-forms/reset-password'

const Index = () => {
  return (
    <CenteredForm
      title="Reset password"
      subtitle="Please enter your new password to reset your account">
      <ResetPassword message="Thanks for your message. We'll get back to you as soon as possible" />

      <div className="flex flex-row w-full mt-3">
        <span className="mr-1">New user?</span>
        <span>
          <Link href="/create-account">
            <a className="link">Sign up here</a>
          </Link>
        </span>
      </div>
      <div className="flex flex-row w-full">
        <span className="mr-1">Already have an account?</span>
        <span>
          <Link href="/login">
            <a className="link">Login here</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  )
}

export default Index
