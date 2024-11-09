interface IData {
  imgUrl: string;
  description: string;
  name: string;
  location: string;
}
export function ProjectCard({ data }: { data: IData }) {
  return (
    <div className="w-[350px] h-[540px] bg-white rounded-t-2xl overflow-hidden">
      <div className="w-[450px] h-[350px] overflow-hidden">
        <img src={data.imgUrl} width={450} height={350} />
      </div>
      <div className="pl-5">
        <div className="text-xl font-bold mt-5 text-sky-700">
          {data.description}
        </div>
        <div className="mt-3">
          {data.name}, <span>&nbsp;{data.location}</span>
        </div>
        <div>
          <button className="mt-6 px-[40px] uppercase font-[500] bg-[#f46d21] text-white px-auto py-3 rounded-md hover:opacity-70">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
