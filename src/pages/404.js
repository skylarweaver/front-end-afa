import React from 'react'
import Layout from '../components/Layout'
import ContentLayout from '../components/ContentLayout'

const NotFoundPage = () => (
  <Layout>
    <ContentLayout>
    {/* <Navbar sticky/> */}
      <div>
        <h1>NOT FOUND</h1>
        <p>You just went to a url that doesn&#39;t exist... the sadness.</p>
        <p>Feel free to go back to our <a href="/">homepage</a> :)</p>
      </div>
    </ContentLayout>
  </Layout>
)

export default NotFoundPage
