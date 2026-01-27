'use client';

import { useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { ChannelOption } from '../components/ChannelOption';
import { Card } from '../components/Card';
import { TemplateBlock } from '../components/TemplateBlock';

export type Channel = 'whatsapp' | 'sms' | 'email';

export interface Reminder {
  id: string;
  delayHours: number;
}
export default function MessagingSettingsPage() {
  const [primaryChannel, setPrimaryChannel] = useState<Channel>('whatsapp');

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', delayHours: 48 },
    { id: '2', delayHours: 96 },
  ]);

  return (
    <div className=" text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">

          {/* Primary Messaging Channel */}
          <Card title="Set Primary Messaging Channel">
            <ChannelOption
              label="Whatsapp"
              checked={primaryChannel === 'whatsapp'}
              onChange={() => setPrimaryChannel('whatsapp')}
            />
            <ChannelOption
              label="SMS"
              checked={primaryChannel === 'sms'}
              onChange={() => setPrimaryChannel('sms')}
            />
            <ChannelOption
              label="Email"
              checked={primaryChannel === 'email'}
              onChange={() => setPrimaryChannel('email')}
            />
          </Card>

          {/* Reminder Timing */}
          <Card
            title="Reminder Timing"
            action={
              <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-sm px-3 py-1.5 rounded-md">
                <Plus className="h-4 w-4" />
                Add Reminder
              </button>
            }
          >
            <div className="space-y-3">
              {reminders.map((r, index) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between bg-zinc-900 rounded-md px-3 py-2"
                >
                  <span className="text-sm text-zinc-300">
                    Reminder {index + 1}
                  </span>

                  <div className="flex items-center gap-3">
                    <select
                      className="bg-zinc-800 text-sm rounded-md px-2 py-1 outline-none"
                      defaultValue={r.delayHours}
                    >
                      <option value={24}>24 hrs</option>
                      <option value={48}>48 hrs</option>
                      <option value={96}>96 hrs</option>
                    </select>

                    <button className="p-2 rounded-md hover:bg-red-600/20 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">

          <Card title="Message Template">
            <TemplateBlock
              title="First Message Template"
              text={`Hi {{first_name}},\n\nThanks for your interest and for submitting the form 🙌\nThis is {{brand_name}}. We'd love to quickly connect and explain the next steps.\n\nJust reply YES and I'll share the details.`}
            />

            <TemplateBlock
              title="First Reminder"
              text={`Hi {{first_name}}, just checking in 🙂\n\nWe tried reaching out regarding your recent form submission.\nLet me know if you're interested and I'll take it from there.`}
            />

            <TemplateBlock
              title="Second Reminder"
              text={`Hi {{first_name}}, this will be my last follow-up.\n\nI know it's not the right time, no worries at all 👍\nYou can reply anytime if you'd like to continue.`}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
