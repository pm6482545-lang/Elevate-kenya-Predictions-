import './globals.css'; // This links the tailwind setup we just created!

export const metadata = {
  title: 'Elevate Kenya Predictions',
  description: 'Striving for the peak of potential',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F4F6F9] text-gray-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
