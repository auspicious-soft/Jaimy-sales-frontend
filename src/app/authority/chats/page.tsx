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


 const chatUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Chatgram',
    lastMessage: 'Chatgram Web was updated.',
    time: '19:48',
    unread: 1,
  },
  {
    id: '2',
    name: 'Jessica Drew',
    lastMessage: 'Ok, see you later',
    time: '18:30',
    unread: 2,
  },
  {
    id: '3',
    name: 'David Moore',
    lastMessage: "You: i don't remember anything 😬",
    time: '18:16',
    active: true,
  },
];

 const messages: Message[] = [
  {
    id: '1',
    sender: 'user',
    text: 'Hi, I got a message about auditions.',
    time: '18:12',
  },
  {
    id: '2',
    sender: 'me',
    text: 'Hi! Thanks for replying 😊',
    time: '18:16',
  },
  {
    id: '3',
    sender: 'me',
    text: 'Are you available for a short Zoom audition this week?',
    time: '18:16',
  },
];

 const activity: ActivityItem[] = [
  { label: 'Form Submitted', time: '10/10/24 10:00 AM' },
  { label: 'Message 1 Sent', time: '10/10/24 10:00 AM' },
  { label: 'Reminder 1 Sent', time: '10/10/24 10:00 AM' },
  { label: 'Conversation Started', time: '10/10/24 10:00 AM' },
  { label: 'Conversation Ended', time: '10/10/24 10:00 AM' },
];


import { Search, Send } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="h-full text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-3 h-full">

        {/* ================= CHAT LIST ================= */}
        <aside className="bg-zinc-900/60 backdrop-blur rounded-xl flex flex-col">
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                placeholder="Search"
                className="w-full bg-zinc-800 rounded-md pl-9 pr-3 py-2 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatUsers.map((u) => (
              <div
                key={u.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800 transition ${
                  u.active ? 'bg-pink-600/90' : ''
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
                  <p>{u.time}</p>
                  {u.unread && (
                    <span className="mt-1 inline-block bg-green-500 text-black px-2 rounded-full text-[10px]">
                      {u.unread}
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
            <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center">
              D
            </div>
            <div>
              <p className="font-medium">David Moore</p>
              <p className="text-xs text-green-400">Active</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center text-xs text-zinc-400">Today</div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                  m.sender === 'me'
                    ? 'ml-auto bg-green-500 text-black'
                    : 'bg-zinc-800'
                }`}
              >
                <p>{m.text}</p>
                <p className="text-[10px] text-right opacity-70 mt-1">
                  {m.time}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 flex items-center gap-2">
            <input
              placeholder="Message"
              className="flex-1 bg-zinc-800 rounded-md px-3 py-2 text-sm outline-none"
            />
            <button className="p-2 rounded-md bg-pink-600 hover:bg-pink-500">
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
