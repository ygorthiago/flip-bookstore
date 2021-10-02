import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ToastMessage {
  id: string;
  message: string;
}

export interface IToastHook {
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
  messages: ToastMessage[];
}

export function useToastHook(): IToastHook {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string) => {
    const id = uuidv4();

    const toast = {
      id,
      message,
    };

    setMessages(oldMessages => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return { addToast, removeToast, messages };
}
