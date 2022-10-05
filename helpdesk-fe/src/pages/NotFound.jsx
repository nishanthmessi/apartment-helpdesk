import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='hero h-screen'>
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold mb-8">
            OOPS...
          </h1>
          <p className="text-2xl mb-8"><span className='text-secondary'>"404"</span> - Page not found.</p>
          <Link to='/' className='btn btn-button btn-secondary btn-md'>
            Got back to Home
          </Link>
        </div> 
      </div>
    </div>
    </>
  )
}

export default NotFound