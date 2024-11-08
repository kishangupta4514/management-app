interface IClientData {
  imgUrl: string;
  description: string;
  name: string;
  designation: string;
}

export function ClientCard({ data }: { data: IClientData }) {
  return (
    <div className="relative px-12 py-4 w-[350px] h-[315px] shadow-lg rounded-xl text-gray-600 border-[1px] border-solid border-stone-200">
      <div className="text-center absolute -top-[33px] left-[135px]">
        <img src={data.imgUrl} className="m-auto" />
      </div>
      <div className="text-left mt-5">{data.description}</div>
      <div className="mt-5 text-md font-bold text-sky-600">{data.name}</div>
      <div className="mt-1">{data.designation}</div>
    </div>
  );
}
