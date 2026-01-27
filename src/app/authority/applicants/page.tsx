// 'use client';


// import { formatDateToDDMMYYYY } from '@/lib/utils';
// import { getDahboardData } from '@/services/admin-services';
// import { Search, MoreHorizontal } from 'lucide-react';
// import useSWR from 'swr';

// export type ApplicantStatus =
//   | 'New'
//   | 'Message 1 Sent'
//   | 'Reminder 1 Sent (48h)'
//   | 'Dead Lead'
//   | 'Replied';

// export interface Applicant {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   region: 'UK' | 'NL' | 'BE';
//   submitted: string;
//   status: ApplicantStatus;
// }


// // export const applicants: Applicant[] = [
// //   {
// //     id: 12345,
// //     name: 'Alex Johnson',
// //     phone: '555-987-6543',
// //     email: 'john.smith@email.com',
// //     region: 'UK',
// //     submitted: '01/04/2023',
// //     status: 'New',
// //   },
// //   {
// //     id: 67890,
// //     name: 'Maria Smith',
// //     phone: '555-123-4567',
// //     email: 'jane.doe@email.com',
// //     region: 'NL',
// //     submitted: '15/11/2022',
// //     status: 'Message 1 Sent',
// //   },
// //   {
// //     id: 98765,
// //     name: 'Emily Davis',
// //     phone: '555-345-7890',
// //     email: 'emily.davis@email.com',
// //     region: 'BE',
// //     submitted: '10/03/2023',
// //     status: 'Reminder 1 Sent (48h)',
// //   },
// //   {
// //     id: 33445,
// //     name: 'Daniel Martinez',
// //     phone: '555-876-5432',
// //     email: 'daniel.martinez@email.com',
// //     region: 'UK',
// //     submitted: '01/12/2022',
// //     status: 'Dead Lead',
// //   },
// //   {
// //     id: 77889,
// //     name: 'Sophia Lee',
// //     phone: '555-432-1098',
// //     email: 'sophia.lee@email.com',
// //     region: 'NL',
// //     submitted: '20/01/2023',
// //     status: 'New',
// //   },
// //   {
// //     id: 99001,
// //     name: 'William Walker',
// //     phone: '555-210-9876',
// //     email: 'william.walker@email.com',
// //     region: 'BE',
// //     submitted: '28/02/2023',
// //     status: 'Message 1 Sent',
// //   },
// // ];


// const statusStyles: Record<ApplicantStatus, string> = {
//   New: 'bg-blue-600',
//   'Message 1 Sent': 'bg-indigo-600',
//   'Reminder 1 Sent (48h)': 'bg-yellow-500 text-black',
//   'Dead Lead': 'bg-red-600',
//   Replied: 'bg-green-600',
// };

// export function StatusBadge({ status }: { status: ApplicantStatus }) {
//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap ${statusStyles[status]}`}
//     >
//       {status}
//     </span>
//   );
// }

// export default function ApplicantsPage() {
//    const { data, error, isLoading } = useSWR(
//      "/api/hubspot/contacts",          // ✅ stable key
//      getDahboardData,              // ✅ fetcher
//      {
//        revalidateOnFocus: false,
//        dedupingInterval: 60_000,
//       }
//     );
//     console.log('data: ', data?.data?.data);
//     const hubspotData = data?.data?.data || [];
//   return (
//     <div className=" text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-semibold text-pink-500">Applicants</h1>

//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
//           <input
//             placeholder="Search"
//             className="bg-zinc-900 border border-zinc-700 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-zinc-800 backdrop-blur">
//         <table className="w-full text-sm">
//           <thead className="bg-zinc-900/70 text-zinc-400">
//             <tr>
//               <th className="px-4 py-3 text-left">User Id</th>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Phone</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Region</th>
//               <th className="px-4 py-3 text-left">Submitted</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-zinc-800">
//             {hubspotData.map((applicant) => (
//               <tr
//                 key={applicant.id}
//                 className="hover:bg-zinc-900/60 transition"
//               >
//                 <td className="px-4 py-3">{applicant.identifier}</td>
//                 <td className="px-4 py-3">{applicant.firstName} {applicant.lastName}</td>
//                 <td className="px-4 py-3">{applicant.phone}</td>
//                 <td className="px-4 py-3 text-zinc-400">
//                   {applicant.email}
//                 </td>
//                 <td className="px-4 py-3">{applicant.region}</td>
//                 <td className="px-4 py-3">{formatDateToDDMMYYYY(applicant.createdAt)}</td>
//                 <td className="px-4 py-3">
//                   <StatusBadge status={applicant.status} />
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <button className="p-2 rounded-full hover:bg-zinc-800">
//                     <MoreHorizontal className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
//         <span>Page 1 of 10</span>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border border-zinc-700 rounded-md hover:bg-zinc-800">
//             Previous
//           </button>
//           <button className="px-3 py-1 border border-zinc-700 rounded-md hover:bg-zinc-800">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import useSWR from 'swr';
// import { Search, MoreHorizontal } from 'lucide-react';

// import { formatDateToDDMMYYYY } from '@/lib/utils';
// import { getDahboardData } from '@/services/admin-services';

// export type ApplicantStatus =
//   | 'New'
//   | 'Message 1 Sent'
//   | 'Reminder 1 Sent (48h)'
//   | 'Dead Lead'
//   | 'Replied';

// const statusStyles: Record<ApplicantStatus, string> = {
//   New: 'bg-blue-600',
//   'Message 1 Sent': 'bg-indigo-600',
//   'Reminder 1 Sent (48h)': 'bg-yellow-500 text-black',
//   'Dead Lead': 'bg-red-600',
//   Replied: 'bg-green-600',
// };

