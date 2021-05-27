import Link from 'next/link'
import CenteredForm from '../layouts/centered-form'
import ForgotPassword from '../components/sample-forms/forgot-password'

const Index = () => {
  return (
    <CenteredForm
      title="Forgot password"
      subtitle="Please enter your email address to recover your password">
      <ForgotPassword message="Thanks for your message. We'll get back to you as soon as possible" />
      <div className="w-full mt-2">
        <span>
          <Link href="/login">
            <a className="link">Go back to login</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  )
}

export default Index
