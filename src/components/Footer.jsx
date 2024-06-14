import React from 'react'

function Footer() {
  return (
    <>
       <div className="row" style={{backgroundColor:'rgb(52, 52, 52)',color:'white'}}>
        <div className="col-lg-4 mt-3 col-sm-12">
            <p style={{marginLeft:'20px'}}>
                <h3>COMPANY NAME</h3>
                <h6 style={{textAlign:'justify',color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, totam doloribus? Perspiciatis voluptatibus minus porro voluptatem non repellat tenetur incidunt aspernatur, obcaecati ex deleniti, recusandae accusantium, delectus aliquid veniam unde!</h6>
            </p>
        </div>
        <div className="col-lg-2 mt-3 ms-4 col-sm-6" style={{textAlign:'justify'}}>
            <h3>LINKS</h3>
            <a style={{textDecoration:'none'}} href=""><h5 className='text-white'>HOME PAGE</h5></a>
            <a style={{textDecoration:'none'}} href="http://localhost:3000/login"><h5 className='text-white'>LOGIN PAGE</h5></a>
            <a style={{textDecoration:'none'}} href="http://localhost:3000/register"><h5 className='text-white'>REGISTER PAGE</h5></a>
            
        </div>
        <div className="col-lg-1 mt-3 ms-4 col-sm-6">
            <h4>GUIDES</h4>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>REACT BOOTTRAP</h6></a>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>BOOTSTRAP</h6></a>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>GOOGLE</h6></a>
        </div>
        <div className="col-lg-3 mt-3 ms-4 col-sm-6" > 
            <h3>CONTACT</h3>
            <a style={{textDecoration:'none'}} href=""><p className='text-white'><i class="fa-solid fa-location-dot"></i> Newyork</p></a>
            <a style={{textDecoration:'none'}} href=""><p className='text-white'><i class="fa-solid fa-envelope"></i> companyabc@gmail.com</p></a>
            <a style={{textDecoration:'none'}} href=""><p className='text-white'><i class="fa-solid fa-phone"></i> 9320291111</p></a>
        </div>
       </div>
    </>
  )
}

export default Footer