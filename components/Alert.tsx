/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useState, useEffect, useRef,
} from 'react';
import AnimatedText from 'react-animated-text-content';
import { Fade, Typography } from '@mui/material';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

export default function Alert() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const video = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  const username = router.query.username?.toString();

  useEffect(() => {
    fetch('/api/socket').finally(() => {
      const socket = io({ path: '/api/socket' });
      socket.on('alert', (data) => {
        setVisible(true);
        setRoom(data.room as string);
        setMessage(data.message as string);
        setTimeout(() => {
          setVisible(false);
        }, 11650);
      });
    });
  }, []);

  if (video && video.current && visible) {
    video.current.play();
  }

  if (message && room === username) {
    return (
      <div className="text-center" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <video ref={video} width="800px" src="https://video.circlesub.com/circlesub.webm" muted autoPlay />
          <div style={{ marginTop: '-400px' }}>
            <Fade
              in={visible}
              timeout={2300}
            >
              <Typography sx={{ color: 'white', fontSize: '30px' }}>
                <AnimatedText
                  type="words" // animate words or chars
                  animation={{
                    x: '200px',
                    y: '-200px',
                    scale: 1.1,
                    ease: 'ease-in-out',
                  }}
                  animationType="float"
                  interval={0.06}
                  duration={3}
                  tag="span"
                  includeWhiteSpaces
                  threshold={0.1}
                  rootMargin="20%"
                >
                  {message}
                </AnimatedText>
              </Typography>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
