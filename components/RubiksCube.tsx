const COLORS = ["#e91e8c", "#8b5cf6", "#3b82f6", "#22c55e", "#f59e0b", "#f0f0ff"];
const TRANSFORMS = ["translateZ(99px)", "rotateY(-90deg) translateZ(99px)", "rotateY(180deg) translateZ(99px)", "rotateY(90deg) translateZ(99px)", "rotateX(90deg) translateZ(99px)", "rotateX(-90deg) translateZ(99px)"];
export default function RubiksCube() {
  return (
    <div style={{ perspective: "520px", width: 198, height: 198 }}>
      <div className="rubik-spin" style={{ width: 198, height: 198, position: "relative", transformStyle: "preserve-3d" }}>
        {COLORS.map((color, face) => <div key={color} style={{ position: "absolute", width: 198, height: 198, transform: TRANSFORMS[face], display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: 5, backgroundColor: "#08080f", borderRadius: 6, backfaceVisibility: "hidden" }}>{Array.from({ length: 9 }, (_, cell) => <div key={cell} style={{ backgroundColor: color, borderRadius: 4, boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.35)" }} />)}</div>)}
      </div>
    </div>
  );
}