// function StatusBadge({ status }: { status: ApplicantStatus }) {
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusStyles[status]}`}>
//       {status}
//     </span>
//   );
// }

// const LIMIT = 20;

// export default function ApplicantsPage() {
//   const [page, setPage] = useState(1);

//   const { data, error, isLoading, isValidating } = useSWR(
//     ['/api/hubspot/contacts', page, LIMIT],
//     ([url, page, limit]) =>
//       getDahboardData(`${url}?page=${page}&limit=${limit}&search=${search}`),
//     {
//       revalidateOnFocus: false,
//       keepPreviousData: true,
//     }
//   );

//   const applicants = data?.data?.data ?? [];
//   const pagination = data?.data?.pagination;

//   const currentPage = pagination?.page ?? page;
//   const totalPages = pagination?.totalPages ?? 1;

//   return (
//     <div className="text-white">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-semibold text-pink-500">Applicants</h1>

//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
//           <input
//             placeholder="Search"
//             className="bg-zinc-900 border border-zinc-700 rounded-md pl-9 pr-3 py-2 text-sm"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-zinc-800">
//         <table className="w-full text-sm">
//           <thead className="bg-zinc-900/70 text-zinc-400">
//             <tr>
//               <th className="px-4 py-3 text-left">User Id</th>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Phone</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Region</th>
//               <th className="px-4 py-3 text-left">Submitted</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-zinc-800">
//             {isLoading ? (
//               <tr>
//                 <td colSpan={8} className="px-4 py-6 text-center text-zinc-400">
//                   Loading applicants…
//                 </td>
//               </tr>
//             ) : applicants.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="px-4 py-6 text-center text-zinc-400">
//                   No applicants found
//                 </td>
//               </tr>
//             ) : (
//               applicants.map((applicant: any) => (
//                 <tr key={applicant._id} className="hover:bg-zinc-900/60">
//                   <td className="px-4 py-3">{applicant.identifier}</td>
//                   <td className="px-4 py-3">
//                     {applicant.firstName} {applicant.lastName}
//                   </td>
//                   <td className="px-4 py-3">{applicant.phone}</td>
//                   <td className="px-4 py-3 text-zinc-400">{applicant.email}</td>
//                   <td className="px-4 py-3">{applicant.region ?? '-'}</td>
//                   <td className="px-4 py-3">
//                     {formatDateToDDMMYYYY(applicant.createdAt)}
//                   </td>
//                   <td className="px-4 py-3">
//                     <StatusBadge status={applicant.status ?? 'New'} />
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <button className="p-2 rounded-full hover:bg-zinc-800">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>

//         <div className="flex gap-2">
//           <button
//             disabled={currentPage === 1 || isValidating}
//             onClick={() => setPage(p => Math.max(1, p - 1))}
//             className="cursor-pointer text-stone-200 px-3 py-1 border border-zinc-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed "
//           >
//             Previous
//           </button>

//           <button
//             disabled={currentPage === totalPages || isValidating}
//             onClick={() => setPage(p => p + 1)}
//             className="px-3 py-1 border border-zinc-700 text-stone-200 cursor-pointer rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Search, MoreHorizontal } from 'lucide-react';

import { formatDateToDDMMYYYY, useDebounce } from '@/lib/utils';
import { getDahboardData } from '@/services/admin-services';
import { MessageIcon } from '@/utils/svgicons';

export type ApplicantStatus =
  | 'New'
  | 'Message 1 Sent'
  | 'Reminder 1 Sent (48h)'
  | 'Dead Lead'
  | 'Replied';

const statusStyles: Record<ApplicantStatus, string> = {
  New: 'bg-blue-600',
  'Message 1 Sent': 'bg-indigo-600',
  'Reminder 1 Sent (48h)': 'bg-yellow-500 text-black',
  'Dead Lead': 'bg-red-600',
  Replied: 'bg-green-600',
};

function StatusBadge({ status }: { status: ApplicantStatus }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

const LIMIT = 10;

export default function ApplicantsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isValidating } = useSWR(
    ['/api/hubspot/contacts', page, LIMIT, debouncedSearch],
    ([url, page, limit, search]) =>
      getDahboardData(
        `${url}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      ),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const applicants = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  const currentPage = pagination?.page ?? page;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-rose-500 text-2xl font-extrabold font-['Minork_Sans_']">Applicants</h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // 🔥 reset page on new search
            }}
            placeholder="Search"
            className="bg-zinc-900 border border-zinc-700 rounded-md pl-9 pr-3 py-2 text-sm w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/70 text-zinc-400">
            <tr>
              <th className="px-4 py-3 text-left">User Id</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Region</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-zinc-400">
                  Loading applicants…
                </td>
              </tr>
            ) : applicants.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-zinc-400">
                  No applicants found
                </td>
              </tr>
            ) : (
              applicants.map((applicant: any) => (
                <tr key={applicant._id} className="hover:bg-zinc-900/60">
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">{applicant.identifier}</td>
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">
                    {applicant.firstName} {applicant.lastName}
                  </td>
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">{applicant.phone}</td>
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">{applicant.email}</td>
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">{applicant.region ?? '-'}</td>
                  <td className="px-4 py-3 text-stone-200 text-sm font-normal font-['Kodchasan'] ">
                    {formatDateToDDMMYYYY(applicant.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={applicant.status ?? 'New'} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-2 rounded-lg cursor-pointer hover:bg-zinc-800">
                      <MessageIcon/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1 || isValidating}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 border border-zinc-700 text-stone-200 cursor-pointer rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages || isValidating}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border border-zinc-700 text-stone-200 cursor-pointer rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
