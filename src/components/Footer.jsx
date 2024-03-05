import React from 'react'

function Footer() {
  return (
    <>
       <div className="row " style={{backgroundColor:'rgb(52, 52, 52)',color:'white'}}>
        <div className="col-4 mt-3">
            <p style={{marginLeft:'20px'}}>
                <h3>COMPANY NAME</h3>
                <h6 style={{textAlign:'justify',color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, totam doloribus? Perspiciatis voluptatibus minus porro voluptatem non repellat tenetur incidunt aspernatur, obcaecati ex deleniti, recusandae accusantium, delectus aliquid veniam unde!</h6>
            </p>
        </div>
        <div className="col-1"></div>
        <div className="col-2 mt-3" style={{textAlign:'justify'}}>
            <h3>LINKS</h3>
            <h5 className='text-white'>HOME PAGE</h5>
            <h5 className='text-white'>LOGIN PAGE</h5>
            <h5 className='text-white'>REGISTER PAGE</h5>
            
        </div>
        <div className="col-1 mt-3">
            <h4>GUIDES</h4>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>REACT BOOTTRAP</h6></a>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>BOOTSTRAP</h6></a>
            <a style={{textDecoration:'none'}} href=""><h6 className='text-white'>GOOGLE</h6></a>
        </div>
        <div className="col-1"></div>
        <div className="col-3 mt-3" > 
            <h3>CONTACT</h3>
            <p><i class="fa-solid fa-location-dot"></i> Newyork</p>
            <p><i class="fa-solid fa-envelope"></i> companyabc@gmail.com</p>
            <p><i class="fa-solid fa-phone"></i> 9320291111</p>
        </div>
       </div>
    </>
  )
}

export default Footer