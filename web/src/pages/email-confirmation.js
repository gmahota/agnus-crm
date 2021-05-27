import Link from 'next/link'

const EmailConfirmation = () => {
  return (
    <div className="flex flex-col w-full max-w-xl text-center">
      <img
        className="object-contain w-auto h-64 mb-16"
        src="/images/illustration.svg"
        alt="svg"
      />
      <div className="mb-8 text-center text-gray-900">
        A email has been send to your@email.com. Please check for an email from
        dashboard and click on the included link to reset your password.
      </div>
      <div className="flex w-full">
        <Link href="/">
          <a className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
            Go back
          </a>
        </Link>
      </div>
    </div>
  )
}

export default EmailConfirmation
