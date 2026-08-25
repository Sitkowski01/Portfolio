import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Eksport do statycznych plików (folder `out/`) — pod hosting współdzielony (public_html)
  output: "export",
  // Bez optymalizatora obrazów Next (wymaga serwera Node) — na statyku serwujemy pliki 1:1
  images: { unoptimized: true },
  // Każda podstrona jako katalog z index.html — bezpieczniejsze pod Apache/DirectAdmin
  trailingSlash: true,
};

export default nextConfig;
