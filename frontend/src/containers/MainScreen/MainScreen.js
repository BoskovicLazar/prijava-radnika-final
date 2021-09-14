import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

import Alert from '../../components/Alert';

const formatTime = (d) => {
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(v => ('' + v).padStart(2, '0'))
      .filter((v,i) => v !== '00' || i > 0)
      .join(':');
}

const MainScreen = (props) => {
  const [interval, setCurInterval] = useState(null);
  const [time, setTime] = useState(new Date());

  const inputRef = useRef(null);

  const [barcode, setBarcode] = useState('');

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const tmp = setInterval(() => {
      setTime(new Date());
      inputRef.current?.focus();
    }, 1000);
    setCurInterval(tmp);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      const data = {
        barcode: barcode,
      }

      axios.post('http://localhost:8080/api/times/register', data)
        .then((response) => {
          console.log(response);
          setMessage('Success');
        })
        .catch((err) => {
          setMessage('Error');
        });

      setBarcode('');
    }
  }

  return (
    <>
      <Alert
        show={message}
        title="Info"
        message={message}
        onDialogClosed={() => setMessage(null)} />

      <div style={{
        width: 500,
        textAlign: 'center',
        margin: 'auto',
        paddingTop: 100,
      }}>
        <Card>
          <CardContent>
            <br />
            <br />

            <Typography variant="h1" component="h1">
              {formatTime(time)}
            </Typography>

            <input
              type="text"
              ref={inputRef}
              style={{
                position: 'absolute',
                left: -100,
                top: -100,
              }}
              value={barcode}
              onChange={(event) => setBarcode(event.target.value)}
              onKeyDown={onKeyPressHandler} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MainScreen;
