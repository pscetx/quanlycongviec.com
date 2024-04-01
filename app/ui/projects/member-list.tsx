import Image from "next/image";
import { fetchMembersProfilesList } from "@/app/lib/data";

export default async function MembersProfilesList({ id }: { id: string }) {
  const profilesList = await fetchMembersProfilesList(id);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-row justify-end items-center">
        <div className="flex flex-wrap justify-end">
          {profilesList.slice(0, 5).map((project) => (
            <div key={project.project_id}>
              <Image
                src={project.profile_url}
                alt={`profile picture`}
                className="mr-1 rounded-full"
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
        {profilesList.length > 5 && (
          <div className="text-xl font-extrabold text-emerald-800">
            +{profilesList.length - 5}
          </div>
        )}
      </div>
    </div>
  );
}
