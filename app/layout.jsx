import "./globals.css";

export const metadata = {
    title: "Weekday Search Jobs",
    description: "Weekday Search Jobs Application",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
