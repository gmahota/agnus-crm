import Link from 'next/link'
import CenteredForm from '../layouts/centered-form'
import CreateAccount from '../components/sample-forms/create-account'
import {FiTwitter, FiFacebook, FiGithub} from 'react-icons/fi'

const Index = () => {
  return (
    <CenteredForm
      title="Create account"
      subtitle="Please enter your name, email address and password to create an account">
      <CreateAccount message="Thanks for your message. We'll get back to you as soon as possible" />

      <div className="w-full flex flex-col w-full text-center mt-3 mb-6">
        <p className="mb-2">Or sign up with</p>
        <div className="flex w-full flex-row justify-center items-center space-x-2">
          <FiFacebook className="stroke-current text-xl text-facebook" />
          <FiTwitter className="stroke-current text-xl text-twitter" />
          <FiGithub className="stroke-current text-xl text-github" />
        </div>
      </div>

      <div className="flex flex-row w-full">
        <span className="mr-1">Already have an account?</span>
        <span>
          <Link href="/login">
            <a className="link">Login here</a>
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
