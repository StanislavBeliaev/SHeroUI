export function SectionTitle ({title}: {title: string}) {
    return (
        <div className="flex justify-between items-baseline">
            <h2 className="text-title text-green font-semibold">
                {title}
            </h2>
            <button type="button" className="text-primary md:text-sm text-xs font-semibold cursor-pointer hover:text-primary/80">
                Показать все
            </button>
        </div>
    )
}