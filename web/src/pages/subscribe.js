import CenteredForm from '../layouts/centered-form'
import Subscribe from '../components/sample-forms/subscribe'

const Index = () => {
  return (
    <CenteredForm
      title="Subscribe"
      subtitle="Please enter your email address to subscribe to our newsletter to receive weekly updates">
      <Subscribe message="Thanks for your subscribing to our newsletter" />
    </CenteredForm>
  )
}

export default Index
