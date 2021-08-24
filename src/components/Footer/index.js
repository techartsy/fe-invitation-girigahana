import React from 'react'
import './index.scss';
import Logo from '../../static/images/logo.png';
import Hand from '../../static/images/hand.png';
import Temp from '../../static/images/temp.png';
import Distancing from '../../static/images/distancing.png';
import Mask from '../../static/images/mask.png';
import fb from '../../static/images/fb.png';
import instagram from '../../static/images/instagram.png';
import youtube from '../../static/images/youtube.png';
import spotify from '../../static/images/spotify.png';
import useWindowDimensions from '../../utils/useWindowDimensions';

export const Footer = () => {
  const { width } = useWindowDimensions();

  return (
    <div className='footer-container'>
      {width !== 'sm' && (
        <>
          <div className='title'>
            <p>Protokol Kesehatan (Covid-19)</p>
          </div>
          <div className='icon-container'>
            <div className='icon-wrapper'>
              <img src={Mask} alt='mask' />
              <p>Tamu undangan wajib mengenakan masker</p>
            </div>
            <div className='icon-wrapper'>
              <img src={Hand} alt='washing-hand' />
              <p>Cuci tangan menggunakan sabun atau hand sanitizer</p>
            </div>
            <div className='icon-wrapper'>
              <img src={Temp} alt='termo-gun' />
              <p>Suhu tubuh normal dibawah 37,5 c</p>
            </div>
            <div className='icon-wrapper'>
              <img src={Distancing} alt='social-distancing' />
              <p>Menjaga jarak antar sesama minimal 1 meter</p>
            </div>
          </div>
          <div className='notes'>
            <p>Demi mendukung kesehatan bersama alangkah baiknya bagi para anggota wajib mematuhi protokol kesehatan untuk mencegah penularan covid 19</p>
          </div>
        </>
      )}
      <div className='medsos-container'>
        <a href="https://www.instagram.com/girigahana/?hl=en">
          <img src={instagram} alt='instagram' className='medsos-item' />
        </a>
        <a href="https://www.youtube.com/channel/UCbp7T_IUk3m7jMeBvqJJ2OQ">
          <img src={youtube} alt='youtube' className='medsos-item' />
        </a>
        <a href='https://web.facebook.com/groups/337329213064176'>
          <img src={fb} alt='facebook' className='medsos-item' />
        </a>
        <a href="https://open.spotify.com/show/7852h7b30teT3mgLVZxr3B">
          <img src={spotify} alt='spotify' className='medsos-item' />
        </a>
      </div>
      <div className='copyright'>
        <div className='copyright-wrapper'>
          <p>Created By</p>
          <span>
            <img src={Logo} alt='Techartsy-logo' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer;
