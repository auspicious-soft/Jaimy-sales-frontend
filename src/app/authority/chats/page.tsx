'use client';
export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  active?: boolean;
}

export interface Message {
  id: string;
  sender: 'me' | 'user';
  text: string;
  time: string;
}

export interface ActivityItem {
  label: string;
  time: string;
}


const activity: ActivityItem[] = [
  { label: 'Form Submitted', time: '10/10/24 10:00 AM' },
  { label: 'Message 1 Sent', time: '10/10/24 10:00 AM' },
  { label: 'Reminder 1 Sent', time: '10/10/24 10:00 AM' },
  { label: 'Conversation Started', time: '10/10/24 10:00 AM' },
  { label: 'Conversation Ended', time: '10/10/24 10:00 AM' },
];


import { formatDateTime, useDebounce } from '@/lib/utils';
import { getData, postData } from '@/services/admin-services';
import { Search, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:8000');
export default function ChatPage() {
 
  // const { data, isLoading, error } = useSWR('/api/whatsapp/contacts', getData);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const sortedMessages = [...chatMessages].reverse();
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading, isValidating } = useSWR(
    ['/api/whatsapp/contacts', debouncedSearch],
    ([url, search]) =>
      getData(
        `${url}?search=${encodeURIComponent(search)}`
      ),
      {
        revalidateOnFocus: false,
        keepPreviousData: true,
      }
    );
    const contacts = data?.data?.data || [];
  

 useEffect(() => {

  socket.on("newMessage", (message) => {
    console.log("📥 Received realtime message:", message);
    setChatMessages(prev => [...prev, message]);
  });

  socket.on("messageStatus", (update) => {
    console.log("📊 Status update:", update);

    setChatMessages(prev =>
      prev.map(m =>
        m.messageId === update.messageId
          ? { ...m, status: update.status }
          : m
      )
    );
  });

  return () => {
    socket.off("newMessage");
    socket.off("messageStatus");
  };

}, []);
 useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!newMessage || !selectedContact) return;

    const tempMsg = {
      body: newMessage,
      direction: 'outbound',
      timestamp: new Date(),
    };

    // show instantly
    setChatMessages((prev) => [...prev, tempMsg]);

    setNewMessage('');

    try {
      await postData('/api/whatsapp/send-message', {
        to: selectedContact.phoneNumber,
        message: tempMsg.body,
      });
    } catch {
      toast.error('Failed to send');
    }
  };

  const fetchMessages = async (phoneNumber: string) => {
    try {
      setMessagesLoading(true);

      const res = await getData(
        `/api/whatsapp/messages?phoneNumber=${phoneNumber}&limit=50&page=1`
      );

      setChatMessages(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  return (
    <div className="h-full text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-3 h-full">

        {/* ================= CHAT LIST ================= */}
        <aside className="bg-zinc-900/60 backdrop-blur rounded-xl flex flex-col">
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
              onChange={(e) => {
              setSearch(e.target.value);
              // setPage(1); 
            }}
                placeholder="Search"
                className="w-full bg-zinc-800 rounded-md pl-9 pr-3 py-2 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setSelectedContact(u);
                  fetchMessages(u.phoneNumber);

                  socket.emit('join', u.phoneNumber);
                }}

                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800 transition ${u.active ? 'bg-pink-600/90' : ''
                  }`}
              >
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center font-semibold">
                  {u.name[0]}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm">{u.name}</p>
                  <p className="text-xs text-zinc-300 truncate">
                    {u.lastMessage}
                  </p>
                </div>

                <div className="text-xs text-zinc-300 text-right">
                  <p>{formatDateTime(u.lastMessageSentAt)}</p>
                  {u.unread && (
                    <span className="mt-1 inline-block bg-green-500 text-black px-2 rounded-full text-[10px]">
                      {u.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ================= CHAT WINDOW ================= */}
        <main className="bg-zinc-900/60 backdrop-blur rounded-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center font-semibold">
                  {selectedContact?.name[0]}
                </div>
            <div>
              <p className="font-medium">
                {selectedContact?.name || 'Select a chat'}
              </p>
              <p className="text-xs text-green-400">Active</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            <div className="text-center text-xs text-zinc-400">Today</div>

            {messagesLoading && (
              <p className="text-center text-sm text-zinc-400">Loading...</p>
            )}

            {!messagesLoading && chatMessages.map((m) => (

              <div
                key={m._id}
                className={`flex gap-2 w-fit rounded-xl px-4 py-2 text-sm ${m.direction === 'outbound'
                  ? 'ml-auto bg-green-500 text-black'
                  : 'bg-zinc-800'
                  }`}
              >
                <p>{m.body}</p>
                <p className="text-[10px] text-right opacity-70 mt-1">
                  {formatDateTime(m.timestamp)}
                </p>
              </div>

            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 flex items-center gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message"
              className="flex-1 bg-zinc-800 rounded-md px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="p-2 rounded-md bg-pink-600 hover:bg-pink-500"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </main>

        {/* ================= USER DETAILS ================= */}
        <aside className="hidden lg:flex bg-zinc-900/60 backdrop-blur rounded-xl flex-col p-4">
          <h3 className="font-semibold mb-4">User Details</h3>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-black font-semibold">
              AV
            </div>
            <p>Name of user</p>
          </div>

          <div className="text-sm space-y-1 mb-6 text-zinc-300">
            <p>Phone Number: +1547 458 7458</p>
            <p>Email: name@email.com</p>
            <p>Region/Country: UK</p>
          </div>

          <h4 className="font-medium mb-2">Activity</h4>
          <div className="space-y-2 text-sm">
            {activity.map((a, i) => (
              <div
                key={i}
                className="flex justify-between bg-zinc-800 rounded-md px-3 py-2"
              >
                <span>{a.label}</span>
                <span className="text-xs text-zinc-400">{a.time}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
