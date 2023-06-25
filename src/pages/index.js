import Map from "@/components/Map";

export default function Home() {



  return (
    <main className={`flex flex-col absolute inset-0 p-8 bg-gray-100 items-center justify-center `}>
      <div id="container" className='bg-white rounded-lg shadow-md p-8 w-full h-auto'>
        <Map />
      </div>
    </main>
  )
}
