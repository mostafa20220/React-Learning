import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="grid grid-cols-1 text-center  justify-items-center h-full ">
      <div className="self-center w-full">
        <h1 className="mb-2 text-xl sm:text-2xl font-semibold uppercase tracking-wider  md:text-3xl lg:mb-8 lg:text-5xl lg:tracking-widest">
          The best pizza
        </h1>
        <h2 className="capitalize text-lg sm:text-xl text-yellow-500 md:text-2xl lg:mb-6 lg:text-4xl">
          Straight out of the oven, <br /> straight to you.
        </h2>
      </div>

      <CreateUser />
    </div>
  );
}

export default Home;
