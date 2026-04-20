export function SectionTitle ({title}: {title: string}) {
    return (
        <div className="flex justify-between">
            <h2 className="text-3xl text-green font-bold">
                {title}
            </h2>
            <button type="button" className="text-primary text-sm font-semibold cursor-pointer hover:text-primary/80">
                Показать все
            </button>
        </div>
    )
}