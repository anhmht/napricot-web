export const useWebSocket = (url: string) => {
  const socket = useState<WebSocket | null>('socket', () => null);
  const isConnected = ref(false);
  const notification = useState<INotification>('postNotification', () => {
    return {}
  })

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('Connected to WebSocket');
      isConnected.value = true;
    };

    socket.value.onmessage = async (event) => {
      const message = event.data;
      console.log('Message received:', message);
      receiveMessage(message);
    };

    socket.value.onclose = () => {
      console.log('WebSocket disconnected');
      isConnected.value = false;
    };

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const sendMessage = (message: string) => {
    console.log(socket.value);

    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.close();
    }
  };

  const receiveMessage = (message: string) => {
    const data = JSON.parse(message);
    notification.value = {
      ...notification.value,
      [data.type]: data
    }
  }

  return { connect, sendMessage, disconnect, isConnected, notification };
};
