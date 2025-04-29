
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, App } from 'antd';
import "./globals.css";
import CustomDashboardLayout from "@/components/base/Layout";
import { AuthProvider } from "@/lib/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Custom AntD theme configuration
const theme = {
  token: {
    colorPrimary: '#1d4ed8',
    colorSuccess: '#059669',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    colorInfo: '#2563eb',
  },
};

export const metadata = {
  title: "Trust Management System",
  description: "A comprehensive trust management solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ConfigProvider theme={theme}>
            <App>
              <CustomDashboardLayout>
                {children}
              </CustomDashboardLayout>
            </App>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
