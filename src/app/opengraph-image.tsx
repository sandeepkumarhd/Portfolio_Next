import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Social preview card, generated at build time from the site config. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#07070a",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9a9aa8", fontSize: 26 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5ee7c7" }} />
          Available for new opportunities
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#8b7cff" }}>
            {`${site.role} · ${site.experienceYears} years`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5d5d6b" }}>
          <span>React.js · Next.js · TypeScript</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
