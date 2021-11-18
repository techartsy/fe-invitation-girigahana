import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import board from '../../static/images/board.png';
import image1 from '../../static/images/1.png';
import image2 from '../../static/images/2.png';
import image3 from '../../static/images/3.png';
import image4 from '../../static/images/4.png';
import image5 from '../../static/images/5.png';
import image6 from '../../static/images/6.png';
import image7 from '../../static/images/7.png';
import image8 from '../../static/images/8.png';
import image9 from '../../static/images/9.png';
import image10 from '../../static/images/10.png';
import image11 from '../../static/images/11.png';
import image12 from '../../static/images/12.png';
import negative from '../../static/images/negative.png';
import clock from '../../static/images/clock.png';
import calendar from '../../static/images/calendar.png';
import Footer from '../../components/Footer';
import boardSm from '../../static/images/board-sm.png';
import avatar from '../../static/images/avatar.png';
import useWindowDimensions from '../../utils/useWindowDimensions';
import FormDialog from '../../components/PopupForm';
import pamflet from '../../static/images/pamflet.png';
import { fetchParticipants } from '../../store/action/invitationAction';
import { useDispatch, useSelector } from 'react-redux';
import boardMsgSm from '../../static/images/board-msg-sm.png';
import Slider from "react-slick";
import SliderComponet from '../../components/Slider';
import PopupProkes from '../../components/PopupProkes';

