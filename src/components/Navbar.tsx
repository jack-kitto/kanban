import Image from 'next/image'
export const Navbar = () => {
  return (
    // a div with a height of 97px and a width that fills the screen
    <div className="flex h-24 w-auto flex-row bg-white">
      <div className="flex items-center">
        <div className="mr-4">Login</div>
        <div className="mr-4">Register</div>
      </div>
    </div>
  );
}
