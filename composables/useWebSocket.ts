export const useWebSocket = () => {
  const config = useRuntimeConfig()
  const socket = useState<WebSocket | null>('socket', () => null)
  const isConnected = ref(false)
  const notification = useState<INotification>('postNotification', () => {
    return {}
  })

  const connect = () => {
    socket.value = new WebSocket(config.public.operationUrl)

    socket.value.onopen = () => {
      console.log('Connected to WebSocket')
      isConnected.value = true
    }

    socket.value.onmessage = async (event) => {
      const message = event.data
      console.log('Message received:', message)
      receiveMessage(message)
    }

    socket.value.onclose = (event) => {
      console.log(
        `WebSocket closed: Code ${event.code}, Reason: ${event.reason}`
      )
      isConnected.value = false
    }

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const sendMessage = (message: string) => {
    console.log(socket.value)

    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(message)
    } else {
      console.error('WebSocket is not open')
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
    }
  }

  const receiveMessage = (message: string) => {
    const data = JSON.parse(message)
    notification.value = {
      ...notification.value,
      [data.type]: data
    }
  }

  return { connect, sendMessage, disconnect, isConnected, notification }
}
