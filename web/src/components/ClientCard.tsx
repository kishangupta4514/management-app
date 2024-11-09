interface IClientData {
  imgUrl: string;
  description: string;
  name: string;
  designation: string;
}

export function ClientCard({ data }: { data: IClientData }) {
  return (
    <div className="relative px-12 py-4 w-[350px] h-[315px] shadow-lg rounded-xl text-gray-600 border-[1px] border-solid border-stone-200 mt-10">
      <div className="text-center absolute -top-[33px] left-[135px] w-[62px] h-[62px] rounded-full bg-black overflow-hidden">
        <img src={data.imgUrl} className="p-auto m-auto relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full" />
      </div>
      <div className="text-left mt-5">{data.description}</div>
      <div className="mt-5 text-md font-bold text-sky-600">{data.name}</div>
      <div className="mt-1">{data.designation}</div>
    </div>
  );
}
