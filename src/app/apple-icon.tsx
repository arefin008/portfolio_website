import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
            width: 138,
            height: 138,
            borderRadius: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid rgba(61,220,151,0.28)",
            background: "rgba(255,255,255,0.03)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 16px 34px rgba(0,0,0,0.4), 0 0 28px rgba(61,220,151,0.16)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 2,
              fontSize: 74,
              fontWeight: 800,
              letterSpacing: "-0.12em",
              color: "#3ddc97",
              lineHeight: 1,
              textShadow: "0 0 12px rgba(61,220,151,0.24)",
              transform: "translateY(-3px)",
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
