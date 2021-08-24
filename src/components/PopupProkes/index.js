import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import './index.scss';
import Mask from '../../static/images/mask.png';
import Distancing from '../../static/images/distancing.png';
import Hand from '../../static/images/hand.png';
import Temp from '../../static/images/temp.png';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  text: {
    backgroundColor: '#000000',
  }
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const PopupProkes =  withStyles(styles)((props) => {

  const {open, handleClose} = props;
  return (
    <div className='dialog-container'>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} style={{fontFamily: "'Merienda', cursive", height: '100%', width: '100%'}}>
          <DialogContent dividers style={{overflowY: 'hidden', padding: '2rem', backgroundColor: '#000000'}}>
            <div className='prokes-title' onClose={handleClose}>
              <p>
                Protokol Kesehatan (Covid - 19)
              </p>
            </div>
            <div className='prokes-top'>
                
              <div className='icon-wrapper-popup'>
                <ScrollAnimation animateIn='animate__fadeInTopLeft'>
                  <img src={Mask} alt='mask' className='icon-prokes' />
                  <p>Tamu undangan wajib mengenakan masker</p>
                </ScrollAnimation>
              </div>
              <div className='icon-wrapper-popup'>
                <ScrollAnimation animateIn='animate__fadeInTopRight'>
                  <img src={Hand} alt='washing-hand' className='icon-prokes' />
                  <p>Cuci tangan menggunakan sabun atau hand sanitizer</p>
                </ScrollAnimation>
              </div>
            </div>
            <div className='prokes-bottom'>
              <div className='icon-wrapper-popup'>
                <ScrollAnimation animateIn='animate__fadeInBottomLeft'>
                  <img src={Temp} alt='mask' className='icon-prokes' />
                  <p>Tamu undangan wajib mengenakan masker</p>
                </ScrollAnimation>
              </div>
              <div className='icon-wrapper-popup'>
                <ScrollAnimation animateIn='animate__fadeInBottomRight'>
                  <img src={Distancing} alt='washing-hand' className='icon-prokes' />
                  <p>Menjaga jarak antar sesama minimal 1 meter</p>
                </ScrollAnimation>
              </div>
            </div>
            <div className='close-popup-btn' onClick={handleClose}>
              <p>IYOOO...</p>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
});

export default PopupProkes;
