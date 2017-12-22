import React from 'react'
import Link from 'gatsby-link'
import chopper from '../images/chopper-down.gif';

const NotFoundPage = () => (
  <div>
    We can't find the page that you're looking for. You might have some luck starting <Link to="/">back on the homepage</Link>.
    <img src={chopper} alt="Upsidedown helicopter on a hill"/>
  </div>
)

export default NotFoundPage
