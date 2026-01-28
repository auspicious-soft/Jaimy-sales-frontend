// 'use client';

// import { useState } from 'react';
// import { Plus, Trash2, Pencil } from 'lucide-react';
// import { ChannelOption } from '../components/ChannelOption';
// import { Card } from '../components/Card';
// import { TemplateBlock } from '../components/TemplateBlock';

// export type Channel = 'whatsapp' | 'sms' | 'email';

// export interface Reminder {
//   id: string;
//   delayHours: number;
// }
// export default function MessagingSettingsPage() {
//   const [primaryChannel, setPrimaryChannel] = useState<Channel>('whatsapp');

//   const [reminders, setReminders] = useState<Reminder[]>([
//     { id: '1', delayHours: 48 },
//     { id: '2', delayHours: 96 },
//   ]);

//   return (
//     <div className=" text-white">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* ================= LEFT COLUMN ================= */}
//         <div className="space-y-6">

//           {/* Primary Messaging Channel */}
//           <Card title="Set Primary Messaging Channel">
//             <ChannelOption
//               label="Whatsapp"
//               checked={primaryChannel === 'whatsapp'}
//               onChange={() => setPrimaryChannel('whatsapp')}
//             />
//             <ChannelOption
//               label="SMS"
//               checked={primaryChannel === 'sms'}
//               onChange={() => setPrimaryChannel('sms')}
//             />
//             <ChannelOption
//               label="Email"
//               checked={primaryChannel === 'email'}
//               onChange={() => setPrimaryChannel('email')}
//             />
//           </Card>

//           {/* Reminder Timing */}
//           <Card
//             title="Reminder Timing"
//             action={
//               <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-sm px-3 py-1.5 rounded-md">
//                 <Plus className="h-4 w-4" />
//                 Add Reminder
//               </button>
//             }
//           >
//             <div className="space-y-3">
//               {reminders.map((r, index) => (
//                 <div
//                   key={r.id}
//                   className="flex items-center justify-between bg-zinc-900 rounded-md px-3 py-2"
//                 >
//                   <span className="text-sm text-zinc-300">
//                     Reminder {index + 1}
//                   </span>

//                   <div className="flex items-center gap-3">
//                     <select
//                       className="bg-zinc-800 text-sm rounded-md px-2 py-1 outline-none"
//                       defaultValue={r.delayHours}
//                     >
//                       <option value={24}>24 hrs</option>
//                       <option value={48}>48 hrs</option>
//                       <option value={96}>96 hrs</option>
//                     </select>

//                     <button className="p-2 rounded-md hover:bg-red-600/20 text-red-500">
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* ================= RIGHT COLUMN ================= */}
//         <div className="space-y-6">

//           <Card title="Message Template">
//             <TemplateBlock
//               title="First Message Template"
//               text={`Hi {{first_name}},\n\nThanks for your interest and for submitting the form 🙌\nThis is {{brand_name}}. We'd love to quickly connect and explain the next steps.\n\nJust reply YES and I'll share the details.`}
//             />

//             <TemplateBlock
//               title="First Reminder"
//               text={`Hi {{first_name}}, just checking in 🙂\n\nWe tried reaching out regarding your recent form submission.\nLet me know if you're interested and I'll take it from there.`}
//             />

//             <TemplateBlock
//               title="Second Reminder"
//               text={`Hi {{first_name}}, this will be my last follow-up.\n\nI know it's not the right time, no worries at all 👍\nYou can reply anytime if you'd like to continue.`}
//             />
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState } from 'react';
// import { Plus, Trash2, Pencil } from 'lucide-react';
// import MDEditor from "@uiw/react-md-editor";
// import { getData } from '@/services/admin-services';

// export type Channel = 'whatsapp' | 'sms' | 'email';

// interface Template {
//   _id: string;
//   title: string;
//   templateType: string;
//   usedFor: string;
//   content: string;
//   remainderHours: string;
// }

// export default function MessagingSettingsPage() {

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [showEditor, setShowEditor] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     title: '',
//     templateType: '',
//     usedFor: 'Whatsapp',
//     content: '',
//     remainderHours: '0',
//   });

