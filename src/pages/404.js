import React from 'react'
import Layout from '../components/Layout'
import ContentLayout from '../components/ContentLayout'
import Navbar from '../components/Navbar'

const NotFoundPage = () => (
  <Layout>
    <ContentLayout>
    <Navbar dark/>
      <div>
        <h1>NOT FOUND</h1>
        <p>You just went to a url that doesn&#39;t exist... the sadness.</p>
      </div>
    </ContentLayout>
  </Layout>
)

export default NotFoundPage
