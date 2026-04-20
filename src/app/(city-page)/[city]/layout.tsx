import LayoutWrapper from "@/shared/LayoutWrapper";

export default function CityLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <LayoutWrapper>
            {children}
        </LayoutWrapper>

    )
}