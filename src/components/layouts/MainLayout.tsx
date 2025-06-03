import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 px-10 py-4">
        <div className="mx-auto bg-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;