//   // ================= FETCH ALL =================

//   const fetchTemplates = async () => {
//     setLoading(true);
//     const res = await getData('/api/message-templates');
//     console.log('res: ', res);
//     const json = await res;
//     setTemplates(json?.data?.data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   // ================= ADD / UPDATE =================

//   const saveTemplate = async () => {
//     const url = editingId
//       ? `/api/message-templates/${editingId}`
//       : `/api/message-templates`;

//     const method = editingId ? 'PATCH' : 'POST';

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     resetForm();
//     fetchTemplates();
//   };

//   // ================= DELETE =================

//   const deleteTemplate = async (id: string) => {
//     if (!confirm('Delete this template?')) return;

//     await fetch(`/api/message-templates/${id}`, {
//       method: 'DELETE',
//     });

//     fetchTemplates();
//   };

//   // ================= EDIT =================

//   const editTemplate = async (id: string) => {
//     const res = await fetch(`/api/message-templates/${id}`);
//     const json = await res.json();

//     const t = json.data;

//     setForm({
//       title: t.title,
//       templateType: t.templateType,
//       usedFor: t.usedFor,
//       content: t.content,
//       remainderHours: t.remainderHours,
//     });

//     setEditingId(id);
//     setShowEditor(true);
//   };

//   const resetForm = () => {
//     setForm({
//       title: '',
//       templateType: '',
//       usedFor: 'Whatsapp',
//       content: '',
//       remainderHours: '0',
//     });
//     setEditingId(null);
//     setShowEditor(false);
//   };

//   // =======================================================

//   return (
//     <div className="text-white space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Message Templates</h2>

//         <button
//           onClick={() => setShowEditor(true)}
//           className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-md text-sm"
//         >
//           <Plus size={16} />
//           Add Template
//         </button>
//       </div>

//       {/* ================= TEMPLATE LIST ================= */}

//       <div className="grid gap-4">

//         {loading && <p>Loading...</p>}

//         {!loading && templates.map(t => (
//           <div
//             key={t._id}
//             className="bg-zinc-900 rounded-lg p-4 flex justify-between items-start"
//           >
//             <div className="space-y-1">
//               <p className="font-semibold">{t.title}</p>
//               <p className="text-sm text-zinc-400">
//                 {t.templateType} • {t.usedFor}
//               </p>
//               <p className="text-sm text-zinc-400">
//                 Reminder after {t.remainderHours} hrs
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => editTemplate(t._id)}
//                 className="text-blue-400 hover:text-blue-300"
//               >
//                 <Pencil size={16} />
//               </button>

//               <button
//                 onClick={() => deleteTemplate(t._id)}
//                 className="text-red-500 hover:text-red-400"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= EDITOR MODAL ================= */}

      // {showEditor && (
      //   <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      //     <div className="bg-zinc-900 w-full max-w-2xl p-5 rounded-xl space-y-4">

      //       <h3 className="font-bold text-lg">
      //         {editingId ? 'Edit Template' : 'Add Template'}
      //       </h3>

      //       <input
      //         placeholder="Title"
      //         className="w-full bg-zinc-800 px-3 py-2 rounded-md outline-none"
      //         value={form.title}
      //         onChange={e => setForm({ ...form, title: e.target.value })}
      //       />

      //       <input
      //         placeholder="Template Type (Welcome / Reminder)"
      //         className="w-full bg-zinc-800 px-3 py-2 rounded-md outline-none"
      //         value={form.templateType}
      //         onChange={e => setForm({ ...form, templateType: e.target.value })}
      //       />

      //       <select
      //         className="w-full bg-zinc-800 px-3 py-2 rounded-md"
      //         value={form.usedFor}
      //         onChange={e => setForm({ ...form, usedFor: e.target.value })}
      //       >
      //         <option>Whatsapp</option>
      //         <option>Email</option>
      //         <option>SMS</option>
      //       </select>

      //       <select
      //         className="w-full bg-zinc-800 px-3 py-2 rounded-md"
      //         value={form.remainderHours}
      //         onChange={e => setForm({ ...form, remainderHours: e.target.value })}
      //       >
      //         <option value="0">Immediately</option>
      //         <option value="1">1 Hour</option>
      //         <option value="2">2 Hours</option>
      //         <option value="24">24 Hours</option>
      //         <option value="48">48 Hours</option>
      //       </select>

      //       {/* MARKDOWN EDITOR */}
      //       <div data-color-mode="dark">
      //         <MDEditor
      //           value={form.content}
      //           onChange={(val) =>
      //             setForm({ ...form, content: val || '' })
      //           }
      //           height={200}
      //         />
      //       </div>

      //       <div className="flex justify-end gap-3 pt-2">

      //         <button
      //           onClick={resetForm}
      //           className="px-4 py-2 bg-zinc-700 rounded-md"
      //         >
      //           Cancel
      //         </button>

      //         <button
      //           onClick={saveTemplate}
      //           className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-md"
      //         >
      //           {editingId ? 'Update' : 'Save'}
      //         </button>

      //       </div>

      //     </div>
      //   </div>
      // )}

