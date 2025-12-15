import BackgroundBlobs from "@/components/BackgroundBlobs";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-white overflow-hidden">
      <BackgroundBlobs />
      <div className="relative z-10 w-full flex items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
