/* eslint-disable solid/reactivity */
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { Authorization } from '~/app/models/helpers/token';
import { Socket } from 'socket.io-client';
import { connectToClient } from '~/app/models/helpers/websocket';
import { Dayjs } from 'dayjs';
import { useLocaleStorage } from '../hooks/use-local-storage';
import { SessionInformation } from '../types/user.session';
import { SocketEvent } from '~/notifications/models/services/generated/notification.generated';
import { createContext, useEffect, useState } from 'react';

export type SocketProviderProps = {
  token: Authorization;
  user: UserResponse;
  children: JSX.Element;
};

export type ChatUser = {
  id: string;
  userId: string;
  username: string;
  name: string;
  online: Dayjs;
};

export type SocketState = {
  socket?: Socket;
  loggedInUsers: SessionInformation[];
};

export const SocketContext = createContext<Omit<SocketState, 'children'>>({ loggedInUsers: [] });

export function SocketProvider(props: SocketProviderProps) {
  const { getItem, setItem } = useLocaleStorage<string>();
  const [socket, setSocket] = useState<Socket>();
  const [loggedInUsers, setLoggedInUsers] = useState<SessionInformation[]>([]);

  useEffect(() => {
    const sessionId = getItem('sessionId');
    const connctedIo = connectToClient(props.token?.accessToken as string, props.user, sessionId);

    connctedIo?.on(SocketEvent.SESSION_CONNECTED, ({ sessionId }) => {
      setItem('sessionId', sessionId);
    });

    setSocket(connctedIo);

    connctedIo?.on(SocketEvent.USERS, (users: SessionInformation[]) => {
      setLoggedInUsers(users);
    });

    connctedIo.on(SocketEvent.MESSAGE_CREATED, (props) => {
      console.log(props);
    });

    connctedIo?.on(SocketEvent.USER_DISCONNECTED, (userId: string) => {
      setLoggedInUsers((prev) => prev.filter((u) => u.user?.userId !== userId));
    });
    return () => {
      if (socket) {
        socket?.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket as Socket, loggedInUsers }}>
      {props.children}
    </SocketContext.Provider>
  );
}
