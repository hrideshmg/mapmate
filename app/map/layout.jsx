export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <div className='flex'>
        {children}
      </div>
    </div>
  );
}
