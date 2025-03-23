import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kostas Vasilopoulos | Machine Learning Engineer",
    description: "Personal website of Kostas Vasilopoulos, Machine Learning Engineer",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-background">
                        <Navigation />
                        <main className="container mx-auto px-4 py-8">{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
} 