import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 24% 22%, rgba(61,220,151,0.22), transparent 34%), linear-gradient(180deg, #030303 0%, #060606 100%)",
        }}
      >
        <div
          style={{
            width: 392,
            height: 392,
            borderRadius: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(61,220,151,0.28)",
            background: "rgba(255,255,255,0.03)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px rgba(0,0,0,0.45), 0 0 70px rgba(61,220,151,0.14)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              fontSize: 220,
              fontWeight: 800,
              letterSpacing: "-0.12em",
              color: "#3ddc97",
              lineHeight: 1,
              textShadow: "0 0 24px rgba(61,220,151,0.24)",
              transform: "translateY(-8px)",
            }}
          >
            <span>A</span>
            <span style={{ color: "#f6f5ef" }}>R</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
