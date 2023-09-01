import React from 'react'
import {processCards} from "../dummyData"
import '../App.css'
import './Home.css'
import MainScreen1 from '../components/MainScreen1'

const Home = () => {
  return (
    <>
            <div className="mainscreenpart1">
                  <div className="textpart1"> 
                    <div className="textpart11">
                        Searching for
                    </div>
                    <div className="textpart11">
                        Warehouse Space ?
                    </div>
                    <div className="textpart13">
                        Scroll Down to Find A Way
                    </div>
                  </div>
                  <div className="imagpart1">
                     <div><img src="./hero.avif" className="warehouseimg" alt='hero'/></div>
                  </div>
            </div>
          


        <section className='aboutHome'>
        <div className='container mb-5'>
          <div className='row github-used-row'>
          <div className='col-lg-6 d-none d-lg-block mb-5'>
          <img className='factory' src="./about.png" alt="About" />
          </div>
          
          <div className='col-lg-6 mt-5'>
            
            <h1>Find Your Perfect Ware House in 3 Easy Steps</h1>
            
            <div className='items'>
              {processCards.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          </div>
        </div>
      </section>

      <MainScreen1/>
    </>
  )
}

export default Home