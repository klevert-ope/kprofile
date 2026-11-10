import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111511",
        color: "#f3f0e8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "70px 84px",
        border: "2px solid #3b4b3b",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#b9ed98",
          fontSize: 23,
          letterSpacing: 5,
          marginBottom: 25,
        }}
      >
        KLEVERT OPEE / SOFTWARE ENGINEER
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 105,
          fontWeight: 700,
          letterSpacing: -8,
          lineHeight: 1,
        }}
      >
        I ENGINEER
      </div>
      <div
        style={{
          display: "flex",
          color: "#b9ed98",
          fontSize: 105,
          fontWeight: 700,
          letterSpacing: -8,
          lineHeight: 1,
        }}
      >
        WHAT’S NEXT.
      </div>
      <div
        style={{
          display: "flex",
          color: "#c8ccc0",
          fontSize: 25,
          marginTop: 35,
        }}
      >
        Financial infrastructure · Distributed systems
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
