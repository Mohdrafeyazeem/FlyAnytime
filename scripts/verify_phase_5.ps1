# verify_phase_5.ps1 - Empirical verification for Phase 5: Multi-City Flight Circuit Builder
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   FLY ANYTIME - PHASE 5 EMPIRICAL VERIFICATION SUITE   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$allPassed = $true

# 1. Verify JS Multi-City Engine
Write-Host "`n[1] Checking js/main.js Multi-City Calculation Engine..." -ForegroundColor Yellow
$mainJs = Get-Content "js/main.js" -Raw
$jsChecks = @(
    "MULTI_CITY_CIRCUITS",
    "AIRPORT_METADATA",
    "calculateMultiCityCircuit",
    "renderCircuitBuilder",
    "circuitStepperContainer",
    "circuitDistance",
    "circuitTime",
    "circuitDays",
    "circuitTariff",
    "circuitAircraftSelect",
    "circuitWhatsAppBtn",
    "circuitVoucherBtn"
)

foreach ($check in $jsChecks) {
    if ($mainJs.Contains($check)) {
        Write-Host "  [PASS] js/main.js contains '$check'" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] js/main.js missing '$check'" -ForegroundColor Red
        $allPassed = $false
    }
}

# 2. Verify HTML Multi-City Circuit Section in flights.html
Write-Host "`n[2] Checking flights.html Circuit Section & UI Nodes..." -ForegroundColor Yellow
$flightsHtml = Get-Content "flights.html" -Raw
$htmlChecks = @(
    'id="multiCityCircuitSection"',
    'id="circuitStepperContainer"',
    'id="circuitDistance"',
    'id="circuitTime"',
    'id="circuitDays"',
    'id="circuitTariff"',
    'id="circuitAircraftSelect"',
    'id="circuitVoucherBtn"',
    'id="circuitWhatsAppBtn"',
    'class="circuit-step-line"'
)

foreach ($check in $htmlChecks) {
    if ($flightsHtml.Contains($check)) {
        Write-Host "  [PASS] flights.html contains '$check'" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] flights.html missing '$check'" -ForegroundColor Red
        $allPassed = $false
    }
}

# 3. Verify CSS Stepper Transitions & Node Pulses
Write-Host "`n[3] Checking css/styles.css Stepper Styles..." -ForegroundColor Yellow
$stylesCss = Get-Content "css/styles.css" -Raw
$cssChecks = @(
    ".circuit-stepper-container",
    ".circuit-step-line",
    ".circuit-stepper-node",
    ".circuit-pulse-ring",
    ".circuit-card-active"
)

foreach ($check in $cssChecks) {
    if ($stylesCss.Contains($check)) {
        Write-Host "  [PASS] css/styles.css contains '$check'" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] css/styles.css missing '$check'" -ForegroundColor Red
        $allPassed = $false
    }
}

# 4. Verify Multi-City Navigation Links Across All 5 Portals
Write-Host "`n[4] Checking Multi-City Circuit Navigation Links Across All Pages..." -ForegroundColor Yellow
$pages = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html")
foreach ($p in $pages) {
    $content = Get-Content $p -Raw
    if ($content.Contains("multiCityCircuitSection")) {
        Write-Host "  [PASS] $p : Contains anchor link to multiCityCircuitSection" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $p : Missing link to multiCityCircuitSection" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "  ALL PHASE 5 EMPIRICAL TESTS PASSED! READY FOR AUDIT!  " -ForegroundColor Green
} else {
    Write-Host "  SOME PHASE 5 TESTS FAILED. CHECK LOGS ABOVE.         " -ForegroundColor Red
    exit 1
}
Write-Host "==========================================================" -ForegroundColor Cyan
