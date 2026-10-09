# Phase 3 Empirical Verification Script
Write-Host "=== FLY ANYTIME: PHASE 3 EMPIRICAL VERIFICATION ==="

$htmlFiles = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html")
$allPassed = $true

# Check 1: Verify PWA manifest and service worker files exist and are valid
Write-Host "`n[Check 1] Verifying PWA Manifest & Service Worker files..."
if (Test-Path "manifest.json") {
    $manifestContent = Get-Content "manifest.json" -Raw
    if ($manifestContent.Contains('"standalone"') -and $manifestContent.Contains('"Fly Anytime"')) {
        Write-Host "  [PASS] manifest.json exists and contains valid PWA properties" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] manifest.json missing required properties" -ForegroundColor Red
        $allPassed = $false
    }
} else {
    Write-Host "  [FAIL] manifest.json does not exist" -ForegroundColor Red
    $allPassed = $false
}

if (Test-Path "sw.js") {
    $swContent = Get-Content "sw.js" -Raw
    if ($swContent.Contains("CACHE_NAME") -and $swContent.Contains("caches.open") -and $swContent.Contains("addEventListener('fetch'")) {
        Write-Host "  [PASS] sw.js exists and implements cache-first / network strategy" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] sw.js missing caching logic" -ForegroundColor Red
        $allPassed = $false
    }
} else {
    Write-Host "  [FAIL] sw.js does not exist" -ForegroundColor Red
    $allPassed = $false
}

# Check 2: Verify PWA tags in all HTML heads
Write-Host "`n[Check 2] Verifying manifest link & theme-color in all 5 HTML files..."
foreach ($file in $htmlFiles) {
    $c = Get-Content $file -Raw
    $hasManifest = $c.Contains('href="manifest.json"')
    $hasTheme = $c.Contains('name="theme-color"')
    if ($hasManifest -and $hasTheme) {
        Write-Host "  [PASS] $file : Has manifest and theme-color tags" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $file : Missing manifest or theme-color (manifest=$hasManifest, theme=$hasTheme)" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 3: Verify Voucher Modal in all HTML files
Write-Host "`n[Check 3] Verifying Itinerary Voucher Modal in all 5 HTML files..."
foreach ($file in $htmlFiles) {
    $c = Get-Content $file -Raw
    $hasVoucherModal = $c.Contains('id="itineraryVoucherModal"')
    $hasPrintBtn = $c.Contains('id="printVoucherBtn"')
    $hasCloseVoucher = $c.Contains('id="closeVoucherModal"')
    $hasRef = $c.Contains('id="voucherRef"')
    $hasTitle = $c.Contains('id="voucherTitle"')

    if ($hasVoucherModal -and $hasPrintBtn -and $hasCloseVoucher -and $hasRef -and $hasTitle) {
        Write-Host "  [PASS] $file : All voucher modal elements present" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $file : Missing voucher modal elements" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 4: Verify Print Styles in styles.css
Write-Host "`n[Check 4] Verifying Print Stylesheet rules in styles.css..."
$cssContent = Get-Content "css/styles.css" -Raw
if ($cssContent.Contains("@media print") -and $cssContent.Contains(".itinerary-printable-voucher") -and $cssContent.Contains(".no-print")) {
    Write-Host "  [PASS] styles.css contains @media print rules with voucher formatting" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] styles.css missing @media print rules" -ForegroundColor Red
    $allPassed = $false
}

# Check 5: Verify JavaScript Voucher & Service Worker Handlers in js/main.js
Write-Host "`n[Check 5] Verifying JavaScript Handlers in js/main.js..."
$jsContent = Get-Content "js/main.js" -Raw
$jsFeatures = @("itineraryVoucherModal", "printVoucherBtn", "open-voucher-modal", "exportFlightVoucher", "serviceWorker")
foreach ($feat in $jsFeatures) {
    if ($jsContent.Contains($feat)) {
        Write-Host "  [PASS] Feature '$feat' wired in js/main.js" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing feature '$feat' in js/main.js" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host "`n================================================"
if ($allPassed) {
    Write-Host "ALL CHECKS PASSED: Phase 3 verified successfully!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "ONE OR MORE CHECKS FAILED!" -ForegroundColor Red
    exit 1
}
