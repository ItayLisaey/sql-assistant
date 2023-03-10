import './globals.css';

export const metadata = {
  title: 'Text-To-SQL',
  description: 'Text to SQL demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='he' dir='rtl'>
      <body>{children}</body>
    </html>
  );
}
