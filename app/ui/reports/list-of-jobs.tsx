import { formatDateToLocal } from "@/app/lib/utils";
import { fetchJobs, fetchJobPercentage } from "@/app/lib/data";

export default async function JobsTable({ id }: { id: string }) {
  const jobs = await fetchJobs(id);
  const da = await fetchJobPercentage(id, "Đã làm");
  const dang = await fetchJobPercentage(id, "Đang làm");
  const chua = await fetchJobPercentage(id, "Chưa làm");

  if (jobs.length === 0) {
    return <p className="italic mt-4">*không có công việc</p>;
  }

  return (
    <div className="inline-block min-w-full">
      <ul className="mb-2">
        Số lượng công việc: {da.total_jobs}
        <li className="flex flex-row ml-2">
          ● Đã hoàn thành:
          <div className="font-bold mx-1">
            {da.total_specified_jobs}/{da.total_jobs}
          </div>
          ({da.percent_completed}%)
        </li>
        <li className="flex flex-row ml-2">
          ● Đang làm:
          <div className="font-bold mx-1">
            {dang.total_specified_jobs}/{dang.total_jobs}
          </div>
          ({dang.percent_completed}%)
        </li>
        <li className="flex flex-row mx-2">
          ● Chưa làm:
          <div className="font-bold ml-1">
            {chua.total_specified_jobs}/{chua.total_jobs}
          </div>
          ({chua.percent_completed}%)
        </li>
      </ul>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black py-2">STT</th>
            <th className="border border-black py-2">Tên công việc</th>
            <th className="border border-black py-2">Trạng thái</th>
            <th className="border border-black py-2">Hạn hoàn thành</th>
            <th className="border border-black py-2">Kết quả</th>
            <th className="border border-black py-2">Nhận xét</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job, index) => (
            <tr key={job.job_id}>
              <td className="border border-black py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-black px-2 py-2 text-center">
                {job.job_name}
              </td>
              <td className="border border-black py-2 font-bold uppercase text-center">
                {job.status}
              </td>
              <td className="border border-black py-2 text-center">
                {formatDateToLocal(job.deadline)}
              </td>
              <td className="border border-black px-2 py-2 text-center text-wrap">
                {job.result_url}
              </td>
              <td className="border border-black px-2 w-80 py-2">
                <textarea rows={1} className="w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
