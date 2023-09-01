import React from 'react'
import EmailForm from './EmailForm'

const EmailVerification = () => {
  return (
    <>
      <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='login shadow'>
                <h2 className='mb-3'>Sign Up</h2>
                <EmailForm/>
            </div>
        </div>
    </>
  )
}

export default EmailVerification