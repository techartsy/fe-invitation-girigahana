import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import './index.scss';
import { postRegistration, fetchParticipants, setLoading, resetErrorMessage } from '../../store/action/invitationAction';
import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from '../../utils/useWindowDimensions';

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
    backgroundColor: '#fe6e00',
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other} style={{backgroundColor: '#fe6e00', textAlign: 'center', fontFamily: "'Merienda', cursive"}}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const FormDialog =  withStyles(styles)((props) => {

  const {open, handleClose, classes} = props;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [disable, setDisbale] = useState(true);
  const [attend, setAttend] = useState(1);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const errorMessage = useSelector(state => state.invitationReducer.errorMessage);
  const isLoading = useSelector(state => state.invitationReducer.isLoading);
  const status = useSelector(state => state.invitationReducer.status);
  const participants = useSelector(state => state.invitationReducer.participants);


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const changeName = (e) => {
    setName(e.target.value);
    if (nameError) {
      setNameError(false);
    }
  }
  const changeNumber = (e) => {
    setNumber(e.target.value);
    if (errorMsg) {
      setErrorMsg(false);
    }
    if (errorMessage) {
      dispatch(setLoading(false));
      dispatch(resetErrorMessage());
    }
  }
  const changePhone = (e) => {
    setPhone(e.target.value);
    if (phoneError) {
      setPhoneError(false);
    }
  }
  const changeAddress = (e) => {
    setAddress(e.target.value);
  }
  const changeConfirmation = (e) => {
    setConfirmation(e.target.value);
    if (e.target.value.toLowerCase() === 'ya') {
      setDisbale(false);
    } else {
      setDisbale(true);
    }
  }
  const changeAttend = (e) => {
    setAttend(e.target.value);
  }
  const changeMessage = (e) => {
    setMessage(e.target.value);
  }
  const closeModal = () => {
    handleClose();
    resetForm();
  }

  const resetForm = () => {
    handleClose();
    setName('');
    setNumber('');
    setPhone('');
    setAttend('');
    setAddress('');
    setMessage('');
    setConfirmation('');
  }

  const checkMemberId = (memberId) => {
    const memberExist = participants && participants.filter((member) => {
      return member.nomor === memberId;
    })
    if (memberExist.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama: name,
      nomor: number,
      telepon: phone,
      pax: confirmation.toLowerCase() === 'ya' ? Number(attend) : 0,
      alamat: address,
      message,
      attend: confirmation
    }
    if (name, number, phone, address, confirmation) {
      if (!validatePhoneNumber(phone)) {
        setPhoneError(true);
        Toast.fire({
          icon: 'error',
          title: 'Format Nomor Telepon Salah',
          customClass: {
            container: 'swal-overlay'
          }
        })
      } else if (!validateNumber(number)) {
        setErrorMsg(true);
        Toast.fire({
          icon: 'error',
          title: 'Format Nomor Anggota Salah',
          customClass: {
            container: 'swal-overlay'
          }
        })
      } else if (name.length < 5) {
        setNameError(true);
        Toast.fire({
          icon: 'error',
          title: 'Nama minimum 5 Karater',
          customClass: {
            container: 'swal-overlay'
          }
        })
      } else if (!checkMemberId(number)) {
        Toast.fire({
          icon: 'error',
          title: 'Nomor Anggota Sudah Terdaftar',
          customClass: {
            container: 'swal-overlay'
          }
        })
      } else {
        dispatch(postRegistration(data));
        dispatch(fetchParticipants());
        closeModal();
        Toast.fire({
          icon: 'success',
          title: 'Pendaftaran Berhasil',
          customClass: {
            container: 'swal-overlay'
          }
        })
      }
    }
  }

  const checkPrefix = (prefix) => {
    if (prefix.toLowerCase() === 'am') {
      return true;
    } else if (prefix.toLowerCase() === 'grg') {
      return true;
    } else {
      return false;
    }
  }

  const validateNumber = (number) => {
    if (number.includes(' ')) {
      const prefix = number.split(' ')[0];
      const containSpace = number.split(' ');
      if (number.includes('.')) {
        const tail = number.split(' ')[1];
        const year = tail.split('.')[0]
        const member = tail.split('.')[1];
        if (year.length !== 2) {
          return false;
        } else if (member.length < 3 || member.length > 4 || member === '000' || member === '0000') {
          return false;
        } else if (!checkPrefix(prefix)) {
          return false;
        } else {
          return true;
        }
      } else if (containSpace.length === 3) {
        if (containSpace[2].length < 3 || containSpace[2].length > 4 || containSpace[2] === '000' || containSpace[2] === '0000') {
          return false;
        }
        return true;
      } else {
        if (number.split(' ')[1].length > 2) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  const validatePhoneNumber = (phone) => {
    if (phone.length < 10 || phone.length > 12) {
      return false;
    } else if (phone === '0000000000' || phone === '00000000000' || phone === '000000000000') {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className='dialog-container'>
      <Dialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={open} style={{fontFamily: "'Merienda', cursive", height: '100%'}}>
        <DialogTitle>
          <p id="customized-dialog-title" onClose={closeModal} style={{fontFamily: "'Merienda', cursive", backgroundColor: '#fe6e00', textAlign: 'center', height: '10px', fontSize: '20px'}}>
            Buku Tamu
          </p>
        </DialogTitle>
        <DialogContent dividers style={{overflowY: width === 'sm' ? 'scroll' : 'hidden', padding: '2rem', paddingBottom: '0rem'}}>
          {isLoading ? (
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <form onSubmit={(e) => onSubmit(e)} className='form-input'>
                <label for="name">Nama Lengkap</label><span style={{color: 'red'}}> *</span><br></br>
                <input required type="text" id="name" name="name" value={name} onChange={(e) => changeName(e)} style={{width: '100%', fontFamily: "'Merienda', cursive", borderColor: nameError && 'red'}} /><br></br>
                <label for="number">Nomor Anggota</label><span style={{color: 'red'}}> * (GRG 13.0448)</span><br></br>
                <input required type="text" id="number" name="number" value={number} onChange={(e) => changeNumber(e)} style={{width: '100%', fontFamily: "'Merienda', cursive", borderColor: errorMsg && 'red'}} /><br></br>
                <label for="phone">Nomor Telepon</label><span style={{color: 'red'}}> *</span><br></br>
                <input required type="text" id="phone" name="phone" value={phone} onChange={(e) => changePhone(e)} style={{width: '100%', fontFamily: "'Merienda', cursive", borderColor: phoneError && 'red'}} /><br></br>
                <label for="address">Alamat</label><span style={{color: 'red'}}> *</span><br></br>
                <input required multiline type="text" id="address" name="address" value={address} onChange={(e) => changeAddress(e)} style={{width: '100%', fontFamily: "'Merienda', cursive"}} /><br></br>
                <label for="confirmation">Konfirmasi Kehadiran</label><span style={{color: 'red'}}> *</span><br></br>
                <select required onChange={(e) => changeConfirmation(e)} name="confirmation" id="confirmation" placeholder='PIlIH' style={{width: '50%', fontFamily: "'Merienda', cursive"}}>
                  <option value="" selected disabled> - Pilih - </option>
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </select><br></br>
                <label for="attend">Jumlah Kehadiran</label><br></br>
                <input disabled={disable} type="number" id="attend" name="attend" min='1' max='4' value={attend} placeholder='1' onChange={(e) => changeAttend(e)} style={{width: '50%', fontFamily: "'Merienda', cursive"}} /><br></br>
                <label for="message">Ucapan Anda</label><br></br>
                <textarea id="message" name="message" rows="4" cols="40" onChange={(e) => changeMessage(e)} style={{ width: '100%', fontFamily: "'Merienda', cursive"}} />
                <button style={{padding: '5px', width: '100%', backgroundColor: '#fe6e00', color: 'black', borderRadius: '5px', marginTop: '1rem', fontFamily: "'Merienda', cursive"}} type='submit'>KIRIM</button>
              </form>
              <div className='contact'>
                <div className='title-contact'>
                  <a href='https://api.whatsapp.com/send?phone=6285946275628'>
                    <p>Link Bantuan</p>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default FormDialog;
