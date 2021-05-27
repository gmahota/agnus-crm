import Link from 'next/link'
import CenteredForm from '../layouts/centered-form'
import ComingSoon from '../components/coming-soon'

const Index = () => {
  return (
    <CenteredForm
      title="We are working on something awesome"
      subtitle="Please return to our website in">
      <ComingSoon />
      <div className="flex flex-row w-full text-center">
        <Link href="/">
          <a className="btn btn-default btn-block bg-blue-500 hover:bg-blue-600 text-white btn-rounded">
            Go back
          </a>
        </Link>
      </div>
    </CenteredForm>
  )
}

export default Index
