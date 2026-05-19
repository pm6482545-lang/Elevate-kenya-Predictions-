import './globals.css';

export const metadata = {
  title: 'Elevate Kenya Predictions',
  description: 'Striving for the peak of potential',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="bg-[#F4F6F9] text-gray-800 font-sans antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}
