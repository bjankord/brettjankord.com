import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" />
        <div className="site-container">
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist...</p>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
