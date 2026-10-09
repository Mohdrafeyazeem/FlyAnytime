# verify_phase_4.ps1 - Empirical verification for Phase 4
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   FLY ANYTIME - PHASE 4 EMPIRICAL VERIFICATION SUITE   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$pages = @("index.html", "flights.html", "stays.html", "trains.html", "destinations.html")
$allPassed = $true

# 1. Verify Portfolio Drawer Markup in all 5 pages
Write-Host "`n[1] Checking Portfolio Drawer Markup across all pages..." -ForegroundColor Yellow
foreach ($p in $pages) {
    if (-not (Test-Path $p)) {
        Write-Host "FAILED: File not found - $p" -ForegroundColor Red
        $allPassed = $false
        continue
    }
    $content = Get-Content $p -Raw
    $hasDrawer = $content.Contains('id="portfolioDrawer"')
    $hasBackdrop = $content.Contains('id="portfolioDrawerBackdrop"')
    $hasPanel = $content.Contains('id="portfolioDrawerPanel"')
    $hasInquiriesContainer = $content.Contains('id="inquiriesListContainer"')
    $hasSavedContainer = $content.Contains('id="savedTripsContainer"')
    $hasOpenBtn = $content.Contains('open-portfolio-drawer')
    $hasBadge = $content.Contains('portfolio-badge-count')
    $hasMobileDock = $content.Contains('class="mobile-nav-bar')

    if ($hasDrawer -and $hasBackdrop -and $hasPanel -and $hasInquiriesContainer -and $hasSavedContainer -and $hasOpenBtn -and $hasBadge -and $hasMobileDock) {
        Write-Host "  [PASS] $p : Complete Portfolio Drawer & Navigation Dock Verified" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $p : Missing elements (Drawer=$hasDrawer, OpenBtn=$hasOpenBtn, Badge=$hasBadge, Dock=$hasMobileDock)" -ForegroundColor Red
        $allPassed = $false
    }
}

# 2. Verify JS Persistence Engine in js/main.js
Write-Host "`n[2] Checking js/main.js Portfolio Engine..." -ForegroundColor Yellow
$mainJs = Get-Content "js/main.js" -Raw
$jsChecks = @(
    "fly_anytime_inquiries",
    "fly_anytime_saved_trips",
    "renderPortfolio",
    "updateBadgeCounters",
    "followUpWhatsApp",
    "reopenVoucherForPackage",
    "removeInquiryByIndex",
    "removeSavedTripByIndex"
)

foreach ($check in $jsChecks) {
    if ($mainJs.Contains($check)) {
        Write-Host "  [PASS] js/main.js contains '$check'" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] js/main.js missing '$check'" -ForegroundColor Red
        $allPassed = $false
    }
}

# 3. Verify CSS Drawer Transitions & Styling
Write-Host "`n[3] Checking css/styles.css Drawer Transitions..." -ForegroundColor Yellow
$stylesCss = Get-Content "css/styles.css" -Raw
$cssChecks = @(
    "#portfolioDrawerBackdrop",
    "#portfolioDrawerPanel",
    ".drawer-closed",
    ".drawer-open",
    ".badge-pulse"
)

foreach ($check in $cssChecks) {
    if ($stylesCss.Contains($check)) {
        Write-Host "  [PASS] css/styles.css contains '$check'" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] css/styles.css missing '$check'" -ForegroundColor Red
        $allPassed = $false
    }
}

# 4. Verify Image Responsiveness across all pages
Write-Host "`n[4] Checking Image Responsiveness across HTML & CSS..." -ForegroundColor Yellow
$hasCardMedia = $stylesCss.Contains(".card-media-wrap")
$hasObjectCover = $stylesCss.Contains("object-fit: cover")
$hasAspectCheck = $stylesCss.Contains("aspect-ratio:")

if ($hasCardMedia -and $hasObjectCover -and $hasAspectCheck) {
    Write-Host "  [PASS] css/styles.css responsive image rules verified (.card-media-wrap, object-fit: cover, aspect-ratio)" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] css/styles.css missing critical responsive image rules" -ForegroundColor Red
    $allPassed = $false
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "  ALL PHASE 4 EMPIRICAL TESTS PASSED! READY FOR AUDIT!  " -ForegroundColor Green
} else {
    Write-Host "  SOME PHASE 4 TESTS FAILED. CHECK LOGS ABOVE.         " -ForegroundColor Red
    exit 1
}
Write-Host "==========================================================" -ForegroundColor Cyan