const Invitation = () => {
  const { width } = useWindowDimensions();
  const [showPopup, setShowPopup] = useState(false);
  const [showFadeIn, setShowFadeIn] = useState(false);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState([]);
  const images1 = [image1, image2, image3];
  const images2 = [image4, image5, image6];
  const images3 = [image7, image8, image9];
  const images4 = [image10, image11, image12];
  const [totalParticipants, setTotalParticipant] = useState(0);
  const dispatch = useDispatch();
  const delay = 3000;
  const timeoutRef = useRef(null);

  const participants = useSelector(state => state.invitationReducer.participants);
  const sortedParticipants = participants && [...participants].reverse();

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const nextYear = year + 1;
    const difference = +new Date(`09/11/${nextYear}`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)) ? Math.floor(difference / (1000 * 60 * 60 * 24)) : '00',
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24) ? Math.floor((difference / (1000 * 60 * 60)) % 24) : '00',
        Menit: Math.floor((difference / 1000 / 60) % 60) !== 0 ? Math.floor((difference / 1000 / 60) % 60) : '00',
        Detik:  Math.floor((difference / 1000) % 60) !== 0 ? Math.floor((difference / 1000) % 60) : '00'
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className='countdown-item'>
        <div className='countdown-time'>
          <strong>
            {timeLeft[interval]}
          </strong>
        </div>
        <div className='countdown-interval'>
          <strong>
            {interval}{" "}
          </strong>
        </div>
      </div>
    );
  });

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images1.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index])

  useEffect(() => {
    dispatch(fetchParticipants());
    filterAttendParticipants();
    if ( width === 'sm' ) {
      setShowPopup(true);
    }
  }, [])

  useEffect(() => {
    calculateTotalParticipants();
  }, [participants])

  const filterAttendParticipants = () => {
    const attendingEvent = participants.filter((person) => {
      return person.attend.toLowerCase() === 'ya';
    })
    setAttending(attendingEvent);
  }

  const calculateTotalParticipants = () => {
    let total = 0;
    participants && participants.map((person) => {
      total += person.pax;
    })
    setTotalParticipant(total);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowFadeIn(true);
  }

  const generateSlideShow = (images) => {
    return (
      <div className='slideshow'>
        <div className='slideshowSlider' style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
          {images.map((item, idx) => {
            return <img src={item} alt='pict' className='slide-item' key={idx} />
          })}
        </div>
      </div>
    )
  };

  const generateDesktopSlideShow = () => {
    return (
      <div className="mid-content">
        <div className='top'>
          <ScrollAnimation animateIn='animate__fadeIn'>
            {generateSlideShow(images1)}
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeIn'>
            <p>IKRAR</p>
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeIn'>
            {generateSlideShow(images2)}
          </ScrollAnimation>
        </div>
        <div className='mid'>
          <div className='text-left'>
            <ScrollAnimation animateIn='animate__fadeInLeft'>
              <p>Merangkul Kembali</p>
            </ScrollAnimation>
          </div>
          <div className='text-right'>
            <ScrollAnimation animateIn='animate__fadeInRight'>
              <p>Dalam Kehangatan</p>
            </ScrollAnimation>
          </div>
        </div>
        <div className='bottom'>
          <ScrollAnimation animateIn='animate__fadeIn'>
            {generateSlideShow(images3)}
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeIn'>
            {generateSlideShow(images4)}
          </ScrollAnimation>
        </div>
      </div>
    )
  };

  const generateMobileSlideShow = () => {
    return (
      <div className="mid-content-sm">
        <div className='top'>
          <p>IKRAR</p>
        </div>
        <ScrollAnimation animateIn="animate__fadeIn">
          <SliderComponet images={images1} showFadeIn={showFadeIn} />
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeIn">
          <SliderComponet images={images2} showFadeIn={showFadeIn} />
        </ScrollAnimation>
        <div className='mid'>
          <div className='text-left'>
            <ScrollAnimation animateIn='animate__fadeInRight'>
              <p>Merangkul Kembali</p>
            </ScrollAnimation>
          </div>
          <div className='text-right'>
            <ScrollAnimation animateIn='animate__fadeInLeft'>
              <p>Dalam Kehangatan</p>
            </ScrollAnimation>
          </div>
        </div>
        <ScrollAnimation animateIn="animate__fadeIn">
          <SliderComponet images={images3} showFadeIn={showFadeIn} />
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeIn">
          <SliderComponet images={images4} showFadeIn={showFadeIn} />
        </ScrollAnimation>
      </div>
    )
  };

  return (
    <ScrollAnimation animateIn='animate__fadeIn'>
    <div className="invitation-container">
      <div className="invitation-header">
        <div className="invitation-board">
          <img src={board} alt="board" />
        </div>
        <div className="countdown">
          <ScrollAnimation animateIn="animate__fadeInDown">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
          </ScrollAnimation>
        </div>
      </div>
      <div className="separator">
        <p>07 SEPTEMBER 1981 - 07 SEPTEMBER 2021</p>
      </div>
      {width !== 'sm' ? generateDesktopSlideShow() : generateMobileSlideShow()}
      <div className="negative">
        <img src={negative} alt="negative" />
      </div>
      <div className="tagline-wrapper">
        <ScrollAnimation animateIn="animate__zoomIn">
          <div className='verse-1'>
            <p>Nyali yang tegar siap di berbagai medan..</p>
          </div>
          <div className='verse-2'>
            <p>Alam yang segar, alam yang tenang..</p>
          </div>
          <div className='verse-3'>
            <p>Tempat berkumpul kita..</p>
          </div>
        </ScrollAnimation>
      </div>
      <div className='pamflet-section'>
        <ScrollAnimation animateIn='animate__zoomIn'>
          <img src={pamflet} alt='pamflet-diesnatalis'/>
        </ScrollAnimation>
      </div>
      <div className='invitation-content'>
        <ScrollAnimation animateIn="animate__fadeIn">
          <div className='content-title'>
            <p>Malam Hangat</p>
          </div>
        </ScrollAnimation>
        <div className='invitation-time'>
          <ScrollAnimation animateIn="animate__fadeIn">
            <div className='date'>
              <ScrollAnimation animateIn='animate__bounceIn'>
                <img src={calendar} alt='calendar' />
              </ScrollAnimation>
              <p>Sabtu, 11 September 2021</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="animate__fadeIn">
            <div className='time'>
              <ScrollAnimation animateIn='animate__bounceIn'>
                <img src={clock} alt='clock' />
              </ScrollAnimation>
              <p>pukul 17:00 WIB - selesai</p>
            </div>
          </ScrollAnimation>
        </div>
        <div className="location">
          <ScrollAnimation animateIn="animate__fadeIn">
            <p>Lokasi</p>
            <div className='address'>
              <p>Pulau Situ Gintung Cireundeu, Kec. Ciputat Tim., Kota Tangerang Selatan</p>
            </div>
          </ScrollAnimation>
        </div>
        <div className='maps'>
          <ScrollAnimation animateIn="animate__fadeIn">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.645974525792!2d106.76352439223189!3d-6.3101542880461965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efd1eb11fda3%3A0xa581751e6b4dabfe!2sPulau%20Situ%20Gintung%203!5e0!3m2!1sid!2sid!4v1629004938000!5m2!1sid!2sid" width={width === 'sm' ? "90%" : "980"} height={width === 'sm' ? "300" : "495"} style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
          </ScrollAnimation>
        </div>
        <div className='attend'>
          <ScrollAnimation animateIn='animate__zoomIn'>
            <p>Akan hadir : {totalParticipants} Orang</p>
          </ScrollAnimation>
        </div>
        <ScrollAnimation animateIn='animate__zoomIn'>
          <div className='btn-registration' onClick={handleClickOpen}>
            <p>isi buku tamu</p>
          </div>
        </ScrollAnimation>
      </div>
      <div className='message-section'>
        <div className='message-content-title'>
          <p>Pesan dan Do'a</p>
        </div>
        <div className='message-wrapper'>
          <div className='left-section'>
            <img src={width !== 'sm' ? boardSm : boardMsgSm} alt='diesnatalis-logo' />
          </div>
          <div className='right-section'>
            <ScrollAnimation animateIn='animate__fadeIn' animateOnce>
            {sortedParticipants && sortedParticipants.map((item, idx) => {
              return (
                item.message && (
                  <div className='message-item-wrapper' key={idx}>
                    <div className='avatar'>
                      <img src={avatar} alt='avatar' />
                    </div>
                    <div className='message-shape'>
                      <div className='triangle-left' />
                      <div className='message-bubble'>
                        <div className='name'>
                          {item.nama}&nbsp;
                          <span>{item.nomor}</span>
                        </div>
                        <div className='message'>
                          {item.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            })}
            </ScrollAnimation>
          </div>
        </div>
      </div>
      <Footer />
      <PopupProkes open={showPopup} handleClose={closePopup} />
      <FormDialog open={open} handleClose={handleClose} />
    </div>
    </ScrollAnimation>
  );
};

export default Invitation;
