import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="border-b py-5 bg-slate-300">
      <div className="container flex justify-between items-center mx-auto">
        <div>FILE STACK</div>
        <div className="flex gap-8">
          <OrganizationSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Header;
