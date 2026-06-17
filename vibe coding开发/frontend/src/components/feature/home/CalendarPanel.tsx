export function CalendarPanel() {
  const today = new Date().getDate();
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <section className="surface-card rounded-[22px] p-5">
      <h2 className="text-lg font-extrabold text-ink">本月日历</h2>
      <p className="mt-1 text-sm text-muted">校园活动和重要日期</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
        {["一", "二", "三", "四", "五", "六", "日"].map((day) => (
          <span key={day}>{day}</span>
        ))}
        {days.map((day) => (
          <span key={day} className={day === today ? "rounded-full bg-primary py-1 text-white shadow-lift" : "rounded-full py-1 hover:bg-slate-100"}>
            {day}
          </span>
        ))}
      </div>
    </section>
  );
}
