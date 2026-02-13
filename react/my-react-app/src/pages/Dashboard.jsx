import { useAuth } from "../auth/authStore";

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-2 text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="grid gap-6">
      {/* Header row */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>
          <p className="mt-1 text-sm text-gray-600">
            {user?.name} 님, 오늘도 화이팅입니다.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="h-10 rounded-xl border bg-white px-4 text-sm hover:bg-gray-50">
            새로고침
          </button>
          <button className="h-10 rounded-xl bg-black px-4 text-sm text-white hover:opacity-90">
            새 작업
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="오늘 처리량" value="—" sub="데이터 연결 전" />
        <StatCard label="성공" value="—" />
        <StatCard label="실패" value="—" />
        <StatCard label="평균 응답(ms)" value="—" />
      </div>

      {/* Content grid */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: table/list */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">최근 요청</h2>
            <input
              className="h-9 w-56 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              placeholder="검색"
            />
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border">
            <div className="grid grid-cols-[1fr_120px_120px] bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-600">
              <div>URL</div>
              <div>상태</div>
              <div>시간</div>
            </div>

            {/* 샘플 row */}
            {[
              { url: "/api/test", status: "200", time: "2.1s" },
              { url: "/api/login", status: "401", time: "0.8s" },
              { url: "/api/report", status: "500", time: "1.3s" },
            ].map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_120px_120px] items-center px-4 py-3 text-sm"
              >
                <div className="truncate">{r.url}</div>
                <div className="text-gray-700">{r.status}</div>
                <div className="text-gray-500">{r.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: summary */}
        <div className="grid gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-base font-semibold">요약</h2>
            <div className="mt-3 grid gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>실행 중</span>
                <span className="text-gray-900">—</span>
              </div>
              <div className="flex justify-between">
                <span>대기</span>
                <span className="text-gray-900">—</span>
              </div>
              <div className="flex justify-between">
                <span>실패</span>
                <span className="text-gray-900">—</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-base font-semibold">다음 단계</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>Spring Boot API 붙이기</li>
              <li>실제 데이터로 카드/목록 채우기</li>
              <li>필터/정렬 추가</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
