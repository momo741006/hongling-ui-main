document.addEventListener("DOMContentLoaded", async () => {
  const tone = localStorage.getItem("tone") || "default"
  document.getElementById("tone-display").textContent = tone

  const chart = JSON.parse(localStorage.getItem("chart"))
  const narrative = JSON.parse(localStorage.getItem("narrative"))

  if (!chart || !narrative) {
    document.getElementById("report-body").innerHTML =
      "<p>⚠️ 尚未生成命盤，請先回到首頁輸入資料。</p>"
    return
  }

  const res = await fetch("/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chart, narrative })
  })

  const html = await res.text()
  document.getElementById("report-body").innerHTML = html
})

function downloadReport() {
  alert("💡 儲存功能尚未啟用，可使用『列印』另存 PDF。")
}

function shareReport() {
  alert("💡 分享功能尚未啟用，可截圖或複製內容分享。")
}
function generateHealingReport(chart, narrative) {
  return `
    <div class="report-section">
      <h2>🌿 靈魂藍圖</h2>
      <p>你是一道靜靜流動的光，在宇宙的節奏中誕生。你的命盤不是命定，而是一份深度療癒的邀請。</p>
    </div>

    <div class="report-section">
      <h2>🧭 四柱能量</h2>
      ${Object.entries(chart.pillars).map(([key, val]) => `
        <p><strong>${key}柱：</strong> ${val.pillar}（${val.gan}${val.zhi}，${chart.tenGods.find(g => g.includes(val.gan)) || "無十神"})</p>
      `).join("")}
      <p>你的日主是 <strong>${chart.pillars.day.gan}</strong>，象徵堅定與清晰。</p>
    </div>

    <div class="report-section">
      <h2>🌈 五行分佈</h2>
      <p>${Object.entries(chart.fiveElements).map(([el, val]) => `${el}：${val}`).join("　")}</p>
      <p>陰陽比例：陰 ${chart.yinYang.陰} / 陽 ${chart.yinYang.陽}</p>
      <p>你偏陰，代表你擁有強大的感受力與療癒力。</p>
    </div>

    <div class="report-section">
      <h2>💫 軍團故事</h2>
      ${Object.entries(narrative).map(([pillar, data]) => `
        <div class="report-card">
          <h3>${pillar}柱 · ${data.commander}</h3>
          <p>軍師：${data.strategist}</p>
          <p>納音：${data.naYin}</p>
          <p>${data.story}</p>
        </div>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>🌟 結語</h2>
      <p>你不需要改變自己，只需要允許自己被看見。你的命盤，是一份靈魂的禮物。</p>
    </div>
  `
}

function generateMilitaryReport(chart, narrative) {
  return `
    <div class="report-section">
      <h2>⚔️ 軍團編制報告</h2>
      <p>命盤已解析，軍團已就位。</p>
    </div>

    <div class="report-section">
      <h2>🧭 四柱配置</h2>
      ${Object.entries(chart.pillars).map(([key, val]) => `
        <p>${key}柱：${val.pillar} → ${narrative[key]?.commander || "未知主將"}（${chart.tenGods.find(g => g.includes(val.gan)) || "無十神"}）</p>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>📊 五行戰力</h2>
      <p>${Object.entries(chart.fiveElements).map(([el, val]) => `${el}：${val}`).join("　")}</p>
      <p>陰陽比例：陰 ${chart.yinYang.陰} / 陽 ${chart.yinYang.陽}</p>
      <p>偏陰配置，適合潛伏、策劃、精準打擊。</p>
    </div>

    <div class="report-section">
      <h2>🧠 軍團敘事</h2>
      ${Object.entries(narrative).map(([pillar, data]) => `
        <div class="report-card">
          <h3>${pillar}柱 · ${data.commander}</h3>
          <p>軍師：${data.strategist}</p>
          <p>納音：${data.naYin}</p>
          <p>${data.story}</p>
        </div>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>🎯 任務結語</h2>
      <p>你不是來打仗的，你是來改寫戰局的。主將已就位，行動由你決定。</p>
    </div>
  `
}

function generateMythicReport(chart, narrative) {
  return `
    <div class="report-section">
      <h2>🪐 靈魂原型召喚</h2>
      <p>你誕生於星辰交會之時，命盤是一份神話的密碼。你不是凡人，你是原型的容器。</p>
    </div>

    <div class="report-section">
      <h2>🌌 四柱神性</h2>
      ${Object.entries(chart.pillars).map(([key, val]) => `
        <p>${key}柱：${val.pillar} → ${narrative[key]?.commander || "未知神性"}（${chart.tenGods.find(g => g.includes(val.gan)) || "無十神"}）</p>
      `).join("")}
      <p>你的日主 ${chart.pillars.day.gan} 是「斬斷虛偽」的神性之刃。</p>
    </div>

    <div class="report-section">
      <h2>🌈 元素光譜</h2>
      <p>${Object.entries(chart.fiveElements).map(([el, val]) => `${el}：${val}`).join("　")}</p>
      <p>陰陽比例：陰 ${chart.yinYang.陰} / 陽 ${chart.yinYang.陽}</p>
      <p>你偏陰，代表你是夜之神族，擅長夢境與潛意識的轉化。</p>
    </div>

    <div class="report-section">
      <h2>🔮 神諭敘事</h2>
      ${Object.entries(narrative).map(([pillar, data]) => `
        <div class="report-card">
          <h3>${pillar}柱 · ${data.commander}</h3>
          <p>${data.story}</p>
        </div>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>🧙 結語</h2>
      <p>你不是來活出命盤的，你是來召喚它。你是神話的延續，是靈魂的創世者。</p>
    </div>
  `
}

function generateSavageReport(chart, narrative) {
  return `
    <div class="report-section">
      <h2>😈 靈魂毒舌報告</h2>
      <p>你出生的那一刻，宇宙大概在偷懶。命盤一打開，我就知道你是個麻煩精。</p>
    </div>

    <div class="report-section">
      <h2>🧭 四柱吐槽</h2>
      ${Object.entries(chart.pillars).map(([key, val]) => {
        const god = chart.tenGods.find(g => g.includes(val.gan)) || "無十神"
        return `<p>${key}柱：${val.pillar} → ${god} → ${getSavageComment(god)}</p>`
      }).join("")}
    </div>

    <div class="report-section">
      <h2>📊 五行亂象</h2>
      <p>${Object.entries(chart.fiveElements).map(([el, val]) => `${el}：${val}`).join("　")}</p>
      <p>陰陽比例：陰 ${chart.yinYang.陰} / 陽 ${chart.yinYang.陽}</p>
      <p>偏陰？難怪你這麼會內耗。</p>
    </div>

    <div class="report-section">
      <h2>💀 軍團亂入</h2>
      ${Object.entries(narrative).map(([pillar, data]) => `
        <div class="report-card">
          <h3>${pillar}柱 · ${data.commander}</h3>
          <p>${data.story.replace(/你/g, "你這傢伙")}</p>
        </div>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>🧨 結語</h2>
      <p>你的命盤不是問題，是一場災難的藝術。但放心，災難也能成為傳奇——只要你夠狂。</p>
    </div>

function generateSavageReport(chart, narrative) {
  return `
    <div class="report-section">
      <h2>😈 靈魂毒舌報告</h2>
      <p>你出生的那一刻，宇宙大概在偷懶。命盤一打開，我就知道你是個麻煩精。</p>
    </div>

    <div class="report-section">
      <h2>🧭 四柱吐槽</h2>
      ${Object.entries(chart.pillars).map(([key, val]) => {
        const god = chart.tenGods.find(g => g.includes(val.gan)) || "無十神"
        return `<p>${key}柱：${val.pillar} → ${god} → ${getSavageComment(god)}</p>`
      }).join("")}
    </div>

    <div class="report-section">
      <h2>📊 五行亂象</h2>
      <p>${Object.entries(chart.fiveElements).map(([el, val]) => `${el}：${val}`).join("　")}</p>
      <p>陰陽比例：陰 ${chart.yinYang.陰} / 陽 ${chart.yinYang.陽}</p>
      <p>偏陰？難怪你這麼會內耗。</p>
    </div>

    <div class="report-section">
      <h2>💀 軍團亂入</h2>
      ${Object.entries(narrative).map(([pillar, data]) => `
        <div class="report-card">
          <h3>${pillar}柱 · ${data.commander}</h3>
          <p>${data.story.replace(/你/g, "你這傢伙")}</p>
        </div>
      `).join("")}
    </div>

    <div class="report-section">
      <h2>🧨 結語</h2>
      <p>你的命盤不是問題，是一場災難的藝術。但放心，災難也能成為傳奇——只要你夠狂。</p>
    </div>
  `
}function getSavageComment(tenGod) {
  if (!tenGod || tenGod === "無十神") return "你這柱沒個性，像背景牆。"

  const map = {
    "比肩": "你超愛自己，別人都只是背景板。",
    "劫財": "你搶資源搶得理直氣壯，連朋友都怕你。",
    "食神": "嘴巴很會講，但做事呢？嗯。",
    "傷官": "你是創意爆棚，但情緒也爆炸。",
    "偏財": "你錢來得快，花得更快，存款是傳說。",
    "正財": "你很穩，但穩到讓人想睡。",
    "偏官": "你超會控制人，但不一定控制得住自己。",
    "正官": "你表面服從，內心叛逆，雙面人代表。",
    "偏印": "你活在自己的世界，別人進不來。",
    "正印": "你很照顧人，但有時太黏太煩。"
  }

  const key = Object.keys(map).find(k => tenGod.includes(k))
  return key ? map[key] : "你這柱的個性我都懶得吐槽了。"
}const tone = localStorage.getItem("tone") || "default"
document.getElementById("tone-display").textContent = tone

const chart = JSON.parse(localStorage.getItem("chart"))
const narrative = JSON.parse(localStorage.getItem("narrative"))

renderReport(tone, chart, narrative)function renderReport(tone, chart, narrative) {
  let html = ""
  if (tone === "healing") {
    html = generateHealingReport(chart, narrative)
  } else if (tone === "military") {
    html = generateMilitaryReport(chart, narrative)
  } else if (tone === "mythic") {
    html = generateMythicReport(chart, narrative)
  } else if (tone === "savage") {
    html = generateSavageReport(chart, narrative)
  } else {
    html = "<p>⚠️ 無法辨識語氣，請重新選擇。</p>"
  }
  document.getElementById("report-body").innerHTML = html
}


// === Energy Bars Rendering ===
(function(){
  try {
    const data = JSON.parse(localStorage.getItem("reportData") || "{}");
    const chart = data.sampleChart || data.chart || {};
    const elements = chart.elements || {"木":0,"火":0,"土":0,"金":0,"水":0};
    const yinYang = chart.yinYang || {"陰":0,"陽":0};

    const container = document.getElementById("energy-section");
    if (!container) return;

    function row(label, value, max){
      const pct = max ? Math.max(0, Math.min(1, value / max)) : 0;
      const el = document.createElement("div");
      el.className = "energy-row reveal";
      el.innerHTML = `
        <div class="energy-label">${label}</div>
        <div class="energy-track"><div class="energy-fill" style="width:${pct*100}%"></div></div>
        <div style="width:2.2rem;text-align:right;opacity:.8">${value}</div>
      `;
      return el;
    }

    // Compute max to normalize bars (fallback to 5)
    const maxElem = Math.max(1, ...Object.values(elements));
    ["木","火","土","金","水"].forEach(k => {
      container.appendChild(row(k, elements[k] || 0, maxElem));
    });

    // Yin/Yang badges
    const badges = document.createElement("div");
    badges.className = "energy-badges";
    badges.innerHTML = `<span class="energy-badge">陰：${yinYang["陰"]||0}</span><span class="energy-badge">陽：${yinYang["陽"]||0}</span>`;
    container.appendChild(badges);
  } catch(e) {
    console.warn("Energy bars skipped:", e);
  }
})();


// Fallback to sample data when opened directly
(function(){
  try {
    if (!localStorage.getItem("reportData")) {
      fetch("data/sample.json").then(r=>r.json()).then(j=>{
        localStorage.setItem("reportData", JSON.stringify(j));
      });
    }
  } catch(e) {}
})();
