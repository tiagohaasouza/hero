import { ref, onMounted, onUnmounted } from 'vue';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

type RealtimeOptions = Partial<ManagerOptions & SocketOptions>;

export function useRealtime(url: string, options: RealtimeOptions = {}) {
  const socket = ref<Socket | null>(null);
  const isConnected = ref(false);
  const messages = ref<any[]>([]);

  const connect = () => {
    if (socket.value) return;
    socket.value = io(url, options);

    socket.value.on('connect', () => {
      isConnected.value = true;
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
    });

    socket.value.on('message', (payload: any) => {
      messages.value.push(payload);
    });
  };

  const disconnect = () => {
    if (!socket.value) return;
    socket.value.disconnect();
    socket.value = null;
  };

  const emit = (event: string, payload?: any) => {
    socket.value?.emit(event, payload);
  };

  const on = (event: string, handler: (...args: any[]) => void) => {
    socket.value?.on(event, handler);
  };

  const off = (event: string, handler?: (...args: any[]) => void) => {
    socket.value?.off(event, handler);
  };

  onMounted(connect);
  onUnmounted(disconnect);

  return {
    socket,
    isConnected,
    messages,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
}
