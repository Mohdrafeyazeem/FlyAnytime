# scripts/verify_phase_7.ps1
# Automated Verification Suite for Phase 7: Interactive Expedition Map & Geographic Circuit Visualizer

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   FLY ANYTIME - PHASE 7 EMPIRICAL VERIFICATION SUITE   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$indexHtml = Get-Content "index.html" -Raw
$mainJs = Get-Content "js/main.js" -Raw
$stylesCss = Get-Content "css/styles.css" -Raw

$allPassed = $true

function Assert-Contains ($content, $pattern, $label) {
    if ($content -match [regex]::Escape($pattern)) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $label" -ForegroundColor Red
        $global:allPassed = $false
    }
}

# 1. Verify CSS Map Styles
Write-Host "[1] Checking css/styles.css Map Styling & Animations..." -ForegroundColor Yellow
Assert-Contains $stylesCss ".expedition-map-svg" "css/styles.css contains .expedition-map-svg"
Assert-Contains $stylesCss ".map-flight-arc" "css/styles.css contains .map-flight-arc"
Assert-Contains $stylesCss ".map-flight-arc.active" "css/styles.css contains .map-flight-arc.active"
Assert-Contains $stylesCss "@keyframes flightFlow" "css/styles.css contains @keyframes flightFlow"
Assert-Contains $stylesCss ".map-waypoint-node" "css/styles.css contains .map-waypoint-node"
Assert-Contains $stylesCss ".map-beacon-pulse" "css/styles.css contains .map-beacon-pulse"
Assert-Contains $stylesCss "@keyframes beaconPulse" "css/styles.css contains @keyframes beaconPulse"
Assert-Contains $stylesCss ".map-corridor-tab.active" "css/styles.css contains .map-corridor-tab.active"

# 2. Verify JavaScript Map Engine
Write-Host ""
Write-Host "[2] Checking js/main.js Expedition Map Engine..." -ForegroundColor Yellow
Assert-Contains $mainJs "MAP_CORRIDORS" "js/main.js contains MAP_CORRIDORS"
Assert-Contains $mainJs "'del-leh'" "js/main.js contains 'del-leh' corridor data"
Assert-Contains $mainJs "'del-udr'" "js/main.js contains 'del-udr' corridor data"
Assert-Contains $mainJs "'del-jai'" "js/main.js contains 'del-jai' corridor data"
Assert-Contains $mainJs "'del-vns'" "js/main.js contains 'del-vns' corridor data"
Assert-Contains $mainJs "'del-cok'" "js/main.js contains 'del-cok' corridor data"
Assert-Contains $mainJs "initExpeditionMap" "js/main.js contains initExpeditionMap controller"
Assert-Contains $mainJs "inspectorBookCorridorBtn" "js/main.js wires inspectorBookCorridorBtn"

# 3. Verify HTML Section & SVG Nodes
Write-Host ""
Write-Host "[3] Checking index.html Section & SVG Nodes..." -ForegroundColor Yellow
Assert-Contains $indexHtml 'id="expeditionMapSection"' "index.html contains #expeditionMapSection"
Assert-Contains $indexHtml 'id="expeditionSvgMap"' "index.html contains #expeditionSvgMap"
Assert-Contains $indexHtml 'id="corridorInspectorCard"' "index.html contains #corridorInspectorCard"
Assert-Contains $indexHtml 'data-corridor="del-leh"' "index.html contains data-corridor='del-leh'"
Assert-Contains $indexHtml 'data-corridor="del-udr"' "index.html contains data-corridor='del-udr'"
Assert-Contains $indexHtml 'data-corridor="del-jai"' "index.html contains data-corridor='del-jai'"
Assert-Contains $indexHtml 'data-corridor="del-vns"' "index.html contains data-corridor='del-vns'"
Assert-Contains $indexHtml 'data-corridor="del-cok"' "index.html contains data-corridor='del-cok'"
Assert-Contains $indexHtml 'data-waypoint="DEL"' "index.html contains DEL (Delhi Hub) waypoint"
Assert-Contains $indexHtml 'data-waypoint="LEH"' "index.html contains LEH (Ladakh) waypoint"
Assert-Contains $indexHtml 'data-waypoint="UDR"' "index.html contains UDR (Udaipur) waypoint"
Assert-Contains $indexHtml 'data-waypoint="JAI"' "index.html contains JAI (Jaipur) waypoint"
Assert-Contains $indexHtml 'data-waypoint="VNS"' "index.html contains VNS (Varanasi) waypoint"
Assert-Contains $indexHtml 'data-waypoint="COK"' "index.html contains COK (Kochi/Alleppey) waypoint"

Write-Host ""
if ($allPassed) {
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  ALL PHASE 7 EMPIRICAL TESTS PASSED! 100% SUCCESSFUL!   " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    exit 0
} else {
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "  PHASE 7 VERIFICATION ENCOUNTERED FAILURES!             " -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Red
    exit 1
}
