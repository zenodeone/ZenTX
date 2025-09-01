// script.js
(async () => {
  console.log("🔍 ZenTX Website Diagnostic Started");

  // 1. Cek Wallet (MetaMask / Injected Provider)
  if (typeof window.ethereum !== "undefined") {
    console.log("✅ Wallet terdeteksi:", window.ethereum.isMetaMask ? "MetaMask" : "Wallet lain");
  } else {
    console.error("❌ Wallet TIDAK terdeteksi. Silakan install MetaMask atau hubungkan wallet.");
    return;
  }

  // 2. Ambil chainId dan akun aktif
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log("📡 Chain ID aktif (hex):", chainId, "→ (dec):", parseInt(chainId, 16));

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("👛 Accounts terhubung:", accounts.length > 0 ? accounts : "Tidak ada akun aktif");
  } catch (err) {
    console.error("❌ Gagal ambil chainId / accounts:", err);
  }

  // 3. Tes koneksi ke RPC ZenChain Testnet
  const RPC_URL = "https://zenchain-testnet.api.onfinality.io/public";
  try {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] })
    });
    const data = await res.json();
    console.log("🔗 Tes RPC:", data);
  } catch (err) {
    console.error("❌ RPC tidak bisa diakses:", err);
  }

  // 4. (Opsional) Cek kontrak di alamat tertentu
  const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // ganti dengan alamat kontrakmu
  if (CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
    try {
      const res = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getCode",
          params: [CONTRACT_ADDRESS, "latest"]
        })
      });
      const data = await res.json();
      if (data.result === "0x") {
        console.warn("⚠️ Kontrak TIDAK ditemukan di alamat:", CONTRACT_ADDRESS);
      } else {
        console.log("✅ Kontrak ditemukan di alamat:", CONTRACT_ADDRESS);
      }
    } catch (err) {
      console.error("❌ Gagal cek kontrak:", err);
    }
  } else {
    console.log("ℹ️ Lewati pengecekan kontrak (alamat default).");
  }

  console.log("✅ Diagnostic selesai. Cek Console untuk detail.");
})();
