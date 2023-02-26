/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { createQR, encodeURL } from '@solana/pay';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useSession } from 'next-auth/react';
import { Keypair } from '@solana/web3.js';

type TxData = {
  reference: string;
};

type Props = {
  username: string;
};

const transakURL = `https://global.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK}&cryptoCurrencyCode=SOL&network=solana&themeColor=9146FF&exchangeScreenTitle=Buy%20SOL%20-%20use%20debit%20only%20for%20US/Canada`;

export default function External(props: Props) {
  const {
    register, formState: { errors }, handleSubmit,
  } = useForm();

  const { username } = props;

  const { data: session } = useSession();

  const [msgSocket, setMsgSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const [image, setImage] = useState('');
  const [qr, setQR] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmitDonate = async (data: FieldValues) => {
    try {
      const reference = new Keypair().publicKey.toBase58();
      console.log('reference', reference);
      const qrLink = createQR(encodeURL({
        link: new URL(`https://${process.env.NEXT_PUBLIC_QR_URL}/api/qr?tip=${data.tip}&name=${data.username}&reference=${reference}`),
      }));

      const pngRaw = await qrLink.getRawData();

      if (pngRaw && msgSocket) {
        const png = URL.createObjectURL(pngRaw);
        setQR(png);
        msgSocket.on('transfer', async (txData: TxData) => {
          console.log('txData', txData);
          console.log('reference', reference);
          if (txData.reference === reference) {
            await fetch(`/api/alert?name=${username}&tip=${data.tip}`);
            const donor = (session?.user) ? session.user.name : 'visitor';
            const msg = { message: `Thanks ${donor} for your tip of ${data.tip} SOL`, room: username };
            msgSocket.emit('alert', msg);
            setQR('');
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const fetchMyAPI = useCallback(async () => {
    const response = await fetch(`/api/picture?u=${username}`);
    const res = await response.json();
    setImage(res.image);
    setSolAddress(res.sol_address);
  }, [image, solAddress]);

  useEffect(() => {
    fetchMyAPI();
    fetch('/api/socket').finally(() => {
      const socket = io({ path: '/api/socket' });
      setMsgSocket(socket);
    });
  }, [fetchMyAPI]);

  const { ref, ...rest } = register('tip', { min: '0.0001', required: true });

  if (image && solAddress) {
    return (
      <>
        <img src={image} alt="Avatar" width="200px" />
        <h3 style={{ marginTop: '30px' }}>Solana Tip</h3>
        <div style={{ marginTop: '20px' }}>
          <form onSubmit={handleSubmit(onSubmitDonate)}>
            <input
              {...rest}
              ref={(e) => {
                ref(e);
                if (e) {
                  inputRef.current = e;
                }
              }}
              type="text"
              placeholder="SOL Amount"
              style={{ borderRadius: '5px' }}
            />
            <input
              type="submit"
              height="20px"
              value="Tip"
              style={{
                color: 'white', background: '#9146FF', borderRadius: '5px', marginLeft: '5px', paddingRight: '15px', paddingLeft: '15px',
              }}
            />
            <div style={{ color: 'red' }}>
              { errors?.tip && 'SOL amount must be greater than 0.0001' }
            </div>
            <input {...register('username')} value={username} type="hidden" />
          </form>
          { qr
              && (
                <>
                  <div style={{ marginTop: '30px' }}>
                    <h4>Tip QR</h4>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <img src={qr} width="60%" alt="QR" />
                  </div>
                </>
              )}
          <div style={{ marginTop: '20px' }}>
            Login if you want the tip in your username.
          </div>
          <div style={{ marginTop: '10px' }}>
            Scan the QR with the
            {' '}
            <a href="https://solflare.com/" target="_blank" rel="noreferrer">Solflare</a>
            {' '}
            or
            {' '}
            <a href="https://phantom.app" target="_blank" rel="noreferrer">Phantom</a>
            {' '}
            mobile wallet.
          </div>
          <div style={{ marginTop: '10px' }}>
            Tips are final and not refundable.
          </div>
          <div style={{ marginTop: '10px' }}>
            After tipping please wait until the thanks alert in the Twitch chat.
          </div>
          <div style={{ marginTop: '30px' }}>
            <iframe
              title="transak"
              height="650"
              src={transakURL}
              allowFullScreen
              style={{
                display: 'block', width: '100%', maxHeight: '650px', maxWidth: '500px',
              }}
            />
          </div>
        </div>
      </>
    );
  }

  if (image && !solAddress) {
    return (
      <div>
        {username}
        {' '}
        has not signed up for CircleSub!
      </div>
    );
  }

  return null;
}