//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { ChannelOption } from '../components/ChannelOption';
import { Card } from '../components/Card';
import { TemplateBlock } from '../components/TemplateBlock';
import { deleteData, getData, patchData } from '@/services/admin-services';
import MDEditor from "@uiw/react-md-editor";
import { postData } from '@/services/admin-services';
import { toast } from 'sonner';
export type Channel = 'whatsapp' | 'sms' | 'email';

export interface Reminder {
  id: string;
  delayHours: number;
}

interface Template {
  _id: string;
  title: string;
  templateType: string;
  usedFor: string;
  content: string;
  remainderHours: string;
}

export default function MessagingSettingsPage() {

  const [primaryChannel, setPrimaryChannel] = useState<Channel>('whatsapp');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
  title: '',
  // templateType: '',
  usedFor: 'Whatsapp',
  content: '',
  remainderHours: '0',
});

  // ================= FETCH ALL TEMPLATES =================

  const fetchTemplates = async () => {
    const res = await getData('/api/message-templates');
    const json = await res.data.data;
    setTemplates(json || []);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // ================= DELETE =================

  const deleteTemplate = async (id: string) => {
    const res = await deleteData(`/api/message-templates/${id}`);
    if (res.status !== 200) {
      throw new Error('Failed to update content');
    }else{
      toast.success('Message template deleted successfully');
    }
    fetchTemplates();
  };

  // ================= UPDATE CONTENT =================

  const updateTemplateContent = async (id: string, content: string) => {

    const template = templates.find(t => t._id === id);
    if (!template) return;
    const payload= {
      ...template,
        content,
    }
    const res= await patchData(`/api/message-templates/${id}`, payload);
    if (res.status !== 200) {
      throw new Error('Failed to update content');
    }else{
      toast.success('Content updated successfully');
    }
    fetchTemplates();
  };
// ================= OPEN ADD =================

const openAddModal = () => {
  setEditingId(null);
  setForm({
    title: '',
    // templateType: '',
    usedFor: 'Whatsapp',
    content: '',
    remainderHours: '0',
  });
  setShowEditor(true);
};

// ================= OPEN EDIT =================

const openEditModal = (template: Template) => {
  setEditingId(template._id);
  setForm({
    title: template.title,
    // templateType: template.templateType,
    usedFor: template.usedFor,
    content: template.content,
    remainderHours: template.remainderHours,
  });
  setShowEditor(true);
};

// ================= SAVE =================

const saveTemplate = async () => {

  const payload = {
    title: form.title,
    // templateType: form.templateType,
    usedFor: form.usedFor,
    content: form.content,
    remainderHours: form.remainderHours,
  };
  let res;
  if (editingId) {
   res= await patchData(`/api/message-templates/${editingId}`, payload);
  } else {
    res= await postData('/api/message-templates', payload);
  }

  if (res.status !== 200) {
    throw new Error('Failed to save template');
  }else{
    toast.success('Template saved successfully');
  }

  resetForm();
  fetchTemplates();
};

// ================= RESET =================

const resetForm = () => {
  setShowEditor(false);
  setEditingId(null);
  setForm({
    title: '',
    // templateType: '',
    usedFor: 'Whatsapp',
    content: '',
    remainderHours: '0',
  });
};

  // ================= UPDATE HOURS =================
// if (!form.title || !form.content) return alert("Fill required fields");

  const updateHours = async (id: string, hours: string) => {

    const template = templates.find(t => t._id === id);
    if (!template) return;
    const payload= {
      ...template,
        remainderHours: hours,
    }
    const res = await patchData(`/api/message-templates/${id}`, payload);
    if (res.status !== 200) {
      throw new Error('Failed to update hours');
    }else{
      toast.success('Hours updated successfully');
    }

    fetchTemplates();
  };

  // ======================================================

  return (
    <div className="text-white">
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

          {/* Reminder Timing (Mapped from API) */}
          <Card
            title="Reminder Timing"
            action={
              <button onClick={openAddModal} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-sm px-3 py-1.5 rounded-md">
                <Plus className="h-4 w-4" />
                Add Reminder
              </button>
            }
          >
            <div className="space-y-3">
              {templates
                .filter(t => t.templateType === 'Reminder')
                .map((t, index) => (
                  <div
                    key={t._id}
                    className="flex items-center justify-between bg-zinc-900 rounded-md px-3 py-2"
                  >
                    <span className="text-sm text-zinc-300">
                      Reminder {index + 1}
                    </span>

                    <div className="flex items-center gap-3">

                      <select
                        className="bg-zinc-800 text-sm rounded-md px-2 py-1 outline-none"
                        value={t.remainderHours}
                        onChange={(e) =>
                          updateHours(t._id, e.target.value)
                        }
                      >
                        <option value="1">1 hr</option>
                        <option value="2">2 hrs</option>
                        <option value="24">24 hrs</option>
                        <option value="48">48 hrs</option>
                        <option value="96">96 hrs</option>
                      </select>

                      <button
                        onClick={() => deleteTemplate(t._id)}
                        className="p-2 rounded-md hover:bg-red-600/20 text-red-500"
                      >
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

            {templates.map(t => (
              <TemplateBlock
                key={t._id}
                title={t.title}
                text={t.content}
                onClick={() => openEditModal(t)}
              />
            ))}

          </Card>
        </div>
      </div>
            {showEditor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-zinc-900 w-full max-w-2xl p-5 rounded-xl space-y-4">

            <h3 className="font-bold text-lg">
              {editingId ? 'Edit Template' : 'Add Template'}
            </h3>

            <input
              placeholder="Title"
              className="w-full bg-zinc-800 px-3 py-2 rounded-md outline-none"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            {/* <input
              placeholder="Template Type (Welcome / Reminder)"
              className="w-full bg-zinc-800 px-3 py-2 rounded-md outline-none"
              value={form.templateType}
              onChange={e => setForm({ ...form, templateType: e.target.value })}
            /> */}

            {/* <select
              className="w-full bg-zinc-800 px-3 py-2 rounded-md"
              value={form.usedFor}
              onChange={e => setForm({ ...form, usedFor: e.target.value })}
            >
              <option>Whatsapp</option>
              <option>Email</option>
              <option>SMS</option>
            </select> */}

            <select
              className="w-full bg-zinc-800 px-3 py-2 rounded-md"
              value={form.remainderHours}
              onChange={e => setForm({ ...form, remainderHours: e.target.value })}
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="24">24 Hours</option>
              <option value="48">48 Hours</option>
            </select>

            {/* MARKDOWN EDITOR */}
            <div data-color-mode="dark">
              <MDEditor
                value={form.content}
                onChange={(val) =>
                  setForm({ ...form, content: val || '' })
                }
                height={200}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">

              <button
                onClick={resetForm}
                className="px-4 py-2 bg-zinc-700 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={saveTemplate}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-md"
              >
                {editingId ? 'Update' : 'Save'}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
