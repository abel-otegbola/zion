import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as LoginAPI from '../../API/LoginAPI'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (LoginAPI.isAuthed()) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
