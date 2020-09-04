import React from 'react';
import {ReadyState} from 'react-use-websocket';
import {AuthContext} from 'services/auth';
import {getUserChannels} from 'services/api';
import {useSocket} from 'hooks';

const useUser = () => {
  const [channels, setChannels] = React.useState<string[]>([]);
  const {connectionStatus} = useSocket();
  const {username} = React.useContext(AuthContext);
  React.useEffect(() => {
    if (!username || connectionStatus !== ReadyState.OPEN) return;
    getUserChannels(username).then(res => setChannels(res.data))
  }, [username, connectionStatus])
  return {
    username: username || '',
    channels,
    setChannels
  };
}

export default useUser;